import React from "react";
import { graphql } from "react-apollo";
import { getBookQuery } from "../queries";

const BookDetails = ({ data: { book } }) => {
  // console.log(data.b)
  return book ? (
    <div id="book-details">
      <h2>{book.name}</h2>
      <p>{book.genre}</p>
      <p>{book.author.name}</p>
      <p>All books by this author:</p>
      <ul className="other-books">
        {book.author.books.map(book => <li key={book.id}>{book.name}</li>)}
      </ul>
    </div>
  ) : <div>No book selected...</div>;
};

export default graphql(getBookQuery, {
  options: ({ bookId }) => ({
    variables: {
      id: bookId
    }
  })
})(BookDetails);
