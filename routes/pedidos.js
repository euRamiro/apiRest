const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: "retorna pedidos"
    });
});

router.post('/', (req, res, next) => {
    const pedido = {
        id_produto: req.body.id_produto,
        quantidade: req.body.quantidade
    }
    res.status(201).send({
        mensagem: "pedido foi gravado",
        pedidoCriado: pedido
    });
});

router.get('/id_pedido', (req, res, next) => {
    const id = req.params.id_pedido
    
    res.status(200).send({
        mensagem: "retorna um pedido pelo id",
        id_pedido: id
    });
    
});

router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: "pedido excluído"
    });
});

module.exports = router;