const express= require('express')
const app= express()
const cors= require('cors')
const bodyParser= require('body-parser')

//routes call
const login= require('./routes/auth.js')
const clientes= require('./routes/clientes')

//PORT settings
const PORT= process.env.PORT || 4000


//Cors setthings 
const corsOptions={
    origin: 'http://localhost:5174',
    methods: ['GET', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'], 
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

//dependencies settings
app.use(bodyParser.json())


app.listen(PORT, () => {
    console.log(`app running on ${PORT}`)
})


//Routes 
app.get('/', (req, res) =>{
    res.send('Hola verga')
})

app.use('/', login)
app.use('/', clientes)



