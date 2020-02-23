import { PoolClient } from "pg";
import { connectionPool } from ".";
import { BadCredentialsError } from "../errors/BadCredentialsError";
import { InternalServiceError } from "../errors/InternalServiceError"
import { UserDtoToUser } from "../Util/user-dto-to-user";
import { Users } from "../models/Users";
import { findByUserId } from "../services/user-service";
import { UserNotFoundError } from "../errors/UserNotFoundError";

//functions for logging in
export async function daoFindUByUsernameAndPassword(username,password):Promise<Users>{
    let client:PoolClient//out potential connection for db
    try{
        client = await connectionPool.connect()
        let results = await client.query(`SELECT * FROM project0.users WHERE username = '${username}' and "password" = '${password}'`)
        if(results.rowCount !== 0){
            return UserDtoToUser(results.rows[0])
        }
        else{
            throw new Error("User Not Found")
        }
    }
    catch(e){
        if(e.message === 'User Not Found'){
            throw new BadCredentialsError()
        }
        else{
            throw new InternalServiceError()
        }
    }
    finally{
        client && client.release()
    }
}

//function for looking for a specific user with a user id
export async function daoFindByUserId(userId):Promise<Users>{
    let client:PoolClient
    try{
         client = await connectionPool.connect()
         let results = await client.query(`SELECT * FROM project0.users WHERE user_Id = '${userId}'`)
         if(results.rowCount !== 0)
        {
            return UserDtoToUser(results.rows[0])
        }
        else{
            throw new Error('User Not Found')
        }
    }
    catch(e){
        if(e.message === 'User Not Found'){
            throw new BadCredentialsError()
        }
        else{
            throw new InternalServiceError()
        }
    }
    finally{
        client && client.release()
    }
}

// this function gets and formats all users
export async function daoFindAllUsers():Promise<Users[]>{
    let client:PoolClient
    try{
        client = await connectionPool.connect()
        let results = await client.query('SELECT * FROM project0.users U inner join project0.role R on U."role" = R.role_id')
        return results.rows.map(UserDtoToUser)

    }catch(e){
        throw new InternalServiceError()
    } 
    finally {
        client && client.release()
    }

}

export async function daoUpdateUser(userId,username,password,firstName,lastName,email,role):Promise<Users>{
    let client:PoolClient
    try{
        client = await connectionPool.connect()
        let update = await client.query(`UPDATE project0.users SET username = '${username}', "password"= '${password}', first_name = '${firstName}', last_name = '${lastName}', email = '${email}', role = '${role}' WHERE user_id = '${userId}'`)
        let result = await client.query(`SELECT * FROM project0.users WHERE user_id = '${userId}'`)
        if(result.rowCount !== 0){
            return UserDtoToUser(result.rows[0])
        }
        else{
            throw new UserNotFoundError()
        }
    }
    catch(e){
        console.log(e)
        throw new InternalServiceError()
    }
    finally{
        client && client.release()
    }
}

