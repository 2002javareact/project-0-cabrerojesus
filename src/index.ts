import * as express from 'express';
import  * as bodyParser from 'body-parser';
import { userRouter } from './routers/user-router'
import  { reimbursementRouter } from './routers/reimbursement-router'
import {  CorsFilter } from './middleware/cors-filter';

const app = express()  


app.use('/', bodyParser.json())
app.use(CorsFilter)

// this will register all http requests that match /users
// and redirect them to the userRouter and the reimbursementRouter
app.use('/users', userRouter)
app.use('/reimbursements',reimbursementRouter)



//listens to port 2020 for request
app.listen(2020, ()=>{
    console.log('app has started on port 2020');
})