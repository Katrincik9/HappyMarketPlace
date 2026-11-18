import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ProductCard from '../productCard/ProductCard';
import { useAppSelector } from '../../hooks/useStore';
import { calculateTotal, usdFormatter } from '../../services/currency';
import './Pages.css';
import './CartPage.css';

function CartPage() {
  const items = useAppSelector(state => state.cart);
  const total = useAppSelector(state => calculateTotal(state.cart));

  return (
    <section>
      <Typography component="h1" variant="h5" className="section-heading">
        Shopping cart
      </Typography>
      {items.length === 0 ? (
        <Typography color="text.secondary">Your cart is empty. Add products to get started.</Typography>
      ) : (
        <>
          <div className="cart-items">
            {items.map((item) => <ProductCard key={item.id} variant="cart" item={item} />)}
          </div>
          <section className="cart-summary">
            <Typography component="p" variant="h6">
              Total: {usdFormatter.format(total)}
            </Typography>
            <Button type="button" variant="contained" className="cart-buy-btn">Buy</Button>
          </section>
        </>
      )}
    </section>
  );
}

export default CartPage;
