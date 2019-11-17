import React from 'react';
import {graphql} from 'react-apollo';
import {getBooksQuery} from '../queries/queries';


class BookList extends React.Component {
  
  displayBooks() {
      if (this.props.data.loading) {
        // loading
        return (
          <div>Loading books...</div>
        )
      } else {
        return this.props.data.books.map(book => {
          return(<ul key={book.id}>{book.name}</ul>);
        })
      }
  };
  
  render(){
    return (
      <div>
        <ul id="book-list">
        	{this.displayBooks()}
        </ul>
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);

