import { PoolClient } from "pg";
import { connectionPool } from ".";
import { BadCredentialsError } from "../errors/BadCredentialsError";
import { InternalServiceError } from "../errors/InternalServiceError"
import { UserDtoToUser } from "../Util/user-dto-to-user";
import { UserNotFoundError } from "../errors/UserNotFoundError";
import { UserDto } from "../dtos/UserDto"
import { Users } from "../models/Users";

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
            throw new UserNotFoundError()
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
            throw new UserNotFoundError()
        }
    }
    catch(e){
        if(e.message === 'User Not Found'){
            throw new UserNotFoundError()
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

export async function daoUpdateUser(updatedUser:UserDto):Promise<Users>{
    let client:PoolClient
    try{
        client = await connectionPool.connect()
        await client.query(`UPDATE project0.users SET username = '${updatedUser.username}', "password"= '${updatedUser.password}', first_name = '${updatedUser.first_name}', last_name = '${updatedUser.last_name}', email = '${updatedUser.email}', role = '${updatedUser.role}' WHERE user_id = '${updatedUser.user_id}'`)
        let result = await client.query(`SELECT * FROM project0.users WHERE user_id = '${updatedUser.user_id}'`)
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

