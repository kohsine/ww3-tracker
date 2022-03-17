import { styled, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Button, Stack, Tabs, Tab, Box, Typography } from '@mui/material'
import React, { useEffect, useState, useRef } from 'react'
import { HiOutlineUpload } from 'react-icons/hi'

export interface IProps {
  acceptedFileTypes?: string;
  allowMultipleFiles?: boolean;
  label: string;
  onChange: (formData: FormData) => void;
  uploadFileName: string;
  setFile: (file: File) => void;
}

export const UiFileInputButton: React.FC<IProps> = (props) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const onClickHandler = () => {
    fileInputRef.current?.click();
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      return;
    }

    const formData = new FormData();

    Array.from(event.target.files).forEach((file) => {
      formData.append(event.target.name, file);
      props.setFile(file);
    });

    //props.onChange(formData);
  };

  return (
    <>
      <Button variant="contained" component="span" startIcon={<HiOutlineUpload />} onClick={onClickHandler}>
        Upload
      </Button>
      <input
        accept={props.acceptedFileTypes}
        multiple={props.allowMultipleFiles}
        name={props.uploadFileName}
        onChange={onChangeHandler}
        ref={fileInputRef}
        style={{ display: 'none' }}
        type="file"
      />
    </>
  );
};

UiFileInputButton.defaultProps = {
  acceptedFileTypes: '',
  allowMultipleFiles: false,
};