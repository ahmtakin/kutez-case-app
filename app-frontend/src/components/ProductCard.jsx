const ProductCard = ({ product }) => (
    <div className="border p-4 rounded shadow-sm">
      <h2 className="font-bold text-lg">{product.name}</h2>
      <img
        src={product.images[0]}
        alt={product.name}
        className="w-full h-32 object-cover mt-2"
      />
      <p className="mt-2">Popularity: {(product.popularityScore / 100 * 5).toFixed(1)} / 5</p>
      <p>Weight: {product.weight}g</p>
    </div>
  );
  
  export default ProductCard;
  