const express= require('express')
const Router= express.Router()
const connection= require('./db')



Router.get('/api/v1/Providors', (req, res) => {
    connection.query('SELECT * FROM Provedores', (err, Data) => {
        if(err) throw err 
        res.status(200).json({Data})
        
    })
})

Router.post('/api/v1/Providor', (req, res) => {
    const {Name, Address, PhoneNumber}= req.body
    const fecha= new Date()
    connection.query('INSERT INTO Provedores(Name, Address, PhoneNumber, State, CreatedAt) VALUES (?,?,?,?,?)', [Name, Address, PhoneNumber, true, fecha], (err) =>{
        if(err) throw err 
        res.status(200).send({Message: 'Operación realizada con éxito'})
    })
})

Router.post('/api/v1/Providor/:Id', (req, res) => {
    const {Id} = req.params
    const {Name, Address, PhoneNumber}= req.body
    
    connection.query('UPDATE Provedores SET Name=?, Address=?, PhoneNumber=? WHERE Id=?', [Name, Address, PhoneNumber, Id], (err) => {
        if(err) throw err 
        res.status(200).send({Message: 'Operación realizada con éxito'})
    })
})

Router.delete('/api/v1/Providor/:Id', (req, res) => {
    const {Id} = req.params
    connection.query('UPDATE Provedores SET State=? WHERE Id=?', [false, Id], (err) =>{
        if(err) throw err 
        res.status(200).send({Message: 'Operación realizada con éxito'})
    })
})

Router.post('/api/v1/Providor/state/:Id', (req, res) => {
    const {Id} = req.params

    connection.query('UPDATE Provedores SET State=? WHERE Id=?', [true, Id], (err) => {
        if(err) throw err 
        res.status(200).send({Message: 'Operación realizada con éxito'})
    })
})
module.exports= Router