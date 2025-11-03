import axios from "axios";

export const uploadToS3 = async (file:any) => {
  try {
    // Example local file (from ImagePicker)
    // const file = {
    //   uri: "file:///data/user/0/com.app/cache/IMG_1234.jpg", // 👈 replace with your picked file URI
    //   name: "Simulator_Screenshot.png",
    //   type: "image/png", // image/jpeg or image/png
    // };

    const formData = new FormData();
    formData.append("file", file);
    formData.append("appName", "test");
    formData.append("category", "test");

    const response = await axios.post(
      "https://backendverse.digivoltt.com/api/others/api/s3/upload",
      formData,
      {
        transformRequest: (data) => data, // prevents axios from serializing FormData
        headers: {
          Accept: "application/json",
          // ⚠️ Do NOT set Content-Type manually in React Native — axios will set proper multipart boundaries
        },
      }
    );

    console.log("✅ Upload successful:", response.data);
    return response.data;
  } catch (error) {
    console.log("❌ Upload failed:", error);
    throw error;
  }
};
