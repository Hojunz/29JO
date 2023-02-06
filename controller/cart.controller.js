const CartService = require('../service/cart.service')
class CartController {
    cartService = new CartService()
    userFindCart = async (req, res, next) => {
        const User = res.locals.user;
        const userId = User.id
        try {
            // cart 중복확인 예외처리 필요
            // cart 존재확인 예외처리 필요 
            const cart = await this.cartService.userFindCart(userId);
            return res.status(200).json({ data: cart })
        } catch (error) {
            return res.status(400).json({ errorMessage: error.message })
        }
    }
    createCart = async (req, res, next) => {
        // cart 중복확인 예외처리 필요
        // cart 존재확인 예외처리 필요 
        const User = res.locals.user;
        const userId = User.id
        const { quanitity, goodsId } = req.body
        try {
            const newCart = await this.cartService.createCart(quanitity, userId, goodsId)
            return res.status(201).json({ data: newCart })
        } catch (error) {
            return res.status(400).json({ errorMessage: error.message })
        }
    };
    updateCart = async(req,res,next) => {
        // cart 중복확인 예외처리 필요
        // cart 존재확인 예외처리 필요 
        const User = res.locals.user;
        const userId = User.id
        const { quanitity, goodsId } = req.body
        const {cartId} = req.params
        try{
            const updateCart = await this.cartService.updateCart(
                cartId, quanitity, userId, goodsId
            )
            console.log('업데이트 카트', updateCart)
            return res.status(203).json({data:updateCart})
        }catch(error){
            return res.status(404).json({errorMessage:error.message})
        }
    }
    deleteCart = async(req, res, next) => {
        // cart 중복확인 예외처리 필요
        // cart 존재확인 예외처리 필요 
        try {
            const {cartId} = req.params
            await this.cartService.deleteCart(cartId)
            return res.status(200).json({message:'삭제 성공'})
        } catch (error) {
            return res.status(404).json({message: error.message})
        }
    }
}

module.exports = CartController