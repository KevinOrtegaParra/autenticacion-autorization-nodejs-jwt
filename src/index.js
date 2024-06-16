const express = require('express');
const {mongoConnet} = require('./databases/config');
const usuarioRoutes = require('./routes/usuario');
const marcaRoutes = require('./routes/marca');
const tipoEquipoRoutes = require('./routes/tipoEquipo');
const estadoEquipoRoutes = require('./routes/estadoEquipo');
const inventarioRoutes = require('./routes/inventario');
const authRoutes = require('./routes/auth');

const dotenv = require("dotenv").config();
const cors = require('cors');
mongoConnet();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: '*'
}))

app.listen(port,() => console.log("server listenig on sport", port));

//Middleware
app.use(express.json());
app.use('/api/v1',authRoutes);
app.use('/api/v1',usuarioRoutes);
app.use('/api/v1',marcaRoutes);
app.use('/api/v1',tipoEquipoRoutes);
app.use('/api/v1',estadoEquipoRoutes);
app.use('/api/v1',inventarioRoutes);

//routes
app.get("/",(req,res)=>{
    res.send("Welcome to my api");
})

app.get("*",(req,res)=>{
    res.status(404).json({
        msj: "No encontrado",
        status: 404
    })
})