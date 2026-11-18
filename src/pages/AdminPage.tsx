import { useState } from 'react';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { useAppDispatch, useAppSelector } from '../hooks/useStore';
import { setProductLimit } from '../store/settingsSlice';
import './Pages.css';
import './AdminPage.css';
import { MAX_PRODUCT_LIMIT, MIN_PRODUCT_LIMIT } from '../constants/productLimit';

function AdminPage() {
  const dispatch = useAppDispatch();
  const productLimit = useAppSelector((state) => state.settings);
  const [draftLimit, setDraftLimit] = useState(productLimit);

  return (
    <section className="admin-panel">
      <Typography component="h1" variant="h5" className="section-heading">
        Admin
      </Typography>
      <Typography color="text.secondary">
        Choose how many products appear in the catalogue.
      </Typography>
      <Typography className="admin-limit-label">
        Products to display: {draftLimit}
      </Typography>
      <div className="admin-slider">
        <Slider          
          min={MIN_PRODUCT_LIMIT}
          max={MAX_PRODUCT_LIMIT}
          step={1}
          marks
          valueLabelDisplay="auto"
          value={draftLimit}
          onChange={(_, value) => {
            if (typeof value === 'number') setDraftLimit(value);
          }}
          onChangeCommitted={(_, value) => {
            if (typeof value === 'number') dispatch(setProductLimit(value));
          }}
        />
      </div>
    </section>
  );
}

export default AdminPage;
