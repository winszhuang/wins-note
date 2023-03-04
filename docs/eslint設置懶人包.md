# eslint airbnb設置

Tags: airbnb, eslint

1. yarn add eslint -D
2. 執行npx eslint --init
3. 會開始問你一堆問題
    
    > 注意 !! config檔案選擇javascript類型，會生成.eslintrc.js
    > 
    
    ![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/73accf44-b5a9-4026-823d-8e484218db50/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230304T031313Z&X-Amz-Expires=86400&X-Amz-Signature=f05d79e57085f5b9cef93cb738d08449439c9757f73bc4ec277814704c65c3a6&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject)
    
4. vscode 擴充記得安裝ESLint
5. Ctrl + Shift + P 輸入setting，點擊以下
    
    ![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/b179c064-ca0e-4d21-8302-40d8eebdc3ac/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230304T031344Z&X-Amz-Expires=86400&X-Amz-Signature=48882b36d6bb44244cb3e30b4332bd9a3269c4cb7ddc466610d0e22d5f22bd13&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject)
    
    進入setting.json檔案之後，找到editor.codeActionsOnSave(沒有就自己加)，加上如下東西之後就可以在檔案保存之後自動排版
    
    ```jsx
    // 儲存的時候自動觸發 eslint
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true,
      // stylelint 自動修復太吃效能，所以不啟用這個
      // "source.fixAll.stylelint": true
    },
    ```
    
6.  最終的.eslintrc.js大概會像以下
    
    ```jsx
    module.exports = {
      env: {
        browser: true,
        commonjs: true,
        es2021: true,
      },
      extends: [
        'airbnb-base',
      ],
      parserOptions: {
        ecmaVersion: 'latest',
      },
      rules: {
        'linebreak-style': 0,  // 這個用來擋掉說一定要LF換行，阿我windows就是CRLF阿
      },
    };
    ```  

補充 : disabled某些規則

> eslint設定0、1、2的意思如下
> 
> 
> ![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/245bcade-1686-4b4e-9ee9-294c43041683/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230304T031459Z&X-Amz-Expires=86400&X-Amz-Signature=593b37ee71c338698549ee83202305927efba95f415d38cda8853e8ce3a1bb9f&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject)
>