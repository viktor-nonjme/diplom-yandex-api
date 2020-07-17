const { celebrate } = require('celebrate');
const router = require('express').Router();
const articlesController = require('../controllers/articles');
const { auth } = require('../middlewares/auth');
const { verifyUserObjectId, verifyArticleObjectId } = require('../middlewares/object-id');
const { articleSchema } = require('../joi-schemas');

router.use(auth);

router.get('/', verifyUserObjectId, articlesController.getArticles);
router.post('/', verifyUserObjectId, celebrate({ body: articleSchema }), articlesController.createArticle);
router.delete('/:id', verifyUserObjectId, verifyArticleObjectId, articlesController.deleteArticle);

module.exports = router;
