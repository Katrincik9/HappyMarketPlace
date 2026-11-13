import Typography from '@mui/material/Typography';
import './Pages.css';

function ProductsPage() {
  return (
    <section aria-labelledby="products-title">
      <Typography component="h1" variant="h5" id="products-title" className="section-heading">
        Our collection
      </Typography>
      <div className="products-grid" />
    </section>
  );
}

export default ProductsPage;
