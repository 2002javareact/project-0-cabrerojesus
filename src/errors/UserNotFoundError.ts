import { HttpError } from "./HttpErrors";


export class UserNotFoundError extends HttpError{
    constructor(){
        super('User Not Found', 404)
    }
}

