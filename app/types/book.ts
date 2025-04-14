export interface Book {
  id: string;
  title: string;
  borrower: string;
  borrowDate: Date;
  dueDate: Date;
  returned: boolean;
}

export type BookFormData = Omit<Book, 'id' | 'returned'>; 