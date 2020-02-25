import { ReimbursementDto } from "../dtos/ReimbursementDto"
import { PoolClient } from "pg"
import { connectionPool } from "."
import { InternalServiceError } from "../errors/InternalServiceError"
import { ReimbursementDtoToReimbursement } from "../Util/reimbursement-to-reimbursementdto"
import { Reimbursement } from "../models/Reimbursement"
import { ReimbursementNotFoundError } from "../errors/ReimbursementNotFoundError"



export async function daoSubmitReimbursement(newReimbursement:ReimbursementDto):Promise<Reimbursement>{
    let client:PoolClient
    try{
        client = await connectionPool.connect()
        let newReim = await client.query(`INSERT INTO project0.reimbursement(author, amount, date_submitted, date_resolved, description,status,"type") VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING reimbursement_id;`,
        [newReimbursement.author,newReimbursement.amount,newReimbursement.date_submitted,newReimbursement.date_resolved,newReimbursement.description,newReimbursement.status,newReimbursement.type])
        let result = await client.query(`SELECT * FROM project0.reimbursement WHERE "reimbursement_id"= $1;`,[newReim.rows[0].reimbursement_id])
        return  ReimbursementDtoToReimbursement(result.rows[0])     
        }
    catch(e){
        console.log(e)
        throw new InternalServiceError()
    }
    finally{
        client && client.release()
    }
}

export async function daoUpdateReimbursement(reimbursement:ReimbursementDto):Promise<Reimbursement>{
    let client:PoolClient
    try{
        client = await connectionPool.connect()
        const reim = await client.query(`SELECT * FROM project0.reimbursement WHERE reimbursement_id = $1;`,[reimbursement.reimbursement_id])

        reimbursement.author = reimbursement.author || reim.rows[0].author
        reimbursement.amount = reimbursement.amount || reim.rows[0].amount
        reimbursement.date_submitted = reimbursement.date_submitted || reim.rows[0].date_submitted
        reimbursement.date_resolved = reimbursement.date_resolved || reim.rows[0].date_resolved
        reimbursement.description = reimbursement.description || reim.rows[0].description
        reimbursement.resolver = reimbursement.resolver || reim.rows[0].resolver
        reimbursement.status = reimbursement.status || reim.rows[0].status
        reimbursement.type = reimbursement.type || reim.rows[0].type


        await client.query(`UPDATE project0.reimbursement SET author = $1, amount = $2, date_submitted = $3, date_resolved = $4, description = $5, resolver = $6, status = $7, "type" = $8 WHERE reimbursement_id = $9;`,[reimbursement.author,reimbursement.amount,reimbursement.date_submitted,reimbursement.date_resolved,reimbursement.description,reimbursement.resolver,reimbursement.status,reimbursement.type,reimbursement.reimbursement_id])
        let result = await client.query(`SELECT * FROM project0.reimbursement WHERE reimbursement_id = $1;`,[reimbursement.reimbursement_id])
        return ReimbursementDtoToReimbursement(result.rows[0])
    }
    catch(e){
        console.log(e)
        if(e.message === 'Reimbursement Not Found'){
            throw new ReimbursementNotFoundError()
        }
        else{
            throw new InternalServiceError()
        }
    }
    finally{
        client && client.release()
    }
}

export async function daoFindByReimbursementStatus(status:number):Promise<Reimbursement[]>{
    let client:PoolClient
    try{
        client = await connectionPool.connect()
        let result = await client.query(`SELECT * FROM project0.reimbursement WHERE status = $1;`,[status])
        if(result.rowCount !== 0){
            return result.rows.map(ReimbursementDtoToReimbursement)
        }
        else{
            throw new ReimbursementNotFoundError()
        }
    }catch(e){
        console.log(e)
        if(e.message === 'Reimbursement Not Found'){
            throw new ReimbursementNotFoundError()
        }
        else{
            throw new InternalServiceError()
        }
    }
    finally{
        client && client.release()
    }
}

export async function daoFindByReimbursementAuthor(userId:number):Promise<Reimbursement[]>{
    let client:PoolClient
    try{
        client = await connectionPool.connect()
        let result = await client.query(`SELECT * FROM project0.reimbursement WHERE author = $1;`,[userId])
        if(result.rowCount !== 0){
            return result.rows.map(ReimbursementDtoToReimbursement)
            }
        else{
            throw new ReimbursementNotFoundError()
        }
    }
    catch(e){
        if(e.message === 'Reimbursement Not Found'){
            throw new ReimbursementNotFoundError()
        }
        else{
            throw new InternalServiceError()
        }
    }
    finally{
        client && client.release()
    }
}
