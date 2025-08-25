// test-client.js
const io = require('socket.io-client');
const socket = io('http://localhost:10411');   // url donde corre Nest

socket.on('connect', () => {
    console.log('✅ Conectado al servidor');
});

socket.on('sessions:near-expiry', (list) => {
    console.log('📢 Sesiones próximas a expirar:', list);
});

socket.on('disconnect', () => {
    console.log('❌ Desconectado');
});