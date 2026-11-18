// import { useState } from 'react';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
// import { Link } from 'react-router';
import { useAppDispatch } from '../../hooks/useStore';
import { addItem, decreaseQuantity, increaseQuantity, removeItem } from '../../store/cartSlice';
import './ProductCard.css';
import { calculateTotal, usdFormatter } from '../../services/currency';
import type { CartItem, Product } from '../../types/productTypes';

export type ProductCardProps =
  | { variant: 'catalogue'; product: Product }
  | { variant: 'cart'; item: CartItem };

function ProductCard(props: ProductCardProps) {
  // const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const dispatch = useAppDispatch();
  const isCart = props.variant === 'cart';
  const product = props.variant === 'cart' ? props.item : props.product;

  return (
    <Card component="article" variant="outlined" className={`product-card product-card--${props.variant}`}>
      <CardMedia component="img" image={product.image} className="product-image" />
      <CardContent className="product-details">
        <Typography variant="body2" className="product-category">
          {product.category}
        </Typography>
        <Typography component="h2" variant="h6" className="product-title">
          {product.title}
        </Typography>
        {props.variant === 'catalogue' && (
          <>
            <div className="product-rating">
              <Rating value={Math.round(props.product.rating.rate)} readOnly precision={1} />
              <Typography variant="body2">{props.product.rating.rate}</Typography>
              <Typography variant="body2">({props.product.rating.count})</Typography>
            </div>
            <Typography component="p" variant="body2" color="text.secondary">
              {props.product.description}
            </Typography>
          </>
        )}
        <Typography
          component="p"
          variant={isCart ? 'body2' : 'h6'}
          color={isCart ? 'text.secondary' : 'text.primary'}
          className={isCart ? 'product-unit-price' : 'product-price'}
        >
          {isCart && 'Unit price: '}{usdFormatter.format(product.price)}
        </Typography>
        {props.variant === 'cart' && (
          <div className="product-cart-controls">
            <div className="product-quantity" role="group" aria-label={`Quantity for ${product.title}`}>
              <IconButton
                aria-label={`Decrease quantity of ${product.title}`}
                onClick={() => dispatch(decreaseQuantity(product.id))}
              >
                <RemoveIcon />
              </IconButton>
              <Typography component="span">{props.item.quantity}</Typography>
              <IconButton
                aria-label={`Increase quantity of ${product.title}`}
                onClick={() => dispatch(increaseQuantity(product.id))}
              >
                <AddIcon />
              </IconButton>
            </div>
            <Typography className="product-subtotal">
              Subtotal: {usdFormatter.format(calculateTotal([props.item]))}
            </Typography>
            <IconButton
              color="error"
              aria-label={`Remove ${product.title} from cart`}
              onClick={() => dispatch(removeItem(product.id))}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        )}
      </CardContent>
      {props.variant === 'catalogue' && (
        <Button
          className="product-cart-button"
          variant="contained"
          startIcon={<AddShoppingCartIcon />}
          // onClick={() => setLoginDialogOpen(true)}
          onClick={() => dispatch(addItem(props.product))}
        >
          Add to cart
        </Button>
      )}

      {/* <Dialog
        open={loginDialogOpen}
        onClose={() => setLoginDialogOpen(false)}
      >
        <DialogTitle>Login required</DialogTitle>
        <DialogContent>
          <DialogContentText>Log in to add products to your cart.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLoginDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            component={Link}
            to="/account"
            onClick={() => setLoginDialogOpen(false)}
          >
            Log in
          </Button>
        </DialogActions>
      </Dialog> */}
    </Card>
  );
}

export default ProductCard;
