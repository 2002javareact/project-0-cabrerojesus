
import * as express from 'express';
import  * as bodyParser from 'body-parser';
import { users } from './testDatabase';
import { sessionMiddleware } from './middleware/session-middleware';
import { BadCredentialsError } from './errors/BadCredentialsError';


const app = express()  

app.use('/', bodyParser.json())

//find and return all users
//only permissable to admin roles
app.get('/users',(req,res)=>{
})

//call the session middleware. 
app.use(sessionMiddleware)

app.post('/login', (req,res)=>{
  //step one, get data from user
  const {username, password} = req.body
  //step two, validate that data
  if(!username || !password){
      res.sendStatus(400).send('Please Include Username and Password')
  } 
  else {
      try {
            const user = findByUsernameAndPassword(username, password)
            req.session.user =  user
            res.status(200).json(user)
      } catch(e){
          res.sendStatus(e.status).send(e.message)
      }
  }
})


//this function returns a user object if credentials are valid
//otherwise it will throw an error
function findByUsernameAndPassword(username:string, password:string){
  for(let i=0;i<users.length;++i){
    if(username === users[i].username && password === users[i].password)
    {
      return users[i]
    }
  }
  throw new BadCredentialsError()
}


//submit reimbursement request
app.post('/reimbursement',(req,res)=>{
  const {rId, auth, amnt,  // not null
    dateSub, dateRes, descr, resol, stat, typ} = req.body

    if(rId && auth && amnt && dateSub && dateRes && descr
      && resol && stat && typ)
      {
          if(rId === 0){
                
          }
          else{
                res.send('please set responseId to 0')
          }
      }
      else{
        res.status(400).send('Please set all required information.')
      }
})

//listens to port 2020 for request
app.listen(2020, ()=>{
    console.log('app has started on port 2020');
})