"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_graphql_1 = require("express-graphql");
const graphql_1 = require("graphql");
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
const AuthorType = new graphql_1.GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: graphql_1.GraphQLString },
        name: { type: graphql_1.GraphQLString },
    }),
});
// Definir un tipo Book
const BookType = new graphql_1.GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: graphql_1.GraphQLString },
        title: { type: graphql_1.GraphQLString },
        authorId: { type: graphql_1.GraphQLString },
        author: {
            type: AuthorType,
            resolve: (parent, args) => {
                return authors.find((author) => author.id === parent.authorId);
            },
        },
    }),
});
// Definir la raíz de la consulta GraphQL
const RootQuery = new graphql_1.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: graphql_1.GraphQLString } },
            resolve: (parent, args) => {
                return books.find((book) => book.id === args.id);
            },
        },
        author: {
            type: AuthorType,
            args: { id: { type: graphql_1.GraphQLString } },
            resolve: (parent, args) => {
                return authors.find((author) => author.id === args.id);
            },
        },
        books: {
            type: new graphql_1.GraphQLList(BookType),
            resolve: () => {
                return books;
            },
        },
        authors: {
            type: new graphql_1.GraphQLList(AuthorType),
            resolve: () => {
                return authors;
            },
        },
    },
});
const schema = new graphql_1.GraphQLSchema({
    query: RootQuery,
});
const app = (0, express_1.default)();
app.use('/books', (0, express_graphql_1.graphqlHTTP)({
    schema: schema,
    graphiql: true, // Habilitar la interfaz de GraphiQL en /books
}));
app.listen(4000, () => {
    console.log('Servidor GraphQL escuchando en http://localhost:4000/books');
});
//# sourceMappingURL=app.js.map