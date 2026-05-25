const express = require('express');
const router = express.Router();
const {
  addReview,
  getCompanyReviews,
  likeReview,
} = require('../controllers/reviewController');

router.route('/')
  .post(addReview);

router.route('/company/:companyId')
  .get(getCompanyReviews);

router.route('/:id/like')
  .put(likeReview);

module.exports = router;
