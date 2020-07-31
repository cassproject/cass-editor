// .vuepress/config.js
module.exports = {
    base: '/docs/',
    dest: 'public/docs',
    themeConfig: {
      nav: [
        { text: 'Home', link: '/' },
        { text: 'Guide', link: '/guide/' },
        { text: 'Configuration', link: '/configuration/' }
      ],
      displayAllHeaders: true, // Default: false
      activeHeaderLinks: true, // Default: true
      sidebar: [
        {
            title: 'Getting Started',
            collapsable: true, // optional, defaults to true
            children: [
                '/installation/'
            ]
        },
        {
          title: 'Authoring Configuration',   // required
          path: '/configuration/',      // optional, link of the title, which should be an absolute path and must exist
          collapsable: true, // optional, defaults to true
          sidebarDepth: 1,    // optional, defaults to 1
          children: [
            '/competency-properties/',
            '/framework-properties/',
            '/default-users/'
          ]
        },
        {
          title: 'Users and groups',   // required
          path: '/users-and-groups/',      // optional, link of the title, which should be an absolute path and must exist
          collapsable: true, // optional, defaults to true
          sidebarDepth: 1,    // optional, defaults to 1
          children: [
            '/users-and-groups/'
          ]
        }
      ]
    }
  }
