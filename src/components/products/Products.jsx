import "./Products.css";
const Products = ({ products }) => {
  return (
    <div className="product_list_container">
      {products?.map((product) => {
        return (
          <div className="product_items" key={product._id}>
            <div>
              {product.image.map((img) => {
                return <img key={img._id} src={img.url} alt="product-image" />;
              })}
            </div>
            <h3>{product.productName}</h3>
            <h3>{product.price.$numberDecimal}</h3>
            <div className="product_sizeChart_Container">
              {product.sizeChart.map((sizes) => {
                return (
                  <div className="product_sizeChart_items" key={sizes._id}>
                    <h4>{sizes.size}</h4>
                    <h4>{sizes.stock}</h4>
                  </div>
                );
              })}
            </div>
            <h3>{product.productDetails}</h3>
            <h3>{product.productDescription}</h3>
            <h3>{product.stockCount}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default Products;
