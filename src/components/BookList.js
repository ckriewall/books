//TODO: show book details in modal. link to amazon search

import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";

// const AMAZON_ISBN_SEARCH = 'https://www.amazon.com/isbn-search/s?k=';
const GOOGLE_BOOKS_API = "https://www.googleapis.com/books/v1/";

const trimDescription = (description) => {
  const maxLength = 100;
  return description && description.length > maxLength ? (
    (description = description.substr(0, maxLength) + "...")
  ) : description && description.length < maxLength ? (
    description
  ) : (
    <span className="font-italic">
      Oops! Google Books doesn't have a description.
    </span>
  );
};

const BookList = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("verne");
  const [url, setUrl] = useState(GOOGLE_BOOKS_API + "volumes?q=verne");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  //modal state
  const [show, setShow] = useState(false);
  const handleCloseModal = () => setShow(false);
  const handleShowModal = () => setShow(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios(url);
        setData(result.data.items);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  const handleAmazon = () => {
    window.open("https://amazon.com");
  };

  return (
    <Fragment>
      <form className="form-inline">
        <div className="form-group mx-sm-3 mb-2">
          <label htmlFor="inputSearch" className="sr-only">
            Search
          </label>
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="form-control"
            id="inputSearch"
            placeholder="Author, title, ISBN..."
          />
        </div>
        <button
          type="button"
          className="btn btn-primary mb-2"
          onClick={() => setUrl(GOOGLE_BOOKS_API + `volumes?q=${query}`)}
        >
          Search
        </button>
      </form>

      {isError && <div>Something went wrong ...</div>}

      {!isLoading && (
        <div>
          <ul className="list-unstyled">
            {data.map((item) => (
              <li
                className="media m-3 shadow-sm p-3 bg-white rounded"
                key={item.id}
              >
                {item.volumeInfo.imageLinks &&
                item.volumeInfo.imageLinks.smallThumbnail ? (
                  <img
                    src={item.volumeInfo.imageLinks.smallThumbnail}
                    className="mr-3"
                    alt={item.volumeInfo.title}
                  />
                ) : (
                  <Image
                    src="https://via.placeholder.com/128x193"
                    className="mr-3"
                    alt="None provided"
                    rounded
                  />
                )}

                <div className="media-body">
                  <h5 className="mt-0 mb-1">{item.volumeInfo.title}</h5>
                  <p className="font-weight-light">
                    {item.volumeInfo.authors
                      ? item.volumeInfo.authors.toString()
                      : "Unknown Author"}
                  </p>
                  {trimDescription(item.volumeInfo.description)}
                  <div className="mt-3">
                    <button
                      type="button"
                      className="btn btn-sm btn-dark mr-1"
                      onClick={handleAmazon.bind(this, item.volumeInfo.title)}
                    >
                      Buy on Amazon
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-info"
                      onClick={handleShowModal}
                    >
                      Info...
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Modal show={show} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Book Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, book details go here!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseModal}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default BookList;
