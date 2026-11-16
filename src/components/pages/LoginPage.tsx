import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigation } from '../../hooks/useNavigation';
import './Pages.css';
import './LoginPage.css';

function LoginPage() {
  const { onNavigate } = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  return (
    <section className="login-panel">
      <Typography component="h1" variant="h5" className="section-heading">
        Your account
      </Typography>
      <form className="login-form" onSubmit={handleSubmit(() => onNavigate('products'))} noValidate>
        <TextField
          {...register("username", {
            required: "Enter your username",
          })}
          label="Username"
          required
          error={!!errors.username}
          helperText={errors.username?.message}
        />
        <TextField
          {...register("password", {
            required: "Enter your password",
          })}
          label="Password"
          type={showPassword ? 'text' : 'password'}
          required
          error={!!errors.password}
          helperText={errors.password?.message}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    type="button"
                    onClick={() => setShowPassword((visible) => !visible)}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
        <Button type="submit">
          Submit
        </Button>
      </form>
    </section>
  );
}

export default LoginPage;
