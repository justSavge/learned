const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Tour = require('../../models/tourModel');
const processExitAsThrow = require('eslint-plugin-node/lib/rules/process-exit-as-throw');

dotenv.config({ path: '../../config.env' });
const dataBase = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD,
);
mongoose
  .connect(dataBase, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('work');
  });
const jsonData = JSON.parse(fs.readFileSync('./tours-simple.json', 'utf-8'));
const putData = async () => {
  try {
    await Tour.create(jsonData); //直接传入就行，这就是mongodb,:)
    console.log('导出成功');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};
const deData = async () => {
  try {
    await Tour.deleteMany(); //直接传入就行，这就是mongodb,:)
    console.log('删除成功');
    process.exit(); //停止进程。这是一个激进的函数，但我这里只是一个小脚本，无伤大雅
  } catch (error) {
    console.log(error);
  }
};
if (process.argv[2] === '--import') {
  putData();
} else if (process.argv[2] === '--delete') {
  deData();
}
console.log(process.argv);
