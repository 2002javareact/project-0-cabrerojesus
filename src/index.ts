import * as express from 'express';
import  * as bodyParser from 'body-parser';
import { userRouter } from './routers/user-router'
import  { reimbursementRouter } from './routers/reimbursement-router'
import {  corsFilter } from './middleware/cors-filter';
import { findByUsernameAndPassword } from './services/user-service';
import { sessionMiddleware } from './middleware/session-middleware';
import { loggingMiddleware } from './middleware/loggin-middleware';

const app = express()  


app.use('/', bodyParser.json())
app.use(corsFilter)
app.use(sessionMiddleware)
app.use(loggingMiddleware)

// this will register all http requests that match /users
// and redirect them to the userRouter and the reimbursementRouter
app.use('/users', userRouter)
app.use('/reimbursements',reimbursementRouter)


//login object will returns user if credentials are correct and will store user into session
//will send error if data is incomplete or if credentials do not match
app.post ('/login', async (req,res)=>{
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
  



//listens to port 2020 for request
app.listen(2020, ()=>{
    console.log('app has started on port 2020');
})