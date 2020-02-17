const express = require('express');
const router = express.Router();
const mysql =  require('../mysql').pool;

//get produtos
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {return res.status(500).send({ error: error })}
        conn.query(
            'SELECT * FROM produtos;',
            (error, result, field) => {
                if (error) {return res.status(500).send({ error: error })}
                const response = {
                    quantidade: result.length,
                    produtos: result.map(prod => {
                        return {
                            id: prod.id,
                            nome: prod.nome,
                            preco: prod.preco, 
                            request: {
                                tipo: 'GET',
                                descricao: 'retorna detalhes de um produto...',
                                url: 'http://localhost/3000/produtos/'+  prod.id 
                            }
                        }
                    })
                }
                return res.status(200).send({ response })
            }
        )
    });
});

//insert produto
router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {return res.status(500).send({ error: error })}
        conn.query(
            'INSERT INTO produtos (nome, preco) VALUES (?, ?)',
            [req.body.nome, req.body.preco],
            (error, result, field) => {
                conn.release();
                if (error) {return res.status(500).send({ error: error })}
                const response = {
                    mensagem: 'Produto gravado...',
                    produtoCriado: {
                        id: result.id, 
                        nome: req.body.nome,
                        preco: req.body.preco,
                        request: {
                            tipo: 'POST',
                            descricao: 'retorna todos os produtos...',
                            url: 'http://localhost:3000/produtos'
                        }
                    }
                }
                return res.status(201).send({ response });
            }
        )
    });
});

//get 1 produto
router.get('/:id_produto', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {return res.status(500).send({ error: error })}
        conn.query(
            'SELECT * FROM produtos WHERE id = ?;',
            [req.params.id_produto],
            (error, result, fields) => {
                if (error) {return res.status(500).send({ error: error })}
                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'produto não encontrado...'
                    })
                }
                const response = {
                    produto: {
                        id: result[0].id, 
                        nome: result[0].nome,
                        preco: result[0].preco,
                        request: {
                            tipo: 'GET',
                            descricao: 'retorna todos os produtos...',
                            url: 'http://localhost:3000/produtos'
                        }
                    }
                }
                return res.status(200).send({ response })
            }
        )
    });
});

//update produto
router.patch('/',(req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {return res.status(500).send({ error: error })}
        conn.query(
            'UPDATE produtos SET nome = ?, preco = ? WHERE id = ?',
            [req.body.nome, req.body.preco, req.body.id_produto],
            (error, result, field) => {
                conn.release();
                if (error) {return res.status(500).send({ error: error })}
                const response = {
                    mensagem: 'Produto alterado...',
                    produtoCriado: {
                        id: req.body.id, 
                        nome: req.body.nome,
                        preco: req.body.preco,
                        request: {
                            tipo: 'GET',
                            descricao: 'retorna detalhes de um produto...',
                            url: 'http://localhost:3000/produtos/'+req.body.id
                        }
                    }
                }
                res.status(202).send({ response });
            }
        )
    });
});

//delete produto
router.delete('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {return res.status(500).send({ error: error })}
        conn.query(
            'DELETE FROM produtos WHERE id = ?',
            [req.body.id_produto],
            (error, result, field) => {
                conn.release();
                if (error) {return res.status(500).send({ error: error })}
                const response = {
                    mensagem: 'Produto excluído...',
                    request: {
                        tipo: 'POST',
                        descricao: 'Grava um produto...',
                        url: 'http://localhost:3000/produtos',
                        body: {
                            nome: 'String',
                            preco: 'Number'
                        }
                    }
                }
                res.status(202).send( response );
            }
        )
    });
});

module.exports = router;