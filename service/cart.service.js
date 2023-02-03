const CartRepository = require('../repository/cart.repository');
const { Cart, Goods } = require('../models')

class CartService {
    cartRepository = new CartRepository(Cart, Goods)
    userFindCart = async (userId) => {
        try {
            const userCart = await this.cartRepository.userFindCart(userId)
            return userCart
        } catch (error) {
            throw error
        }
    }
    createCart = async (quanitity, userId, goodsId) => {
        try {
            const newCart = await this.cartRepository.createCart(
                quanitity, userId, goodsId
            )
            return {
                quanitity: newCart.quanitity,
                userId: newCart.userId,
                goodsId: newCart.goodsId,
                name: newCart.name
            }
        } catch (error) {
            throw error
        }
    };
    updateCart = async (cartId, quanitity, userId, goodsId) => {
        try {
            const updateCart = await this.cartRepository.updateCart(
                cartId, quanitity, userId, goodsId
            )
            return updateCart
        } catch (error) {
            throw error
        }
    }
    deleteCart = async (cartId) => {
        try {
            await this.cartRepository.deleteCart(cartId)
            return
        } catch (error) {
            throw error
        }
    }
}

module.exports = CartService
