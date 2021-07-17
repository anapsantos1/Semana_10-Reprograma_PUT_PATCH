<h1>Semana 10 - API - Metodos_GET_POST_DELETE_PUT_PATCH - Reprograma 🚀</h1>

Aluna : [Ana Paula Lima ](https://www.linkedin.com/in/ana-paula-lima-3269214b/#) 

Prof.: Paula Allemand 

<h4>Exercício da semana</h4>

Essa semana completamos o CRUD adicionando os metodos PUT e PATCH aos projetos reprogramaflix e do to-do-api.

Exemplos de uso do PUT e do PATCH:

PUT altera um objeto:

```
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
```

Primeiro exemplo do PATCH alterando o nome do colaborador:

```
const updateColaborador = (req, res) => {

    let requestedId = req.params.id;

    let newColaborador = req.body.nomeColaborador;

    let filteredTask = tarefasJson.find(task => task.id == requestedId)

    filteredTask.nomeColaborador = newColaborador;

    res.status(200).send({
        "mensagem": "Colaborador atualizado com sucesso", filteredTask
    });
};
```



Segundo exemplo do PATCH alterando qualquer informação do objeto:

```
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
```

