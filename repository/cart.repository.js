const {Op} = require('sequelize')
class CartRepository {
    constructor(cartModel) {
        this.cartModel = cartModel;
    }
    userFindCart = async(userId) => {
        try {
            const userCart = await this.cartModel.findAll({
                where:{userId},
                include:[{
                    model:Goods,
                    where:{isDone:1}
                }]
            })
            console.log('cart불러오기',userCart)
            return userCart
        } catch (error) {
            throw error
        }
    };
    createCart = async(quanitity, userId, goodsId) => {
        try{
            const userCart = await this.cartModel.create({
                quanitity, userId, goodsId
            })
            return userCart
        }catch(error){
            throw error
        }
    };
}
module.exports = CartRepository