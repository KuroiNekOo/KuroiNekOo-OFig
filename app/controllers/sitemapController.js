const {
  getAllFigurines,
} = require('../models/figurine');

const sitemapController = {
  async index(req, res) {
    try {
      const figurines = await getAllFigurines();

      res.header('Content-Type', 'application/xml');
      res.render('sitemap', {
        figurines,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur lors de la génération du sitemap !');
    }
  },
};

module.exports = sitemapController;
