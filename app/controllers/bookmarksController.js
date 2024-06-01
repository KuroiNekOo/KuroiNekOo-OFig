const { getOneFigurine } = require('../models/figurine');

const bookmarksController = {

  /**
   * Redirige vers la pages des favoris
   * @param {Object} req - Requête du client vers le serveur
   * @param {Object} res - Réponse du serveur vers le client
   */
  async bookmarksPage(req, res) {
    const bookmarks = req.session.bookmarks || [];

    res.render('bookmarks', {
      bookmarks,
    });
  },

  /**
   * Méthode GET servant à ajouter une figurine dans les favoris de la session
   * @param {Object} req - Requête du client vers le serveur
   * @param {Object} res - Réponse du serveur vers le client
   */
  async addBookmark(req, res) {
    try {
      req.session.bookmarks ??= [];

      const figurineId = Number(req.params.id);

      const found = req.session.bookmarks.find((bookmark) => bookmark.id === figurineId);

      if (!found) {
        const figurine = await getOneFigurine(figurineId);

        req.session.bookmarks.push(figurine);
      }

      res.redirect('/bookmarks');
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur serveur!');
    }
  },

  /**
   * Méthode GET servant à supprimer une figurine dans les favoris de la session
   * @param {Object} req - Requête du client vers le serveur
   * @param {Object} res - Réponse du serveur vers le client
   */
  async deleteBookmark(req, res) {
    try {
      req.session.bookmarks ??= [];

      const figurineId = Number(req.params.id);

      const newBookmarks = req.session.bookmarks.filter((bookmark) => bookmark.id !== figurineId);

      req.session.bookmarks = newBookmarks;

      res.redirect('/bookmarks');
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur serveur!');
    }
  },

};

module.exports = bookmarksController;
