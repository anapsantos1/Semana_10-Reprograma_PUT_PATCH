const movies = require("../models/filmes.json") 


const home = (request, response) => {
    response.status(200).send(
        {
            "message": "Olá pessoa, seja bem vinda ao {reprograma}flix <3 <3 <3"
        }
    )
};

const getAll = (request, response) => {
    response.status(200).send(movies);
};

const getById = (request, response) => {
    
    const requestedId = request.params.id;

    
    const filteredId = movies.find(movie => movie.id == requestedId);

    
    response.status(200).send(filteredId);
};

const getByTitle = (request, response) => {
    
    const requestedTitle = request.query.title.toLowerCase()

   
    const filteredTitle = movies.find(movie => movie.title.toLowerCase().includes(requestedTitle))

  
    if (requestedTitle === "" || filteredTitle === undefined) {
        response.status(404).send({
            "message": "Por favor, insira um título válido."
        })
    } else {
        response.status(200).send(filteredTitle)
    }
};


const getByGenre = (request, response) => {
    
    const requestedGenre = request.query.genre;
    
    let movieList = [];

    
    movies.forEach(movie => {
       
        let genreList = movie.genre.split(",")

        for (genre of genreList) {
            if (genre.includes(requestedGenre)) {
                console.log(movie)
                movieList.push(movie)
            }
        }

    })


    response.status(200).send(movieList)
};

const createMovie = (request, response) => {

    const requestedTitle = request.body.title;
    const requestedYear = request.body.year;
    const requestedRated = request.body.rated;
    const requestedRuntime = request.body.runtime;
    const requestedGenre = request.body.genre;
    const requestedDirector = request.body.director;
    const requestedWriter = request.body.writer;
    const requestedActors = request.body.actors;
    const requestedPlot = request.body.plot;
    const requestedLanguage = request.body.language;
    const requestedCountry = request.body.country;
    const requestedAwards = request.body.awards;


    console.log(request.body)


    let newMovie = {
        "id": Math.random().toString(32).substr(2, 6),
        "title": requestedTitle,
        "year": requestedYear,
        "rated": requestedRated,
        "released": new Date(),
        "runtime": requestedRuntime,
        "genre": requestedGenre,
        "director": requestedDirector,
        "writer": requestedWriter,
        "actors": requestedActors,
        "plot": requestedPlot,
        "language": requestedLanguage,
        "country": requestedCountry,
        "awards": requestedAwards
    }

    console.log(newMovie)

    movies.push(newMovie);


    response.status(201).send({
        "mensagem": "Post criado com sucesso", newMovie
    });

  
};

const replaceMovie = (req, res) => {

   
    let requestedId = req.params.id;
    let MovieFromBody = req.body;
    let filteredMovie = movies.find(movie => movie.id == requestedId);

    let updatedMovie = {
        
        "id": filteredMovie.id,
        "title": filteredMovie.title,
        "year": filteredMovie.year,
        "rated": filteredMovie.rated,
        "released": filteredMovie.released,
        "runtime": filteredMovie.runtime,
        "genre": MovieFromBody.genre,
        "director": filteredMovie.director,
        "writer": filteredMovie.writer,
        "actors": MovieFromBody.actors,
        "plot": MovieFromBody.plot,
        "language": MovieFromBody.language,
        "country": MovieFromBody.country,
        "awards": MovieFromBody.awards

    }


    const indice = movies.indexOf(filteredMovie);
    movies.splice(indice, 1, updatedMovie);


    res.status(201).send({
        "mensagem": "Put de substituição criado com sucesso", updatedMovie
    });
};

const updateTitle = (req, res) => {

    let requestedId = req.params.id;

    let newTitle = req.body.title;

    const filteredMovie = movies.find(movie => movie.id == requestedId)
    
    filteredMovie.title = newTitle;

    res.status(200).send({
        "mensagem": "Titulo atualizado com sucesso", filteredMovie
    });


};

const updateAnything = (req, res) => {
    
        let requestedId = req.params.id;
        
        let filteredMovie = movies.find(movie => movie.id == requestedId);
    
        let updatedMovie = req.body;
    
        let keyList = Object.keys(updatedMovie);
    
        keyList.forEach((conteudo) => {
            console.log('chave', conteudo);
            filteredMovie[conteudo] = updatedMovie[conteudo];
        });
    
        res.status(200).send({
            "mensagem": "Filme atualizado com sucesso", filteredMovie
        });
    
    
}



module.exports = {
    home,
    getAll,
    getById,
    getByTitle,
    getByGenre,
    createMovie,
    replaceMovie,
    updateTitle,
    updateAnything

}