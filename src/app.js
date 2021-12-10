import { GraphQLServer } from "graphql-yoga";
import "dotenv/config";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";


const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(() => {
    console.log("The server is running");
})