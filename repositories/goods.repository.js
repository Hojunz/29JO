class GoodsRepository {
    constructor(goodsModel) {
        this.goodsModel = goodsModel;
    }
    findAllGoods = async () => {
        try {
            const goodses = await this.goodsModel.findAll()
            return goodses
        } catch (error) {
            return error
        }
    }
    createGoods = async (name, price, image, stock) => {
        try {
            const createGoodsData = await this.goodsModel.create({
                name,
                price,
                image,
                stock
            })
            return createGoodsData
        } catch (error) {
            return error
        }
    }
}

module.exports = GoodsRepository