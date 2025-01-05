export const NotificationList = [
  {
    id: 1,
    profileImage:
      'https://images.unsplash.com/photo-1599110364868-364162848518?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHVzZXJzfGVufDB8fDB8fHww',
    name: 'John Doe Followed you',
    timeAgo: 5,
    followedYou: true,
  },
  {
    id: 2,
    profileImage:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHVzZXJzfGVufDB8fDB8fHww',
    name: 'Jane Smith Liked your post',
    timeAgo: 10,
    followedYou: false,
  },
  {
    id: 3,
    profileImage:
      'https://images.unsplash.com/photo-1702482527875-e16d07f0d91b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fHVzZXJzfGVufDB8fDB8fHww',
    name: 'Mark Johnson Followed you',
    timeAgo: 20,
    followedYou: true,
  },
  {
    id: 4,
    profileImage:
      'https://images.unsplash.com/photo-1672863601285-253fc82db868?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fHVzZXJzfGVufDB8fDB8fHww',
    name: 'Emily Davis Liked your post',
    timeAgo: 25,
    followedYou: false,
  },
  {
    id: 5,
    profileImage:
      'https://images.unsplash.com/photo-1599110364739-9c2bfa6981c8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE1fHx1c2Vyc3xlbnwwfHwwfHx8MA%3D%3D',
    name: 'Chris Brown Followed you',
    timeAgo: 30,
    followedYou: true,
  },
];

export const latestUpdate: IPost[] = [
  {
    id: 1,
    user: 'Jane Doe',
    images: [
      'https://images.unsplash.com/photo-1647685658173-94c4f42725fd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fHww',
      'https://plus.unsplash.com/premium_photo-1683880731561-f0cceb0ad405?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8',
      'https://images.unsplash.com/photo-1712002641088-9d76f9080889?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHVzZXJzfGVufDB8fDB8fHww',
    ],
    profileImage:
      'https://images.unsplash.com/photo-1599110364868-364162848518?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHVzZXJzfGVufDB8fDB8fHww',
    likesCount: 500,
    commentsCount: 200,
    description:
      'This has one of the best cover ever. A place away from home. I could always go back again.',
    locationInformation: {
      location: 'Cafe One Chevron',
      distance: '2.5 km',
      facilities: [
        {
          name: 'Wifi',
          icon: 'wifiIcon', // Replace with string
          rating: 4.5,
        },
        {
          name: 'Coffee',
          icon: 'coffeeIcon', // Replace with string
          rating: 5.0,
        },
        {
          name: 'Ambient',
          icon: 'plantIcon', // Replace with string
          rating: 2.5,
        },
        {
          name: 'Co-working space',
          icon: 'lighthouseIcon', // Replace with string
          rating: 5.0,
        },
      ],
    },
    postedTime: '5 minutes ago',
    rating: 4,
    reviews: 150,
  },
  {
    id: 2,
    user: 'Kathy Banny',
    images: [
      'https://plus.unsplash.com/premium_photo-1683880731561-f0cceb0ad405?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8',
    ],
    profileImage:
      'https://plus.unsplash.com/premium_photo-1683880731561-f0cceb0ad405?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8',
    likesCount: 500,
    commentsCount: 200,
    description:
      'This has one of the best cover ever. A place away from home. I could always go back again.',
    locationInformation: {
      location: 'Medicare Hospital',
      distance: '1.5 km',
      facilities: [
        {
          name: 'Wifi',
          icon: 'wifiIcon',
          rating: 4.5,
        },
        {
          name: 'Defibrillator',
          icon: 'defibrillatorIcon',
          rating: 5.0,
        },
        {
          name: 'Ambience',
          icon: 'plantIcon',
          rating: 2.5,
        },
      ],
    },
    postedTime: '55 minutes ago',
    rating: 4,
    reviews: 150,
  },
  {
    id: 3,
    user: 'Berry Slim',
    images: [
      'https://images.unsplash.com/photo-1647685658173-94c4f42725fd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fHww',
      'https://plus.unsplash.com/premium_photo-1683880731561-f0cceb0ad405?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8',
      'https://images.unsplash.com/photo-1712002641088-9d76f9080889?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHVzZXJzfGVufDB8fDB8fHww',
    ],
    profileImage:
      'https://images.unsplash.com/photo-1599110364868-364162848518?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHVzZXJzfGVufDB8fDB8fHww',
    likesCount: 500,
    commentsCount: 200,
    description:
      'This has one of the best cover ever. A place away from home. I could always go back again.',
    locationInformation: {
      location: 'Buttermilk',
      distance: '2.5 km',
      facilities: [
        {
          name: 'Wifi',
          icon: 'wifiIcon', // Replace with string
          rating: 4.5,
        },
        {
          name: 'Coffee',
          icon: 'coffeeIcon', // Replace with string
          rating: 5.0,
        },
        {
          name: 'Ambient',
          icon: 'plantIcon', // Replace with string
          rating: 2.5,
        },
        {
          name: 'Co-working space',
          icon: 'lighthouseIcon', // Replace with string
          rating: 5.0,
        },
      ],
    },
    postedTime: '2 hours ago',
    rating: 4,
    reviews: 150,
  },
];

export const LocationData = [
  {
    id: 1,
    name: 'Westend Sports Bar',
    images: [
      'https://images.unsplash.com/photo-1647685658173-94c4f42725fd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fHww',
      'https://plus.unsplash.com/premium_photo-1683880731561-f0cceb0ad405?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8',
      'https://images.unsplash.com/photo-1712002641088-9d76f9080889?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHVzZXJzfGVufDB8fDB8fHww',
    ],
    distance: '2.5 km',
    wifi: true,
    reviews: 750,
    location: 'Akowonjo, Lagos',
    rating: 5,
    facilities: [
      {
        name: 'Wifi',
        icon: 'wifiIcon',
        rating: 4.5,
      },
      {
        name: 'Defibrillator',
        icon: 'defibrillatorIcon',
        rating: 5.0,
      },
      {
        name: 'Ambience',
        icon: 'plantIcon',
        rating: 2.5,
      },
    ],
    about:
      'Nestled in the heart of the city, Tranquil Haven Hotel offers a perfect blend of luxury and comfort. With elegantly designed rooms featuring modern amenities, our hotel is ideal for both leisure and business travelers. Enjoy breathtaking views from our rooftop terrace, indulge in gourmet dining at our on-site restaurant, and unwind at the spa. Located just minutes away from popular attractions, our friendly staff is dedicated to ensuring your stay is memorable and relaxing. Experience unparalleled hospitality at Tranquil Haven Hotel, where every guest feels at home.',
    openingHours: [
      {
        day: 'Monday',
        hours: '10:00 - 22:00',
      },
      {
        day: 'Tuesday',
        hours: '10:00 - 22:00',
      },
      {
        day: 'Wednesday',
        hours: '10:00 - 22:00',
      },
      {
        day: 'Thursday',
        hours: '10:00 - 22:00',
      },
      {
        day: 'Friday',
        hours: '10:00 - 22:00',
      },
    ]
  },
  {
    id: 2,
    name: 'The Freaky bar',
    images: [
      'https://images.unsplash.com/photo-1647685658173-94c4f42725fd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fHww',
      'https://plus.unsplash.com/premium_photo-1683880731561-f0cceb0ad405?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8',
      'https://images.unsplash.com/photo-1712002641088-9d76f9080889?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHVzZXJzfGVufDB8fDB8fHww',
    ],
    distance: '2.5 km',
    wifi: true,
    reviews: 10,
    location: 'Ikeja, Lagos',
    rating: 4,
  },
  {
    id: 3,
    name: 'Bar ON',
    images: [
      'https://images.unsplash.com/photo-1647685658173-94c4f42725fd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fHww',
      'https://plus.unsplash.com/premium_photo-1683880731561-f0cceb0ad405?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8',
      'https://images.unsplash.com/photo-1712002641088-9d76f9080889?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHVzZXJzfGVufDB8fDB8fHww',
    ],
    distance: '2.5 km',
    wifi: false,
    reviews: 50,
    location: 'Ikeja, Lagos',
    rating: 3,
  },
];
