import * as React from 'react';
import Button from '@mui/material/Button';
import { SnackbarProvider, useSnackbar } from 'notistack';

function MyApp({ setShowSnackBar }) {
  const { enqueueSnackbar } = useSnackbar();

  // Define the function that shows the snackbar
  const showSnackBar = (message, variant = 'default') => {
    enqueueSnackbar(message, { variant });
  };

  // Expose it to the parent ONCE, when the component mounts
  React.useEffect(() => {
    if (setShowSnackBar) {
      setShowSnackBar(() => showSnackBar);
    }
  }, [setShowSnackBar]);

}

export default function MySnackBar({ setShowSnackBar }) {
  return (
    <SnackbarProvider maxSnack={3}>
      <MyApp setShowSnackBar={setShowSnackBar} />
    </SnackbarProvider>
  );
}
