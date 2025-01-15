import React, { useState, useEffect, useCallback } from 'react';
import { Divider, TextField, Rating, Button, Box, Typography, Snackbar, CircularProgress, Alert } from '@mui/material';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';

const ReviewSection = () => {
  const { plateId } = useParams();  // Extract plateId from the URL

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]);

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRatingChange = (event, newValue) => setRating(newValue);
  const handleCommentChange = (event) => setComment(event.target.value);


  // Fetch the reviews from the backend
  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/reviews/plate/${plateId}`);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Failed to fetch reviews');
      }
    } catch (error) {
        setErrorMessage('An error occurred while fetching reviews.');
        console.error(error);
        return [];
    } finally {
      setLoading(false);
    }
  }, [plateId]);

    useEffect(() => {
    const loadReviews = async () => {
      const fetchedReviews = await fetchReviews();
      setReviews(fetchedReviews);
    };

    loadReviews();
  }, [plateId, fetchReviews]); // Re-fetch reviews if plateId changes

  return (
    <Box>

        <Box sx={{ textAlign: 'left' }}>
          {loading ? (
                <CircularProgress size={50} color="inherit" sx={{ display: 'block', margin: 'auto' }} />
              ) : (
                reviews.map((review) => (
                  <Box key={review.id} sx={{ marginBottom: 2, padding: 2 }}>
                    <Rating value={review.rating} readOnly sx={{ marginBottom: 1 }} />
                    <Typography variant="body1">{review.description}</Typography>

                   <Typography variant="body2" sx={{ color: 'gray', marginTop: 1, fontSize: '11px' }}>
                     {format(new Date(review.dateCreated), 'h:mm a MMMM d, yyyy')}
                   </Typography>
                  </Box>
                ))
              )}
        </Box>

        {/* Success and Error Snackbar */}
        <Snackbar
          open={Boolean(successMessage)}
          autoHideDuration={6000}
          onClose={() => setSuccessMessage('')}
        >
          <Alert severity="success">{successMessage}</Alert>
        </Snackbar>

        <Snackbar
          open={Boolean(errorMessage)}
          autoHideDuration={6000}
          onClose={() => setErrorMessage('')}
        >
          <Alert severity="error">{errorMessage}</Alert>
        </Snackbar>

      </Box>
  );
};

export default ReviewSection;