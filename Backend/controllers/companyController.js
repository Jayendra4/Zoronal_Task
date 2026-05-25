const Company = require('../models/Company');

// @desc    Add new company
// @route   POST /api/companies
// @access  Public (Can be restricted to Admin later)
const addCompany = async (req, res, next) => {
  try {
    const company = await Company.create(req.body);
    res.status(201).json({
      success: true,
      data: company,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all companies with search, filter, and sort
// @route   GET /api/companies
// @access  Public
const getAllCompanies = async (req, res, next) => {
  try {
    let query;
    const reqQuery = { ...req.query };

    // Fields to exclude from matching
    const removeFields = ['search', 'sort', 'page', 'limit'];
    removeFields.forEach((param) => delete reqQuery[param]);

    // 1. Filtering (e.g., city)
    query = Company.find(reqQuery);

    // 2. Search by Name (Regex)
    if (req.query.search) {
      const search = req.query.search;
      query = query.find({
        name: { $regex: search, $options: 'i' },
      });
    }

    // 3. Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort;
      // Map frontend sort keys to DB fields
      const sortMap = {
        latest: '-createdAt',
        rating: '-averageRating',
        name: 'name',
      };
      query = query.sort(sortMap[sortBy] || '-createdAt');
    } else {
      query = query.sort('-createdAt');
    }

    // Execute query
    const companies = await query;

    res.status(200).json({
      success: true,
      count: companies.length,
      data: companies,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single company
// @route   GET /api/companies/:id
// @access  Public
const getSingleCompany = async (req, res, next) => {
  try {
    const company = await Company.findById(req.params.id).populate('reviews');

    if (!company) {
      res.status(404);
      throw new Error(`Company not found with id of ${req.params.id}`);
    }

    res.status(200).json({
      success: true,
      data: company,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addCompany,
  getAllCompanies,
  getSingleCompany,
};
