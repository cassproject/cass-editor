// .vuepress/config.js
module.exports = {
    base: '/docs/',
    dest: 'public/docs',
    head: [ ['script', {}, `
        window.onload = function() {
            var container = document.getElementsByClassName('theme-container');
            if(window.location.href.includes('credential')) {
                container[0].classList.add('credential-editor');
            } else {
                container[0].classList.add('cass-editor')
            }
        }; 
    `]],
    themeConfig: {
      logo: '/cass-logo.png',
      nav: [
        { text: 'Home', link: '/' },
        { text: 'Guide', link: '/guide/' }
      ],
      displayAllHeaders: true, // Default: false
      activeHeaderLinks: true, // Default: true
      sidebar: [
        {
            title: 'Getting Started',
            collapsable: true, // optional, defaults to true
            path: '/getting-started/'
        },
        {
            title: 'Organizations, Groups, Teams',
            collapsable: true, // optional, defaults to true
            children: [
                '/organizations-and-groups/',
                '/users-and-groups/'
            ]
        },
        {
            title: 'Configuring Competencies & Frameworks',   // required
            collapsable: true, // optional, defaults to true
            sidebarDepth: 1,    // optional, defaults to 1
            children: [
                '/configuration/',
                '/competency-properties/',
                '/framework-properties/',
                '/default-users/'
            ]
        },
        {
            title: 'Managing Competency Frameworks',   // required
            collapsable: true, // optional, defaults to true
            sidebarDepth: 1,    // optional, defaults to 1
            children: [
                '/competency-and-framework-management/',
                '/importing-framework/',
                '/crosswalk-tool/',
                '/exporting-framework/'
            ]
        },
        {
            title: 'Managing Taxonomies',   // required
            collapsable: true, // optional, defaults to true
            path: '/taxonomies/',
            sidebarDepth: 1  // optional, defaults to 1
        },
        {
            title: 'Installation',
            collapsable: true, // optional, defaults to true
            path: '/installation/'
        }
        
      ]
    }
  }
