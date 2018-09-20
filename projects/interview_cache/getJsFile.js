// // 现提供几个读取文件的方法，不借助全局变量实现一个函数，函数可以执行一次后返回一个目录下所有文件中是 .js 后缀的文件列表 var
// readdirSync = function(dir_path){ return [filename] } //
// 读取一个文件夹下的所有文件夹和文件的路径列表（Array） var isDirectory = function(path) { return
// true/false; } // 判断一个路径是否是文件夹 var existsSync = function(path){ return
// true/false;} // 判断一个文件/文件夹是否存在 var getJSFiles = function(path) { }
// getJSFiles('/code/'); // return 一个文件列表的数组

const fs = require('fs');
const path = require('path');

var getJSFiles = function (dirPath) {

  var result = [];
  dirPath = path.resolve(__dirname, dirPath);
  if (fs.existsSync(dirPath)) {
    if (fs.statSync(dirPath).isDirectory()) {
      var files = fs.readdirSync(dirPath);
      files.forEach((file) => {
        result = result.concat(getJSFiles(path.resolve(dirPath, file)));
      });
    } else if (/\.js$/.test(dirPath)) {
      result.push(dirPath);
    }
  }
  return result;
};

const list = getJSFiles('../../docs/').map(item => item.replace(new RegExp(__dirname, 'g'), ''));

console.log('list -> ', list);