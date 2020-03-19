export default {
  items: [
    {
      title: true,
      name: 'Services',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Teachers',
      url: '/teachers',
      icon: 'icon-star'

    },
    {
      name: 'Subjects',
      url: '/subjects',
      icon: 'icon-star',
    },
    {
      name: 'Classes',
      url: '/classes',
      icon: 'icon-star'
    },
    {
      name: 'Reviews',
      url: '/teachers',
      icon: 'icon-star',
      children: [
        {
          name: 'List Reviews',
          url: '/review/list',
        },
        {
          name: 'Rate A Professor',
          url: '/teachers/review',
        }
      ],
    },
    {
      title: true,
      name: 'Systems',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Users',
      url: '/users',
      icon: 'icon-star',
    },

    {
      name: 'Admin',
      url: '/admin',
      icon: 'icon-star',
      children: [
        {
          name: 'Reports',
          url: '/reports',
        },
        {
          name: 'Add More Teachers',
          url: '/teachers/add',
        }
      ],
    },

  ],
};
