import React, { Component } from 'react';
import PropTypes from 'prop-types'

class Shelf extends Component {
	static propTypes = {
    	books: PropTypes.array.isRequired,
    	shelfChange: PropTypes.func.isRequired,
    	shelfTitle: PropTypes.string
  }
	state = {
		shelfValue: ""
	}

	valueChange(valString) {
		this.setState({shelfValue: valString})
	}

	render() {

		const { books } = this.props

		return (
			<div className="bookshelf">
                  <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid"> { 
                    	books.map((book, i) =>
                      <li key={book.id}>
				<div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks !== undefined ? book.imageLinks.thumbnail :''})`}}></div>
                        <div className="book-shelf-changer">    
                            <select 
                            	value={this.state.shelfValue || book.shelf} 
                            	onChange={(event) => {
                            		this.props.shelfChange(book, event.target.value)
                            		this.valueChange(event.target.value)
                            	}}>
                            	<option value="none" disabled>Current Shelf...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                	<div className="book-title">{book.title}</div>
                	<div className="book-authors">{book.authors ? book.authors.join(", ") : ""}</div>
                </div>
            </li>)}
                    </ol>
                  </div>
                </div>
        )
    }                 
}

export default Shelf