import { defineConfig } from 'vitepress'

// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
  title: 'Wins Note',
  description: 'Just playing around.',
  themeConfig: {
    sidebar: [
      {
        text: 'javascript',
        items: [
          {
            text: '不用for迴圈快速取得1到10數字的陣列',
            link: '/不用for迴圈快速取得1到10數字的陣列'
          },
          {
            text: 'Debounce',
            link: '/debounce'
          },
          {
            text: '避免滿滿的trycatch的寫法',
            link: '/避免滿滿的trycatch的寫法'
          },
        ]
      },
      {
        text: 'Go',
        items: [
          {
            text: 'GO指南筆記',
            link: 'go指南學習筆記'
          }
        ]
      }
    ],
    nav: [
      {
        text: '筆記',
        link: '/'
      },
      {
        text: '文章',
        link: '/getting-started'
      },
      {
        text: 'External',
        link: 'https://google.com'
      },
    ]
  }
})

