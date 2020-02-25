import { ReimbursementDto } from "../dtos/ReimbursementDto";
import { Reimbursement } from "../models/Reimbursement";
import { daoSubmitReimbursement, daoUpdateReimbursement, daoFindByReimbursementStatus, daoFindByReimbursementAuthor } from "../repositories/reimbursement-dao"

export async function submitReimbursement(newReimbursement:ReimbursementDto):Promise<Reimbursement>
{
    return daoSubmitReimbursement(newReimbursement)
}

export async function updateReimbursement(reimbursement:ReimbursementDto):Promise<Reimbursement>
{
    return daoUpdateReimbursement(reimbursement)
}

export async function findReimbursementByStatus(status:number):Promise<Reimbursement[]>
{
    return daoFindByReimbursementStatus(status)
}

export async function findByReimbursementAuthor(userId:number):Promise<Reimbursement[]>
{
    return daoFindByReimbursementAuthor(userId)
}