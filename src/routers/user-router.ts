import * as express from 'express'
import { sessionMiddleware } from '../middleware/session-middleware';
import { TokenExpiredError } from '../errors/TokenExpiredError';
import { findByUsernameAndPassword, findByUserId, findAllUsers, updateUser } from '../services/user-service';
import { loggingMiddleware } from '../middleware/loggin-middleware';
import { UserDto } from '../dtos/UserDto';



export const userRouter = express.Router()
userRouter.use(sessionMiddleware)

userRouter.use(loggingMiddleware)

//login object will returns user if credentials are correct and will store user into session
//will send error if data is incomplete or if credentials do not match
 userRouter.post ('/login', async (req,res)=>{
    //step one, get data from user
    const {username, password} = req.body
    //step two, validate that data
    if(!username || !password){
        res.status(400).send('Please Include Username and Password')
    } 
    else {
        try {
              const user = await findByUsernameAndPassword(username, password)
              req.session.user = user
              res.status(200).json(user);
        } catch(e){
            res.status(e.status).send(e.message)
        }
    }
  })
  
  //find and return all users
  //only permissable to financial manager roles
  //if user is financial manager will return all users
  //else will send error 
  userRouter.get('/',async (req,res)=>{
    if(req.session.user){
          try{
            if(req.session.user.role.roleId > 2){
                throw new TokenExpiredError()
            }
            else{
              const users = await findAllUsers()
              res.status(200).json(users)        
            }
        }//end of try
        catch(e){
          res.status(e.status).send(e.message)
        }//end of catch
      }else{
        res.status(400).send('Please log in.')
      }
  })

  //find and return user with the matching user id
  userRouter.get('/:id',async (req,res)=>{
    if(req.session.user){
        const {userId}=req.body
        if(isNaN(userId)){
          res.status(400).send('Please enter a valid user Id.')
        }
        else{
          try{
            if(req.session.user.role.roleId <= 2 || userId === req.session.user.userId){          
                const user = await findByUserId(userId)
                res.status(200).json(user)
            }
          else{
            throw new TokenExpiredError()
          }
        }
        catch(e){
          res.status(e.status).send(e.message)
        }
      }
    }
   else{
         res.status(400).send('Please log in')
  }
})
  
  //this function will update a user object
 userRouter.patch('/',async (req,res)=>{
  if(req.session.user){
    try{
      if(req.session.user.role.roleId === 1){
          const {userId,username,password,firstName,lastName,email,role} = req.body
            if(findByUserId(userId)){
                let user = await updateUser(new UserDto(userId,username,password,firstName,lastName,email,role))
                res.status(200).json(user)                
            }
            else{
              res.status(400).send('Please include a valid user Id.')
            }
          }
          else{
            throw new TokenExpiredError()
          }
        }
        catch(e){
          res.status(e.status).send(e.message)
        }
      }
      else{
        res.status(400).send('Please log in')
      }
    }) 


  
  
  