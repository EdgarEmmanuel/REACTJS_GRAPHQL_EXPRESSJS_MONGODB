import axios from 'axios';
const secureStore = require('../auth/cryptoService.js').secureStore;

export default class User{
    constructor(email,password){
        this.email = email;
        this.password = password;
    }

    static getEmail(){
        return this.email;
    }

    static getPassword(){
        return this.password;
    }

    async loginUser(){
        const requestBody = {
            query:`
                query{
                    getUserByEmailAndPassword(
                        email:"${this.email}",
                        password:"${this.password}")
                        {
                            userId
                            token
                            token_expiration
                        }
                }
            `
        }
        return await this.makeHttpRequest(requestBody);
    }

    async makeHttpRequest(body){

        return await axios.post(
            "http://localhost:8000/graphql",
            JSON.stringify(body),
            {
                headers: {
                    'Content-Type': 'application/json'
                    }
            }
        );

    }

     async SignUpUser(){
        const requestBody = {
            query:`
                mutation{
                    createUser(userInput:
                        {
                           email:"${this.email}",
                           password:"${this.password}" 
                        }){
                            _id
                            password
                        }
                }
            `
        }
        return await this.makeHttpRequest(requestBody);
    }

    setEncryptedDetails(key,value){
        secureStore.setItem(key,value);
    }

    getDecryptedDetails(key){
        return secureStore.getItem(key);
    }

    setDetailsToken(data){
        //remove the cache values ny simulating a logout
        this.logOut()

        //set new values
        this.setEncryptedDetails('token',data.getUserByEmailAndPassword.token)

        this.setEncryptedDetails("expiration",data.getUserByEmailAndPassword.token_expiration);

        this.setEncryptedDetails("idUser",data.getUserByEmailAndPassword.userId);
    }

    logOut(){
        secureStore.clear();
    }

    getIsLoggedIn(){
        //decode token firstly 
        let decoded_Token  = this.getDecryptedDetails('token');

        //then we verify 
        if(decoded_Token === null ||  decoded_Token=== undefined ){
            return false;
        }
        return true;
    }
}