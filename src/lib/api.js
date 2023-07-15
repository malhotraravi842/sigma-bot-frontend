import axios from 'axios';

const googleCloudVisionAPI = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const openAiAPI = axios.create({
  baseURL: 'https://api.openai.com',
  headers: {
    Authorization: 'Bearer ' + process.env.REACT_APP_OPENAI_API_KEY,
    'Content-Type': 'application/json',
  },
});

export async function chatCompletion(data) {
  const response = await openAiAPI.post('/v1/chat/completions', data).then((res) => res);
  return response;
}

export async function extractTextFromImage(data) {
  const response = await googleCloudVisionAPI.post('/ocr/image', data).then((res) => res);
  return response;
}

export async function extractTextFromDocument(data) {
  const response = await googleCloudVisionAPI
    .post('/ocr/document', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => res);
  return response;
}
