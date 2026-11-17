import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useAppDispatch } from '../../hooks/useStore';
import { decreaseQuantity, increaseQuantity, removeItem } from '../../store/cartSlice';
import type { CartItem } from '../../types/cartTypes';
import { formatCurrency } from '../../services/currency';
import './CartItemCard.css';

function CartItemCard({ item }: {item : CartItem}) {
  const dispatch = useAppDispatch();

  return (
    <Card component="article" variant="outlined" className="cart-item">
      <CardMedia component="img" image={item.image} className="cart-item-image" />
      <CardContent className="cart-item-details">
        <Typography variant="body2" className="cart-item-category">{item.category}</Typography>
        <Typography component="h2" variant="h6" className="cart-item-title">{item.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          Unit price: {formatCurrency(item.unitPriceCents)}
        </Typography>
        <div className="cart-item-controls">
          <div className="cart-item-quantity">
            <IconButton onClick={() => dispatch(decreaseQuantity(item.id))}>
              <RemoveIcon />
            </IconButton>
            <Typography component="span">{item.quantity}</Typography>
            <IconButton onClick={() => dispatch(increaseQuantity(item.id))}>
              <AddIcon />
            </IconButton>
          </div>
          <Typography className="cart-item-total">
            Subtotal: {formatCurrency(item.unitPriceCents * item.quantity)}
          </Typography>
          <IconButton color="error" onClick={() => dispatch(removeItem(item.id))}>
            <DeleteIcon />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
}

export default CartItemCard;
