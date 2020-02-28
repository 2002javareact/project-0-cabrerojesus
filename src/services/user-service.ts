import { daoFindUByUsernameAndPassword, daoFindByUserId, daoFindAllUsers, daoUpdateUser } from "../repositories/user-dao"
import { Users } from "../models/Users"
import { UserDto } from "../dtos/UserDto"

  export async function findByUsernameAndPassword(username:string, password:string):Promise<Users>{
      return await daoFindUByUsernameAndPassword(username,password)
  }  
  export async function findByUserId(userId:number){
    return await daoFindByUserId(userId)
  }
  export async function findAllUsers():Promise<Users[]>{
    return await daoFindAllUsers()
 }

export async function updateUser(user:UserDto):Promise<Users>{
    return await daoUpdateUser(user)
}