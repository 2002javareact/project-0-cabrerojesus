import { HttpError } from "./HttpErrors";


export class BadCredentialsError extends HttpError{
    constructor(){
        super('Invalid Credentials', 400)
    }
}