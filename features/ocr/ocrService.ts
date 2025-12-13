import axios from "axios";

export const ocrService = async (payload:any) => {


  try {
    const front = payload.front;
    const back = payload.back;
    const docType = payload.docType
    const formData = new FormData();
    formData.append('front', {
      uri: front.uri,
      type: front.type,
      name: front.name || '.jpg',
    } as any);

    formData.append('back', {
      uri: back.uri,
      type: back.type,
      name: back.name || '.jpg',
    } as any);
    
    formData.append("docType", docType);


    const response = await axios.post(
      "https://backendverse.digivoltt.com/api/bureau/ocr",///api/driver/profile/uploadSelfie
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    // console.log("response",formData)

    // console.log("✅ Upload Bureaue:", response.data);
    return response.data;
  } catch (error) {
    console.log("❌ Upload failed:", error);
    throw error;
  }
};
