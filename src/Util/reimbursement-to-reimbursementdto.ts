import { Reimbursement } from "../models/Reimbursement";



export function ReimbursementDtoToReimbursement(ReimbursementDtoToReimbursement):Reimbursement{
    return new Reimbursement(
        ReimbursementDtoToReimbursement.reimbursement_id,
        ReimbursementDtoToReimbursement.author,
        ReimbursementDtoToReimbursement.amount,
        ReimbursementDtoToReimbursement.date_submitted,
        ReimbursementDtoToReimbursement.date_resolved,
        ReimbursementDtoToReimbursement.description,
        ReimbursementDtoToReimbursement.resolver,
        ReimbursementDtoToReimbursement.status, 
        ReimbursementDtoToReimbursement.type
    )
}