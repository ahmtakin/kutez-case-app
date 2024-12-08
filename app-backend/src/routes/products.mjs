import express  from 'express' ;
import { getProducts } from '../controllers/productsController.mjs';
//import { calculateProductPrices } from '../controllers/productsController.js';


const router = express.Router();

router.get('/', getProducts);
//router.get('/dynamic-prices', calculateProductPrices);

//module.exports = router;
export default router;