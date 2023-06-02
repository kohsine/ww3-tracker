import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import React from "react";

export default function ReportContent(props) {
  const { open, onClose } = props;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Report this post</DialogTitle>
      <DialogContent>
        <DialogContentText marginBottom={3}>
          State your justification for reporting this content and our moderators
          will review the post.
        </DialogContentText>
        <Stack spacing={2}>
          <TextField label="Justification" multiline rows={3} />
          <Button>Submit report</Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
