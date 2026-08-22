// user-routes.js (CORRECTED)
import express from 'express';
import upload from '../../multerConfiguration/multer.js';
// import uploadFile from '../../controllers/user-controller/user-controller.js'; 
//  // Removed curly braces!
import uploadFile from '../../controllers/user-controller/user-controller.js';
const router = express.Router();

// Matches POST request: http://localhost:5050/api/uploads
router.post('/uploads', upload.single('file'), uploadFile);

export default router;