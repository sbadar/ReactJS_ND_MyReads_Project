import React from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import * as BookAPI from './../api/BooksAPI';
import BookShelf from './BookShelf'
import SearchBook from './SearchBook'
import './../css/App.css';


class BooksApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [{}],
        };
        this.onShelfChange = this.onShelfChange.bind(this);
    }

    componentDidMount() {
        BookAPI.getAll().then((fetchedBooksList) => {
            console.group("BOOKSAPP ****** ")
            console.log(fetchedBooksList);
            console.groupEnd();
            this.setState({ books: fetchedBooksList });
        });

    }

    onShelfChange(targettedBook, newShelf) {
        BookAPI.update(targettedBook, newShelf).then(response =>{
            targettedBook.shelf = newShelf;
            //alert(`${targettedBook.title} Shelf changed to ${newShelf}`);
            this.setState(currState => ({
                books: currState.books
                            .filter ( book => book.id !== targettedBook.id)
                            .concat(targettedBook)
            }));
        }); 
    }

    render() {
        return(
        <div className="app">
            <Switch>
                <Route path="/search"
                        render={ ()=> (this.state.books && <SearchBook books={this.state.books} shelfChange={this.onShelfChange} key="1"/>) } />
                <Route 
                    render={ () => (<div><BookShelf books={this.state.books} shelfChange={this.onShelfChange} key="2" />  
                                    <div className="open-search" key="3">
                                        <Link to="/search">Search</Link>
                                    </div></div>)
                    } />
            </Switch>
        </div>
        )
    }
}

export default BooksApp;