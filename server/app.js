const express = require('express');
const http = require('http');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('../server/src/routes/user.routes');
const { initializeSocket } = require('../server/src/services/socket');


dotenv.config();

const app = express();
const server = http.createServer(app);
const io = initializeSocket(server); // Khởi tạo socket.io

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
    res.send("Server is running!");
});

