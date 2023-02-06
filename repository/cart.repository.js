const { Op } = require('sequelize')
class CartRepository {
    constructor(cartModel, goodsModel) {
        this.cartModel = cartModel;
        this.goodsModel = goodsModel
    }
    // UserId로 Cart 목록 찾기
    userFindCart = async (userId) => {
        try {
            const userCart = await this.cartModel.findAll({
                attributes: ['id', "quanitity", "userId"],
                include: [{
                    model: this.goodsModel,
                    attributes: ["name", "price", "image",],
                }],
                where: {
                    [Op.and]: [
                        { userId },
                        { isDone: 1 }
                    ]
                },
            })
            console.log('cart불러오기', userCart)
            return userCart
        } catch (error) {
            throw error
        }
    };
    // Cart 만들기
    createCart = async (quanitity, userId, goodsId) => {
        try {
            const userCart = await this.cartModel.create({
                quanitity, userId, goodsId
            })
            return userCart
        } catch (error) {
            throw error
        }
    };
    // Cart 상태 변경하기
    updateCart = async (cartId, quanitity, userId) => {
        try {
            const cart = await this.cartModel.findAll({
                where: { id: cartId }
            })
            if (!cart.length) {
                throw new Error('없는 카트입니다.')
            }
            await this.cartModel.update(
                { quanitity },
                { where: { id: cartId } }
            );
            const [dbCart] = await this.cartModel.findAll({
                where: {
                    [Op.and]: [
                        { userId },
                        { id: cartId }
                    ]
                },
            });
            return dbCart
        } catch (error) {
            throw error
        }
    }
    // Cart 지우기
    deleteCart = async (cartId) => {
        try{
            return await this.cartModel.destroy({
                where: {id: cartId}
            })
        }catch(error){
            throw error
        }
    }
}
module.exports = CartRepository