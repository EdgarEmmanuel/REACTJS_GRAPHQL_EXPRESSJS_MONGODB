const {buildSchema} = require("graphql");


module.exports.schema =  buildSchema(`
        type Event{
            _id:ID!
            description:String!
            title:String!
            price:Int!
            date:String!
            creator:User!
        }

        type Booking{
            _id:ID!
            event:Event!
            user:User!
            createdAt:String!
            updatedAt:String!
        }

        type User{
            _id:ID!
            email:String!
            password:String!
            createdEvents:[Event!]
        }

        type AuthData{
            userId:String!
            token:String!
            token_expiration:String!
        }

        input UserInput{
            email:String!
            password:String!
        }

        input EventInput{
            description:String!
            title:String!
            price:Int!
            date:String!
            creator:String!
        }

        input bookingInput{
            event:String!
            user:String!
        }

        type rootQuery {
            events:[Event!]!
            users:[User!]!
            bookings:[Booking!]!
            getUserByEmailAndPassword(email:String!,password:String!):AuthData!
        }

        type rootMutation{
            createEvent(eventInput:EventInput!):Event!
            createUser(userInput:UserInput!):User!
            createBooking(book_input:bookingInput):Booking!
            cancelBooking(bookId:ID!):Event!
        }

        schema {
            query:rootQuery,
            mutation:rootMutation
        }
`);