const { Server } = require('socket.io');

let io;

const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: '*', // Chỉnh sửa nếu cần thiết
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });

        // Lắng nghe sự kiện từ client
        socket.on('sendMessage', (message) => {
            console.log('Received message:', message);
            io.emit('receiveMessage', message); // Gửi lại cho tất cả client
        });
    });

    return io;
};

const getIo = () => {
    if (!io) {
        throw new Error('Socket.io has not been initialized!');
    }
    return io;
};

module.exports = { initializeSocket, getIo };
