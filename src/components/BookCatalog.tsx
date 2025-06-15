
import { useState, useMemo } from 'react';
import { Search, Filter, Star, Users, Clock, BookOpen } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import BookCard from './BookCard';
import { Book, User } from '@/types';

interface BookCatalogProps {
  books: Book[];
  currentUser: User | null;
  onBorrowBook: (bookId: string, updates: Partial<Book>) => void;
}

const BookCatalog = ({ books, currentUser, onBorrowBook }: BookCatalogProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('popularity');

  const genres = useMemo(() => {
    const uniqueGenres = [...new Set(books.map(book => book.genre))];
    return uniqueGenres.sort();
  }, [books]);

  const filteredAndSortedBooks = useMemo(() => {
    let filtered = books.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           book.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = selectedGenre === 'all' || book.genre === selectedGenre;
      return matchesSearch && matchesGenre;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'author':
          return a.author.localeCompare(b.author);
        case 'year':
          return b.publishedYear - a.publishedYear;
        case 'popularity':
        default:
          return b.popularity - a.popularity;
      }
    });
  }, [books, searchTerm, selectedGenre, sortBy]);

  const handleBorrowBook = (book: Book) => {
    if (book.availableCopies > 0) {
      onBorrowBook(book.id, {
        availableCopies: book.availableCopies - 1
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Book Catalog</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover and borrow from our extensive collection of books across various genres and authors.
        </p>
        
        {/* Stats */}
        <div className="flex justify-center space-x-8 mt-6">
          <div className="flex items-center space-x-2 text-gray-600">
            <Users className="h-5 w-5" />
            <span className="font-medium">{books.length} Books Available</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Star className="h-5 w-5" />
            <span className="font-medium">{genres.length} Genres</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Clock className="h-5 w-5" />
            <span className="font-medium">24/7 Digital Access</span>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 text-lg"
            />
          </div>
          
          <div className="flex gap-4">
            <div className="min-w-[180px]">
              <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                <SelectTrigger className="h-12">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="All Genres" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genres</SelectItem>
                  {genres.map(genre => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="min-w-[150px]">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Popularity</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                  <SelectItem value="author">Author</SelectItem>
                  <SelectItem value="year">Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {(selectedGenre !== 'all' || searchTerm) && (
          <div className="flex flex-wrap gap-2 mt-4">
            {searchTerm && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Search: "{searchTerm}"
              </Badge>
            )}
            {selectedGenre !== 'all' && (
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Genre: {selectedGenre}
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Results Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-900">
            {filteredAndSortedBooks.length} Books Found
          </h2>
          <p className="text-gray-600">
            Sorted by {sortBy === 'popularity' ? 'Popularity' : sortBy === 'title' ? 'Title' : sortBy === 'author' ? 'Author' : 'Year'}
          </p>
        </div>

        {filteredAndSortedBooks.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <BookOpen className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No books found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or browse all books.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedBooks.map(book => (
              <BookCard
                key={book.id}
                book={book}
                currentUser={currentUser}
                onBorrowBook={handleBorrowBook}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookCatalog;
