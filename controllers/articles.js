const escape = require('escape-html');
const Articles = require('../models/article');
const { BadRequestError, NotFoundError, ForbiddenError } = require('../errors');

const getArticles = (req, res, next) => {
  Articles.find({})
    .then((articles) => res.send(articles))
    .catch(next);
};

const createArticle = (req, res, next) => {
  Articles.create({
    keyword: escape(req.body.keyword),
    title: escape(req.body.title),
    text: escape(req.body.text),
    date: escape(req.body.date),
    source: escape(req.body.source),
    link: req.body.link,
    image: req.body.image,
    owner: req.user._id,
  })
    .then((article) => {
      res.status(201).send({
        id: article._id,
        keyword: article.keyword,
        title: article.title,
        text: article.text,
        date: article.date,
        source: article.source,
        link: article.link,
        image: article.image,
      });
    })
    .catch(() => next(new BadRequestError('Ошибка при создании новости')));
};

const deleteArticle = (req, res, next) => {
  Articles.findById(req.params.id)
    .select('+owner')
    .orFail(() => {
      throw new NotFoundError('Нет новости с таким id');
    })
    .then((article) => {
      if (article.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Недостаточно прав');
      }
      return Articles.deleteOne(article)
        .then(() => {
          res.send({ message: 'Новость удалена' });
        })
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
