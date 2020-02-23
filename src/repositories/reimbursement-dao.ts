import { ReimbursementDto } from "../dtos/ReimbursementDto"
import { PoolClient } from "pg"
import { connectionPool } from "."
import { BadCredentialsError } from "../errors/BadCredentialsError"
import { InternalServiceError } from "../errors/InternalServiceError"



export async function daoSaveOneReimbursement(bewReimbursement:ReimbursementDto):Promise<ReimbursementDto>{
    let client:PoolClient
    try{
        client = await connectionPool.connect()
        let result = await client.query('INSERT INTO project0.Reimbursement(reimbursement_id, author, amount, date_submitted, date_resolved, description, resolver, status, type')
        return new ReimbursementDto(
            result.rows[0].reimbursement_id,
            result.rows[0].author, 
            result.rows[0].amount,
            result.rows[0].date_submitted,
            result.rows[0].date_resolved,
            result.rows[0].description,
            result.rows[0].resolver,
            result.rows[0].status,
            result.rows[0].type
        )
    }
    catch(e){
        if(e.message === 'User Not Found'){
            throw new BadCredentialsError()
        }
        else{
            console.log(e)
            throw new InternalServiceError()
        }
    }
    finally{
        client && client.release()
    }
}
