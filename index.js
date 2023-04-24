require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

// Configuração do App
const app = express();
app.use(express.json());

// Configuração do Banco de Dados
mongoose.connect(process.env.MONGODB_URL);
const Tarefa = require("./models/tarefa");

// Inserção de Tarefa (POST)
app.post("/tarefas", async (req, res) => {
  try {
    // Coletar os dados do body
    const { titulo, descricao, status } = req.body;
    // Criando um novo documento do Mongo
    const tarefa = new Tarefa({ titulo, descricao, status });
    // Inserir o documento na coleção tarefas
    await tarefa.save();
    res.status(201).json(tarefa);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Um erro aconteceu." });
  }
});

// Listagem de todas as Tarefas (GET)
app.get("/tarefas", async (req, res) => {
  //Realiza a busca de todos documentos da coleção
  const tarefas = await Tarefa.find();
  res.json(tarefas);
})

// Listagem de uma Tarefa (GET)
app.get("/tarefas/:id", async (req, res) => {
  //Realiza a busca de todos documentos da coleção
  try {
    const { id } = req.params;
    //Realiza uma busca específica por um documento
    const taskExistente = await Tarefa.findById(id);
    if(taskExistente) {
      //Responde com o documento encontrado
      res.json(taskExistente) // O padrão é status(200) e quando for 200 então não precisa colocar
    } else {
      //Notifica o erro exatamente
      res.status(404).json({message: "Um erro aconteceu."});
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({message: "Um erro aconteceu."});
  }
});

// Atualização de uma Tarefa (PUT)
app.put("/tarefas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descricao, status } = req.body;
    // Caso encontre o id, realiza a atualização e dentro dessa variável retorna o objeto
    const taskExistente = await Tarefa.findByIdAndUpdate(id, {
      titulo,
      descricao,
      status
    });
    if(taskExistente){
      res.json({message: "Tarefa editada."})
    } else {
      res.status(404).json({message: "Tarefa não encontrada."});
    }
  } catch(err) {
    console.log(err);
    res.status(500).json({message: "Um erro aconteceu."});
  }
});

// Remoção de uma Tarefa (DELETE)
app.delete("/tarefas/:id", async (req, res) => {
  try {
    // Checa se a tarefa existe enquanto remove
    const { id } = req.params;
    const tarefaExistente = await Tarefa.findByIdAndRemove(id);
    if(tarefaExistente) {
      res.json({message: "Tarefa removida."});
    } else {
      res.status(404).json({message: "Tarefa não encontrada."});
    }
  } catch(err) {
    console.log(err);
    res.status(500).json({message: "Um erro aconteceu."});
  }
});


// Escuta de eventos
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000/");
});
