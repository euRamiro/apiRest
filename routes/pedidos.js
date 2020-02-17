const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

//get pedidos
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {return res.status(500).send({ error: error })}
        conn.query(
            `select p.id, p.id_produto, r.nome, r.preco, p.qtde from pedidos p
            left outer join produtos r on(r.id=p.id_produto);`,
            (error, result, field) => {
                if (error) {return res.status(500).send({ error: error })}
                const response = {
                    qtde: result.length,
                    pedidos: result.map(ped => {
                        return {
                            id: ped.id,
                            produto: {
                                id: ped.id_produto,
                                nome: ped.nome,
                                preco: ped.preco
                            },
                            qtde: ped.qtde, 
                            request: {
                                tipo: 'GET',
                                descricao: 'retorna detalhes de um pedido...',
                                url: 'http://localhost:3000/pedidos/'+ ped.id 
                            }
                        }
                    })
                }
                return res.status(200).send({ response })
            }
        )
    });
});

//insert pedido
router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {return res.status(500).send({ error: error })}
        conn.query(
            'SELECT * FROM produtos WHERE id = ?',
            [req.body.id_produto],
            (error, result, field) => {
                if (error) {return res.status(500).send({ error: error })}
                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Produto não encontrado...'
                    })
                }

                conn.query(
                    'INSERT INTO pedidos (id_produto, qtde) VALUES (?, ?)',
                    [req.body.id_produto, req.body.qtde],
                    (error, result, field) => {
                        conn.release();
                        if (error) {return res.status(500).send({ error: error })}
                        const response = {
                            mensagem: 'Pedido gravado...',
                            pedidoCriado: {
                                id: result.id, 
                                id_produto: req.body.id_produto,
                                qtde: req.body.qtde,
                                request: {
                                    tipo: 'POST',
                                    descricao: 'retorna todos os pedidos...',
                                    url: 'http://localhost:3000/pedidos'
                                }
                            }
                        }
                        return res.status(201).send({ response });
                    }
                )
            }
        )
        
    });
});

//get 1 pedido
router.get('/:id_pedido', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {return res.status(500).send({ error: error })}
        conn.query(
            `select p.id, p.id_produto, r.nome, r.preco, p.qtde from pedidos p
            left outer join produtos r on(r.id=p.id_produto) WHERE p.id = ?;`,
            [req.params.id_pedido],
            (error, result, fields) => {
                if (error) {return res.status(500).send({ error: error })}
                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'pedido não encontrado...'
                    })
                }
                const response = {
                    pedido: {
                        id: result[0].id, 
                        produto: {
                            id: result[0].id_produto,
                            nome: result[0].nome,
                            preco: result[0].preco
                        },
                        qtde: result[0].qtde,
                        request: {
                            tipo: 'GET',
                            descricao: 'retorna todos os pedidos...',
                            url: 'http://localhost:3000/pedidos'
                        }
                    }
                }
                return res.status(200).send({ response })
            }
        )
    });    
});

//update pedido
router.patch('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {return res.status(500).send({ error: error })}
        conn.query(
            'SELECT * FROM produtos WHERE id = ?',
            [req.body.id_produto],
            (error, result, field) => {
                if (error) {return res.status(500).send({ error: error })}
                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Produto não encontrado...'
                    })
                }
                conn.query(            
                    'UPDATE pedidos SET id_produto = ?, qtde = ? WHERE id = ?',
                    [req.body.id_produto, req.body.qtde, req.body.id_pedido],
                    (error, result, field) => {
                        conn.release();
                        if (error) {return res.status(500).send({ error: error })}
                        const response = {
                            mensagem: 'Pedido alterado...',
                            pedidoCriado: {
                                id: req.body.id, 
                                id_produto: req.body.id_produto,
                                qtde: req.body.qtde,
                                request: {
                                    tipo: 'GET',
                                    descricao: 'retorna detalhes de um pedido...',
                                    url: 'http://localhost:3000/pedidos/'+req.body.id
                                }
                            }
                        }
                        res.status(202).send({ response });
                    }
                )
            }
        )
        
    });
});

//delete pedido
router.delete('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {return res.status(500).send({ error: error })}
        conn.query(
            'DELETE FROM pedidos WHERE id = ?',
            [req.body.id_pedido],
            (error, result, field) => {
                conn.release();
                if (error) {return res.status(500).send({ error: error })}
                const response = {
                    mensagem: 'Pedido excluído...',
                    request: {
                        tipo: 'POST',
                        descricao: 'Grava um pedido...',
                        url: 'http://localhost:3000/pedidos',
                        body: {
                            id_produto: 'Number',
                            quantidade: 'Number'
                        }
                    }
                }
                res.status(202).send( response );
            }
        )
    });
});

module.exports = router;