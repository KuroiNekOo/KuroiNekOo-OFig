const { Router } = require('express');

const {
  homePage, articlesByCategoryPage,
} = require('../controllers/homeController');

const router = Router();

router.get('/', homePage);
router.get('/categories/:categoryName', articlesByCategoryPage);

module.exports = router;
