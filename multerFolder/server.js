import express from 'express';
import morgan from 'morgan';
import multer from 'multer';
import path from 'path'; // 1. Added path import
import cors from 'cors'; // 2. Added CORS to allow requests from React frontend

const server = express();

server.use(cors()); // Enable CORS
server.use(express.json()); // Fix: express.json() instead of express()
server.use(morgan('dev'));

// Storage configuration for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Make sure 'uploads' directory exists
    },
    filename: function (req, file, cb) {
        // Fix: lowercase 'path' and correct spelling 'originalname'
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// File filter
const fileFilter = (req, file, cb) => {
    // Fix: 'startsWith' instead of 'startWith'
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed'), false);
    }
};

// Initialize multer 
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Upload API endpoint
server.post('/uploads', upload.single('file'), (req, res) => {
    try {
        res.status(200).send({
            status: true,
            message: 'File uploaded successfully',
            file: req.file
        });
    } catch (error) {
        res.status(400).send({
            status: false,
            message: error.message
        });
    }
});

// Serve static files
server.use('/uploads', express.static('uploads'));

const port = 5050;
server.listen(port, () => {
    console.log('Node.js server is running on port', port);
});