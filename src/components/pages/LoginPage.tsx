import Typography from '@mui/material/Typography';
import './Pages.css';

function LoginPage() {
  return (
    <section aria-labelledby="login-title">
      <Typography component="h1" variant="h5" id="login-title" className="section-heading">
        Your account
      </Typography>
    </section>
  );
}

export default LoginPage;
