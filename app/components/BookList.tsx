'use client';

import { useEffect, useState } from 'react';
import { Book, BookFormData } from '../types/book';
import { supabase, BookRow } from '../lib/supabase';

const ITEMS_PER_PAGE = 10;

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<BookFormData>({
    title: '',
    borrower: '',
    borrowDate: new Date(),
    dueDate: new Date(new Date().setDate(new Date().getDate() + 30)),
  });

  // Calculate pagination
  const totalPages = Math.ceil(books.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentBooks = books.slice(startIndex, endIndex);

  useEffect(() => {
    fetchBooks();
  }, []);

  async function fetchBooks() {
    try {
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      if (data) {
        const formattedBooks: Book[] = data.map((book: BookRow) => ({
          id: book.id,
          title: book.title,
          borrower: book.borrower,
          borrowDate: new Date(book.borrow_date),
          dueDate: new Date(book.due_date),
          returned: book.returned,
        }));
        setBooks(formattedBooks);
      }
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  }

  const addBook = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from('books')
        .insert([
          {
            title: formData.title,
            borrower: formData.borrower,
            borrow_date: formData.borrowDate.toISOString(),
            due_date: formData.dueDate.toISOString(),
            returned: false,
          },
        ])
        .select()
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        const newBook: Book = {
          id: data.id,
          title: data.title,
          borrower: data.borrower,
          borrowDate: new Date(data.borrow_date),
          dueDate: new Date(data.due_date),
          returned: data.returned,
        };
        setBooks([newBook, ...books]);
      }

      setShowForm(false);
      setFormData({
        title: '',
        borrower: '',
        borrowDate: new Date(),
        dueDate: new Date(new Date().setDate(new Date().getDate() + 30)),
      });
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const toggleReturn = async (id: string) => {
    try {
      const { error } = await supabase
        .from('books')
        .update({ returned: true })
        .eq('id', id);

      if (error) {
        throw error;
      }

      setBooks(books.map(book => 
        book.id === id ? { ...book, returned: true } : book
      ));
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const handleBorrowDateChange = (date: string) => {
    const borrowDate = new Date(date);
    const dueDate = new Date(borrowDate);
    dueDate.setDate(borrowDate.getDate() + 30);
    setFormData({
      ...formData,
      borrowDate,
      dueDate,
    });
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <p className="text-center text-gray-500">Loading books...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Books on Loan</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          {showForm ? 'Cancel' : 'Add New Loan'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={addBook} className="mb-8 bg-white p-6 rounded-lg shadow">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Book Title</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Borrower Name</label>
              <input
                type="text"
                required
                value={formData.borrower}
                onChange={(e) => setFormData({ ...formData, borrower: e.target.value })}
                className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Borrow Date</label>
              <input
                type="date"
                required
                value={formData.borrowDate.toISOString().split('T')[0]}
                onChange={(e) => handleBorrowDateChange(e.target.value)}
                className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Due Date (30 days from borrow date)</label>
              <input
                type="date"
                required
                value={formData.dueDate.toISOString().split('T')[0]}
                onChange={(e) => setFormData({ ...formData, dueDate: new Date(e.target.value) })}
                className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Add Book Loan
            </button>
          </div>
        </form>
      )}

      <div className="grid gap-4 mb-6">
        {currentBooks.map((book) => (
          <div
            key={book.id}
            className={`p-4 rounded-lg shadow ${
              book.returned ? 'bg-gray-100' : 'bg-white'
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{book.title}</h3>
                <p className="text-gray-600">Borrowed by: {book.borrower}</p>
                <p className="text-gray-600">
                  Borrow Date: {formatDate(book.borrowDate)}
                </p>
                <p className={`${
                  new Date(book.dueDate) < new Date() && !book.returned
                    ? 'text-red-600 font-semibold'
                    : 'text-gray-600'
                }`}>
                  Due Date: {formatDate(book.dueDate)}
                </p>
              </div>
              <button
                onClick={() => toggleReturn(book.id)}
                disabled={book.returned}
                className={`px-3 py-1 rounded ${
                  book.returned
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-500 hover:bg-green-600'
                } text-white`}
              >
                {book.returned ? 'Returned' : 'Mark as Returned'}
              </button>
            </div>
          </div>
        ))}
        {books.length === 0 && (
          <p className="text-center text-gray-500">No books are currently loaned out.</p>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${
              currentPage === 1
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            Previous
          </button>
          <span className="text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded ${
              currentPage === totalPages
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
} 