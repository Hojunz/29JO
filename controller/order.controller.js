const OrderService = require('../service/order.service')

class OrderController {
    orderService = new OrderService()
    createOrder = async (req, res, next) => {
        const User = res.locals.user;
        const userId = User.id
        const { cartId, receiverName, receiverAddress, receiverPhone,total_Price} = req.body
        try {
            if(!cartId || !receiverName || !receiverAddress || !receiverPhone){
                throw new Error('cart정보나 받는사람 정보가 빠져있습니다.')
            }
            const order = await this.orderService.createOrder(
                cartId, userId, receiverName, receiverAddress, receiverPhone, total_Price
            );
            return res.status(201).json({ data: order })
        } catch (error) {
            return res.status(400).json({ errorMessage: error.message })
        }
    }
    showOrder = async (req, res, next) => {
        const User = res.locals.user;
        const userId = User.id
        try {
            const order = await this.orderService.showOrder(userId)
            return res.status(200).json({ data: order })
        } catch (error) {
            return res.status(400).json({ errorMessage: error.message })
        }
    }
    updateOrder = async (req, res, next) => {
        const { orderId } = req.body
        try {
            await this.orderService.updateOrder(orderId)
            return res.status(203).json({ message: "업데이트 성공" })
        } catch (error) {
            return res.status(400).json({ errorMessage: error.message })
        }
    }
}
module.exports = OrderController