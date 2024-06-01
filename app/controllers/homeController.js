const {
  getAllFigurines, countFigurinesByCategory, getFigurinesByCategory,
} = require('../models/figurine');

const {
  avgAllFigurinesRating,
} = require('../models/review');

const homeController = {

  /**
   * Redirige vers la page d'accueil en affichant toutes les figurines
   * @param {Object} _ - Objet inutilisé
   * @param {Object} res - Réponse du serveur vers le client
   */
  async homePage(_, res) {
    try {
      const figurines = await getAllFigurines();

      const countFigOfCat = await countFigurinesByCategory();

      const avgAllFigRating = await avgAllFigurinesRating();

      res.render('accueil', {
        figurines,
        countFigOfCat,
        avgAllFigRating,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur serveur!');
    }
  },

  /**
   * Redirige vers la page affichant les figurines d'un catégorie spécifique
   * @param {Object} req - Requête du client vers le serveur
   * @param {Object} res - Réponse du serveur vers le client
   */
  async articlesByCategoryPage(req, res) {
    try {
      const { categoryName } = req.params;

      const figurines = await getFigurinesByCategory(categoryName);

      const countFigOfCat = await countFigurinesByCategory();

      const avgAllFigRating = await avgAllFigurinesRating();

      res.render('articlesByCategory', {
        figurines,
        countFigOfCat,
        avgAllFigRating,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur serveur!');
    }
  },

};

module.exports = homeController;
