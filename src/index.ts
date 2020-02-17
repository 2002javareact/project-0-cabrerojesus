
import * as express from 'express'
import { users } from './testDatabase';
import bodyParser = require('body-parser');
import { Users } from './models/Users';


const app = express()  

app.use('/', bodyParser.json())

app.get('/', (req,res)=>{
    //get all of our users
    //format them to json
    //use the response obj to send them back
    res.json(users)// this will format the object into json and send it back    
})



app.post('/', (req,res)=>{
  let {username, password} = req.body

  if(username && password)
  {
    for(let i = 0; i<users.length; ++i)
    {
      if(users[i].username === username && users[i].password)
      {
         res.status(202).json(users[i])
      }
    }
  }
  else
  {
    res.status(400).send('Please enter a username and a password')
  }    
})

app.listen(2020, ()=>{
    console.log('app has started on port 2020');
})