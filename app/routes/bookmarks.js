const { Router } = require('express');

const {
  bookmarksPage, addBookmark, deleteBookmark,
} = require('../controllers/bookmarksController');

const router = Router();

router.get('/bookmarks', bookmarksPage);
router.get('/bookmarks/add/:id', addBookmark);
router.get('/bookmarks/delete/:id', deleteBookmark);

module.exports = router;
