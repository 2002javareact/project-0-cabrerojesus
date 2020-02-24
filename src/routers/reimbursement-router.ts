import * as express from 'express';
import { sessionMiddleware } from '../middleware/session-middleware';
import { loggingMiddleware } from '../middleware/loggin-middleware';
import { TokenExpiredError } from '../errors/TokenExpiredError';
import { findReimbursementByStatus, findByReimbursementAuthor, submitReimbursement } from '../services/reimbursement-service';
import { ReimbursementDto } from '../dtos/ReimbursementDto';

export const reimbursementRouter = express.Router()

reimbursementRouter.use(sessionMiddleware)

reimbursementRouter.use(loggingMiddleware)

reimbursementRouter.get('/reimbursements/status/:statusId',async (req,res)=>{
    if(req.session.user.role.role > 2){
           throw new TokenExpiredError()
    }
    else{
        try{
            const {status}=req.body
            if(status < 3 && status > 0){
            const reimbursement = await findReimbursementByStatus(status)
            res.status(200).json(reimbursement)
            }
            else{
                throw new Error('Enter a valid status number.')
            }
        } 
        catch(e){
            res.status(e.status).send(e.message)
        }
    }
})

reimbursementRouter.get('/reimbursements/author/userId/:userId',async (req,res)=>{
    const{userId}=req.body
    if(req.session.user.role.role > 2 && req.session.user.userId != userId){
        throw new TokenExpiredError()
    }
    else{
        try{
            if(!isNaN(userId)){
             const reimbursement = await findByReimbursementAuthor(userId)
             res.status(200).json(reimbursement)
               }
            else{
                throw new Error("Enter a valid user id.")
               }
            }
        catch(e){
            res.status(e.status).send(e.message)
        }
    }

})

reimbursementRouter.post('/reimbursements',async (req,res)=>{
    const{reimbursementId,author,amount,dateSubmitted,dateResolved,description,resolver,status,type}=req.body
    const reimbursement = await submitReimbursement(new ReimbursementDto(0,author,amount,dateSubmitted,dateResolved,description,resolver,3,type))
    res.status(201).json(reimbursement)
})

reimbursementRouter.patch('/users', async (req,res)=>{
    const {reimbursementId,author,amount,dateSubmitted,dateResolved,description,resolver,status,type}=req.body
    try{
        if(!reimbursementId || !author || !amount || !dateSubmitted || !dateResolved || !description || !resolver || !status || !type){
            throw new Error('Please include all fields.')
        }
        else{
                if(req.session.user.role.role <= 2){
                const reimbursement = await new ReimbursementDto(reimbursementId,author,amount,dateSubmitted,dateResolved,description,resolver,status,type)
                res.status(201).json(reimbursement)
             }
             else{
                 throw new TokenExpiredError()
             }
        }
    }
    catch(e){
        res.status(e.status).send(e.message)
    }
})
