const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "ESTACIONAR_DB"
})

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/', (req, res) =>{
    const placa = req.body.placa;
    const hrEntrada = req.body.hrEntrada;
    const hrSalida = req.body.hrSalida;
    const min = req.body.min;
    const precio = req.body.precio;
    const tipo = req.body.tipo;

    if (hrSalida=="") {
        db.query('INSERT INTO entradas (placa, hrEntrada, hrSalida, min, precio, tipo) VALUES (?,?,?,?,?,?)',
        [placa, hrEntrada, hrSalida, min, precio, tipo],(err,result)=>{
            res.send(result);
        });
    }else{
        db.query('INSERT INTO salidas (placa, hrEntrada, hrSalida, min, precio, tipo) VALUES (?,?,?,?,?,?)',
        [placa, hrEntrada, hrSalida, min, precio, tipo],(err,result)=>{
            res.send(result);
        });
    }

    
});

app.listen(3001, () =>{
    console.log('runing in port 3001');
});
