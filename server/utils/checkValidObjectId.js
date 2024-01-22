import { isValidObjectId } from "mongoose";

export default function checkValidObjectId(req, res, next) {
    if(!isValidObjectId){
        res.status(404)
        throw new Error(`Invalid Object ID: ${req.params.id}`)
    }
    next()
}