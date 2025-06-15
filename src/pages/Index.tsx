
import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import BookCatalog from '@/components/BookCatalog';
import AdminDashboard from '@/components/AdminDashboard';
import AuthModal from '@/components/AuthModal';
import Header from '@/components/Header';
import { Book, User } from '@/types';

// Mock data for initial setup
const mockBooks: Book[] = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Fiction',
    isbn: '978-0-7432-7356-5',
    publishedYear: 1925,
    availableCopies: 3,
    totalCopies: 5,
    coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=300&h=450',
    description: 'A classic American novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream.',
    popularity: 95
  },
  {
    id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Fiction',
    isbn: '978-0-06-112008-4',
    publishedYear: 1960,
    availableCopies: 2,
    totalCopies: 4,
    coverUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=300&h=450',
    description: 'A gripping tale of racial injustice and childhood innocence in the American South.',
    popularity: 92
  },
  {
    id: '3',
    title: '1984',
    author: 'George Orwell',
    genre: 'Science Fiction',
    isbn: '978-0-452-28423-4',
    publishedYear: 1949,
    availableCopies: 1,
    totalCopies: 3,
    coverUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=450',
    description: 'A dystopian social science fiction novel and cautionary tale about totalitarianism.',
    popularity: 90
  },
  {
    id: '4',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    genre: 'Romance',
    isbn: '978-0-14-143951-8',
    publishedYear: 1813,
    availableCopies: 4,
    totalCopies: 6,
    coverUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=300&h=450',
    description: 'A romantic novel of manners that critiques the British landed gentry of the early 19th century.',
    popularity: 88
  },
  {
    id: '5',
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    genre: 'Fiction',
    isbn: '978-0-316-76948-0',
    publishedYear: 1951,
    availableCopies: 0,
    totalCopies: 2,
    coverUrl: 'https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&w=300&h=450',
    description: 'A controversial novel about teenage rebellion and alienation in post-war America.',
    popularity: 85
  }
];

const Index = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [books, setBooks] = useState<Book[]>(mockBooks);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [currentView, setCurrentView] = useState<'catalog' | 'admin'>('catalog');

  const handleLogin = (email: string, password: string, isAdmin: boolean = false) => {
    // Mock authentication
    const user: User = {
      id: Date.now().toString(),
      name: email.split('@')[0],
      email,
      role: isAdmin ? 'admin' : 'user',
      borrowedBooks: [],
      joinDate: new Date().toISOString()
    };
    setCurrentUser(user);
    setShowAuthModal(false);
    console.log('User logged in:', user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('catalog');
  };

  const handleAddBook = (bookData: Omit<Book, 'id'>) => {
    const newBook: Book = {
      ...bookData,
      id: Date.now().toString()
    };
    setBooks(prev => [...prev, newBook]);
    console.log('Book added:', newBook);
  };

  const handleUpdateBook = (bookId: string, updates: Partial<Book>) => {
    setBooks(prev => prev.map(book => 
      book.id === bookId ? { ...book, ...updates } : book
    ));
  };

  const handleDeleteBook = (bookId: string) => {
    setBooks(prev => prev.filter(book => book.id !== bookId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header 
        currentUser={currentUser}
        onLogin={() => setShowAuthModal(true)}
        onLogout={handleLogout}
        currentView={currentView}
        onViewChange={setCurrentView}
      />
      
      <main className="container mx-auto px-4 py-8">
        {currentView === 'catalog' ? (
          <BookCatalog 
            books={books}
            currentUser={currentUser}
            onBorrowBook={handleUpdateBook}
          />
        ) : (
          <AdminDashboard 
            books={books}
            onAddBook={handleAddBook}
            onUpdateBook={handleUpdateBook}
            onDeleteBook={handleDeleteBook}
          />
        )}
      </main>

      {showAuthModal && (
        <AuthModal
          mode={authMode}
          onLogin={handleLogin}
          onClose={() => setShowAuthModal(false)}
          onToggleMode={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
        />
      )}
    </div>
  );
};

export default Index;
