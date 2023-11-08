const pool = require('../models/rateModel');

const submitRating = async (req, res) => {
  const { user_id, product_id, rating, review } = req.body;

  const insertQuery = 'INSERT INTO product_ratings (user_id, product_id, rating, review) VALUES ($1, $2, $3, $4)';
  const insertValues = [user_id, product_id, rating, review];

  try {
    await pool.query(insertQuery, insertValues);
    res.status(200).send('Rating submitted successfully.');
  } catch (error) {
    console.error('An error occurred while submitting the rating:', error);
    res.status(500).send('An error occurred while submitting the rating.');
  }
};

const updateRating = async (req, res) => {
  const { user_id, product_id, newRating } = req.body;

  const deleteQuery = 'DELETE FROM product_ratings WHERE user_id = $1 AND product_id = $2';
  const insertQuery = 'INSERT INTO product_ratings (user_id, product_id, rating) VALUES ($1, $2, $3)';
  const deleteValues = [user_id, product_id];
  const insertValues = [user_id, product_id, newRating];

  try {
    await pool.query(deleteQuery, deleteValues);
    await pool.query(insertQuery, insertValues);
    res.status(200).send('Rating updated successfully.');
  } catch (error) {
    console.error('An error occurred while updating the rating:', error);
    res.status(500).send('An error occurred while updating the rating.');
  }
};

const getRatings = async (req, res) => {
  const query = 'SELECT * FROM product_ratings';

  try {
    const result = await pool.query(query);
    res.json(result.rows);
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
