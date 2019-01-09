import Vue from 'vue'
import Router from 'vue-router'
// UI Element Groups
import Index from 'Index.vue'
import Login from 'Login.vue'
import DashboardV2 from 'examples/Dashboard.v2.vue'
import InfoBoxExample from 'examples/InfoBoxExample'
import ChartExample from 'examples/ChartExample'
import AlertExample from 'examples/AlertExample'
import ModalExample from 'examples/ModalExample'
import WidgetsExample from 'examples/WidgetsExample'
import APIExample from 'examples/APIExample'

// UI Element Groups
import General from 'pages/ui-elements/General.vue'
import Icons from 'pages/ui-elements/Icons.vue'
import Buttons from 'pages/ui-elements/Buttons.vue'
import Sliders from 'pages/ui-elements/Sliders.vue'
import Timeline from 'pages/ui-elements/Timeline.vue'
import Modals from 'pages/ui-elements/Modals.vue'
import ArgsSettings from 'ArgsSettings.vue'
import CookiesSettings from 'CookiesSettings.vue'
import Upstream from 'Upstream.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Index,
      children: [
        {path: '', component: ChartExample},
        {
          path: 'dashboard/v2',
          name: 'DashboardV2',
          component: DashboardV2
        },
        {
          path: 'examples/infobox',
          name: 'InfoBoxExample',
          component: InfoBoxExample
        },
        {
          path: 'examples/chart',
          name: 'ChartExample',
          component: ChartExample
        },
        {
          path: 'examples/alert',
          name: 'AlertExample',
          component: AlertExample
        },
        {
          path: 'examples/modal',
          name: 'ModalExample',
          component: ModalExample
        },
        {
          path: 'examples/widgets',
          name: 'WidgetsExample',
          component: WidgetsExample
        },
        {
          path: 'examples/api-example',
          name: 'APIExample',
          component: APIExample
        },
        {
          path: 'ui-elements/general',
          name: 'General',
          component: General
        },
        {
          path: 'ui-elements/icons',
          name: 'Icons',
          component: Icons
        },
        {
          path: 'ui-elements/buttons',
          name: 'Buttons',
          component: Buttons
        },
        {
          path: 'ui-elements/sliders',
          name: 'Sliders',
          component: Sliders
        },
        {
          path: 'ui-elements/timeline',
          name: 'Timeline',
          component: Timeline
        },
        {
          path: 'ui-elements/modals',
          name: 'Modals',
          component: Modals
        },
        {
          path: 'ui-argsSettings',
          name: 'ArgsSettings',
          component: ArgsSettings
        },
        {
          path: 'ui-cookiesSettings',
          name: 'CookiesSettings',
          component: CookiesSettings
        },
        {
          path: 'config/upstream',
          name: 'Upstream',
          component: Upstream
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ],
  linkActiveClass: 'active'
})
