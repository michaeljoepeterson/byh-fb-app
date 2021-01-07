import {Subject} from 'rxjs';

class AuthService{
    currentFbToken = null;

    constructor(){
        this.currentFbToken = new Subject();
    }
}
let authService = new AuthService();
export default authService;