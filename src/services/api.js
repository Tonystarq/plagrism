import axios from 'axios';

const API_URL = 'https://plagrism-backend-1.onrender.com';

export const compareDocuments = async (file1, file2) => {
  
  const formData = new FormData();
  formData.append('file1', file1);
  formData.append('file2', file2);

  try {
    const response = await axios.post(`${API_URL}/compare`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const checkHealth = async () => {
  try {
    const response = await axios.get(`${API_URL}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
}; 