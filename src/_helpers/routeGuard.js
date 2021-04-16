//import { GuardProvider, GuardedRoute } from 'react-router-guards';
import User from '../http/serviceUser';

const requireLogin = (to, from, next) => {
    const user = new User();
    console.log(user.getIsLoggedIn());
    if(user.getIsLoggedIn()) {
        next();
    }
    next.redirect('/');
};

export default requireLogin;