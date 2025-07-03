const { io } = require('socket.io-client');

// Cambia la URL al endpoint de tu API Gateway
const socket = io('http://localhost:10411', {
  //path: '/apigateway/', // Cambia si usas un path diferente
  //transports: ['websocket'],
});

socket.on('connect', () => {
  console.log('Conectado al WebSocket Gateway');

  // Envía un evento de prueba
  socket.emit('testEvent', { message: 'Hola desde el cliente' });

  // Escucha respuestas del servidor
  socket.on('testResponse', (data) => {
    console.log('Respuesta del servidor:', data);
  });
});

socket.on('connect_error', (err) => {
  console.error('Error de conexión:', err.message);
});

socket.on('disconnect', () => {
  console.log('Desconectado del servidor');
});
