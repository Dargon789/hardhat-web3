import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client'
import DefaultTheme from 'vitepress/theme'
// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'

import '@shikijs/vitepress-twoslash/style.css'
import './style.css'

import AsideSponsors from './components/AsideSponsors.vue'
// import Banner from './components/Banner.vue'
import HomeBanner from './components/HomeBanner.vue'
import HomePage from './components/HomePage.vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'aside-ads-before': () => h(AsideSponsors),
      // 'doc-before': () => h(Banner),
      'home-features-after': () => h(HomePage),
      'home-hero-before': () => h(HomeBanner),
    })
  },
    app.use(TwoslashFloatingVue)
  },
} satisfies Theme
