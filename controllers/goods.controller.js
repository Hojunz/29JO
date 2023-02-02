const GoodsService = require('../services/goods.service')

class GoodsController {
    goodsService = new GoodsService()
    getGoods = async (req, res, next) => {
        try {
            const goodses = await this.goodsService.findAllGoods();
            console.log(goodses)
            return res.status(200).json({ data: goodses })
        } catch (error) {
            return res.status(400)
        }
    }
    addGoods = async (req, res, next) => {
        const { name, price, image, stock } = req.body
        try {
            if (!name || !price || !image || !stock) {
                throw new Error('정보가 없거나 가격과 수량이 0입니다.')
            }
            if (stock < 0) {
                throw new Error('수량이 0개 이하입니다.')
            }
            if (price < 0) {
                throw new Error('가격이 0원 이하입니다.')
            }
            const createGoodsData = await this.goodsService.createdGoods(
                name, price, image, stock
            );
            console.log('생성Data', createGoodsData)
            res.status(201).json({ data: createGoodsData })
        } catch (Error) {
            return res.status(400).json({ Error: Error.message })
        }
    }
}
module.exports = GoodsController