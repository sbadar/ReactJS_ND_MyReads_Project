import React from 'react';
import PropTypes from 'prop-types';
import './../css/App.css';
import Book from './Book'

class BookShelf extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
             books: props.books,
        };
        this.onShelfChange = this.onShelfChange.bind(this);
    }

    componentDidMount() {
    }

    // componentDidUpdate(prevProps, props){
    //     if(prevProps.books != props.books){
    //         this.setState( {books: props.books});
    //     }

    // }

    componentWillReceiveProps(props){
        this.setState( {books: props.books});
    }

    onShelfChange(targettedBook, newShelf) {
        // BookAPI.update(targettedBook, newShelf).then(response =>{
        //     targettedBook.shelf = newShelf;
        //     //alert(`${targettedBook.title} Shelf changed to ${newShelf}`);
        //     this.setState(currState => ({
        //         books: currState.books
        //                     .filter ( book => book.id !== targettedBook.id)
        //                     .concat(targettedBook)
        //     }));
        // }); 

        this.props.shelfChange(targettedBook, newShelf);
    }

    render() {
        let element = shelfTypes.map((shelf, index) => {
            const shelfBooks = this.state.books.filter((book) => book.shelf === shelf.type);
            console.group("Rendering XXXXXX");
            console.log(shelfBooks);
            console.groupEnd();
            return (<div className="bookshelf" key={index}>
                <h2 className="bookshelf-title">{shelf.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                            shelfBooks.map((book, index) => {
                                return (<li key={book.id}><Book book={book} changeShelf={this.onShelfChange} key={book.id} /></li>);
                            }
                            )
                        }
                    </ol>
                </div>
            </div>);
        });
        //console.log(element);
        return (<div>{element}</div>);
    }
}

const shelfTypes = [
    { type: 'currentlyReading', title: 'Currently Reading' },
    { type: 'wantToRead', title: 'Want to Read' },
    { type: 'read', title: 'Read' }
];

BookShelf.propTypes = {
    books: PropTypes.array,
    shelfChange: PropTypes.func.isRequired, 
}

export default BookShelf;