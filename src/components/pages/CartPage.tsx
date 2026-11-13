import Typography from '@mui/material/Typography';
import './Pages.css';

function CartPage() {
  return (
    <section aria-labelledby="cart-title">
      <Typography component="h1" variant="h5" id="cart-title" className="section-heading">
        Shopping cart
      </Typography>
    </section>
  );
}

export default CartPage;
