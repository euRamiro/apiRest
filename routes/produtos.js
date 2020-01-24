const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {    
    res.status(200).send({
        mensagem: 'retorna produtos'
    });
});

router.post('/', (req, res, next) => {
    const produto = {
        nome: req.body.nome,
        preco: req.body.preco
    };
    res.status(201).send({
        mensagem: 'produto gravado...',
        produtoCriado: produto
    });
});

router.get('/:id_produto', (req, res, next) => {
    const id = req.params.id_produto;
    
    if(id === 'especial')
    {
        res.status(200).send({
            mensagem: 'id especial informado'
        });
    } else {
        res.status(200).send({
            mensagem: 'retorna produto pelo id',
            id: id
        });
    }
});

router.patch('/',(req, res, next) => {
    res.status(201).send({
        mensagem: "produto alterado"
    });
});

router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: "produto excluído"
    });
});

module.exports = router;