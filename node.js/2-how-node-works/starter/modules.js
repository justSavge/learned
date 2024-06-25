console.log(arguments); //arguments是一个内置参数，显示函数的所有参数。
///导入方法有
//module.exports = xx;会直接等于导出，也就是说只导出这么一个东西
//exports.xx = .. 就这么导出
//但是这样（上一行），可以使用解构在index.js(例子)，es6的新东西，{aa,bb,cc} = require('./xx'),将xx其中的aa...都按名字导出
