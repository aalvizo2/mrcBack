const mongoose= require('mongoose')

mongoose.connect('mongodb+srv://alanestebana:alanestebana1@mrc.ns8cs.mongodb.net/', {
    useNewUrlParser: true, 
    
})
.then(() => console.log('Conectado a MongoDb localmente'))
.catch((error) => console.error('Error al conectar', error))

const productSchema= new mongoose.Schema({
    Id: String,
    Name: String,
    quantity: String,
    Price: String,
    PublicPrice: Number,
    State: Boolean,
    CreatedAt: String,
    Providor: String,
    quantity: Number,
    productTotal: String
    
})

const reportSchema= new mongoose.Schema({
    Id: String,
    cliente: String, 
    domicilio: String,
    selectedProducts: [productSchema],
    total: Number,
    CreatedAt: {type: Date, default: Date.now},
    numeroNota: String,
})



module.exports= mongoose.model('Report', reportSchema, 'reports')