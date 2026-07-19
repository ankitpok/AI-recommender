import API_BASE_URL from '../config/api';

export const getRecommendations = async (productTitle) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api_ai/recommend/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input: productTitle })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Recommendation request failed');
    }

    if (!Array.isArray(data.recommendations)) {
      throw new Error('Invalid recommendations format');
    }

    return data.recommendations;
  } catch (error) {
    console.error('Recommendation API error:', error);
    throw error;
  }
};
