const app = require("../app")
const series = require("../models/series.json") 

series.sort((a,b)=> b.ratings.rating - a.ratings.rating)
const home = (request, response) =>{
    response.status(200).send(
        {
            "message": "Olá pessoa, seja bem vindo ao {Reprograma} flix <3<3"
        }
    )
}

const getAll = (request, response) => {
    response.status(200).send(series);
}

const getById = (request, response) => {
    const idRequerido = request.params.id;
    
    const idFiltrado = series.find(serie => serie.id == idRequerido)

    if(idRequerido === "" || idFiltrado === undefined){
        response.status(404).send({
            "message": "Favor colocar um valor valido"
        })

    }else{
        response.status(200).send(idFiltrado)
    }
    
}

const getByTitle = (request, response) =>{
   
    const requestedTitle = request.query.title.toLowerCase();
    const filteredTitle = series.find(serie => serie.title.toLowerCase().includes(requestedTitle))
    response.status(200).send(filteredTitle)

    if(requestedTitle === "" || filteredTitle === undefined){
        response.status(404).send({
            "message": "Favor colocar um valor valido"
        })

    }else{
        response.status(200).send(filteredTitle)
    }
    

}

const getByWriters = (request, response) => {
    const writersRequerido = request.query.writers

    const writersFiltrado = series.find(serie => serie.writers.includes(writersRequerido))
        
    if(writersRequerido === "" || writersFiltrado === undefined){
        response.status(404).send({
            "message": "Favor colocar um valor valido"
        })

    }else{
        response.status(200).send(writersFiltrado)
    }
        
}

const getGenre = (request, response) => {
    let seriesList = [];
    const genreRequerido = request.query.genre;

    if(genreRequerido === ""){
        response.status(404).send({
            "message": "Favor colocar um valor valido"
        })
    }else{
   
    series.forEach(serie => {
        let genreList = serie.genre;

        for(genre of genreList){
            if(genre.includes(genreRequerido)){
                
                seriesList.push(serie)
                
            
            }
        }

    })
    
}
    
response.status(200).send(seriesList)
    
}

    


module.exports = { home, getAll, getById, getByTitle, getByWriters, getGenre}