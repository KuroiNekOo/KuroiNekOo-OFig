const client = require('./database');

const figurine = {

  /**
   * Récupérer toutes les figurines existantes
   * @returns {Promise} - Promesse contenant les valeurs
   */
  async getAllFigurines() {
    const { rows } = await client.query('SELECT * FROM "figurine"');
    return rows;
  },

  /**
   * Récupérer une figurine par son id
   * @param {number} figurineId - L'id de la figurine ciblée
   * @returns {Promise} - Promesse contenant les valeurs
   */
  async getOneFigurine(figurineId) {
    const { rows: [row] } = await client.query('SELECT * FROM "figurine" WHERE "id" = $1', [figurineId]);
    return row;
  },

  /**
   * Compter toutes les figurines en les classant par catégorie
   * @returns {Promise} - Promesse contenant les valeurs
   */
  async countFigurinesByCategory() {
    const { rows } = await client.query('SELECT COUNT(*) as "nb_figurine", "category" as "name" FROM "figurine" GROUP BY "category" ORDER BY "nb_figurine" DESC');
    return rows;
  },

  /**
   * Récupérer toutes les figurines d'une catégories
   * @param {string} categoryName - Nom de la catégorie ciblée
   * @returns {Promise} - Promesse contenant les valeurs
   */
  async getFigurinesByCategory(categoryName) {
    const { rows } = await client.query('SELECT * FROM "figurine" WHERE "category" = $1', [categoryName]);
    return rows;
  },

};

module.exports = figurine;
