export const components: {
  title: string;
  href: string;
  description: string;
}[] = [
  {
    title: 'Electronics',
    href: '/electronics',
    description:
      'A modal dialog that interrupts the user with important content and expects a response.',
  },
  {
    title: 'Cars',
    href: '/cars',
    description: 'For sighted users to preview content available behind a link.',
  },
  {
    title: 'Clothes',
    href: '/clothes',
    description:
      'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
  },
  {
    title: 'Furniture',
    href: '/furniture',
    description: 'Visually or semantically separates content.',
  },
  {
    title: 'Sport Equipments',
    href: '/sports',
    description:
      'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
  },
  {
    title: 'Art',
    href: '/art',
    description:
      'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
  },
];
const pics = [
  'electronics.webp',
  'cars.webp',
  'clothes.webp',
  'furniture.webp',
  'sports.webp',
  'art.webp',
];
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export const images: { [key: string]: any } = {
  'electronics.webp': require('../../assets/images/electronics.webp'),
  'cars.webp': require('../../assets/images/cars.webp'),
  'clothes.webp': require('../../assets/images/clothes.webp'),
  'furniture.webp': require('../../assets/images/furniture.webp'),
  'sports.webp': require('../../assets/images/sports.webp'),
  'art.webp': require('../../assets/images/art.webp'),
};
export const projects = [
  {
    id: 0,
    title: 'Electronics',
    description: 'A technology company that builds economic infrastructure for the internet.',
    link: 'electronics',
    image: 'electronics.webp',
    endDate: '2024-08-11T09:17:00.000Z',
    lastBid: 500,
    pics,
  },
  {
    id: 1,
    title: 'Cars',
    description:
      'A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.',
    link: 'cars',
    image: 'cars.webp',
    endDate: '2024-08-27T00:00:00.000Z',
    lastBid: 450,
    pics,
  },
  {
    id: 2,
    title: 'Clothes',
    description:
      'A multinational technology company that specializes in Internet-related services and products.',
    link: 'clothes',
    image: 'clothes.webp',
    endDate: '2024-07-20T08:23:00.000Z',
    lastBid: 650,
    pics,
  },
  {
    id: 3,
    title: 'Furniture',
    description:
      "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
    link: 'furniture',
    image: 'furniture.webp',
    endDate: '2024-10-15T05:22:00.000Z',
    lastBid: 1450,
    pics,
  },
  {
    id: 4,
    title: 'Sport Equipments',
    description:
      'A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.',
    link: 'sports',
    image: 'sports.webp',
    endDate: '2024-09-18T01:30:45.000Z',
    lastBid: 700,
    pics,
  },
  {
    id: 5,
    title: 'Art',
    description:
      'A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.',
    link: 'art',
    image: 'art.webp',
    endDate: '2024-11-25T13:23:00.000Z',
    lastBid: 850,
    pics,
  },
  // {
  //   id: 6,
  //   title: "Test",
  //   description:
  //     "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
  //   link: "test",
  //   image: "art.webp",
  //   endDate: "2024-07-25T13:23:00.000Z",
  //   lastBid: 850,
  //   pics:[]
  // },
];
