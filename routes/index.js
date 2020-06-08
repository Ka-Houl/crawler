const router = require('koa-router')();
const pt = require('puppeteer');

const nanoId = require('nanoid').nanoid;
const Qiniu = require('qiniu');
const qiniu = Qiniu;
// import qiniuconfig from './../config/config.js'
const qiniuconfig = require('./../config/config.js');
// console.log('qiniuconfig',qiniuconfig)
console.log('nanoId',nanoId)
router.get('/', async (ctx, next) => {
    await ctx.render('index', {
        title: 'Hello Koa 2!',
    });
});

router.get('/string', async (ctx, next) => {
    ctx.body = 'koa2 string';
});

router.get('/json', async (ctx, next) => {
    ctx.body = {
        title: 'koa2 json',
    };
});

router.get('/kkk', async (ctx, next) => {
    console.log(11111111);

    const bs = await pt.launch(),
        url = 'https://msiwei.ke.qq.com/?tuin=304a784b#tab=0&category=-1',
        pg = await bs.newPage();
    await pg.goto(url, {
        timeout: 30 * 1000,
        waitUntil: 'networkidle2',
        waitUtil: 'networkidle2',
    });

    const result = await pg.evaluate(() => {
        const $ = window.$;
        const $item = $('.agency-big-banner-ul .agency-big-banner-li');
        let data = [];
        $item.each((index, item) => {
            const $el = $(item),
                $elLink = $el.find('.js-banner-btnqq');
            const dataItem = {
                cid: $elLink.attr('data-id'),
                href: $elLink.prop('href'),
                imgUrl: $elLink.find('img').prop('src'),
                title: $elLink.prop('title'),
                imgKey: '',
            };

            data.push(dataItem);
        });
        return data;
    });
    console.log('result-----------', result);

    if (result && result.length) {
        result.map(async item => {
            if (item.imgUrl && !item.img_key) {
                const qiniu = qiniuconfig.qiniu;
                try {
                    const imgData = await qiniuUpload({
                        url: item['imgUrl'],
                        bucket: qiniu.bucket.tximg.bucket_name,
                        ak: qiniu.keys.ak,
                        sk: qiniu.keys.sk,
                        ext: '.jpg',
                    });

                    if (imgData.key) {
                        item.imgKey = imgData.key;
                    }
                } catch (err) {
                  console.log('err',err)
                }
            }
        });
    }
    await bs.close();
});
module.exports = router;

// 参考文档   https://developer.qiniu.com/kodo/sdk/1289/nodejs#5
const qiniuUpload = option => {
    var mac = new qiniu.auth.digest.Mac(option.ak, option.sk);
    var config = new qiniu.conf.Config();

    var bucketManager = new qiniu.rs.BucketManager(mac, config);

    var key = nanoId() + option.ext;
    return new Promise((resolve, reject) => {
        bucketManager.fetch(option.url, option.bucket, key, function(err, respBody, respInfo) {
            if (err) {
                reject(err);
            } else {
                if (respInfo.statusCode == 200) {
                    console.log(respBody.key);
                    console.log(respBody.hash);
                    console.log(respBody.fsize);
                    console.log(respBody.mimeType);
                    resolve({ key });
                } else {
                    console.log(respInfo.statusCode);
                    console.log(respBody);
                    reject(respInfo);
                }
            }
        });
    });
};
