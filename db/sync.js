const seq = require('./connection/mysql_connect');

require('./models')

seq.authenticate().then(() => {
	console.log('MySQL server is connected completely.');
}).catch ((error) => {
	console.log('MySQL server is failed to be connected. Error information is below: ' + error);
});

seq.sync({
	//强制同步
	force: true
}).then(() => {
	console.log('The table has been synchronised into database successfully');
	process.exit();   //关闭同步进程
});


// 执行node db/sync.js 就可以新建表了