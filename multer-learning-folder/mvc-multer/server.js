// // server.js (CORRECTED)
// import express from 'express';
// import morgan from 'morgan';
// import cors from 'cors';
// import uploadRoutes from './src/routes/user-routes/user-routes.js'; // Use your route file!

// const server = express();

// // Middlewares
// server.use(cors());
// server.use(express.json());
// server.use(morgan('dev'));

// // Static Folder for uploaded images
// server.use('/uploads', express.static('uploads'));

// // Routes
// server.use('/api', uploadRoutes); // Mount router here

// const port = 5050;
// server.listen(port, () => {
//     console.log('Node.js server is running on port', port);
// });



import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import fs from 'fs';
import uploadRoutes from './src/routes/user-routes/user-routes.js';

const server = express();

if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
    console.log('Created uploads/ folder');
}

server.use(cors());
server.use(express.json());
server.use(morgan('dev'));

server.use('/uploads', express.static('uploads'));

server.use('/api', uploadRoutes);

server.use((req, res) => {
    res.status(404).json({ status: false, message: 'Route not found' });
});

server.use((err, req, res, next) => {
    console.error('Server Error:', err.message);
    res.status(500).json({ status: false, message: err.message || 'Something went wrong' });
});

const port = 5050;
server.listen(port, () => {
    console.log('Node.js server is running on port', port);
});