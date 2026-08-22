// import express from 'express';
// import morgan from 'morgan';
// import requestFilter from './middleware.js';

// const server = express();

// server.use(morgan('dev'));

////we dont want to apply middleware on this route
// server.get('/contact', (req, res) => {
//     res.send('This is contact page....');
// });

// // Option A: Apply middleware globally using a Router
// const router = express.Router();
// router.use(requestFilter);

// // Attach routes directly to the router so requestFilter runs on all of them
// router.get('/', (req, res) => {
//     res.send('This is index page....');
// });

// router.get('/about', (req, res) => {
//     res.send('This is about page....');
// });



// // IMPORTANT: Mount the router onto your Express app
// server.use('/', router);


// const port = 5050;
// server.listen(port, () => {
//     console.log('Node.js server is running on port', port);
// });








//NOTE.............................
//if we have 100 routes and we want to use this middleware with 60 routes than we code like
import express from 'express';
import morgan from 'morgan';
import requestFilter from './middleware.js';

const server = express();

server.use(morgan('dev'));

// Option A: Apply middleware globally using a Router
const router = express.Router();
router.use(requestFilter);

// Attach routes directly to the router so requestFilter runs on all of them
router.get('/', (req, res) => {
    res.send('This is index page....');
});

router.get('/about', (req, res) => {
    res.send('This is about page....');
});

router.get('/contact', (req, res) => {
    res.send('This is contact page....');
});

// IMPORTANT: Mount the router onto your Express app
server.use('/', router);
server.use('/about',router)

const port = 5050;
server.listen(port, () => {
    console.log('Node.js server is running on port', port);
});




//giving age in localhost path 
//http://localhost:5050/?age=22