const express = require('express');
const router = express.Router();
const {
  addCompany,
  getAllCompanies,
  getSingleCompany,
} = require('../controllers/companyController');

router.route('/')
  .get(getAllCompanies)
  .post(addCompany);

router.route('/:id')
  .get(getSingleCompany);

module.exports = router;
