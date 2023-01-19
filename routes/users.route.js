import express from 'express'
import { client } from '../index.js';

import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
async function addmentorsbyId(data) {
    return await client.db('mentors').collection('mentors').insertMany(data);
}

 async function updatementorsbyId(id, data) {
    return await client.db('mentors').collection('mentors').updateOne({ id: id }, { $set: data });
}

 async function getmentorsbyId(id) {
    return await client.db('mentors').collection('mentors').findOne({ id: id });
}

 async function Deletementors(id) {
    return await client
        .db("mentors")
        .collection("mentors")
        .deleteOne({ id: id });
}

 async function getmentors() {
    return await client.db('mentors').collection('mentors').find().toArray();
}

const router = express.Router()


router.get('/borrowers',  async function(request,response){
    const result = await getmentors()
     response.send(result);
   })


   router.get('/borrowers/:id',  async function(request,response){
    const {id} = request.params;
    const result = await getmentorsbyId(id)
     response.send(result);
   })

   router.put('/borrowers/:id', async function(request,response){
    const {id} = request.params;
    const data = request.body;
    const result = await updatementorsbyId(id, data)
     response.send(result);
   })

router.post("/borrowers", async function(request,response){
const data = request.body
const result = await addmentorsbyId(data)
response.send(result)
})

router.delete("/borrowers/:id", async function (request, response) {
  const { id } = request.params;
  const result = await Deletementors(id);
  console.log(result);
  result.deletedCount > 0 ? response.send({msg:'borrowers was deleted successfully'}) : response.status(404).send({ msg: "MovieNot Found" });
});

  



  

export default router