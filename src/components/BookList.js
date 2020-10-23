import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";

import * as Constants from "../constants";

const trimDescription = (description) => {
  const maxLength = 100;
  return description && description.length > maxLength ? (
    (description = description.substr(0, maxLength) + "...")
  ) : description && description.length < maxLength ? (
    description
  ) : (
    <span className="font-italic">{Constants.NO_DESCRIPTION}</span>
  );
};

const BookList = () => {
  // database search state
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("Fahrenheit 451");
  const [url, setUrl] = useState(
    Constants.GOOGLE_BOOKS_API + `volumes?q=${query}`
  );

  // loading and error state
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // modal state
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

  const handleAmazon = (title) => {
    window.open(Constants.AMAZON_SEARCH + title);
  };

  return (
    <Fragment>
      <form className="form-inline">
        <div className="form-group mx-sm-2 mb-2">
          {/* search box */}
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

        {/* search button */}
        {!isLoading ? (
          <button
            type="button"
            className="btn btn-primary mb-2"
            onClick={() =>
              setUrl(Constants.GOOGLE_BOOKS_API + `volumes?q=${query}`)
            }
          >
            Search
          </button>
        ) : (
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </form>

      {/* error output */}
      {isError && (
        <div className="alert alert-danger" role="alert">
          Something went wrong...
        </div>
      )}

      {/* search results */}
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
                    alt={Constants.IMG_NOT_AVAILABLE}
                    rounded
                  />
                )}

                <div className="media-body">
                  {/* item title */}
                  <h5 className="mt-0 mb-1">{item.volumeInfo.title}</h5>

                  {/* author info */}
                  <ul className="list-inline font-weight-light">
                    {item.volumeInfo.authors &&
                      item.volumeInfo.authors.map((auth) => (
                        <li className="list-inline-item" key={auth}>
                          {auth}
                        </li>
                      ))}
                  </ul>

                  {/* isbn details */}
                  <ul className="list-inline small mb-2">
                    {item.volumeInfo.industryIdentifiers &&
                      item.volumeInfo.industryIdentifiers.map((isbn) => (
                        <li className="list-inline-item" key={isbn.identifier}>
                          {isbn.type}: {isbn.identifier}
                        </li>
                      ))}
                  </ul>

                  {/* item description */}
                  {trimDescription(item.volumeInfo.description)}

                  {/* action buttons */}
                  <div className="mt-3">
                    <button
                      type="button"
                      className="btn btn-sm btn-dark mr-1"
                      onClick={handleAmazon.bind(this, item.volumeInfo.title)}
                    >
                      <i className="fab fa-amazon"></i>{" "}
                      {Constants.BTN_BUY_ON_AMAZON}
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-info"
                      onClick={handleShowModal}
                    >
                      <i className="fal fa-info-circle"></i>{" "}
                      {Constants.BTN_MORE_INFO}
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
