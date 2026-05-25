const mongoose = require('mongoose');

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a company name'],
      trim: true,
      maxlength: [100, 'Name cannot be more than 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
      maxlength: [1000, 'Description cannot be more than 1000 characters'],
    },
    city: {
      type: String,
      required: [true, 'Please add a city'],
      trim: true,
    },
    address: {
      type: String,
      required: [true, 'Please add an address'],
      trim: true,
    },
    foundedOn: {
      type: Date,
      required: [true, 'Please add the founded date'],
    },
    logo: {
      type: String,
      default: 'no-photo.jpg',
    },
    averageRating: {
      type: Number,
      min: [0, 'Rating must be at least 0'],
      max: [5, 'Rating cannot be more than 5'],
      default: 0,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Cascade delete reviews when a company is deleted
companySchema.pre('deleteOne', { document: true, query: false }, async function (next) {
  console.log(`Reviews being removed from company ${this._id}`);
  await this.model('Review').deleteMany({ companyId: this._id });
  next();
});

// Reverse populate with virtuals
companySchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'companyId',
  justOne: false,
});

module.exports = mongoose.model('Company', companySchema);
