const express = require('express');
const router = express.Router();
const multer = require('multer');
const moment = require('moment');
const login = require('../middleware/login');
const produtosControllers = require('../controllers/produtosController');

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function(req, file, callback) {
        callback(null, moment().format('DDMMYYYY_hhmmss')+'_'+file.originalname);
    }
  });
  const fileFilter = (req, file, callback) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        callback(null, true);
    } else {
        callback(null, false);
    }
  }
  const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 //5mb
    },
    fileFilter: fileFilter
  });

router.get('/', login.opcional, produtosControllers.getProdutos);
router.get('/:id_produto', produtosControllers.getUmProduto);
router.post('/', login.obrigatorio, upload.single('produto_imagem'), produtosControllers.postProdutos);
router.patch('/', login.obrigatorio, produtosControllers.updateProdutos);
router.delete('/', login.obrigatorio, produtosControllers.deleteProduto);

module.exports = router;