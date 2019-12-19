const server = require('./server.js');
const db = require('./data/dbConfig.js')

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});