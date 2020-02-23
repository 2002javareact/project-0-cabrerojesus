
import * as express from 'express';
import  * as bodyParser from 'body-parser';
import { userRouter } from './routers/user-router'




const app = express()  

app.use('/', bodyParser.json())

// this will register all http requests that match /users
// and redirect them to the userRouter
app.use('/', userRouter)



//listens to port 2020 for request
app.listen(2020, ()=>{
    console.log('app has started on port 2020');
})