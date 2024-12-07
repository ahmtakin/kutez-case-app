import express  from 'express' ;
import { getProducts } from '../controllers/productsController.mjs';


const router = express.Router();

router.get('/', getProducts);

//module.exports = router;
export default router;