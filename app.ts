import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} from 'graphql';

// Datos de ejemplo (simulación de una base de datos)
const authors = [
  { id: '1', name: 'J.K. Rowling' },
  { id: '2', name: 'George R.R. Martin' },
];

const books = [
  { id: '1', title: 'Harry Potter and the Sorcerer\'s Stone', authorId: '1' },
  { id: '2', title: 'A Game of Thrones', authorId: '2' },
  { id: '3', title: 'Harry Potter and the Chamber of Secrets', authorId: '1' },
  { id: '4', title: 'A Clash of Kings', authorId: '2' },
];

// Definir un tipo Author
const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
  }),
});

// Definir un tipo Book
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    authorId: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve: (parent, args) => {
        return authors.find((author) => author.id === parent.authorId);
      },
    },
  }),
});

// Definir la raíz de la consulta GraphQL
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve: (parent, args) => {
        return books.find((book) => book.id === args.id);
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLString } },
      resolve: (parent, args) => {
        return authors.find((author) => author.id === args.id);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve: () => {
        return books;
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve: () => {
        return authors;
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
});

const app = express();

app.use(
  '/books',
  graphqlHTTP({
    schema: schema,
    graphiql: true, // Habilitar la interfaz de GraphiQL en /books
  })
);

app.listen(4000, () => {
  console.log('Servidor GraphQL escuchando en http://localhost:4000/books');
});
