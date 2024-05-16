const express = require('express');
const app = express();

//add json body parser
app.use(express.json());

app.get('/', (req, res) => {
  res.send('hi man');
});

app.get('/api/products/:id', (req, res) => {
  // find the product on the based on id
  // cosnt product = products.find
  //if there is no product send an error 404
  //send the product back to the response
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
