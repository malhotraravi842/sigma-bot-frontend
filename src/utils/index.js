export const getBase64 = (file) => {
  return new Promise((resolve) => {
    let baseURL = '';
    // Make new FileReader
    let reader = new FileReader();

    // Convert the file to base64 text
    reader.readAsDataURL(file);

    // on reader load somthing...
    reader.onload = () => {
      // Make a fileInfo Object
      baseURL = reader.result;
      resolve(baseURL);
    };
  });
};

export const getFileType = (base64Encoded) => {
  return base64Encoded.match(/[^:/]\w+(?=;|,)/)[0];
};

export const resizeBase64Image = (base64, width, height) => {
  // Create a canvas element
  const canvas = document.createElement('canvas');

  // Create an image element from the base64 string
  const image = new Image();
  image.src = base64;

  // Return a Promise that resolves when the image has loaded
  return new Promise((resolve, reject) => {
    image.onload = () => {
      // Calculate the aspect ratio of the image
      const aspectRatio = image.width / image.height;

      // Calculate the best fit dimensions for the canvas
      if (width / height > aspectRatio) {
        canvas.width = height * aspectRatio;
        canvas.height = height;
      } else {
        canvas.width = width;
        canvas.height = width / aspectRatio;
      }

      // Draw the image to the canvas
      canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);

      // Resolve the Promise with the resized image as a base64 string
      resolve(canvas.toDataURL());
    };

    image.onerror = reject;
  });
};
