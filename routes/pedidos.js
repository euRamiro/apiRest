const express = require('express');
const router = express.Router();
const login = require('../middleware/login');

const PedidosController = require('../controllers/pedidosController');

router.get('/', login.opcional, PedidosController.getPedidos);
router.post('/', login.obrigatorio, PedidosController.postPedidos);
router.get('/:id_pedido', login.opcional, PedidosController.getUmPedido);
router.patch('/', login.obrigatorio, PedidosController.updatePedido);
router.delete('/', login.obrigatorio, PedidosController.deletePedido);

module.exports = router;