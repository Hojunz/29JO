const CartRepository = require('../repository/cart.repository');
const { Cart } = require('../models')

class CartService {
    cartRepository = new CartRepository(Cart)
    userFindCart = async(userId) => {
        try{
            const userCart = await this.cartRepository.userFindCart(userId)
            return userCart
        }catch(error){
            throw error
        }
    }
    createCart = async(quanitity, userId, goodsId) => {
        try{
            const newCart = await this.cartRepository.createCart(
                quanitity, userId, goodsId
            )
            return {
                quanitity: newCart.quanitity,
                userId: newCart.userId,
                goodsId: newCart.goodsId
            }
        }catch(error){
            throw error
        }
    }
}

module.exports = CartService
