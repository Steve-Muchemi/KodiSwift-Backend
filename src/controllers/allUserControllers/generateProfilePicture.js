const Jimp = require('jimp');

const generateProfilePicture = async (name, size = 100) => {
  try {
    // Create a new image with the specified size and background color
    const image = await Jimp.create(size, size, '#3498db');

    // Load a font
    const font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);

    // Print the first letter of the name onto the image
    image.print(font, 0, 0, name.charAt(0).toUpperCase());

    // Convert the image to a buffer
    const buffer = await image.getBufferAsync(Jimp.MIME_PNG);

    // Return the buffer
    return buffer;
  } catch (error) {
    console.error('Error generating profile picture:', error);
    throw error;
  }
};

module.exports = { generateProfilePicture };
