const { getOneFigurine, countFigurinesByCategory } = require('../models/figurine');
const { getReviewsOfFigurine, avgFigurineRating } = require('../models/review');

const articleController = {

  /**
   * Redirige vers la page d'un article (figurine) spécifique
   * @param {Object} req - Requête du client vers le serveur
   * @param {Object} res - Réponse du serveur vers le client
   */
  async articlePage(req, res) {
    try {
      const figurineId = Number(req.params.figurineId);

      const figurine = await getOneFigurine(figurineId);

      if (!figurine) {
        res.redirect('/404');
        return;
      }

      const countFigOfCat = await countFigurinesByCategory();

      const reviews = await getReviewsOfFigurine(figurineId) ?? [];

      const avgFigRating = await avgFigurineRating(figurineId);

      res.render('article', {
        figurine,
        reviews,
        countFigOfCat,
        avgFigRating,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur serveur!');
    }
  },

};

module.exports = articleController;
