
// Function to check if the file is an image
export const isImageFile = (file) => {
    if (!file || !file.name) return false;
  
    const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif'];
    const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
  
    return imageExtensions.includes(fileExtension);
  };
  
  // Function to check if the file is an audio file
  export const isAudioFile = (file) => {
    if (!file || !file.name) return false;
  
    const audioExtensions = ['.mp3', '.wav', '.ogg', '.aac', '.flac'];
    const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
  
    return audioExtensions.includes(fileExtension);
  };
  
  // Function to check if the file is a video file
  export const isVideoFile = (file) => {
    if (!file || !file.name) return false;
  
    const videoExtensions = ['.mp4', '.mov', '.avi', '.mkv', '.webm'];
    const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
  
    return videoExtensions.includes(fileExtension);
  };
  