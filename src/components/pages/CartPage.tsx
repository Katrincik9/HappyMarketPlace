import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CartItemCard from '../cartItemCard/CartItemCard';
import { useAppSelector } from '../../hooks/useStore';
import { formatCurrency } from '../../services/currency';
import './Pages.css';
import './CartPage.css';

function CartPage() {
  const items = useAppSelector(state => state.cart);
  const totalCents = useAppSelector(state => state.cart.reduce((total, item) => total + item.unitPriceCents * item.quantity, 0));

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
            {items.map((item) => <CartItemCard key={item.id} item={item} />)}
          </div>
          <section className="cart-summary">
            <Typography component="p" variant="h6">
              Total: {formatCurrency(totalCents)}
            </Typography>
            <Button type="button" variant="contained" className="cart-buy-btn">Buy</Button>
          </section>
        </>
      )}
    </section>
  );
}

export default CartPage;
