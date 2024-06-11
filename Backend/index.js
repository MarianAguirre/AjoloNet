import express from "express"
import cors from 'cors'

const dispositivos = {
    "users":[
        {id:'1', user:'Si', email:'router@caracoles.com'}],
    "dispositivos":[
        {id:'2',name: 'Router',type: 'Router'}]
}

const app = express()
app.use(cors())
app.use(express.json())

app.get('/users', (rec, res)=>{
    res.send(dispositivos.users)
})

app.get('/dispositivos', (rec, res)=>{
    res.send(dispositivos.dispositivos)
})

app.post("/new", (req,res)=>{
    dispositivos.push(req.body);
    res.send(req.body).status(204)
});

app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    const user = dispositivos.users.find(user => user.id === userId);
    if (user) {
    res.send(user);
    } else {
    res.status(404).send({ message: 'User not found' });
    }
});




app.listen(4000, ()=> console.log('servidor corriendo en puerto 4000'))

