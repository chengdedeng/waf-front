module.exports = [
  {
    type: 'item',
    isHeader: true,
    name: 'MAIN NAVIGATION'
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
    icon: 'fa fa-dashboard',
    name: 'Security',
    items: [
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: 'Arg',
        router: {
          name: 'Arg'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: 'Cookie',
        router: {
          name: 'Cookie'
        }
      }
    ]
  }
]
