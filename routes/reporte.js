const express= require('express')
const Router= express.Router()
const Report= require('./mongoDB')


Router.post('/api/v1/Sales', async(req, res) =>{
    const {cliente, selectedProducts, total, direccion, numeroNota}= req.body
    
    
    const newReport= new Report({
        cliente, 
        selectedProducts,
        total, 
        direccion, 
        CreatedAt: new Date(), 
        numeroNota
    })
    
    await newReport.save()
    res.status(200).json({Message: 'Operación realizada con éxito'})
    console.log('datos ingresados con exito')

})


Router.get('/api/v1/Sales', async (req, res) => {
    try{
        const Data = await Report.find().lean()
        res.json(Data)
    }catch(error){
        console.log('error al recuperar los datos', error)
    }
})





module.exports= Router