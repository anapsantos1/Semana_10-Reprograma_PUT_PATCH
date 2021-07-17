const tarefasJson = require("../models/tarefas.json");


const getAll = (request, response) => {
    response.status(200).send(tarefasJson);
};

const getById = (request, response) => {
    const idRequirido = request.params.id
    const tarefaFiltrada = tarefasJson.find(tarefa => tarefa.id == idRequirido)

    response.status(200).send(tarefaFiltrada)
}

const createTask = (request, response) => {
    const descricaoRequirida = request.body.descricao
    const nomeColaboradorRequirido = request.body.nomeColaborador

    const novaTarefa = {
        id: Math.random().toString(32).substr(2, 9),
        dataInclusao: new Date(),
        concluido: false,
        descricao: descricaoRequirida,
        nomeColaborador: nomeColaboradorRequirido
    }

    tarefasJson.push(novaTarefa)


    response.status(200).send(novaTarefa)

}

const deleteTask = (request, response) => {
    const idRequirido = request.params.id
    const tarefaFiltrada = tarefasJson.find(tarefa => tarefa.id == idRequirido)

    const indice = tarefasJson.indexOf(tarefaFiltrada)
    tarefasJson.splice(indice, 1)

 
    response.status(200).json([{
        "mensagem": "Tarefa deletada com sucesso",
        tarefasJson
    }])

}

const replaceTask = (req, res) => {


    let requestedId = req.params.id;
    let TaskFromBody = req.body;
    let filteredTask = tarefasJson.find(task => task.id == requestedId);

    let updatedTask = {
        "id": filteredTask.id,
        "dataInclusao": TaskFromBody.dataInclusao,
        "concluido": TaskFromBody.concluido,
        "descricao": TaskFromBody.descricao,
        "nomeColaborador": TaskFromBody.nomeColaborador
      };

    
    let indice = tarefasJson.indexOf(filteredTask);
    tarefasJson.splice(indice, 1, updatedTask);


    res.status(201).send({
        "mensagem": "Put de substituição criado com sucesso", updatedTask
    });
};

const updateColaborador = (req, res) => {

    let requestedId = req.params.id;

    let newColaborador = req.body.nomeColaborador;

    let filteredTask = tarefasJson.find(task => task.id == requestedId)

    filteredTask.nomeColaborador = newColaborador;

    res.status(200).send({
        "mensagem": "Colaborador atualizado com sucesso", filteredTask
    });


};

const updateAnything = (req, res) => {
    
        let requestedId = req.params.id;
        
        let filteredTask = tarefasJson.find(task => task.id == requestedId)
    
        let updatedTask = req.body;
    
        let keyList = Object.keys(updatedTask);
    
        keyList.forEach((conteudo) => {
            console.log('chave', conteudo);
            filteredTask[conteudo] = updatedTask[conteudo];
        });
    
        res.status(200).send({
            "mensagem": "Titulo atualizado com sucesso", filteredTask
        });
    
    
    }


module.exports = {
    getAll,
    getById,
    createTask,
    deleteTask,
    replaceTask,
    updateColaborador,
    updateAnything
}