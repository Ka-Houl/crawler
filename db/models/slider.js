const Sequelize = require('sequelize');
const seq = require('../connection/mysql_connect');
const { STRING, INT } = require('../../config/db_type_config');

// const Slider = seq.define('slider',{
//     // 这些是表的字段
//     cid: {
//         comment: 'course ID'
//     }
// })   //定义一张叫slider的表   变成复数sliders

// })
//定义一张叫slider的表   变成复数sliders

const Slider = seq.define('slider', {
    // 这些是表的字段

    cid: {
        comment: 'course ID',
        type: INT,
        allowNull: false, //是否允许空
        unique: true, //是否唯一
    },
    href: {
        comment: 'course detail page link',
        type: STRING,
        allowNull: false, //是否允许空
    },
    imgUrl: {
        comment: 'course image url',
        type: STRING,
        allowNull: false,
    },
    title: {
        comment: 'course name',
        type: STRING,
        allowNull: false,
    },
    imgKey: {
        comment: 'qiniu image name',
        type: STRING,
        allowNull: false,
    },
    status: {
        comment: 'slider status',
        type: INT,
        defaultValue: 1,
        allowNull: false,
    },
});

module.exports = Slider;
