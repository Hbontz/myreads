import React from "react";
import { Route } from "react-router-dom";
import SearchBooks from "./SearchBooks";
import BookShelf from "./BookShelf";
import * as BooksAPI from "./BooksAPI";
import "./App.css";

class BooksApp extends React.Component {
  state = {
    bookList: [],
    searchList: []
  };
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ bookList: books });
    });
  }
  bookSearch(searchTerm) {
    if (searchTerm) {
      BooksAPI.search(searchTerm).then(books => {
        if (books && books.length) {
          this.updateShelfValue(books);
          this.setState({ searchList: books });
        }
      });
    } else {
      this.setState({ searchList: [] });
    }
  }
  shelfMove(book, shelf) {
    BooksAPI.update(book, shelf);
    BooksAPI.getAll().then(books => {
      this.setState({ bookList: books });
    });
  }
  updateShelfValue(booksArr) {
    for (let i = 0; i < booksArr.length; i++) {
      for (let j = 0; j < this.state.bookList.length; j++) {
        if (booksArr[i].id === this.state.bookList[j].id) {
          booksArr[i].shelf = this.state.bookList[j].shelf;
        }
      }
    }
  }

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() =>
            <BookShelf
              bookList={this.state.bookList}
              onShelfMove={(book, shelf) => {
                this.shelfMove(book, shelf);
              }}
            />}
        />
        <Route
          path="/search"
          render={() =>
            <SearchBooks
              onSearchTerm={searchTerm => {
                this.bookSearch(searchTerm);
              }}
              searchList={this.state.searchList}
              onShelfMove={(book, shelf) => {
                this.shelfMove(book, shelf);
              }}
            />}
        />
      </div>
    );
  }
}

export default BooksApp;
