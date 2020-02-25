import * as express from 'express';
import { sessionMiddleware } from '../middleware/session-middleware';
import { loggingMiddleware } from '../middleware/loggin-middleware';
import { TokenExpiredError } from '../errors/TokenExpiredError';
import { findReimbursementByStatus, findByReimbursementAuthor, submitReimbursement, updateReimbursement } from '../services/reimbursement-service'
import { ReimbursementDto } from '../dtos/ReimbursementDto';

export const reimbursementRouter = express.Router()

reimbursementRouter.use(sessionMiddleware)

reimbursementRouter.use(loggingMiddleware)

//this function searches reimbursements by status id
reimbursementRouter.get('/status/:statusId',async (req,res)=>{
try{
    if(req.session.user.role.roleId === 3){
           throw new TokenExpiredError()
    }
    else{    
            const {statusId}=req.body
            if(statusId < 3 && statusId > 0){
            const reimbursement = await findReimbursementByStatus(statusId)
            res.status(200).json(reimbursement)
            }
            else{
                throw new Error('Enter a valid status number.')
            }
        }
    } 
        catch(e){
            res.status(e.status).send(e.message)
        }
})

//this function searches by author
reimbursementRouter.get('/author/:userId',async (req,res)=>{
    const{userId}=req.body
    try{
        if(req.session.user.role.roleId > 2 && req.session.user.userId != userId){
            throw new TokenExpiredError()
        }
        else{
                if(!isNaN(userId)){
                const reimbursement = await findByReimbursementAuthor(userId)
                res.status(200).json(reimbursement)
                }
                else{
                    throw new Error("Enter a valid user id.")
                }
              }
            }
            catch(e){
                res.status(e.status).send(e.message)
            }
})

//this function submits a new reimbursement
reimbursementRouter.post('/',async (req,res)=>{
        try{
            const{amount,dateSubmitted,description,type}=req.body
            if(amount && dateSubmitted && description && type){
                const reimbursement = await submitReimbursement(new ReimbursementDto(0,req.session.user.userId,amount,dateSubmitted,dateSubmitted,description,null,3,type))
                res.status(201).json(reimbursement)
            }
            else{
                throw new Error("Please provide all information required for reimbursement.")
            }
    }
    catch(e){
            res.status(e.status).send(e.message)
    }
})

//this function updates a reimbursement
reimbursementRouter.patch('/users', async (req,res)=>{
    const {reimbursementId,author,amount,dateSubmitted,dateResolved,description,resolver,status,type}=req.body
    try{
        if(!reimbursementId){
            throw new Error('Please include a reimbursement id.')
        }
        else{
                if(req.session.user.role.roleId <= 2){
                const reimbursement = await updateReimbursement(new ReimbursementDto(reimbursementId,author,amount,dateSubmitted,dateResolved,description,resolver,status,type))
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
