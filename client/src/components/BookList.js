import React from 'react';
import {gql} from 'apollo-boost';
import {graphql} from 'react-apollo';

const getBooksQuery = gql`
  {
    books{
      name
      id
    }
  }
`

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

