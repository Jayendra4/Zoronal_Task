const Review = require('../models/Review');
const Company = require('../models/Company');

// @desc    Add review for a company
// @route   POST /api/reviews
// @access  Public
const addReview = async (req, res, next) => {
  try {
    const { companyId } = req.body;

    // Check if company exists
    const company = await Company.findById(companyId);
    if (!company) {
      res.status(404);
      throw new Error(`No company with the id of ${companyId}`);
    }

    const review = await Review.create(req.body);

    res.status(201).json({
      success: true,
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get reviews for a specific company
// @route   GET /api/reviews/company/:companyId
// @access  Public
const getCompanyReviews = async (req, res, next) => {
  try {
    const { companyId } = req.params;
    const { sort } = req.query;

    let query = Review.find({ companyId });

    // Sorting logic
    if (sort) {
      const sortMap = {
        latest: '-createdAt',
        rating: '-rating',
        likes: '-likes',
      };
      query = query.sort(sortMap[sort] || '-createdAt');
    } else {
      query = query.sort('-createdAt');
    }

    const reviews = await query;

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Like a review
// @route   PUT /api/reviews/:id/like
// @access  Public
const likeReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      res.status(404);
      throw new Error(`Review not found with id of ${req.params.id}`);
    }

    review.likes += 1;
    await review.save();

    res.status(200).json({
      success: true,
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addReview,
  getCompanyReviews,
  likeReview,
};
