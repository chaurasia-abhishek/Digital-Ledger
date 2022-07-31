const mongooseIdCheck = require('mongoose').Types.ObjectId;

const checkId=(req, res, next)=>{
const id=req.params.id;
if(!mongooseIdCheck.isValid(id))
return res.status(401).send('please send a valid Id')
next()
}
module.exports=checkId