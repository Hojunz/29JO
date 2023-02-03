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
            await this.goodsRepository.nameCheck(name);
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
            throw error
        }
    };

    deleteGoods = async (goodsId) => {
        try {
            const findGoods = await this.goodsRepository.findById(goodsId)
            console.log('123456',findGoods)
            if(!findGoods){
                throw new Error('상품이 없습니다.')
            }
            await this.goodsRepository.deleteGoods(goodsId)
            return
        } catch (error) {
            throw error
        }
    };
    updateGoods = async(goodsId, name, price, stock) => {
        try{
            await this.goodsRepository.updateGoods(
                goodsId, name, price, stock
            );
            const updateGoods = await this.goodsRepository.findById(goodsId)
            return {
                name: updateGoods.name, 
                price: updateGoods.price, 
                stock: updateGoods.stock
            }
        }catch(error){
            throw error
        }
    }
};

module.exports = GoodsService