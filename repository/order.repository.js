const { sequelize } = require('../models');


class OrderRepository {
    constructor(orderModel, cartModel, goodsModel, userModel) {
        this.orderModel = orderModel;
        this.cartModel = cartModel;
        this.goodsModel = goodsModel;
        this.userModel = userModel;

    }
    createOrder = async (
        cartId, userId, receiverName, receiverAddress, receiverPhone, 
    ) => {
        const t = await sequelize.transaction()
        try {
            const count = await this.cartModel.findAll({
                
                where: {id:cartId},
                include:[{
                    model: this.goodsModel,
                    attributes: ["price",],
                }]
            })
            // console.log('2222',count[0].quanitity)
            // console.log('2222',count[0].Good.price)
            const total_Price = Number(count[0].quanitity) * Number(count[0].Good.price)
            const findCart = await this.cartModel.findAll({
                where: { id: cartId },
                transaction: t
            })
            // console.log('111', findCart)
            if (!findCart.length) {
                throw new Error('없는 카트입니다.')
            }
            if (findCart[0].isDone !== 1) {
                throw new Error('이미 주문된 카트입니다.')
            }
            const createOrder = await this.orderModel.create({
                userId,
                receiverName,
                receiverAddress,
                receiverPhone,
                total_Price,

            }, { transaction: t })
            await this.cartModel.update(
                { isDone: 0 },
                {
                    where: { id: cartId },
                    transaction: t
                }
            );
            await this.cartModel.update(
                { orderId: createOrder.id },
                {
                    where: { id: cartId },
                    transaction: t
                }
            );
            await this.goodsModel.update(
              {stock: sequelize.literal(`stock - ${findCart[0].quanitity}`)},
              {where: {id: findCart[0].goodsId}, transaction: t}
            )
            await t.commit()
            return createOrder
        } catch (error) {
            await t.rollback()
            throw error
        }
    }
    showMeTheOrder = async (userId) => {
        try {
            const showOrder = await this.orderModel.findAll({
                where: { userId },
                attributes: ["id", "receiverName", "receiverAddress", "receiverPhone", "total_Price"],
                include: [
                    {
                        model: this.cartModel,
                        attributes: ["quanitity", "isDone", "updatedAt",],
                        include: [
                            {
                                model: this.goodsModel,
                                attributes: ["name", "price", "image",]
                            }
                        ]
                    }
                ]
            })
            return showOrder
        } catch (error) {
            throw error
        }
    }
    updateOrder = async (orderId) => {
        try {
            const order = await this.orderModel.findAll({
                where: { id: orderId }
            })
            if (!order.length) {
                throw new Error('없는 주문입니다.')
            }
            if (order[0].status === '주문접수') {
                await this.orderModel.update(
                    { status: "배송중" },
                    { where: { id: orderId } }
                );
                const updateOrder = await this.orderModel.findAll({
                    where: { id: orderId }
                })
                return updateOrder
            }
            if (order[0].status === '배송중') {
                await this.orderModel.update(
                    { status: "주문완료" },
                    { where: { id: orderId } }
                );
                const updateOrder = await this.orderModel.findAll({
                    where: { id: orderId }
                })
                return updateOrder
            }
            if (order[0].status === '주문완료') {
                throw new Error('이미 완료된 주문입니다.')
            }
        } catch (error) {
            throw error
        }
    }
}

module.exports = OrderRepository