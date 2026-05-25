const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Company',
      required: true,
    },
    fullName: {
      type: String,
      required: [true, 'Please add your full name'],
      trim: true,
    },
    subject: {
      type: String,
      required: [true, 'Please add a subject for the review'],
      trim: true,
      maxlength: [100, 'Subject cannot be more than 100 characters'],
    },
    reviewText: {
      type: String,
      required: [true, 'Please add some text'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, 'Please add a rating between 1 and 5'],
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Static method to get avg rating and save
reviewSchema.statics.getAverageRating = async function (companyId) {
  const obj = await this.aggregate([
    {
      $match: { companyId: companyId },
    },
    {
      $group: {
        _id: '$companyId',
        averageRating: { $avg: '$rating' },
        totalReviews: { $count: {} },
      },
    },
  ]);

  try {
    if (obj[0]) {
      await this.model('Company').findByIdAndUpdate(companyId, {
        averageRating: obj[0].averageRating.toFixed(1),
        totalReviews: obj[0].totalReviews,
      });
    } else {
      await this.model('Company').findByIdAndUpdate(companyId, {
        averageRating: 0,
        totalReviews: 0,
      });
    }
  } catch (err) {
    console.error(err);
  }
};

// Call getAverageRating after save
reviewSchema.post('save', async function () {
  await this.constructor.getAverageRating(this.companyId);
});

// Call getAverageRating after remove (using deleteOne/findOneAndDelete)
reviewSchema.post('deleteOne', { document: true, query: false }, async function () {
  await this.constructor.getAverageRating(this.companyId);
});

module.exports = mongoose.model('Review', reviewSchema);
