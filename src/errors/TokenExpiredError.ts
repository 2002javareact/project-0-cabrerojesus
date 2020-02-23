import { HttpError } from "./HttpErrors";


export class TokenExpiredError extends HttpError{
    constructor(){
        super('The incoming token has expired.', 401)
    }
}