class ImageUploader {
  async upload(file) {
    const url = "https://api.cloudinary.com/v1_1/dcpi7ec9v/upload";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "jhcdzry3");

    const result = await fetch(url, {
      method: "POST",
      body: formData,
    });
    return await result.json();
  }
}

export default ImageUploader;
