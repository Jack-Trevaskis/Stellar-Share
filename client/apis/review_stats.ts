import request from 'superagent';

const rootUrl = '/api/v1/review_stats';

export async function fetchAllReviewStats() {
  try {
    // Perform all requests in parallel
    const [
      userReviewStatsResponse,
      stuffReviewStatsResponse,
      stuffAverageReviewResponse,
      userAverageReviewResponse,
    ] = await Promise.all([
      request.get(`${rootUrl}/user_given`),        
      request.get(`${rootUrl}/stuff_given`),        
      request.get(`${rootUrl}/stuff_received`), 
      request.get(`${rootUrl}/user_received`), // Fixed typo from 'recieved' to 'received'
    ]);

    // Structure the results into a single object
    const result = {
      userGiven: userReviewStatsResponse.body,       
      stuffGiven: stuffReviewStatsResponse.body,     
      stuffReceived: stuffAverageReviewResponse.body, 
      userReceived: userAverageReviewResponse.body,   
    };

    console.log('Fetched all review stats:', result);
    return result;
  } catch (error) {
    console.error('Error fetching all review stats:', {
      message: error.message,
      stack: error.stack,
    });
    throw error;
  }
}
