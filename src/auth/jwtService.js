import { isExpired ,decodedToken} from "react-jwt";
//const secureStore = require('../auth/cryptoService.js').secureStore;

module.exports = {

    isTokenExpired(token){
        return isExpired(token);
    },

    theDecodedToken(token){
        return decodedToken(token);
    }
}