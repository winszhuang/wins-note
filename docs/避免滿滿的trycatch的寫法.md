# 避免滿滿的trycatch的寫法

Tags: better-code, js

```jsx
checkbox.addEventListener('click', (event) => {
  handleCheckboxClick(event).catch(console.error)
})

async function handleCheckboxClick(event) {
  let checkbox = event.target
  let tld = checkbox.name
  let enabled = checkbox.checked

  let { enabledTlds = Object.keys(tldLocales) } = await chrome.storage.sync.get('enabledTlds');
  let tldSet = new Set(enabledTlds)
  
  if (enabled) tldSet.add(tld)
  else tldSet.delete(tld)
  
  await chrome.storage.sync.set({ enabledTlds: [...tldSet] })
}
```