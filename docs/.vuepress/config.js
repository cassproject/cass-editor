// https://vuepress.vuejs.org/config/#base

const {description} = require('../../package')

module.exports = {
    title: "CaSS Docs",
    description: description,
    base: "/cass-editor/docs/",
    dest: 'public/docs',

    // Extra tags to be injected to the page HTML `<head>`
    head: [
        ['meta', {name: 'theme-color', content: '#3eaf7c'}],
        ['meta', {name: 'apple-mobile-web-app-capable', content: 'yes'}],
        ['meta', {name: 'apple-mobile-web-app-status-bar-style', content: 'black'}],
        ['script', {}, `
            window.onload = function() {
                var container = document.getElementsByClassName('theme-container');
                if(window.location.href.includes('credential')) {
                    container[0].classList.add('credential-editor');
                } else {
                    container[0].classList.add('cass-editor')
                }
            };
        `]
    ],

    // Theme configuration, here is the default theme configuration for VuePress.
    themeConfig: {
        logo: '/cass-logo.png',
        nav: [
            {text: 'Home', link: '/'},
            {text: 'Getting Started', link: '/guide/introduction/'}
        ],
        displayAllHeaders: true,
        activeHeaderLinks: true,
        sidebar: [
            {
                title: "High-Level Guide",
                collapsable: false,
                children: [
                    // Getting Started
                    {
                        title: "Getting Started",
                        collapsable: true,
                        children: [
                            "guide/introduction/",
                            "guide/overview/",
                        ]
                    },

                    // Interoperability
                    "guide/interoperability/",
                    // {
                    //     title: "Interoperability",
                    //     collapsable: true,
                    //     children: [
                    //         "guide/interoperability/"
                    //     ]
                    // },

                    // Assertion Processing
                    "guide/assertion-processing/",
                    // {
                    //     title: "Assertion Processing",
                    //     collapsable: true,
                    //     children: [
                    //         "guide/assertion-processing/",
                    //     ]
                    // },
                ]
            },

            // Authoring Tool
            {
                title: "Authoring Tool",
                collapsable: true,
                children: [
                    // "authoring/importing-a-framework/"

                    {
                        title: 'Getting Started',
                        collapsable: true,
                        path: '/authoring/getting-started/'
                    },
                    {
                        title: 'Organizations, Groups, Teams',
                        collapsable: true,
                        children: [
                            '/authoring/organizations-and-groups/',
                            '/authoring/users-and-groups/'
                        ]
                    },
                    {
                        title: 'Configuring Competencies & Frameworks',
                        collapsable: true,
                        sidebarDepth: 1,
                        children: [
                            '/authoring/configuration/',
                            '/authoring/competency-properties/',
                            '/authoring/framework-properties/',
                            '/authoring/default-users/'
                        ]
                    },
                    {
                        title: 'Managing Competency Frameworks',
                        collapsable: true,
                        sidebarDepth: 1,
                        children: [
                            '/authoring/competency-and-framework-management/',
                            '/authoring/importing-framework/',
                            '/authoring/crosswalk-tool/',
                            '/authoring/exporting-framework/'
                        ]
                    },
                    {
                        title: 'Managing Directories',
                        collapsable: true,
                        sidebarDepth: 1,
                        children: [
                            '/authoring/directory-management/',
                            '/authoring/directory-sharing/'
                        ]
                    },
                    {
                        title: 'Managing Taxonomies',
                        collapsable: true,
                        path: '/authoring/taxonomies/',
                        sidebarDepth: 1
                    },
                    {
                        title: 'Managing Assertions',
                        collapsable: true,
                        sidebarDepth: 1,
                        children: [
                            '/authoring/assertions/managing-assertions/',
                            '/authoring/assertions/sharing-assertions/',
                            '/authoring/assertions/assertion-timeline/'
                        ]
                    }
                ]
            },

            // Developer's Guide
            {
                title: "Developer's Guide",
                collapsable: true,
                children: [
                    {
                        title: "Getting Started",
                        collapsable: true,
                        children: [
                            // Overview
                            "dev/overview/",
                            // CaSS Installation
                            "dev/cass-installation/",
                            // CaSS Configuration
                            "dev/cass-configuration/",
                            // CaSS Library - Hello World
                            {
                                title: "CaSS Library Intro - Hello World!",
                                collapsable: true,
                                children: [
                                    "dev/cass-library-hello-world/",
                                    "dev/cass-library-hello-world/javascript/",
                                    "dev/cass-library-hello-world/node-js/",
                                    "dev/cass-library-hello-world/java/",
                                    "dev/cass-library-hello-world/csharp/",
                                    "dev/cass-library-hello-world/php/",
                                ]
                            },
                        ]
                    },
                    // CaSS Fundamentals
                    {
                        title: "CaSS Fundamentals",
                        collapsable: true,
                        children: [
                            // CaSS Objects
                            {
                                title: "CaSS Objects",
                                collapsable: true,
                                children: [
                                    "dev/fundamentals/cass-objects/",
                                    "dev/fundamentals/cass-objects/framework/",
                                    "dev/fundamentals/cass-objects/competency/",
                                    "dev/fundamentals/cass-objects/assertion/",
                                    "dev/fundamentals/cass-objects/relation/",
                                    "dev/fundamentals/cass-objects/level/",
                                    // This wasn't originally implemented, but linked
                                    // "dev/fundamentals/cass-objects/rollup-rule/",
                                ]
                            },

                            // CaSS Repo API
                            {
                                title: "CaSS Repo API",
                                collapsable: true,
                                children: [
                                    "dev/fundamentals/cass-repo-api/",
                                    "dev/fundamentals/cass-repo-api/get/",
                                    "dev/fundamentals/cass-repo-api/search/",
                                    "dev/fundamentals/cass-repo-api/create/",
                                    "dev/fundamentals/cass-repo-api/delete/",
                                ]
                            },

                            // These 4 are migrated from the original 'Basics' section
                            // Identities and Login
                            "dev/fundamentals/identities-and-login/",
                            // Contacts
                            // "dev/fundamentals/contacts/", TODO Should this be included?
                            // Repositories
                            "dev/fundamentals/repositories/",
                            // Search
                            "dev/fundamentals/search/",

                            // These 4 are migrated from the original 'Advanced' section
                            "dev/fundamentals/urls-and-linked-data/",
                            "dev/fundamentals/http-and-protocols/",
                            "dev/fundamentals/json-ld-and-rdf-formats/",
                            "dev/fundamentals/deployment/",

                            // Assertion Processing
                            "dev/fundamentals/assertion-processing/",
                        ]
                    },

                    // Tutorials
                    {
                        title: "Tutorials",
                        collapsable: true,
                        children: [
                            "dev/tutorials/",
                            "dev/tutorials/import-csv/",
                            "dev/tutorials/align-assessments-to-competencies/",
                            "dev/tutorials/align-resources-to-competencies/"
                        ]
                    },

                    // Design Principles
                    "dev/design-principles/",
                    // Performance
                    "dev/performance/",

                    // Extending CaSS
                    {
                        title: "Extending CaSS",
                        collapsable: true,
                        children: [
                            "dev/extending-cass/",
                            "dev/extending-cass/working-with-other-schemas/",

                            // Adapters
                            {
                                title: "Adapters",
                                collapsable: true,
                                children: [
                                    "dev/extending-cass/adapters/",
                                    "dev/extending-cass/adapters/xapi/",
                                    "dev/extending-cass/adapters/asn/",
                                    "dev/extending-cass/adapters/ims-case/",
                                    "dev/extending-cass/adapters/ceasn/",
                                    "dev/extending-cass/adapters/moodle/",
                                    "dev/extending-cass/adapters/ims-open-badge/",
                                ]
                            },
                        ]
                    },

                    // Security
                    {
                        title: "Security",
                        collapsable: true,
                        children: [
                            "dev/security/kbac-specification/",
                            "dev/security/kbac-threat-model/"
                        ]
                    },

                    // Links & References
                    "dev/links-and-references/",
                    // Contributing
                    "dev/contributing/",
                ]
            }
        ]
    }
}
