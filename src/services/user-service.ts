import { daoFindUByUsernameAndPassword, daoFindByUserId, daoFindAllUsers, daoUpdateUser } from "../repositories/user-dao"
import { Users } from "../models/Users"

//this function returns a user object if credentials are valid
  //otherwise it will throw an error
  export async function findByUsernameAndPassword(username:string, password:string):Promise<Users>{
      return daoFindUByUsernameAndPassword(username,password)
  }

  //this function returns a user object if that matches the user id fed in
  //otherwise it will throw an error
  export async function findByUserId(userId:number){
    return daoFindByUserId(userId)
  }

  export async function findAllUsers():Promise<Users[]>{
    // I write to a different table, who just sent this request
    // know what time of day, these requests get most sent
    return await daoFindAllUsers()
 }

export async function updateUser(userId:number,username:string,password:string,firstName:string,lastName:string,email:string,role:number):Promise<Users>{
  return await daoUpdateUser(userId,username,password,firstName,lastName,email,role)
}