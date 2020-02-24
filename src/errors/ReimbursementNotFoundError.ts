import { HttpError } from "./HttpErrors";


export class ReimbursementNotFoundError extends HttpError{
    constructor(){
        super('Reimbursement Not Found', 404)
    }
}