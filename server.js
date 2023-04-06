const mongoose = require('mongoose');
require('dotenv').config();
const app = require('./app');

mongoose.Promise = global.Promise;

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.connect(DB_HOST).then(()=>
  app.listen(PORT, () => console.log(`Database connection successful`))
).catch(
  err => { console.log(`Server not running. Error message: ${err.message}`),
  process.exit(1) }
);

// const PORT = process.env.PORT || 3000;
// const uriDb = process.env.DB_HOST;

// const connection = mongoose.connect(uriDb, {
//   promiseLibrary: global.Promise,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
// });

// connection
//   .then(() => {
//     app.listen(PORT, function () {
//       console.log(`Database connection successful`);
//     });
//   })
//   .catch(err =>
//     console.log(`Server not running. Error message: ${err.message}`),
//     process.exit(1),
//   );

app.listen(3000, () => {
  console.log();
})
