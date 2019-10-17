import React from 'react';
import PropTypes from 'prop-types';

import './../css/App.css';

class Book extends React.Component {

     constructor(props) {
        super(props);
        this.state = { book: props.book,
                       currentShelf : props.book.shelf };
        this.updateShelf = this.updateShelf.bind(this);
    }

    updateShelf(event){
        this.props.changeShelf(this.state.book, event.target.value);
    }

    render() {
        const imgUrl = this.state.book.imageLinks && this.state.book.imageLinks.thumbnail ? this.state.book.imageLinks.thumbnail : ''; 
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${imgUrl})` }}></div>
                    <div className="book-shelf-changer">
                        <select onChange={this.updateShelf} defaultValue={this.state.currentShelf}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{this.state.book.title}</div>
                {/* Check for authors and render each on separate line if exist*/
                    this.state.book.authors &&
                    this.state.book.authors.map((author, index) => (
                        <div className="book-authors" key={index}>
                            {author}
                        </div>
                    ))
                }

            </div>
        )
    }
}

Book.propTypes = {
    book: PropTypes.object.isRequired,
    changeShelf: PropTypes.func.isRequired,
}
export default Book;