const { model, Schema } = require("mongoose");

// titulo, descrição, status(finalizada/pendente)
const Tarefa = model(
    "tarefa",
    new Schema({ //validação do documento
        titulo: {
            type: String, //String, Number, Boolean
            required: true, //faz igual ao null lá do MySQL, que torna obrigatório
        },
        descricao: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            default: "pendente", //finalizada
        },
    })
);
module.exports = Tarefa;