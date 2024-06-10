import express from "express"
import cors from 'cors'

const dispositivos = [
    {id:'1', name:'Si', email:'router'},]

const app = express()
app.use(cors())
app.use(express.json())

app.get('/users/1', (rec, res)=>{
    res.send(dispositivos)
})

app.post("/users", (req,res)=>{
    dispositivos.push(req.body);
    res.send(req.body).status(204)
});





app.listen(4000, ()=> console.log('servidor corriendo en puerto 4000'))

