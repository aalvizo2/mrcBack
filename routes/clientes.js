const express= require('express')
const Router= express.Router()
const connection= require('./db')


Router.get('/api/v1/Client', (req, res) => {
    connection.query('SELECT * FROM clientes', (err, Data)=> {
        if(err){
            res.status(500).send({Message: 'Error al cargar los datos'})
        }else{
            res.status(200).json({Data})
        }
    })
})

Router.post('/api/v1/Client/new', (req, res) =>{
    const {FullName, Address, IsCredit}= req.body
    
    connection.query('INSERT INTO clientes (FullName, Address, IsCredit, State) VALUES(?,?,?,?)', [FullName, Address, IsCredit, true], (err) =>{
        if(err){
            res.status(500).send({Message: 'Hubo un error al crear'})
            throw err
        }else{
            res.status(200).send({Message: 'Operación realizada con éxito'})
        }
    })
})

Router.post('/api/v1/Client/:Id', (req, res)=> {
    const {Id}= req.params
    const {FullName, Address, IsCredit}= req.body
    connection.query('UPDATE clientes SET FullName=?, Address=?, IsCredit=? WHERE Id=?', [FullName, Address, IsCredit, Id], (err) =>{
        if(err){
            res.status(500).send({Message: 'Hubo un error en el servidor'})
            throw err
        }else{
            res.status(200).send({Message: 'Operación realizada con éxito'})
        }
    })
})

Router.delete('/api/v1/Client/:Id', (req, res) => {
    const {Id}= req.params

    connection.query('UPDATE clientes SET State=? WHERE Id=?', [false, Id], (err) =>{
        if(err) throw err
        res.status(200).send({Message: 'Operación realizada con éxito'})
    })
})

Router.post('/api/v1/Client/state/:Id', (req, res) => {
    const {Id}= req.params
    connection.query('UPDATE clientes SET State=? WHERE Id=?', [true, Id], (err) =>{
        if(err) throw err
        res.status(200).send({Message: 'Operación realizada con éxito'})
    })
})


module.exports= Router