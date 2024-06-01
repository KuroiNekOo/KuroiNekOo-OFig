const client = require('./database');

const review = {

  /**
   * Récupérer les avis d'une figurine
   * @param {number} figurineId - L'id de la figurine ciblée
   * @returns {Promise} - Promesse contenant les valeurs
   */
  async getReviewsOfFigurine(figurineId) {
    const { rows } = await client.query('SELECT * FROM "review" WHERE "figurine_id" = $1', [figurineId]);
    return rows;
  },

  /**
   * Calculer la note moyenne d'une figurine
   * @param {number} figurineId - L'id de la figurine ciblée
   * @returns {Promise} - Promesse contenant les valeurs
   */
  async avgFigurineRating(figurineId) {
    const { rows: [row] } = await client.query('SELECT AVG(note)::numeric(10) FROM "review" WHERE "figurine_id" = $1', [figurineId]);
    return row;
  },

  /**
   * Calculer la note moyenne de toutes les figures
   * @returns {Promise} - Promesse contenant les valeurs
   */
  async avgAllFigurinesRating() {
    const { rows } = await client.query('SELECT figurine_id, AVG(note)::numeric(10) FROM "review" GROUP BY "figurine_id" ORDER BY "figurine_id" ASC');
    return rows;
  },

};

module.exports = review;
