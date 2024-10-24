require('dotenv').config()
const mysql= require('mysql')


const pool= mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

//we will handle pool connection 
pool.getConnection((err, connection) => {
    if(err){
        console.error('Error al obtener la conexión', err)
        return
    }
    console.log('Conectado a la base de datos')

    //realease connection after using it 
    connection.release()

    //handle pool errors 
    pool.on('pool', (err) =>{
        console.error('Error en el pool de conexiones', err)
    })
})

module.exports= pool