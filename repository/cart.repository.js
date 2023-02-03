const { Op } = require('sequelize')
class CartRepository {
    constructor(cartModel, goodsModel) {
        this.cartModel = cartModel;
        this.goodsModel = goodsModel
    }
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
    updateCart = async (cartId, quanitity, userId) => {
        try {
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