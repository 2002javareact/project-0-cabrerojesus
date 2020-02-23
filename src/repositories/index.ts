//we can make one index .ts in every single folder
//index.ts is the entry point
//this is where we will set up out connection factory

//one of the most expensive parts of connecting to a db
//is making connections
//so what we do, is make all of the connections when the server start
//and then we put them in a pool, and functions can ask the pool for connection 
//functions have to give that connection back when they are done
import { Pool } from 'pg';

export const connectionPool: Pool = new Pool({
    host:process.env['project0_host'],
    user:process.env['project0_username'],
    password:process.env['project0_password'],
    database:process.env['project0_databaseName'],
    port:5432,
    max:5})
