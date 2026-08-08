export const categories = [
  { id: 'all', label: 'All', icon: '🍽️' },
  { id: 'traditional', label: 'Traditional', icon: '🫕' },
  { id: 'vegan', label: 'Vegan (Fasting)', icon: '🌿' },
  { id: 'grilled', label: 'Grilled (Tibs)', icon: '🔥' },
  { id: 'drinks', label: 'Coffee & Drinks', icon: '☕' },
  { id: 'desserts', label: 'Desserts', icon: '🍯' },
]

export const dishes = [
  {
    id: 1,
    name: 'Doro Wat',
    category: 'traditional',
    price: 350,
    portion: 'Serves 1 • 420g',
    rating: 4.8,
    prepTime: 20,
    image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=600',
    description:
      'A rich, deeply spiced chicken stew simmered for hours in a robust berbere sauce with caramelised onions and spiced butter (niter kibbeh), served alongside freshly made injera. A cornerstone of Ethiopian celebration cooking.',
    restaurant: 'Habesha Bites Kitchen',
    gallery: [
      'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/5560736/pexels-photo-5560736.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
  },
  {
    id: 2,
    name: 'Tibs (Beef)',
    category: 'grilled',
    price: 420,
    portion: 'Serves 1 • 300g',
    rating: 4.7,
    prepTime: 15,
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',
    description:
      'Tender cubes of prime beef sautéed with rosemary, fresh tomatoes, green peppers and mitmita spice in a sizzling clay pot. Served with injera or rice.',
    restaurant: 'Habesha Bites Kitchen',
    gallery: [
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
  },
  {
    id: 3,
    name: 'Shiro Firfir',
    category: 'vegan',
    price: 180,
    portion: 'Serves 1 • 350g',
    rating: 4.6,
    prepTime: 12,
    image: 'https://images.pexels.com/photos/5560760/pexels-photo-5560760.jpeg?auto=compress&cs=tinysrgb&w=600',
    description:
      'Smooth chickpea and broad-bean flour stew spiced with onions, garlic and Ethiopian spices, tossed with torn injera pieces. A beloved fasting-day favourite.',
    restaurant: 'Habesha Bites Kitchen',
    gallery: [
      'https://images.pexels.com/photos/5560760/pexels-photo-5560760.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
  },
  {
    id: 4,
    name: 'Kitfo',
    category: 'traditional',
    price: 480,
    portion: 'Serves 1 • 280g',
    rating: 4.9,
    prepTime: 10,
    image: 'https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&w=600',
    description:
      'Ethiopian steak tartare — lean minced beef seasoned with mitmita chilli powder and niter kibbeh spiced butter. Served leb leb (lightly warmed) or raw, with ayib cheese and gomen greens.',
    restaurant: 'Habesha Bites Kitchen',
    gallery: [
      'https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
  },
  {
    id: 5,
    name: 'Injera Platter',
    category: 'traditional',
    price: 560,
    portion: 'Serves 2 • Mixed',
    rating: 4.8,
    prepTime: 25,
    image: 'https://images.pexels.com/photos/5560756/pexels-photo-5560756.jpeg?auto=compress&cs=tinysrgb&w=600',
    description:
      'A generous sharing platter of sourdough injera topped with doro wat, misir, gomen, tikil gomen and ayib. The full Habesha Bites experience on one plate.',
    restaurant: 'Habesha Bites Kitchen',
    gallery: [
      'https://images.pexels.com/photos/5560756/pexels-photo-5560756.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
  },
  {
    id: 6,
    name: 'Bunna (Coffee)',
    category: 'drinks',
    price: 95,
    portion: '1 cup • Traditional',
    rating: 4.9,
    prepTime: 8,
    image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=600',
    description:
      'Ethiopian ceremony coffee — green beans roasted tableside, ground and brewed in a jebena clay pot with a hint of cardamom. Served in small cups with optional popcorn.',
    restaurant: 'Habesha Bites Kitchen',
    gallery: [
      'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
  },
  {
    id: 7,
    name: 'Misir Wat',
    category: 'vegan',
    price: 160,
    portion: 'Serves 1 • 300g',
    rating: 4.5,
    prepTime: 18,
    image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=600',
    description:
      'Split red lentils slow-cooked with berbere, caramelised onions and garlic into a thick, warming stew. Naturally vegan and deeply satisfying.',
    restaurant: 'Habesha Bites Kitchen',
    gallery: [
      'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
  },
  {
    id: 8,
    name: 'Honey Cake',
    category: 'desserts',
    price: 120,
    portion: '1 slice • 150g',
    rating: 4.7,
    prepTime: 5,
    image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=600',
    description:
      'Moist sponge cake made with tej (Ethiopian honey wine) and spiced with cinnamon and tej honey glaze. A sweet finish to your Habesha Bites meal.',
    restaurant: 'Habesha Bites Kitchen',
    gallery: [
      'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
  },
]
