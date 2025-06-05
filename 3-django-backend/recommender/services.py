import pickle
from sklearn.metrics.pairwise import cosine_similarity
class ProductRecommender:
    def __init__(self):
        #print("Loading recommendation models...")
        try:
            with open('recommender/models/count_vectorizer.pkl', 'rb') as f:
                self.vectorizer = pickle.load(f)
                #print("Vectorizer features:", self.vectorizer.get_feature_names_out()[:5])
            
            with open('recommender/models/similarity_matrix.pkl', 'rb') as f:
                self.similarity = pickle.load(f)
                #print("Similarity matrix shape:", self.similarity.shape)
            
            with open('recommender/models/product_data.pkl', 'rb') as f:
                self.df = pickle.load(f)
                #print("Sample product titles:", self.df['title'].head(3))
        except Exception as e:
            #print("Model loading failed:", str(e))
            raise

    def recommend(self, product_title):
      if not product_title:
          #print("Warning: Empty title received")
          return []
      
      try:
          #print(f"\nProcessing: '{product_title}'")
          
          # Transform input
          input_vec = self.vectorizer.transform([product_title])
          #print("Vector shape:", input_vec.shape)
          
          # Calculate similarities (fixed this part)
          similarity_scores = cosine_similarity(input_vec, self.vectorizer.transform(self.df['title']))
          #print("Similarity scores shape:", similarity_scores.shape)
          
          # Get top matches
          top_indices = similarity_scores.argsort()[0][-6:-1][::-1]  # Get top 5 (excluding self)
          recommendations = [self.df.iloc[i]['title'] for i in top_indices]
          
          #print("Recommendations:", recommendations)
          return recommendations
          
      except Exception as e:
          #print("Recommendation error:", str(e))
          return []