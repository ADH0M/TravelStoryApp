import  { useState } from 'react';
import Resizer from 'react-image-file-resizer';

const ImageResizer = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [resizedImage, setResizedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle image resizing
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);

      // Resize the image using the react-image-file-resizer library

      Resizer.imageFileResizer(
        file, // Original image file
        600, // New width
        300, // New height
        'webp', // Image format (could be PNG, JPEG, or WEBP)
        90, // Quality (0-100)
        0, // Rotation (degrees)
        (uri) => {
          setLoading(false);
          setImageSrc(URL.createObjectURL(file)); // Display original image preview
          setResizedImage(uri); // Display resized image (Base64 or blob URI)
        },
        'base64' // Output format (base64 is commonly used in React for displaying images)
      );

    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      
      {/* Original image preview */}
      {imageSrc && !loading && (
        <div>
          <h3>Original Image:</h3>
          {/* <img src={imageSrc} alt="Uploaded" style={{ maxWidth: '100%', marginTop: '20px' }} /> */}
        </div>
      )}
      
      {/* Resized image preview */}
      {resizedImage && !loading && (
        <div>
          <h3>Resized Image:</h3>
          <img src={resizedImage} alt="Resized" style={{ maxWidth: '100%', marginTop: '20px' }} />
        </div>
      )}

      {/* Loading spinner */}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default ImageResizer;
