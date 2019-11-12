const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, 
		GraphQLString, 
		GraphQLSchema, 
		GraphQLInt, 
		GraphQLList, 
		GraphQLID } = graphql;

//dummy data
var books = [
	{name: 'Ass Biscuits', genre: 'Factual', id: '1', authorId: '1'},
	{name: 'The Toilet Wars', genre: 'Fantasy', id: '2', authorId: '2'},
	{name: 'Harry Potter is for Kids', genre: 'Factual', id: '3', authorId: '2'}
];

var authors = [
	{name: 'Stuart Bunsize', age: 21, id: '1'},
	{name: 'Adam Ale', age: 3, id: '2'},
	{name: 'Andrea Spark', age: 59, id: '3'}
];

const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: { type: GraphQLID},
		name: { type: GraphQLString},
		genre: {type: GraphQLString},
		author: {
			type: AuthorType,
			resolve(parent, args) {
				return _.find(authors, {id: parent.authorId} )
			}
		}
	})
});
  
const AuthorType = new GraphQLObjectType({
	name: 'Author',
	fields: () => ({
		id: { type: GraphQLID},
		name: { type: GraphQLString},
		age: {type: GraphQLInt},
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args){
				return _.filter(books, {authorId: parent.id})
			}
		}
	})
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		book: {
			type: BookType,
			args: {id: {type: GraphQLID}},
			resolve(parent, args) {
				// code to get data from db / other source
				return _.find(books, {id: args.id});
			}
		},
		author: {
			type: AuthorType,
			args: {id: {type: GraphQLID}},
			resolve(parent, args) {
				// code to get data from db / other source
				return _.find(authors, {id: args.id});
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});