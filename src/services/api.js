import axios from 'axios';

const API_URL = 'https://plagrism-backend-1.onrender.com';

export const compareDocuments = async (file1, file2) => {
  console.log('API: Comparing documents', { file1: file1.name, file2: file2.name });
  
  const formData = new FormData();
  formData.append('file1', file1);
  formData.append('file2', file2);

  try {
    const response = await axios.post(`${API_URL}/compare`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    console.log('API: Comparison response', response.data);
    return response.data;
  } catch (error) {
    console.error('API: Error comparing documents', error.response?.data || error.message);
    throw error;
  }
};

export const checkHealth = async () => {
  console.log('API: Checking health');
  try {
    const response = await axios.get(`${API_URL}/`);
    console.log('API: Health check response', response.data);
    return response.data;
  } catch (error) {
    console.error('API: Health check failed', error.response?.data || error.message);
    throw error;
  }
}; 