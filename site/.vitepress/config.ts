import {

import { getSidebar } from './sidebar'

// https://vitepress.dev/reference/site-config
    cleanUrls: true,
    description: 'Reactivity for Ethereum apps',
    head: [
      [
        'meta',
        {
          name: 'keywords',
        },
      ],
      ['link', { rel: 'icon', href: '/favicon.svg' }],
      ['meta', { name: 'theme-color', content: '#646cff' }],
      // Open Graph
      ['meta', { property: 'og:type', content: 'website' }],
      ['meta', { property: 'og:image', content: 'https://wagmi.sh/og.png' }],
      ['meta', { property: 'og:url', content: 'https://wagmi.sh' }],
      // Twitter
      ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
      ['meta', { name: 'twitter:creator', content: '@wevm_dev' }],
      ['meta', { name: 'twitter:image', content: 'https://wagmi.sh/og.png' }],
      ['meta', { name: 'twitter:site', content: 'wagmi.sh' }],
      // Fathom
      [
        'script',
        {
          src: 'https://cdn.usefathom.com/script.js',
          'data-site': 'QWAXSUPT',
          defer: '',
        },
      ],
    ],
    ignoreDeadLinks: false,
    lang: 'en-US',
    lastUpdated: true,
    markdown: {
      },
      theme: {
        light: 'vitesse-light',
        dark: 'vitesse-dark',
      },
    },
    themeConfig: {
      editLink: {
        pattern: 'https://github.com/wevm/wagmi/edit/main/site/:path',
        text: 'Suggest changes to this page',
      },
      footer: {
        message:
          'Released under the <a href="https://github.com/wevm/wagmi/blob/main/LICENSE">MIT License</a>.',
        copyright: 'Copyright © 2022-present Weth, LLC',
      },
      logo: {
        light: '/logo-light.svg',
        dark: '/logo-dark.svg',
        alt: 'wagmi logo',
      },
      nav: [
        { text: 'React', link: '/react/getting-started' },
        { text: 'Vue', link: '/vue/getting-started' },
        { text: 'CLI', link: '/cli/getting-started' },
        // { text: 'Examples', link: '/examples/connect-wallet' },
        {
          text: 'More',
          items: [
            {
              text: 'Discussions ',
              link: 'https://github.com/wevm/wagmi/discussions',
            },
            {
              text: 'Release Notes ',
              link: 'https://github.com/wevm/wagmi/releases',
            },
            {
              text: 'Contributing ',
              link: '/dev/contributing',
            },
          ],
        },
      ],
      outline: [2, 3],
      search: {
        provider: 'local',
        options: {
          _render(src, env, md) {
            const html = md.render(src, env)
            if (env.frontmatter?.search === false) return ''
            if (env.relativePath.startsWith('shared')) return ''
            return html
          },
        },
      },
      sidebar: getSidebar(),
      siteTitle: false,
      socialLinks: [
        { icon: 'x', link: 'https://twitter.com/wevm_dev' },
        { icon: 'discord', link: 'https://discord.gg/9zHPXuBpqy' },
      ],
    },
    title: 'Wagmi',
    vite: {
      plugins: [
      ],
    },
