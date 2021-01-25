const http = require('http');
const domain = require('domain');

// try..catch..，只能用于同步执行的代码,异常会沿着代码执行路径一直冒泡，直到遇到第一个try语句时被捕获住
// 但由于异步函数会打断代码执行路径，异步函数执行过程中以及执行之后产生的异常冒泡到执行路径被打断的位置时，
// 如果一直没有遇到try语句，就作为一个全局异常抛出
function asyncA(fn, callback) {
  // Code execution path breaks here.
  setTimeout(function ()　{
    callback(fn()); // fu为null，但错误不回被下面的try catch捕获
  }, 0);
}

try {
  asyncA(null, function (data) {
    // Do something.
  });
} catch (err) {
  console.log('Error: %s', err.message);
}

// 需要在异常冒泡到断点之前用try语句把异常捕获住，并通过回调函数传递被捕获的异常
function asyncB(fn, callback) {
  // Code execution path breaks here.
  setTimeout(function ()　{
    try {
      callback(null, fn());
    } catch (err) {
      callback(err);
    }
  }, 0);
}

asyncB(null, function (err, data) {
  if (err) {
    console.log('Error: %s', err.message);  // Error: object is not a function
  } else {
    // Do something.
  }
});

// 域（Domain）: js运行环境
// 一个异常没有被捕获，将作为一个全局异常被抛出。NodeJS通过process对象提供了捕获全局异常的方法
// process.on('uncaughtException', function (err) {
//   console.log('Error: %s', err.message);
// });

// 有些异常希望尽早捕获，根据回调抛出error，会写成这样的形式
function asyncC(request, callback) {
  // Do something.
  asyncA(request, function (err, data) {
    if (err) {
      callback(err);
    } else {
      // Do something
      asyncB(request, function (err, data) {
        if (err) {
          callback(err);
        } else {
          // Do something
          asyncC(request, function (err, data) {
            if (err) {
              callback(err);
            } else {
              // Do something
              callback(null, data);
            }
          });
        }
      });
    }
  });
}

http.createServer(function (request, response) {
  async(request, function (err, data) {
    if (err) {
      response.writeHead(500);
      response.end();
    } else {
      response.writeHead(200);
      response.end(data);
    }
  });
});



function asyncD(request, callback) {
  // Do something.
  asyncA(request, function (data) {
    // Do something
    asyncB(request, function (data) {
      // Do something
      asyncC(request, function (data) {
        // Do something
        callback(data);
      });
    });
  });
}

// domain模块创建一个子域（JS子运行环境）。在子域内运行的代码可以随意抛出异常，
// 而这些异常可以通过子域对象的error事件统一捕获
http.createServer(function (request, response) {
  let d = domain.create();

  d.on('error', function () {
    response.writeHead(500);
    response.end();
  });

  d.run(function () {
    asyncA(request, function (data) {
      response.writeHead(200);
      response.end(data);
    });
  });
});

// NodeJS里大量的API内部是用C/C++实现的，因此NodeJS程序的运行过程中，
// 代码执行路径穿梭于JS引擎内部和外部，而JS的异常抛出机制可能会打断正常的代码执行流程，
// 导致C/C++部分的代码表现异常，进而导致内存泄漏等问题
