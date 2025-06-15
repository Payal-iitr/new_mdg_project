const BookCard = ({ book, currentUser, onBorrowBook }: BookCardProps) => {Add commentMore actions
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  const isAvailable = book.availableCopies > 0;
  const popularityStars = Math.round(book.popularity / 20);
@@ -26,12 +27,25 @@ const BookCard = ({ book, currentUser, onBorrowBook }: BookCardProps) => {
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <>
      <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white border-blue-100">
        <CardHeader className="pb-3">
          <div className="aspect-[3/4] bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
            <Book className="h-16 w-16 text-blue-600" />
            {!imageError ? (
              <img
                src={book.coverUrl}
                alt={`${book.title} cover`}
                className="w-full h-full object-cover rounded-lg"
                onError={handleImageError}
              />
            ) : (
              <Book className="h-16 w-16 text-blue-600" />
            )}
          </div>

          <div className="space-y-2">
@@ -113,8 +127,17 @@ const BookCard = ({ book, currentUser, onBorrowBook }: BookCardProps) => {

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="aspect-[3/4] bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                <Book className="h-24 w-24 text-blue-600" />
              <div className="aspect-[3/4] bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center overflow-hidden">
                {!imageError ? (
                  <img
                    src={book.coverUrl}
                    alt={`${book.title} cover`}
                    className="w-full h-full object-cover rounded-lg"
                    onError={handleImageError}
                  />
                ) : (
                  <Book className="h-24 w-24 text-blue-600" />
                )}
              </div>
            </div>
