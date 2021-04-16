const bcrypt = require("bcryptjs");
const events = require("../../models/Event").events;
const users = require("../../models/User").user;
const booking = require("../../models/Booking").booking;
const Jwtoken = require("jsonwebtoken");
const PrivateKey = require("../helpers/secretKey").secretKey;


// for taking the user and the events 
const event = eventsId =>{
    return events.find({ _id :{ $in:eventsId } })
        .then((events)=>{
            return events.map((event)=>{
                return {
                    ...event._doc,
                    _id:event._doc._id.toString(),
                    date:new Date(event._doc.date).toISOString(),
                    creator: user.bind(this,event.creator)
                }
            })
        })
        .catch((err)=>{
            throw err;
        })
}


const eventOne =  eventId => {
    return events.findOne({_id:eventId}).then(event=>{
        return {
            ...event._doc,
            _id:event.id,
            creator: user.bind(this,event.creator)
        }
    }).catch(err=>{
        return err;
    })
}

const user = userId =>{
    return users.findById(userId)
        .then((data)=>{
            return {
                ...data._doc,
                _id:data._doc._id.toString(),
                createdEvents: event.bind(this,data.createdEvents)
            };
        })
        .catch((err)=>{
            return err;
        })
}


module.exports = {


    // =================== QUERY ==================
    events(){
        return events.find()
        .populate('creator')
        .then((events)=>{
            return events.map(event=>{
                return {
                    ...event._doc,
                    _id:event._doc._id.toString(),
                    date:new Date(event._doc.date).toISOString(),
                    creator: user.bind(this,event.creator)
                };
            })
        })
        .catch((err)=>{
            throw err;
        });
    },

    
    users(){
        return users.find().populate('createdEvents')
        .then(users=>{
            return users.map(user=>{
                return {
                    ...user._doc,
                    _id:user._doc._id.toString(),
                    createdEvents:event.bind(this,user.createdEvents)
                };
            })
        }).catch(err=>{
            return err;
        })
    },


    bookings(){
        return booking.find().populate("event").populate("user")
        .then(bookings=>{
            return bookings.map(book=>{
                return {
                    ...book._doc,
                    _id:book.id,
                    event:eventOne.bind(this,book.event),
                    user:user.bind(this,book.user)
                }
            })
        })
    },

    async getUserByEmailAndPassword(args){
        //Jwtoken
        
        return users.findOne({
            email:args.email
        })
        .populate("createdEvents")
        .then(async (data)=>{
            if(!data){
                return Error("this Email do not exists");
            }else{
                    //compare the password 
                    const verifiedPassword = await bcrypt.compare(args.password,data.password);

                    //creathe the expires time for the token
                    const expiresIn = '3h';

                    //create the token 
                    const token = await Jwtoken.sign(
                        {
                            id:data.id,
                            email:data.email
                        },
                        PrivateKey,
                        {
                            expiresIn:expiresIn
                        }
                        )

                    //if true we return the data
                if(verifiedPassword){
                    return {
                        userId:data.id,
                        token:token,
                        token_expiration:expiresIn
                    }
                }else{
                    return Error("this User doesn't exist in the database");
                }
            }

        }).catch(err=>{
            return err;
        })
    },



    // ================ MUTATION ============
    createEvent:(args)=>{
        var createdEvent;
        //create the object
        var ev = new events({
            description:args.eventInput.description,
            title:args.eventInput.title,
            price:args.eventInput.price,
            date: new Date(args.eventInput.date),
            creator:"5fb90a884ab7903170363bd6"
        });
        return ev.save()
        .then(result=>{
            createdEvent = {
                ...result._doc,
                date:new Date(event._doc.date).toISOString(),
                creator:user.bind(this,result.creator)
            };
            return users.findOne({_id:"5fb90a884ab7903170363bd6"});
        })
        .then((user)=>{
            if(!user){
                throw new Error("not a user");
            }
            user.createdEvents.push(ev);
            return user.save();
        })
        .then((result)=>{
            return createdEvent;
        })
        .catch(err=>{
            console.log(err);
            throw err;
        });
    },

    /// =============== insert User 
    createUser(args){
        return users.findOne({email:args.userInput.email}).then((user)=>{
            if(user) throw new Error("user already exists");
             //crypt the password
             return bcrypt.hash(args.userInput.password,12)
        })
        .then(resultPassword=>{
                    //create the user and insert the user
                var user = new users({
                    email:args.userInput.email,
                    password:resultPassword
                });

                return user.save().then(data=>{
                    return {...data._doc};
                }).catch(err=>{
                    return err;
                })

        }).catch(err=>{
            return err;
        });
    },

//================= insert Booking 
    createBooking(args){
        var book = new booking({
            event:args.book_input.event,
            user:args.book_input.user
        });

        //insert the booking

        return users.findById(args.book_input.user).then(result=>{
            if(!result){
                throw new Error("user not exist");
            }

            return events.findById(args.book_input.event).then(resultEvent=>{
                if(!resultEvent){
                    throw new Error("this event doesn't exist");
                }

                return book.save();
            })
        }).then(data=>{
            return {
                ...data._doc,
                _id:data.id,
                event:eventOne.bind(this,data.event),
                user:user.bind(this,data.user)
            }
        }).catch(err=>{
            return err;
        })

    },

//============= cancel booking

    async cancelBooking (args) {
        try {
            const booked = await booking.findById(args.bookId).populate("event");

            //we get the event 
            const event ={
                ...booked.event._doc,
                _id:booked.event.id,
                creator:user.bind(this,booked.event.creator)
            }

            //we delete form the database
            await booking.deleteOne({_id:args.bookId});

            //we return the event
            return event;
            
        } catch (error) {
            return new Error("an error occured during the process");
        }
        
    }







}