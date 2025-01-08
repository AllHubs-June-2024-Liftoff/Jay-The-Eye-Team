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

  // Submit the review to the backend
  const submitReviewToBackend = async (reviewData) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/reviews/api-update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData),
      });

      if (response.ok) {
        // setSuccessMessage(`Review submitted successfully! ${JSON.stringify(reviewData)}`);
        setSuccessMessage(`Review submitted successfully!`);
        setErrorMessage('');
        // Fetch updated reviews after successful submission
        const updatedReviews = await fetchReviews();
        setReviews(updatedReviews);
      } else {
        setErrorMessage(`Failed to submit review!`);
      }

    } catch (error) {
        console.error('Error submitting review:', error);
        setErrorMessage('An error occurred while submitting your review.');

    } finally {
        setLoading(false);
    }
  };

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

  // Handle review submission
  const handleSubmitReview = async () => {
    if (rating && comment) {
      const newReview = {
        rating: String(rating),
        description: comment,
        date: new Date().toISOString().slice(0, -1),
        plateId,
      };

      // Optimistically update the review list
      setReviews((prevReviews) => [...prevReviews, newReview]);
      await submitReviewToBackend(newReview);

      // Reset form fields after submission
      setRating(0);
      setComment('');
    } else {
      setErrorMessage('Please provide both a rating and a comment.');
    }
  };

  useEffect(() => {
    const loadReviews = async () => {
      const fetchedReviews = await fetchReviews();
      setReviews(fetchedReviews);
    };

    loadReviews();
  }, [plateId, fetchReviews]); // Re-fetch reviews if plateId changes

  return (
    <Box>
      <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>

         <Box sx={{ alignItems: 'left', justifyContent: 'left', marginBottom: 2 }}>
           <Typography component="legend" sx={{ marginRight: 1 }}>Your Rating:</Typography>
           <Rating value={rating} onChange={handleRatingChange} sx={{ marginRight: 2 }} />
         </Box>

        <TextField
          label="Comment (Required)"
          multiline
          rows={3}
          variant="outlined"
          fullWidth
          value={comment}
          onChange={handleCommentChange}
          sx={{
            marginBottom: 2,
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': { borderColor: '#DAA520' },
              '&.Mui-focused fieldset': { borderColor: '#DAA520' },
            },
            '& .MuiInputLabel-root': {
              color: 'lightgray',
              '&.Mui-focused': { color: '#DAA520' },
            },
          }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmitReview}
          disabled={!rating || !comment || loading}
          sx={{
            backgroundColor: '#DAA520',
            '&:hover': { backgroundColor: 'black' },
            '&.Mui-disabled': { backgroundColor: 'lightgray' },
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit Review'}
        </Button>
      </Box>

      <Divider sx={{
        marginBottom: 2,
        marginTop: 6,
        borderWidth: 3,
        borderColor: '#DAA520',
        width: '100%',
      }} />

      <Box sx={{ maxWidth: 1000, margin: 'auto', padding: 2 }}>

        <Box sx={{ marginTop: 4 }}>
          {loading ? (
            <CircularProgress size={50} color="inherit" sx={{ display: 'block', margin: 'auto' }} />
          ) : (
            reviews.map((review) => (
              <Box key={review.id} sx={{ marginBottom: 2, padding: 2, border: '1px solid #ddd', borderRadius: 2 }}>
                <Rating value={review.rating} readOnly sx={{ marginBottom: 1 }} />
                <Typography variant="body1">{review.description}</Typography>

               <Typography variant="body2" sx={{ color: 'gray', marginTop: 1 }}>
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
    </Box>
  );
};

export default ReviewSection;