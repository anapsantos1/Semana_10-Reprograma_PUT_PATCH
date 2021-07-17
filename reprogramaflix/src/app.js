// const { request } = require("http")
const express = require("express");
const cors = require("cors");
const movieRoutes = require("./routes/moviesRoutes");

const app = express() // instanciando o express para acessar as funcionalidades contidades nele

app.use(cors());
app.use(express.json());

// chamar as rotas
const movieRouter = require("./routes/moviesRoutes")
//definir rota raiz
app.use("/filmes", movieRouter)
// chamar as rotas
const seriesRouter = require("./routes/seriesRoutes")
//definir rota raiz
app.use("/series", seriesRouter)

module.exports = app;


