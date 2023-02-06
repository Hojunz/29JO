class GoodsRepository {
    constructor(goodsModel) {
        this.goodsModel = goodsModel;
    }
    findAllGoods = async () => {
        try {
            const goodses = await this.goodsModel.findAll({})
            return goodses
        } catch (error) {
            return error
        }
    };
    findById = async (id) => {
        try {
            const goods = await this.goodsModel.findOne({
                where: { id }
            });
            return goods;
        } catch (error) {
            return error;
        }
    };
    nameCheck = async (name) => {
        try {
            const goodsName = await this.goodsModel.findAll({
                where: {name}
            })
            if (goodsName.length > 0) {
                throw new Error('이미있는 이름')
            }
            return goodsName
        } catch (error) {
            throw error
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
    deleteGoods = async (goodsId) => {
        try {
            return await this.goodsModel.destroy({
                where: { id: goodsId }
            })
        } catch (error) {
            return error
        }
    }
    updateGoods = async (goodsId, name, price, stock) => {
        try {
            const [goodsid] = await this.goodsModel.findAll({
                where: { id: goodsId }
            });
            console.log('DB 이름', goodsid.name);
            console.log('입력 이름', name);
            if (goodsid.name !== name) {
                const updatedGoods = await this.goodsModel.update(
                    { name, price, stock },
                    { where: { id: goodsId } }
                );
                console.log('update 내용', updatedGoods, typeof updatedGoods, )
                return updatedGoods
            }
            throw new Error('이미 있는 이름 입니다.')
        } catch (error) {
            throw error
        }
    }
}

module.exports = GoodsRepository 