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
        // ZqF73GZtLrdxyFnB
        conf: ['txclass', 'root', '12345678'],
    },
};
