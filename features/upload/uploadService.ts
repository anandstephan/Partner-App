import apiClient from '../../api/apiClient.ts';
import { RNFile, UploadResponse,UploadPayload } from './type.ts';

export const uploadService = async (
    payload:UploadPayload
): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('selfie', {
    uri: payload.file.uri,
    name: payload.file.name,
    type: payload.file.type,
  } as any);
  formData.append('category', payload.category);
  formData.append('appName', payload.appName);
  console.log("Form",formData)
  const response = await apiClient.post('/api/others/api/s3/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  console.log("Pic",response.data)
  return response.data;
};