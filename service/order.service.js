const OrderRepository = require('../repository/order.repository')
const { Order, Cart, Goods,User } = require('../models')

class OrderService {
    orderRepository = new OrderRepository(Order, Cart, Goods,User)
    createOrder = async(cartId, userId, receiverName, receiverAddress, receiverPhone) => {
        try{
            const createOrder = await this.orderRepository.createOrder(
                cartId, userId, receiverName, receiverAddress, receiverPhone
            )
            return{
                cartId: createOrder.name, 
                userId: createOrder.userId, 
                receiverName: createOrder.receiverName, 
                receiverAddress: createOrder.receiverAddress, 
                receiverPhone: createOrder.receiverPhone, 
                total_Price: createOrder.total_Price
            }
        }
        catch(error){
            throw error
        }
        
    }
    showOrder = async(userId) => {
        try {
            const showOrder = await this.orderRepository.showMeTheOrder(userId)
            return showOrder
        } catch (error) {
            throw error
        }
    }
    updateOrder = async(orderId) => {
        try {
            const updateOrder = await this.orderRepository.updateOrder(orderId)
            return updateOrder
        } catch (error) {
            throw error
        }
    }
}

module.exports = OrderService