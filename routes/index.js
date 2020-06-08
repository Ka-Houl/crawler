const router = require('koa-router')()
const pt = require('puppeteer');

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

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
          };

          data.push(dataItem);
      });
      return data;
  });
  console.log('result-----------', result);
  await bs.close();
});
module.exports = router
