import React from "react";
import { Route } from "react-router-dom";
import _ from "lodash";
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
        } else {
          this.setState({ searchList: [] });
        }
      });
    } else {
      this.setState({ searchList: [] });
    }
  }
  shelfMove(book, shelf) {
    BooksAPI.update(book, shelf);
    book.shelf = shelf;
    let filterBook = this.state.bookList.filter(bk => bk.id !== book.id);
    location.pathname === "/search"
      ? this.setState({ bookList: [...filterBook, book] })
      : this.setState(prevState => ({
          bookList: prevState.bookList
        }));
    this.setState(prevState => ({
      searchList: prevState.searchList
    }));
  }

  updateShelfValue(searchArr) {
    let bookList = this.state.bookList;
    for (let i = 0; i < searchArr.length; i++) {
      searchArr[i].shelf = "none";
      for (let j = 0; j < bookList.length; j++) {
        if (searchArr[i].id === bookList[j].id) {
          searchArr[i].shelf = bookList[j].shelf;
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
              onSearchTerm={_.debounce(searchTerm => {
                this.bookSearch(searchTerm);
              }, 300)}
              searchList={this.state.searchList ? this.state.searchList : []}
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
