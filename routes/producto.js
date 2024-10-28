const express= require('express')
const Router= express.Router()
const connection= require('./db')



Router.get('/api/v1/Product', (req, res) => {
    connection.query('SELECT * FROM Productos', (err, Data)=> {
        if(err){
            res.status(500).send({Message: 'Error al cargar los datos'})
        }else{
            res.status(200).json({Data})
        }
    })

})


Router.post('/api/v1/Product', (req, res) => {
    const {Name, Amount, Price, PublicPrice, Providor}= req.body
    const fecha= new Date()
    connection.query('INSERT INTO Productos (Name, Amount, Price, PublicPrice, State, CreatedAt, Providor) VALUES(?,?,?,?,?,?, ?)', [Name, Amount, Price, PublicPrice, true, fecha, Providor], (err) => {
        if(err){
            throw err 
        }else{
            res.status(200).send({Message: 'Operación realizada con éxito'})
        }
    })
})


Router.post('/api/v1/Product/:Id', (req, res) => {
    const {Id}= req.params
    const {Name, Amount, Price, PublicPrice, Providor}= req.body
    connection.query('UPDATE Productos SET Name=?, Amount=?, Price=?, PublicPrice=?, Providor=? WHERE Id=?', [Name, Amount, Price, PublicPrice, Providor, Id], (err) =>{
        if(err) throw err
        res.status(200).send({Message: 'Operación realizada con éxito'})
    })
})

Router.delete('/api/v1/Product/:Id', (req, res) =>{
    const {Id}= req.params
    connection.query('UPDATE Productos SET State=? WHERE Id=?', [false, Id], (err) => {
        if(err) throw err 
        res.status(200).send({Message: 'Operación realizada con éxito'})
    })
})

Router.post('/api/v1/Product/state/:Id', (req, res) => {
    const {Id}= req.params
    connection.query('UPDATE Productos SET State=? WHERE Id=?', [true, Id], (err) =>{
        if(err) throw err 
        res.status(200).send({Message: 'Operación realizada con éxito'})
    })
})



module.exports= Router