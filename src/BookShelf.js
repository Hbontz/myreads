import React from "react";
import { Link } from "react-router-dom";
import Shelf from "./Shelf";

function BookShelf(props) {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <Shelf
            shelfTitle={"Currently Reading"}
            books={props.bookList.filter(
              book => book.shelf === "currentlyReading"
            )}
            shelfChange={(book, shelf) => {
              props.onShelfMove(book, shelf);
            }}
          />
          <Shelf
            shelfTitle={"Want to Read"}
            books={props.bookList.filter(book => book.shelf === "wantToRead")}
            shelfChange={(book, shelf) => {
              props.onShelfMove(book, shelf);
            }}
          />
          <Shelf
            shelfTitle={"Read"}
            books={props.bookList.filter(book => book.shelf === "read")}
            shelfChange={(book, shelf) => {
              props.onShelfMove(book, shelf);
            }}
          />
        </div>
      </div>
      <div className="open-search">
        <Link className="open-search" to="/search">
          Add a book
        </Link>
      </div>
    </div>
  );
}

export default BookShelf;
