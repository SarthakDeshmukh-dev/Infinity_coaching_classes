export interface GalleryItem {
  id: string;
  image: string;
}

export const galleryData: GalleryItem[] = [
  {
    id: '1',
    image: '/images/gallery-1.jpeg',
  },
  {
    id: '2',
    image: '/images/gallery-2.jpeg',
  },
  {
    id: '3',
    image: '/images/gallery-3.jpeg',
  },
  // {
  //   id: '4',
  //   image: '/images/gallery-4.jpg',
  //   category: 'class',
  //   alt: 'Interactive Learning Session',
  // },
  // {
  //   id: '5',
  //   image: '/images/gallery-5.jpg',
  //   category: 'facility',
  //   alt: 'Classroom Environment',
  // },
  // {
  //   id: '6',
  //   image: '/images/gallery-6.jpg',
  //   category: 'class',
  //   alt: 'Student Engagement Activity',
  // },
];
