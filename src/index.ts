import * as express from 'express';
import  * as bodyParser from 'body-parser';
import { userRouter } from './routers/user-router'
import  { reimbursementRouter } from './routers/reimbursement-router'
import {  corsFilter } from './middleware/cors-filter';
import { loggingMiddleware } from './middleware/loggin-middleware';

const app = express()  


app.use('/', bodyParser.json())
app.use(corsFilter)
app.use(loggingMiddleware)

// this will register all http requests that match /users
// and redirect them to the userRouter and the reimbursementRouter
app.use('/users', userRouter)
app.use('/reimbursements',reimbursementRouter)


//login object will returns user if credentials are correct and will store user into session
//will send error if data is incomplete or if credentials do not match




//listens to port 2020 for request
app.listen(2020, ()=>{
    console.log('app has started on port 2020');
})