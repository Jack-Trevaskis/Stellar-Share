import express from 'express';
import { userReviewStats, stuffReviewStats, stuffAverageReview, userAverageReview } from '../db/review_stats'; 

const router = express.Router();


router.get('/user_given', async (req, res) => {
  try {
    const stats = await userReviewStats();
    res.json(stats);
  } catch (error) {
    console.error('Error fetching user review stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/stuff_given', async (req, res) => {
  try {
    const stats = await stuffReviewStats();
    res.json(stats);
  } catch (error) {
    console.error('Error fetching stuff review stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/stuff_received', async (req, res) => {
  try {
    const stats = await stuffAverageReview();
    res.json(stats);
  } catch (error) {
    console.error('Error fetching stuff average reviews:', error);
    res.status(500).json({ error: 'Unable to fetch stuff average reviews' });
  }
});


router.get('/user_received', async (req, res) => {
  try {
    const stats = await userAverageReview();
    res.json(stats);
  } catch (error) {
    console.error('Error fetching user average reviews:', error);
    res.status(500).json({ error: 'Unable to fetch user average reviews' });
  }
});

export default router;
