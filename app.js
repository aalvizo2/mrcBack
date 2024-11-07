const express= require('express')
const app= express()
const cors= require('cors')
const bodyParser= require('body-parser')



//routes call
const login= require('./routes/auth.js')
const clientes= require('./routes/clientes')
const producto= require('./routes/producto')
const provedores= require('./routes/provedores')
const reporte= require('./routes/reporte')

//PORT settings
const PORT= process.env.PORT || 4000


//Cors setthings 
const corsOptions={
    origin: ['http://localhost:5174', 'https://aalvizo2.github.io/mrcFront/'],
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
app.use('/', producto)
app.use('/', provedores)
app.use('/', reporte)







