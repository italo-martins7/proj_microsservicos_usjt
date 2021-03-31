const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());
const lembretes = {}; //const nao pode ser alterada, mas nesse caso a variável continua apontando para o mesmo endereço de memória de um array que será "incrementado"
let contador = 0; //aqui precisa ser let pois o valor da atribuição será diferente


app.put('/lembretes', async (req, res) => {
    contador++; //vai servir de Id por enquanto
    const { texto } = req.body; //pega o conteúdo do campo texto do json
    lembretes[contador] = {
        contador, texto //cria um array com o id e o conteudo
    }
    await axios.post("http://localhost:10000/eventos", {
        tipo: "LembreteCriado",
        dados: {
            contador,
            texto,
        },
    })
    res.status(201).send(lembretes[contador]);
});

//http://localhost.porta/lembretes
app.get('/lembretes', (req, res) => {
    res.send(lembretes);
});

app.post("/eventos", (req, res) => {
    console.log(req.body);
    res.status(200).send({ msg: "ok" });
});

app.listen(4000, () => {
    console.log("Lembretes: porta 4000")
});