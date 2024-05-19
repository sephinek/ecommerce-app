export async function uploadImage(file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('cloud_name', process.env.REACT_APP_CLOUDINARY_NAME);
  formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET);
  return fetch(
    `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`,
    {
      method: 'POST',
      body: formData,
    }
  )
    .then((res) => res.json())
    .then((data) => data.url);
}
