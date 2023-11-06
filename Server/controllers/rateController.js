const RateModel = require('../models/rateModel');

const submitRating = async (req, res) => {
  const { user_id, product_id, rating, review } = req.body;

  try {
    const result = await RateModel.submitRating(user_id, product_id, rating, review);
    if (result === 'Rating submitted successfully.') {
      res.status(200).send(result);
    } else {
      res.status(500).send(result);
    }
  } catch (error) {
    console.error('An error occurred while submitting the rating:', error);
    res.status(500).send('An error occurred while submitting the rating.');
  }
};

const updateRating = async (req, res) => {
  const { user_id, product_id, newRating } = req.body;

  try {
    const result = await RateModel.updateRating(user_id, product_id, newRating);
    if (result === 'Rating updated successfully.') {
      res.status(200).send(result);
    } else {
      res.status(500).send(result);
    }
  } catch (error) {
    console.error('An error occurred while updating the rating:', error);
    res.status(500).send('An error occurred while updating the rating.');
  }
};

const getRatings = async (req, res) => {
  try {
    const ratings = await RateModel.getRatings();
    res.json(ratings);
  } catch (error) {
    console.error('An error occurred while getting ratings:', error);
    res.status(500).send('An error occurred while getting ratings.');
  }
};

module.exports = {
  submitRating,
  updateRating,
  getRatings,
};
