const products = [
  {
    name: 'Whopper',
    image:
      'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/84743a96a55cb36ef603c512d5b97c9141c40a33-1333x1333.png?w=320&q=40&fit=max&auto=format',
    description:
      'A ¼ lb* of flame-grilled beef patty topped with juicy tomatoes, crisp lettuce, creamy mayonnaise, ketchup, crunchy pickles, and sliced white onions on a toasted sesame seed bun',
    brand: 'Araliya',
    category: 'Burger',
    price: 89.99,
    countInStock: 10,
    rating: 4.5,
    numReviews: 12,
    reOrderLevel: 0,
    dailyCapacity: 50,
  },
  {
    name: 'Whopper',
    image:
      'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/84743a96a55cb36ef603c512d5b97c9141c40a33-1333x1333.png?w=320&q=40&fit=max&auto=format',
    description:
      'A ¼ lb* of flame-grilled beef patty topped with juicy tomatoes, crisp lettuce, creamy mayonnaise, ketchup, crunchy pickles, and sliced white onions on a toasted sesame seed bun',
    brand: 'Burger',
    category: 'Drinks',
    price: 599.99,
    countInStock: 7,
    rating: 4.0,
    numReviews: 8,
    reOrderLevel: 0,
    dailyCapacity: 50,
  },
  {
    name: 'Whopper',
    image:
      'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/84743a96a55cb36ef603c512d5b97c9141c40a33-1333x1333.png?w=320&q=40&fit=max&auto=format',
    description:
      'A ¼ lb* of flame-grilled beef patty topped with juicy tomatoes, crisp lettuce, creamy mayonnaise, ketchup, crunchy pickles, and sliced white onions on a toasted sesame seed bun',
    brand: 'Rice',
    category: 'Drinks',
    price: 929.99,
    countInStock: 5,
    rating: 3,
    numReviews: 12,
    reOrderLevel: 0,
    dailyCapacity: 50,
  },
  {
    name: 'Whopper',
    image:
      'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/84743a96a55cb36ef603c512d5b97c9141c40a33-1333x1333.png?w=320&q=40&fit=max&auto=format',
    description:
      'A ¼ lb* of flame-grilled beef patty topped with juicy tomatoes, crisp lettuce, creamy mayonnaise, ketchup, crunchy pickles, and sliced white onions on a toasted sesame seed bun',
    brand: 'Araliya',
    category: 'Seafoods',
    price: 399.99,
    countInStock: 11,
    rating: 5,
    numReviews: 12,
    reOrderLevel: 0,
    dailyCapacity: 50,
  },
  {
    name: 'Whopper',
    image:
      'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/84743a96a55cb36ef603c512d5b97c9141c40a33-1333x1333.png?w=320&q=40&fit=max&auto=format',
    description:
      'A ¼ lb* of flame-grilled beef patty topped with juicy tomatoes, crisp lettuce, creamy mayonnaise, ketchup, crunchy pickles, and sliced white onions on a toasted sesame seed bun',
    brand: 'Araliya',
    category: 'kottu',
    price: 49.99,
    countInStock: 7,
    rating: 3.5,
    numReviews: 10,
    reOrderLevel: 0,
    dailyCapacity: 550,
  },
  {
    name: 'Whopper',
    image:
      'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/84743a96a55cb36ef603c512d5b97c9141c40a33-1333x1333.png?w=320&q=40&fit=max&auto=format',
    description:
      'A ¼ lb* of flame-grilled beef patty topped with juicy tomatoes, crisp lettuce, creamy mayonnaise, ketchup, crunchy pickles, and sliced white onions on a toasted sesame seed bun',
    brand: 'kottu',
    category: 'Drinks',
    price: 29.99,
    countInStock: 0,
    rating: 4,
    numReviews: 12,
    reOrderLevel: 0,
    dailyCapacity: 80,
  },
  {
    name: 'Whopper',
    image:
      'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/84743a96a55cb36ef603c512d5b97c9141c40a33-1333x1333.png?w=320&q=40&fit=max&auto=format',
    description:
      'A ¼ lb* of flame-grilled beef patty topped with juicy tomatoes, crisp lettuce, creamy mayonnaise, ketchup, crunchy pickles, and sliced white onions on a toasted sesame seed bun',
    brand: 'Araliya',
    category: 'Burger',
    price: 89.99,
    countInStock: 10,
    rating: 4.5,
    numReviews: 12,
    reOrderLevel: 0,
    dailyCapacity: 28,
  },
  {
    name: 'Whopper',
    image:
      'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/84743a96a55cb36ef603c512d5b97c9141c40a33-1333x1333.png?w=320&q=40&fit=max&auto=format',
    description:
      'A ¼ lb* of flame-grilled beef patty topped with juicy tomatoes, crisp lettuce, creamy mayonnaise, ketchup, crunchy pickles, and sliced white onions on a toasted sesame seed bun',
    brand: 'Burger',
    category: 'Drinks',
    price: 599.99,
    countInStock: 7,
    rating: 4.0,
    numReviews: 8,
    reOrderLevel: 0,
    dailyCapacity: 28,
  },
  {
    name: 'Whopper',
    image:
      'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/84743a96a55cb36ef603c512d5b97c9141c40a33-1333x1333.png?w=320&q=40&fit=max&auto=format',
    description:
      'A ¼ lb* of flame-grilled beef patty topped with juicy tomatoes, crisp lettuce, creamy mayonnaise, ketchup, crunchy pickles, and sliced white onions on a toasted sesame seed bun',
    brand: 'Rice',
    category: 'Drinks',
    price: 929.99,
    countInStock: 5,
    rating: 3,
    numReviews: 12,
    reOrderLevel: 0,
    dailyCapacity: 28,
  },
  {
    name: 'Whopper',
    image:
      'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/84743a96a55cb36ef603c512d5b97c9141c40a33-1333x1333.png?w=320&q=40&fit=max&auto=format',
    description:
      'A ¼ lb* of flame-grilled beef patty topped with juicy tomatoes, crisp lettuce, creamy mayonnaise, ketchup, crunchy pickles, and sliced white onions on a toasted sesame seed bun',
    brand: 'Araliya',
    category: 'Seafoods',
    price: 399.99,
    countInStock: 11,
    rating: 5,
    numReviews: 12,
    reOrderLevel: 0,
    dailyCapacity: 28,
  },
  {
    name: 'Whopper',
    image:
      'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/84743a96a55cb36ef603c512d5b97c9141c40a33-1333x1333.png?w=320&q=40&fit=max&auto=format',
    description:
      'A ¼ lb* of flame-grilled beef patty topped with juicy tomatoes, crisp lettuce, creamy mayonnaise, ketchup, crunchy pickles, and sliced white onions on a toasted sesame seed bun',
    brand: 'Araliya',
    category: 'kottu',
    price: 49.99,
    countInStock: 7,
    rating: 3.5,
    numReviews: 10,
    reOrderLevel: 0,
    dailyCapacity: 28,
  },
  {
    name: 'Whopper',
    image:
      'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/84743a96a55cb36ef603c512d5b97c9141c40a33-1333x1333.png?w=320&q=40&fit=max&auto=format',
    description:
      'A ¼ lb* of flame-grilled beef patty topped with juicy tomatoes, crisp lettuce, creamy mayonnaise, ketchup, crunchy pickles, and sliced white onions on a toasted sesame seed bun',
    brand: 'kottu',
    category: 'Drinks',
    price: 29.99,
    countInStock: 0,
    rating: 4,
    numReviews: 12,
    reOrderLevel: 0,
    dailyCapacity: 28,
  },
  {
    name: 'Whopper',
    image:
      'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/84743a96a55cb36ef603c512d5b97c9141c40a33-1333x1333.png?w=320&q=40&fit=max&auto=format',
    description:
      'A ¼ lb* of flame-grilled beef patty topped with juicy tomatoes, crisp lettuce, creamy mayonnaise, ketchup, crunchy pickles, and sliced white onions on a toasted sesame seed bun',
    brand: 'Araliya',
    category: 'Burger',
    price: 89.99,
    countInStock: 10,
    rating: 4.5,
    numReviews: 12,
    reOrderLevel: 0,
    dailyCapacity: 28,
  },
  {
    name: 'Whopper',
    image:
      'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/84743a96a55cb36ef603c512d5b97c9141c40a33-1333x1333.png?w=320&q=40&fit=max&auto=format',
    description:
      'A ¼ lb* of flame-grilled beef patty topped with juicy tomatoes, crisp lettuce, creamy mayonnaise, ketchup, crunchy pickles, and sliced white onions on a toasted sesame seed bun',
    brand: 'Burger',
    category: 'Drinks',
    price: 599.99,
    countInStock: 7,
    rating: 4.0,
    numReviews: 8,
    reOrderLevel: 0,
    dailyCapacity: 28,
  },
  {
    name: 'Whopper',
    image:
      'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/84743a96a55cb36ef603c512d5b97c9141c40a33-1333x1333.png?w=320&q=40&fit=max&auto=format',
    description:
      'A ¼ lb* of flame-grilled beef patty topped with juicy tomatoes, crisp lettuce, creamy mayonnaise, ketchup, crunchy pickles, and sliced white onions on a toasted sesame seed bun',
    brand: 'Rice',
    category: 'Drinks',
    price: 929.99,
    countInStock: 5,
    rating: 3,
    numReviews: 12,
    reOrderLevel: 0,
    dailyCapacity: 28,
  },
  {
    name: 'Whopper',
    image:
      'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/84743a96a55cb36ef603c512d5b97c9141c40a33-1333x1333.png?w=320&q=40&fit=max&auto=format',
    description:
      'A ¼ lb* of flame-grilled beef patty topped with juicy tomatoes, crisp lettuce, creamy mayonnaise, ketchup, crunchy pickles, and sliced white onions on a toasted sesame seed bun',
    brand: 'Araliya',
    category: 'Seafoods',
    price: 399.99,
    countInStock: 11,
    rating: 5,
    numReviews: 12,
    reOrderLevel: 0,
    dailyCapacity: 28,
  },
  {
    name: 'Whopper',
    image:
      'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/84743a96a55cb36ef603c512d5b97c9141c40a33-1333x1333.png?w=320&q=40&fit=max&auto=format',
    description:
      'A ¼ lb* of flame-grilled beef patty topped with juicy tomatoes, crisp lettuce, creamy mayonnaise, ketchup, crunchy pickles, and sliced white onions on a toasted sesame seed bun',
    brand: 'Araliya',
    category: 'kottu',
    price: 49.99,
    countInStock: 7,
    rating: 3.5,
    numReviews: 10,
    reOrderLevel: 0,
    dailyCapacity: 28,
  },
  {
    name: 'Whopper',
    image:
      'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/84743a96a55cb36ef603c512d5b97c9141c40a33-1333x1333.png?w=320&q=40&fit=max&auto=format',
    description:
      'A ¼ lb* of flame-grilled beef patty topped with juicy tomatoes, crisp lettuce, creamy mayonnaise, ketchup, crunchy pickles, and sliced white onions on a toasted sesame seed bun',
    brand: 'kottu',
    category: 'Drinks',
    price: 29.99,
    countInStock: 0,
    rating: 4,
    numReviews: 12,
    reOrderLevel: 0,
    dailyCapacity: 28,
  },
]

export default products
