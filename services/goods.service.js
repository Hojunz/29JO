const GoodsRepository = require('../repository/goods.repository');
const { Goods } = require('../models')

class GoodsService {
    goodsRepository = new GoodsRepository(Goods)
    findAllGoods = async () => {
        const allGoodses = await this.goodsRepository.findAllGoods();
        if (allGoodses === []) {
            return '비어있음'
        }
        allGoodses.sort((a, b) => {
            return b.createdAt - a.createdAt
        });
        return allGoodses.map((goods) => {
            return {
                id: goods.id,
                name: goods.name,
                price: goods.price,
                image: goods.image,
                stock: goods.stock,
                createdAt: goods.createdAt,
                updatedAt: goods.updatedAt
            };
        });
    };
    createdGoods = async (name, price, image, stock) => {
        try {
            
            const createGoodsData = await this.goodsRepository.createGoods(
                name, price, image, stock
            )
            return {
                name: createGoodsData.name,
                price: createGoodsData.price,
                image: createGoodsData.image,
                stock: createGoodsData.stock
            }
        } catch (error) {
            console.log(error);
            return error.Error
        }
    }
};

module.exports = GoodsService