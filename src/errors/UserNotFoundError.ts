import { HttpError } from "./HttpErrors";


export class UserNotFoundError extends HttpError{
    constructor(){
        super('User not found', 404)
    }
}

