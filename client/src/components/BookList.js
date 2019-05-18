import React, { useState } from "react";
import { graphql } from "react-apollo";
import { getBooksQuery } from "../queries";
import BookDetails from "./BookDetails";

const BookList = ({ data }) => {
  const [selected, selectBook] = useState(null);

  const renderBooks = () => {
    if (data.loading) {
      return <div>Loading books...</div>;
    }
    return data.books.map(book => 
      <li 
        key={book.id}
        onClick={e => selectBook(book.id)}
      >
        {book.name}
      </li>
    );
  };
  return (
    <div>
      <ul id="book-list">{renderBooks()}</ul>
      <BookDetails bookId={selected}/>
    </div>
  );
};

export default graphql(getBooksQuery)(BookList);
