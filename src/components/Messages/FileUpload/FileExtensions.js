const acceptedTypes = [
    // Images
    'image/bmp',
    'image/gif',
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/svg+xml',
    'image/tiff',
    'image/webp',
  
    // Documents
    'application/msword', // .doc
    'application/pdf',
    'application/rtf',
    'application/vnd.ms-excel', // .xls
    'application/vnd.ms-powerpoint', // .ppt
    'application/vnd.openxmlformats-officedocument.presentationml.presentation', // .pptx
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
    'text/csv',
    'text/plain', // .txt
  
    // Audio
    'audio/aac',
    'audio/flac',
    'audio/mpeg', // .mp3
    'audio/ogg',
    'audio/wav',
    'audio/webm',
  
    // Video
    'video/mpeg',
    'video/mp4',
    'video/quicktime', // .mov
    'video/webm',
    'video/x-matroska', // .mkv
    'video/x-msvideo', // .avi
  
    // Archives
    'application/gzip',
    'application/zip',
    'application/x-7z-compressed',
    'application/x-rar-compressed',
    'application/x-tar',
  
    // Code Files
    'application/json',
    'application/xml',
    'text/css',
    'text/html',
    'text/javascript',
  
    // Other Common Types
    'application/java-archive', // .jar files
    'application/octet-stream', // Generic binary data
    'application/x-httpd-php', // PHP files
    'application/x-sh', // Shell scripts
  ];
  
  export default acceptedTypes;
  