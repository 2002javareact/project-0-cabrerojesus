import { Request,Response,NextFunction } from "express";

export function CorsFilter(req:Request,res:Response,next:NextFunction){
    res.header('Access-Control-Allow-Origin', `${req.headers.origin}`)
    res.header('Access-Control-Allow-Headers, Origin,Content','Content-Type,Accept')
    res.header('Access-Control-Allow-Credentials','true')
    if(req.method === 'OPTIONS'){
        //This is where we send the preflight response. 
        res.sendStatus(200)
    }
    else{
        next()
    }
}