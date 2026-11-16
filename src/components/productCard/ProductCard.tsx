import { useState } from 'react';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import type { ProductCardProps } from '../../types/productTypes';
import { useNavigation } from '../../hooks/useNavigation';
import './ProductCard.css';

function ProductCard({ product }: ProductCardProps) {
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const { onNavigate } = useNavigation();

  return (
    <Card component="article" variant="outlined" className="product-card">
      <CardMedia component="img" image={product.image} className="product-image"/>
      <CardContent className="product-details">
        <Typography variant="body2" className="product-category">
          {product.category}
        </Typography>
        <Typography component="h2" variant="h6" className="product-title">
          {product.title}
        </Typography>
        <div className="product-rating">
          <Rating value={Math.round(product.rating.rate)} readOnly precision={1} />
          <Typography variant="body2">{product.rating.rate}</Typography>
          <Typography variant="body2">({product.rating.count})</Typography>
        </div>
        <Typography component="p" variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography component="p" variant="h6" className="product-price">
          {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)}
        </Typography>
      </CardContent>
      <Button
        className="product-cart-button"
        variant="contained"
        startIcon={<AddShoppingCartIcon />}
        onClick={() => setLoginDialogOpen(true)}
      >
        Add to cart
      </Button>

      <Dialog
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
            onClick={() => {
              setLoginDialogOpen(false);
              onNavigate('login');
            }}
          >
            Log in
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

export default ProductCard;
