const express = require('express');
const router = express.Router();
const mysql =  require('../mysql').pool;

router.get('/', (req, res, next) => {    
    res.status(200).send({
        mensagem: 'retorna produtos'
    });
});

router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            'INSERT INTO produtos (nome, preco) VALUES (?, ?)',
            [req.body.nome, req.body.preco],
            (error, resultado, field) => {
                conn.release();
                
            }
        )
    })
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