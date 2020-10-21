//TODO: show book details in modal. link to amazon search

import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import BookItem from "./BookItem";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Spinner from "react-bootstrap/Spinner";

const AMAZON_ISBN_SEARCH = "https://www.amazon.com/isbn-search/s?k=";

const Books = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("Journey to the Center of the Earth");
  const [url, setUrl] = useState(
    "https://www.googleapis.com/books/v1/volumes?q=journey+to+the+center+of+the+earth"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

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

  return (
    <Fragment>
      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <button
        type="button"
        onClick={() =>
          setUrl(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
        }
      >
        Search
      </button>

      {isError && <div>Something went wrong ...</div>}

      {isLoading ? (
        <div>
          {" "}
          <Button variant="primary" disabled>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            <span className="sr-only">Loading...</span>
          </Button>{" "}
        </div>
      ) : (
        <div>
          <ul className="list-unstyled">
            {data.map((item) => (
              <li className="media m-3 shadow-sm p-3 bg-white rounded">
                <img
                  src={item.volumeInfo.imageLinks.smallThumbnail}
                  className="mr-3"
                  alt={item.volumeInfo.title}
                />
                <div className="media-body">
                  <h5 className="mt-0 mb-1">{item.volumeInfo.title}</h5>
                  <p className="font-weight-light">
                    {item.volumeInfo.authors
                      ? item.volumeInfo.authors.toString()
                      : " Author data unavailable"}
                  </p>
                  {item.volumeInfo.description}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Fragment>
  );
};

export default Books;
