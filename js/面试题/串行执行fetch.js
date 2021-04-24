// eslint-disable-next-line no-redeclare
function fetch (url) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      console.log(url, new Date().getSeconds())
      resolve("result: " + url);
    }, 1000)
  })
}

// let queue = [], running = false;
//
// function run() {
//   let task = queue.shift()
//   if (task) {
//     running = true
//     fetch(task).then(data => {
//       running = false
//       console.log(data)
//       run()
//     })
//   }
// }
// function fetchWrapper(task) {
//   queue.push(task)
//   if (running) return
//   run()
// }
//
// fetchWrapper("1")
// fetchWrapper("2")
// fetchWrapper("3")

let promise = Promise.resolve();
function fetchWrapper(url) {
  promise = promise.then(() => fetch(url));
  return promise;
}

fetchWrapper("1")
fetchWrapper("2")
fetchWrapper("3")
