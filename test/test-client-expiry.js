// test-client.js
const io = require('socket.io-client');

const sessionId = 'rsslB7IJMsDOgcbJDiUIdKlwxiJ5gFPo'; // cámbialo por el tuyo
const socket = io('http://localhost:10411');

socket.on('connect', () => {
    console.log('✅ Conectado');
    socket.emit('session:auth-login', { sessionId });
});

socket.on('session:warning', () => {
    console.log('⚠️ 1 minuto antes');
});

socket.on('session:logout', () => {
    console.log('🚪 Sesión expirada');
    socket.disconnect();
});

socket.on('disconnect', () => {
    console.log('❌ Socket cerrado');
    process.exit(0);
});