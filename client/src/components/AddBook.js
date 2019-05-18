import React, { useState } from "react";
import { graphql, compose } from "react-apollo";
import { getAuthorsQuery, addBookMutation, getBooksQuery } from "../queries";

const AddBook = ({ getAuthorsQuery, addBookMutation }) => {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthor] = useState("");

  const renderAuthorSelectOptions = () => {
    if (getAuthorsQuery.loading) {
      return <option disabled>Loading authors...</option>;
    }
    return getAuthorsQuery.authors.map(author => (
      <option key={author.id} value={author.id}>
        {author.name}
      </option>
    ));
  };

  const submitForm = e => {
    e.preventDefault();
    addBookMutation({
      variables: {
        name,
        genre,
        authorId
      },
      refetchQueries: [
        {
          query: getBooksQuery
        }
      ]
    });
  };

  return (
    <form id="add-book" onSubmit={submitForm}>
      <div className="field">
        <label>Book name:</label>
        <input type="text" onChange={e => setName(e.target.value)} />
      </div>

      <div className="field">
        <label>Genre:</label>
        <input type="text" onChange={e => setGenre(e.target.value)} />
      </div>

      <div className="field">
        <label>Author:</label>
        <select onChange={e => setAuthor(e.target.value)}>
          <option>Select author</option>
          {renderAuthorSelectOptions()}
        </select>
      </div>
      <button></button>
    </form>
  );
};

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
