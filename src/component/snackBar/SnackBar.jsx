import React from 'react';
//import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
//import Slide from '@material-ui/core/Slide';

export default function SnackBar(props) {
  const [open, setOpen] = React.useState(false);
  const [transition, setTransition] = React.useState(undefined);


  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>

      <Snackbar
        style={{backgroundColor:'blue'}}
        open={props.open}
        onClose={handleClose}
        autoHideDuration={2000}
        TransitionComponent={transition}
        message={props.message}
      />
    </div>
  );
}
