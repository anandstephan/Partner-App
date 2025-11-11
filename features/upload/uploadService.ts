import axios from "axios";

export const uploadToS3 = async (file:any) => {
  console.log("File",file)
  try {

    const formData = new FormData();
    formData.append('file', {
      uri: file.uri,
      type: file.type,
      name: file.fileName || 'upload.jpg',
    } as any);

    
    formData.append("category", "test2");
    formData.append("appName", "test");
    console.log(formData,"Formdata")


    const response = await axios.post(
      "https://backendverse.digivoltt.com/api/others/api/s3/upload",///api/driver/profile/uploadSelfie
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("response",formData)

    console.log("✅ Upload successful:", response.data);
    return response.data;
  } catch (error) {
    console.log("❌ Upload failed:", error);
    throw error;
  }
};
