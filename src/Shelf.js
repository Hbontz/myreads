import React from "react";

function Shelf(props) {
  const { books } = props;

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">
        {props.shelfTitle}
      </h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book, i) =>
            <li key={i}>
              <div className="book">
                <div className="book-top">
                  <div
                    className="book-cover"
                    style={{
                      width: 128,
                      height: 193,
                      backgroundImage: `url(${book.imageLinks !== undefined
                        ? book.imageLinks.thumbnail
                        : ""})`
                    }}
                  />
                  <div className="book-shelf-changer">
                    <select
                      value={book.shelf}
                      onChange={event => {
                        props.shelfChange(book, event.target.value);
                      }}
                    >
                      <option value="" disabled>
                        Current Shelf...
                      </option>
                      <option value="currentlyReading">
                        Currently Reading
                      </option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">
                  {book.title}
                </div>
                <div className="book-authors">
                  {book.authors ? book.authors.join(", ") : ""}
                </div>
              </div>
            </li>
          )}
        </ol>
      </div>
    </div>
  );
}

export default Shelf;
