import React from "react";
import PropTypes from "prop-types";

export const BookItem = (bookTitle, bookDescription, bookThumbnail) => {
  return (
    <div className="media">
      <img src={bookThumbnail} className="mr-3" alt="..." />
      <div className="media-body">
        <h5 className="mt-0">{bookTitle}</h5>
        {bookDescription}
      </div>
    </div>
  );
};

BookItem.propTypes = {
  bookTitle: PropTypes.string,
  bookDescription: PropTypes.string,
  bookThumbnail: PropTypes.string,
};

export default BookItem;
