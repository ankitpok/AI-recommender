export const getRecommendations = async (productTitle) => {
  try {
    const response = await fetch('http://localhost:8000/api_ai/recommend/', {
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
    throw error; // Re-throw to be caught in component
  }
};
// Usage in component
const ProductDetail = ({ product }) => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecs = async () => {
      const data = await getRecommendations(product.title);
      setRecommendations(data.recommendations);
    };
    fetchRecs();
  }, [product.title]);

  return (
    <div>
      <h2>Recommended Products</h2>
      <ul>
        {recommendations.map((rec, i) => (
          <li key={i}>{rec}</li>
        ))}
      </ul>
    </div>
  );
};