import React from 'react';

const BookCard = ({ book }) => {
  // Provide a fallback image URL if book.image_url is missing
  const imageUrl = book.image_url || 'https://via.placeholder.com/150x200?text=No+Image';

  return (
    // The main container for each book card
    // Added flex flex-col for consistent height and children alignment
    <div className="book-card bg-white p-4 rounded-lg shadow-md flex flex-col h-full">
      {/* Book Image */}
      <div className="w-full h-48 mb-4 overflow-hidden rounded">
        <img
          src={imageUrl}
          alt={book.title}
          className="w-full h-full object-cover" // object-cover ensures image fits without distortion
        />
      </div>

      {/* Book Title - Use line-clamp for long titles */}
      <h3 className="text-xl font-semibold mb-2 line-clamp-2">
        {book.title}
      </h3>

      {/* Author */}
      <p className="text-gray-600 text-sm mb-2">by {book.author}</p>

      {/* Price */}
      <p className="text-lg font-bold text-gray-800 mb-2">${book.price?.toFixed(2) || 'N/A'}</p>

      {/* Genre */}
      <p className="text-gray-700 text-sm mb-4">Genre: {book.genre?.name || 'N/A'}</p> {/* Assuming genre is an object with a 'name' property */}

      {/* Description - Crucial for fixing overflow */}
      {/* flex-grow allows this section to take up available vertical space */}
      {/* line-clamp-4 limits the description to 4 lines with an ellipsis */}
      <div className="flex-grow mb-4">
        <p className="text-gray-700 text-sm line-clamp-4">
          {book.description}
        </p>
      </div>

      {/* Availability and Buttons - Pushed to the bottom */}
      {/* mt-auto pushes this div to the bottom of the flex container */}
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