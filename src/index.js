import { GraphQLServer } from "graphql-yoga";

const users = [
    {
        id: "171239",
        name: "Uzair",
        email: "uzair@gmail.com",
        age: 22
    },
    {
        id: "171213",
        name: "Hamza",
        email: "hamza@gmail.com"
    },
]

const comm = [
    {
        id: "1",
        text: "this is comment 1",
        author: "171213"
    },
    {
        id: "2",
        text: "this is comment 2",
        author: "171239"
    },
    {
        id: "3",
        text: "this is comment 3",
        author: "171239"
    },
    {
        id: "4",
        text: "this is comment 4",
        author: "171213"
    },
]

const posts = [
    {
        id: "01",
        title: "Java",
        body: "this is java book",
        published: false,
        author: "171239"
    },
    {
        id: "02",
        title: "Java-sript",
        body: "this is java-script book",
        published: true,
        author: "171213"
    },
    {
        id: "03",
        title: "C++",
        body: "this is c++ book",
        published: false,
        author: "171239"
    }
]

// type definition (schema)
const typeDefs = `
    type Query {
        me: User!
        post(query: String): [Post!]!
        users(query: String): [User!]!
        comments: [Comments]
    }
    type Comments {
        id: ID!
        text: String!
        author: User!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post]
        comments: [Comments]
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
    }
`

// Resolvers -----> functions
const resolvers = {
    // greeting(parent, args, ctx, info) {
    Query: {
        me() {
            return {
                id: '171239',
                name: "Uzair",
                email: "uxairjan3@gmail.com",
                age: 22
            }
        },
        post(parent, args, ctx, info) {
            if (!args.query) return posts

            return posts.filter(post => {
                return (post.title.toLocaleLowerCase().includes(args.query.toLowerCase()) || post.body.toLocaleLowerCase().includes(args.query.toLowerCase()))
            });
        },
        users(parent, args, ctx, info) {
            if (!args.query) return users

            return users.filter(user => {
                return user.name.toLowerCase().includes(args.query.toLowerCase())
            })
        },
        comments(parent, args, ctx, info){
            return comm;
        }

    },
    Post: {
        author(parent, args, ctx, info) {
            return users.find(user => {
                return user.id === parent.author
            })
        }
    },
    User: {
        posts(parent, args, ctx, info) {
            return posts.filter(post => {
                return post.author === parent.id
            })
        },
        comments(parent, args, ctx, info) {
            return comm.filter(com => {
                return com.author === parent.id
            })
        }
    },
    Comments: {
        author(parent, args, ctx, info) {
            return users.find(user => {
                return user.id === parent.author
            })
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(() => {
    console.log("The server is running");
})