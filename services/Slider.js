const SliderModel = require('../db/models/slider');

class SliderService {
    async addSliderData(data) {
        // return await SliderModel.create(data);

        const cid = data.cid;

        //找到已有  就更新
        const result = await SliderModel.findOne({
            where: { cid },
        });

        if (result) {
            return await SliderModel.update(data, {
                where: { cid },
            });
        } else {
            return await SliderModel.create(data);
        }
    }

    async getSliderData() {
        return await SliderModel.findAll({
            attributes: {
                exclude: ['imgUrl'],
            },
        });
    }

    async changeSliderStatus(id, status) {
        const ret = await SliderModel.update(
            { status },
            {
                where: { id },
            }
        );

        return ret[0];
    }
}

module.exports = new SliderService();
