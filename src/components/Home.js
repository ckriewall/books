import React from "react";

const Home = () => {
  return (
    <div class="alert alert-info" role="alert">
      This is staging area for an Amazon integrated shopping application. Search
      results come from the{" "}
      <a
        href="https://developers.google.com/books/docs/v1/reference/?apix=true"
        target="_blank"
        rel="noopener noreferrer"
      >
        {" "}
        Google Books API
      </a>
      . Once an Amazon Associates account is available, resuts will be returned
      from the{" "}
      <a
        href="https://webservices.amazon.com/paapi5/documentation/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Amazon Products API
      </a>
      .
    </div>
  );
};

export default Home;
