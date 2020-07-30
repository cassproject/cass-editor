// .vuepress/config.js
module.exports = {
    themeConfig: {
      nav: [
        { text: 'Home', link: '/' },
        { text: 'Guide', link: '/guide/' },
        { text: 'Competency Configuration', link: '/competency-configuration/' }
      ],
      displayAllHeaders: true, // Default: false
      activeHeaderLinks: true, // Default: true
      sidebar: [
        '/',
        '/guide/',
        '/installation/',
        '/competency-configuration/',
        '/users-and-groups/'
      ]
    }
  }
