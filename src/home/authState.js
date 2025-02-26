export class AuthState {
    static Unknown = new AuthState('unknown');
    static Unauthenticated = new AuthState('unauthenticated');
    static Authenticated = new AuthState('authenticated');

    constructor(name) {
        this.name = name;
        

 
        
    }
}