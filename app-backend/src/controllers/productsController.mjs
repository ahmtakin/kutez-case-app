import fs from 'fs/promises';
import path from 'path';

export const getProducts = async (req, res) => {
  try {
    const filePath = path.resolve('./data/products.json');
    const fileData = await fs.readFile(filePath, 'utf-8');
    const products = JSON.parse(fileData);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load products' });
  }
};


// const getProducts = (req, res) => {
//   res.json(products);
// };

//module.exports = { getProducts };
//export default {getProducts};
