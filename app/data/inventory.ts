export interface InventoryBook {
  id: string;
  title: string;
  author: string;
  availableCopies: number;
}

export const inventoryBooks: InventoryBook[] = [
  {
    id: "1",
    title: "Autobiography of a Yogi",
    author: "Paramahansa Yogananda",
    availableCopies: 3
  },
  {
    id: "2",
    title: "God Talks with Arjuna",
    author: "Paramahansa Yogananda",
    availableCopies: 2
  },
  {
    id: "3",
    title: "Man's Eternal Quest",
    author: "Paramahansa Yogananda",
    availableCopies: 4
  },
  {
    id: "4",
    title: "Divine Romance",
    author: "Paramahansa Yogananda",
    availableCopies: 2
  },
  {
    id: "5",
    title: "The Secret of the Golden Flower",
    author: "Paramahansa Yogananda",
    availableCopies: 1
  },
  {
    id: "6",
    title: "Journey to Self-Realization",
    author: "Paramahansa Yogananda",
    availableCopies: 3
  },
  {
    id: "7",
    title: "The Science of Religion",
    author: "Paramahansa Yogananda",
    availableCopies: 5
  }
 
]; 