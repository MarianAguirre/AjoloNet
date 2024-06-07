import express from "express"
import cors from 'cors'

const equipos = {equipo1: {id:'1', name:'nombre', type:'router'},equipo2: {id:'2', name:'nombre2', type:'router2'} }

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (rec, res)=>{
    res.send([ {id:'5', name:'nombre2', type:'router2'},{id:'1', name:'nombre', type:'router'}, {id:'2', name:'nombre2', type:'router2'}, {id:'12', name:'nombre2', type:'switch2'}, {id:'21', name:'nombre12', type:'switch1'} ])
})

app.listen(4000, ()=> console.log('servidor corriendo en puerto 4000'))

