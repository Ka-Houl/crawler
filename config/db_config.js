module.exports = {
    mysql: {
        base: {
            host: 'localhost',
            dialect: 'mysql',
            pool: {
                max: 5,
                min: 0,
                idle: 1000,
            },
        },
        // 数据库名称  帐号  密码
        conf: ['txclass', 'root', '12345678'],
    },
};
