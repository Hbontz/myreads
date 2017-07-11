import React, { Component } from "react";
import { Link } from "react-router-dom";
import Shelf from "./Shelf";

class SearchBooks extends Component {
	state = {
		query: "",
		searchList: []
	};

	componentWillReceiveProps(nextProps) {
		this.setState({ searchList: nextProps.searchList });
	}

	updateQuery = query => {
		this.setState({ query: query });
		this.props.onSearchTerm(query);
	};

	render() {
		const { query } = this.state;
		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link className="close-search" to="/" />
					<div className="search-books-input-wrapper">
						<input
							type="text"
							placeholder="Enter search term..."
							value={query}
							onChange={event =>
								this.updateQuery(event.target.value)}
						/>
					</div>
				</div>
				<Shelf
					shelfTitle={" "}
					books={
						this.state.searchList
							? this.state.searchList
							: this.props.searchList
					}
					shelfChange={(book, shelf) => {
						this.props.onShelfMove(book, shelf);
					}}
				/>
			</div>
		);
	}
}

export default SearchBooks;
