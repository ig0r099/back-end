const app = require('./app');

const PORT = 3000;

app.get('/tasks', (request, response) => {
  response.status(200).send('hello, world');
});


app.listen(PORT, ()=> console.log(`Aplicação rodando na porta ${PORT}`));
