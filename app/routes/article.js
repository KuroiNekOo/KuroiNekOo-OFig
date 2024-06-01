const { Router } = require('express');

const {
  articlePage,
} = require('../controllers/articleController');

const router = Router();

router.get('/article/:figurineId', articlePage);

module.exports = router;
