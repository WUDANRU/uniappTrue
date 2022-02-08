
// function debounce (fn, time) {
// 	console.log(time,'time')
// 	  let timer = null;
//   return function (args) {
// 	  	console.log(args,'args')
//    if (timer) { // 每次进来先结束计时
//      clearTimeout(timer);
//    } 
//    timer = setTimeout(() => {
//      fn.apply(null, args);
//    }, time)
//    }
//    }

// export default debounce

export const debounce = (fn, t) => {
  let delay = t || 500
  let timer
  return function () {
	   let args = arguments
	console.log(args,'args')
	console.log('1')
    if(timer){
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      timer = null
      fn.apply(this, args)
	  console.log('2')
    }, delay)
  }
};


export const throttle = (fn, t) => {
  let last
  let timer
  let interval = t || 500
  return function () {
    let args = arguments
    let now = new Date()
    if (last && now - last < interval) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        last = now
        fn.apply(this, args)
      }, interval)
    } else {
      last = now
      fn.apply(this, args)
    }
  }
}
