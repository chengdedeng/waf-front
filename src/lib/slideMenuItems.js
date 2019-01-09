module.exports = [
  {
    type: 'item',
    isHeader: true,
    name: 'MAIN NAVIGATION'
  },
  {
    type: 'tree',
    icon: 'fa fa-dashboard',
    name: 'Dashboard',
    items: [
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: 'Dashboard v2',
        router: {
          name: 'DashboardV2'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: 'InfoBox',
        router: {
          name: 'InfoBoxExample'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: 'Chart.js',
        router: {
          name: 'ChartExample'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: 'Alert',
        router: {
          name: 'AlertExample'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: 'Modal',
        router: {
          name: 'ModalExample'
        }
      }
    ]
  },
  {
    type: 'tree',
    icon: 'fa fa-edit',
    name: 'Settings',
    items: [
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: 'Args',
        router: {
          name: 'ArgsSettings'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: 'Cookis',
        router: {
          name: 'CookiesSettings'
        }
      }
    ]
  },
  {
    type: 'item',
    icon: 'fa fa-th',
    name: 'Upstream',
    badge: {
      type: 'String',
      data: 'new'
    },
    router: {
      name: 'Upstream'
    }
  },
  {
    type: 'tree',
    icon: 'fa fa-laptop',
    name: 'UI Elements',
    items: [
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: 'General',
        router: {
          name: 'General'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: 'Icons',
        router: {
          name: 'Icons'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: 'Buttons',
        router: {
          name: 'Buttons'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: 'Sliders',
        router: {
          name: 'Sliders'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: 'Timeline',
        router: {
          name: 'Timeline'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: 'Modals',
        router: {
          name: 'Modals'
        }
      }
    ]
  }
]
