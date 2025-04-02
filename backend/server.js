require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const _dirname = path.resolve();

const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');



const app = express();
app.use(bodyParser.json());
const server = http.createServer(app);
// app.use(cors());
const corsOptions = {
    origin: 'http://localhost:5000', // Allow requests from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Allow cookies to be sent
  };
  
  // Use CORS middleware with the specified options
  app.use(cors(corsOptions));


const io = new Server(server, {
    cors: {
      origin: 'http://localhost:5000', // React app URL
      methods: ['GET', 'POST', 'DELETE'],
      
    },
  });

  app.use((req, res, next) => {
    req.io = io;
    next();
  });

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
  
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
  
  // Your API routes
//   app.get('/', (req, res) => {
//     res.send('Socket.IO server is running.');
//   });

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected to the atlas"))
  .catch(err => console.error("Connection error:", err));


//   app.get("/", (req, res) => {
//     res.send("Welcome to the backenddddd");
//   });
      

// // Routes
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);

app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get('*', (_,res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});


const PORT = 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));