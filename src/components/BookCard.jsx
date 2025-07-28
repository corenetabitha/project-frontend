import React from 'react';

const BookCard = ({ book }) => {
  const imageUrl = book.image_url || 'https://via.placeholder.com/150x200?text=No+Image';

  return (
    <div className="book-card bg-white p-4 rounded-lg shadow-md flex flex-col h-full">
      <div className="w-full h-48 mb-4 overflow-hidden rounded">
        <img
          src={imageUrl}
          alt={book.title}
          className="w-full h-full object-cover"
        />
      </div>

      <h3 className="text-xl font-semibold mb-2 line-clamp-2">
        {book.title}
      </h3>

      <p className="text-gray-600 text-sm mb-2">by {book.author}</p>

      <p className="text-lg font-bold text-gray-800 mb-2">${book.price?.toFixed(2) || 'N/A'}</p>

      <p className="text-gray-700 text-sm mb-4">Genre: {book.genre?.name || 'N/A'}</p>

      <div className="flex-grow mb-4">
        <p className="text-gray-700 text-sm line-clamp-4">
          {book.description}
        </p>
      </div>

      <div className="mt-auto pt-2 border-t border-gray-100">
        {book.availableForBuy && book.stock_count > 0 && (
          <p className="text-green-600 text-sm mb-1">For Purchase ({book.stock_count})</p>
        )}
        {book.availableForLend && (
          <p className="text-blue-600 text-sm mb-1">For Lending</p>
        )}
        {(!book.availableForBuy && !book.availableForLend) && (
            <p className="text-red-500 text-sm mb-1">Not Available</p>
        )}
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-2 w-full">
          Add to Cart / View Details
        </button>
      </div>
    </div>
  );
};

export default BookCard;