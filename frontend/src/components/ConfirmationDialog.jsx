import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

const ConfirmationDialog = ({ open, onClose, onConfirm, title, description }) => {
	return (
		<Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				<DialogContentText style={{ textAlign: 'center' }}>{description}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} color="primary">
					Cancel
				</Button>
				<Button onClick={onConfirm} color="primary" autoFocus>
					Confirm
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ConfirmationDialog;
