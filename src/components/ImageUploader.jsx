function ImageUploader({ image, setImage }) {

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setImage(file);
    }
  };

  return (
    <div>
      <h3>Upload Image</h3>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />

     {image && (
  <div>
    <h4>Preview</h4>

    <img
      src={URL.createObjectURL(image)}
      alt="Preview"
      width="250"
    />

    <br />

    <button onClick={() => setImage(null)}>
      Remove Image
    </button>
  </div>
)}
    </div>
  );
}

export default ImageUploader;