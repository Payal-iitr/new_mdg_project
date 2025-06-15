import { useState } from 'react';More actions
import { Book, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Book as BookType } from '@/types';

interface AddBookModalProps {
  onAdd: (book: Omit<BookType, 'id'>) => void;
  onClose: () => void;
}

const genres = [
  'Fiction', 'Non-Fiction', 'Science Fiction', 'Fantasy', 'Mystery', 
  'Romance', 'Thriller', 'Biography', 'History', 'Science', 
  'Philosophy', 'Poetry', 'Drama', 'Adventure', 'Horror'
];

const AddBookModal = ({ onAdd, onClose }: AddBookModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    isbn: '',
    publishedYear: new Date().getFullYear(),
    totalCopies: 1,
    description: '',
    popularity: 50
    popularity: 50,
    coverUrl: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
@@ -38,7 +39,7 @@
    const newBook: Omit<BookType, 'id'> = {
      ...formData,
      availableCopies: formData.totalCopies,
      coverUrl: '/placeholder.svg'
      coverUrl: formData.coverUrl || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=300&h=450'
    };

    onAdd(newBook);
@@ -84,6 +85,17 @@
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="coverUrl">Cover Image URL</Label>
            <Input
              id="coverUrl"
              value={formData.coverUrl}
              onChange={(e) => handleInputChange('coverUrl', e.target.value)}
              placeholder="https://example.com/book-cover.jpg"
            />
            <p className="text-xs text-gray-500">Optional: Add a URL for the book cover image</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="genre">Genre *</Label>
