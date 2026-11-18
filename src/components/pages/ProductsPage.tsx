import Typography from '@mui/material/Typography';
import ProductCard from '../productCard/ProductCard';
import { mockProducts } from '../../constants/mockProducts';
import { useAppSelector } from '../../hooks/useStore';
import './ProductsPage.css';
import './Pages.css';

function ProductsPage() {
  const productLimit = useAppSelector((state) => state.settings);
  return (
    <section>
      <Typography component="h1" variant="h5" id="products-title" className="section-heading">
        Our collection
      </Typography>
      <div className="products-grid">
        {mockProducts.slice(0, productLimit).map((product) => (
          <ProductCard key={product.id} variant="catalogue" product={product} />
        ))}
      </div>
    </section>
  );
}

export default ProductsPage;
