const dotenv = require('dotenv');
const mongoose = require('mongoose');
process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('shut down...');
  process.exit(1);
});
dotenv.config({ path: './config.env' });
const app = require('./app');

console.log(process.env);
const connection = process.env.DATABASE.replace(
  'password',
  process.env.DATABASE_PASSWORD
);
console.log(connection);

mongoose
  .connect(connection, {
    useNewUrlParser: true,
    //useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then(() => console.log('Database connection'));

console.log(process.env);
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`the server is running on port ${port}`);
});
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('shut down...');
  server.close(() => {
    process.exit(1);
  });
});

//bbbbbarev
