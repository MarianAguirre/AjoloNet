import express from "express"
import cors from 'cors'

const dispositivos = [
    {id:'1', name:'nombre', type:'router'},
    {id:'2', name:'nombre2', type:'router2'}]

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (rec, res)=>{
    res.send(dispositivos)
})

app.post("/new", (req,res)=>{
    dispositivos.push(req.body);
    res.send(req.body).status(204)
});

app.delete("/delete/:id", (req,res)=>{
    const idToDelete = req.params.id;
    const indexToDelete = dispositivos.findIndex(device => device.id === idToDelete);
    if (indexToDelete !== -1) {
        dispositivos.splice(indexToDelete, 1);
        res.status(204).send();
    } else {
        res.status(404).send("Dispositivo no encontrado");
    }
});



app.listen(4000, ()=> console.log('servidor corriendo en puerto 4000'))

