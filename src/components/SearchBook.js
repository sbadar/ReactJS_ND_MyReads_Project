import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Book from './Book';
import * as BookAPI from '../api/BooksAPI';

class SearchBook extends React.Component{
    constructor(props){
        super(props);
        this.state = {searchCriteria:'',
                     newBooks:[],
                     searchError:false};
        
        this.getBooks = this.getBooks.bind(this);
    }

    getBooks(event){
        const { books } = this.props;

        const searchCriteria = event.target.value;
        this.setState({searchCriteria: searchCriteria});

        this.setState({newBooks: [], searchError:false});
        if(searchCriteria){
            BookAPI.search(searchCriteria).then(
                resultBooks=>{
                    if(resultBooks.length>0){
                      //Update resultBooks .shelf, if they are available in current selected books.
                      var resultBooksUpdated = resultBooks.map( resultBook =>{
                        let book = books.filter( (book) => book.id === resultBook.id);
                        if (book && book.length > 0){
                          
                          resultBook.shelf = book[0].shelf;
                        }
                        else{
                          resultBook.shelf= resultBook.shelf ? resultBook.shelf:'none';
                        }
                        return resultBook;
                      });

                      //Set State.
                      this.setState({newBooks: resultBooksUpdated});
                    }
                    else{
                        this.setState({searchError: true});
                    }
                }
            )
        }

    }


    render() {
        const { searchCriteria, newBooks, searchError } = this.state;
        //const { books, changeShelf } = this.props;
    
        return (
          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">
                Close
              </Link>
              <div className="search-books-input-wrapper">
                <input
                  type="text"
                  placeholder="Search by title or author"
                  value={searchCriteria}
                  onChange={this.getBooks}
                />
              </div>
            </div>
            <div className="search-books-results">
              {newBooks.length > 0 && (
                <div>
                  <h3>Search returned {newBooks.length} books </h3>
                  <ol className="books-grid">
                    {newBooks.map(book => (
                      <Book
                        book={book}
                        key={book.id}
                        changeShelf={this.props.shelfChange}
                      />
                    ))}
                  </ol>
                </div>
              )}
              {searchError && (
                <h3>Search did not return any books. Please try again!</h3>
              )}
            </div>
          </div>
        );
      }
}

SearchBook.propTypes = {
    books:PropTypes.array.isRequired,
    shelfChange:PropTypes.func.isRequired
};
export default SearchBook;