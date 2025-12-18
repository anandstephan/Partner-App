import axios from "axios";

export const uploadToS3 = async (file:any) => {
  console.log("file",file)
  try {

    const formData = new FormData();
    formData.append('file', {
      uri: file.uri,
      type: file.type,
      name: file.fileName || 'upload.jpg',
    } as any);

    
    formData.append("category", file.category);
    formData.append("appName", file.appName);


    const response = await axios.post(
      "https://backendverse.digivoltt.com/api/others/api/s3/upload",///api/driver/profile/uploadSelfie
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("response",response.data)
    return response.data;
  } catch (error) {
    console.log("❌ Upload failed:", error);
    throw error;
  }
};


export const uploadMultipleToS3 = async (files: any[]) => {
  console.log("myFile",files)
  try {
    const formData = new FormData();

    // 👉 Append each file under the SAME key: "files"
    files.forEach((file, index) => {
    
      formData.append("files", {
        uri: file.uri,
        type: file.type,
        name: file.name || `file_${index}.jpg`,
      } as any);
    });

    // Extra fields (if required)
    formData.append("category", "test2");
    formData.append("appName", "partnerApp");
    // const url = 'http://localhost:5000/api/others/api/s3/upload/multiple'
     const url ="https://backendverse.digivoltt.com/api/others/api/s3/upload/multiple"
    const response = await axios.post(
      url,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("❌ Multiple upload failed:", error);
    throw error;
  }
};
