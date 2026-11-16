import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import type { ProductCardProps } from '../../types/productTypes';
import './ProductCard.css';

function ProductCard({ product }: ProductCardProps) {
  return (
    <Card component="article" variant="outlined" className="product-card">
      <CardMedia component="img" image={product.image} className="product-image"/>
      <CardContent className="product-details">
        <Typography component="h2" variant="h6" className="product-title">
          {product.title}
        </Typography>
        <div className="product-rating">
          <Rating value={Math.round(product.rating.rate)} readOnly precision={1} />
          <Typography variant="body2">({product.rating.count})</Typography>
        </div>
        <Typography component="p" variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography component="p" variant="h6" className="product-price">
          {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)}
        </Typography>
      </CardContent>
      <Button className="product-cart-button" variant="contained" disabled startIcon={<AddShoppingCartIcon />}>
        Add to cart
      </Button>
    </Card>
  );
}

export default ProductCard;
