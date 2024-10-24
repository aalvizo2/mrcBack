const express= require('express')
const Router= express.Router()
const connection= require('./db')

Router.post('/api/v1/auth', (req, res) =>{
    const {username, password}= req.body
    connection.query('SELECT * FROM administrador WHERE admin=? AND pass=?', [username, password], (err, Data) => {
        if(err) throw err 
        if(Data.length >0){
            res.status(200).send({Message: 'Operación realizada con éxito'})
        }else{
           res.status(401).send({Message: 'Error de autenticación'})
        }
    })
})


module.exports= Router