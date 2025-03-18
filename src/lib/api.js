const API_BASE_URL = 'http://localhost:8080/api'; 

export const createTrainingCenter = async (trainingCenterData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/training-centers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(trainingCenterData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      let errorMessage = 'Failed to create training center';
      if (errorData && errorData.error) {
        errorMessage = errorData.error; 
      } else if (errorData) {
        errorMessage = Object.values(errorData).join(', ') || errorMessage;
      }
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error; 
  }
};

export const getAllTrainingCenters = async (filters = {}) => {
  const queryParams = new URLSearchParams(filters);
  const url = `${API_BASE_URL}/training-centers${queryParams.toString() ? `?${queryParams}` : ''}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch training centers: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

