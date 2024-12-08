import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import axios from 'axios';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//dotenv.config();
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
const GOLD_API_URL = process.env.GOLD_API_URL; 
const GOLD_API_KEY = process.env.GOLD_API_KEY; 

 
const getGoldPrice = async () => {
  // console.log(`${GOLD_API_URL}?api_key=${GOLD_API_KEY}&base=USD&currencies=XAU`);
  try {
    const pricePerOunce=2632.664; // The api was working but I have used up all my free usage so this is gold price atm.
  //   const response = await axios.get(GOLD_API_URL, {
  //     params: {
  //       api_key: GOLD_API_KEY,
  //       base: 'USD',
  //       currencies: 'XAU', // Gold price symbol
  //     },
  //   });
    // Gold price is often given per ounce; convert to grams
    //const pricePerOunce = response.data.rates.USDXAU;
    //const pricePerGram= pricePerOunce;
    const pricePerGram = pricePerOunce / 28.35; // 1 ounce = 28.35 grams
    return pricePerGram;
  } catch (error) {
    console.error('Error fetching gold price:', error.message);
    throw new Error('Failed to fetch gold price');
  }
};

// Function to calculate the price of a product
const calculateProductPrice = (popularityScore, weight, goldPrice) => {
  return ((popularityScore/100) + 1) * weight * goldPrice;
};


export const getProducts = async (req, res) => {
  try {
    const filePath = path.resolve('./data/products.json');
    const fileData = await fs.readFile(filePath, 'utf-8');
    const products = JSON.parse(fileData);
    const goldPrice = await getGoldPrice();
    // Calculate prices for each product
    const productsWithPrices = products.map((product) => ({
      ...product,
      price: calculateProductPrice(product.popularityScore, product.weight, goldPrice).toFixed(2), // Price formatted to 2 decimal places
    }));
    res.json(productsWithPrices);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load products' });
  }
};


// const getProducts = (req, res) => {
//   res.json(products);
// };

//module.exports = { getProducts };
//export default {getProducts};
