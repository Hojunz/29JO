const GoodsService = require('../service/goods.service')

class GoodsController {
    goodsService = new GoodsService()
    getGoods = async (req, res, next) => {
        try {
            const goodses = await this.goodsService.findAllGoods();
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
        } catch (error) {
            return res.status(400).json({ errorMessage: error.message })
        }
    };
    deleteGoods = async (req, res, next) => {
        try {
            const { goodsId } = req.params
            console.log(goodsId)
            const deleteGoods = await this.goodsService.deleteGoods(goodsId);
            console.log('상품 삭제', deleteGoods)
            // if(deleteGoods === undefined){
            //     throw new Error('상품이 없습니다.')
            // }
            return res.status(201).json({ message: '삭제 성공했습니다.' });
        } catch (error) {
            if (error.message === '상품이 없습니다.') {
                return res.status(404).json({ message: error.message })
            }
            return res.status(404).json({ message: '예상치 못한 오류' })
        }
    }
    updateGoods = async (req, res, next) => {
        try{
            const { name, price, stock } = req.body
            const { goodsId } = req.params
            const updatedGoods = await this.goodsService.updateGoods(
                goodsId, name, price, stock
            );
            console.log('11123141441',updatedGoods)
            return res.status(203).json({data: updatedGoods})
        }catch(error){
            if(error.message === '이미 있는 이름 입니다.'){
                return res.status(400).json({errorMessage: error.message})
            }
            console.log(error)
            return res.status(404).json({ message: '예상치 못한 오류' })
        }
    }
}
module.exports = GoodsController