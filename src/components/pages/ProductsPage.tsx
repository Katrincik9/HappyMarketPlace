import Typography from '@mui/material/Typography';
import ProductCard from '../productCard/ProductCard';
import { mockProducts } from '../../constants/mockProducts';
import './ProductsPage.css';
import './Pages.css';

function ProductsPage() {
  return (
    <section>
      <Typography component="h1" variant="h5" id="products-title" className="section-heading">
        Our collection
      </Typography>
      <div className="products-grid">
        {mockProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default ProductsPage;
