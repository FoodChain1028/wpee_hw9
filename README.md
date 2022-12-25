# Web Programming HW#9
# Overview
> 整體來說我這次的作業是把助教的教學與 hw6 合併的結果。
> 
hw6 是一個可以計分的系統，可以輸入人名與科目並輸入成績進入資料庫裡面，並再由其他人由同樣的系統查詢或加入。
- deploy 在 railway 上的網址在[此](https://wpeehw9-production.up.railway.app/)
- 如果想參考我的 code 可看[此](https://github.com/FoodChain1028/wpee_hw9)
# How did I did?
因為我是直接參考助教的 code，所以大概會有 87% 長得跟助教一樣。
且有些步驟需要先參考上課內容，如 package.json 裡面的內容等。

## in ./backend/server.js
因為這是一個需要連接 db 的後端，其實不需要更改原本的 Router 內容，只需要多加下面這幾行即可，因為每次 railway deploy 出來的後端 server Port 不全然相同，因此會需要透過 path 來抓到新產生的 Port Number。
```javascript
app.use(express.static(path.join(__dirname, "../frontend", "build")));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
});
```

## in ./frontend/src
這邊會有兩個需要更動的地方。

### App.js 的問題
第一是 App.js 需要移動到 src 底下，如果放在 Containers 底下會遇到 docker 在 build 時 Module not find "./src/Container" 的問題。

### api.js
```javascript
import axios from 'axios';

const API_ROOT =  
  process.env.NODE_ENV === "production" 
    ? "/api"
    : "http://localhost:4001/api";

const api = axios.create({ baseURL: API_ROOT });

export default api;
```
其實也跟助教長得一模一樣哈哈。

# Railway deploy
這邊用的方法也是直接 import github repo，並在更新的時候重新 push 就行了。

# 使用方式
使用者可以在頁面加入成績
![](https://i.imgur.com/JiVQLUg.png)

在不同使用者頁面中查詢成績
![](https://i.imgur.com/4IPPZAa.png)
