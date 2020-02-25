import { daoFindUByUsernameAndPassword, daoFindByUserId, daoFindAllUsers, daoUpdateUser } from "../repositories/user-dao"
import { Users } from "../models/Users"
import {UserDtoToUser } from "../Util/user-dto-to-user"
import { UserDto } from "../dtos/UserDto"

//this function returns a user object if credentials are valid
  //otherwise it will throw an error
  export async function findByUsernameAndPassword(username:string, password:string):Promise<Users>{
      return await daoFindUByUsernameAndPassword(username,password)
  }

  //this function returns a user object if that matches the user id fed in
  //otherwise it will throw an error
  export async function findByUserId(userId:number){
    return await daoFindByUserId(userId)
  }

  export async function findAllUsers():Promise<Users[]>{
    // I write to a different table, who just sent this request
    // know what time of day, these requests get most sent
    return await daoFindAllUsers()
 }

export async function updateUser(user:UserDto):Promise<Users>{
  return await daoUpdateUser(user)
}