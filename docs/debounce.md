# Debounce
## 延遲的最簡略實現 (未考慮執行function可帶入參數)

```jsx
function debounce(fn, delay = 250) {
  let timer = null

  return () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn();
    }, delay)
  }
}

// 實際使用
function execute() {
  console.log('execute')
}
const button = document.getElementById('btn');
button.addEventListener('click', debounce(execute))
```

畫面

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/c9e4d434-f8fb-4389-85e4-d71d04e33e15/debounce.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230303%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230303T094235Z&X-Amz-Expires=86400&X-Amz-Signature=1553197707df3df730dfe11ced43b575a91dbb241bd1db022630dc3cf793d3f7&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22debounce.gif%22&x-id=GetObject)


### 以上範例缺點

- 如果execute有需要帶入參數就會取不到參數

如果是要處理event的函數，如下，就會取不到e

```jsx
const button = document.getElementById('btn');
button.addEventListener('click', debounce(handleClick))

function handleClick(e) {
  console.log(e) // e取不到值
}
```

## 正確實現 (考慮執行function帶入參數)

```jsx
function debounce(func, delay){
  // timeout 初始值
  let timeout = null;
  return function(){
    let context = this;  // 指向button
    let args = arguments;  // PointerEvent
    clearTimeout(timeout)

    timeout = setTimeout(function(){
      func.apply(context, args)
    }, delay)
  }

}
```

## 更簡約的實現

```jsx
function debounce(timeout, callback) {
  let timeoutID = 0;
  return (event) => {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => callback(event), timeout);
  };
}
```