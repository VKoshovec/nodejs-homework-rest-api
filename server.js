const app = require('./app')

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000")
})

mongoose.connect(DB_HOST)
  .then(() => app.listen(PORT, ()=> console.log("Database connection successful")))
  .catch(error => {console.log(error.message), process.exit(1)});