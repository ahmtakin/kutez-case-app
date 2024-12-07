import express  from 'express' ;
import cors from 'cors';
import dotenv from 'dotenv';
import productsRoute from './routes/products.mjs';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use('/api/products', productsRoute);

app.get('/', (req, res) => {
    res.send('Backend is working!');
  });

// app.get('/api/products', (req, res) => {
//     res.json(products);
//   });
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
