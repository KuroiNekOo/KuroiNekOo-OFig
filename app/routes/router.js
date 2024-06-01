const { Router } = require('express');

const router = Router();

// Router Home
router.use('/', require('./home'));

// Router article
router.use('/', require('./article'));

// Router Favoris
router.use('/', require('./bookmarks'));

// Affichage de la sitemap
const { index: sitemap } = require('../controllers/sitemapController');

router.get('/sitemap.xml', sitemap);

// Gestion 404 (Not Found)
router.use((_, res) => {
  res.render('404');
});

module.exports = router;
