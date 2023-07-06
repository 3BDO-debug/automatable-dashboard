import React from 'react';
import { useRecoilState } from 'recoil';
// material
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
// atoms
import alertAtom from 'src/recoil/atoms/alertAtom';

// ------------------------------------------------------------------------------------------

const MUIAlert = React.forwardRef(function MUIAlert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// ------------------------------------------------------------------------------------------

function Alert() {
  const [alert, setAlert] = useRecoilState(alertAtom);

  const handleClose = () => {
    setAlert({ ...alert, triggered: false });
  };

  return (
    <Snackbar open={alert.triggered} autoHideDuration={6000} onClose={handleClose}>
      <MUIAlert onClose={handleClose} severity={alert.type} sx={{ width: '100%', color: 'white' }}>
        {alert.message}
      </MUIAlert>
    </Snackbar>
  );
}

export default Alert;
