import { Button } from "@mui/material";
import React, { useRef } from "react";
import { HiOutlineUpload } from "react-icons/hi";

interface Props {
  label: string;
  uploadFileName: string;
  buttonLabel: string;
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  acceptedFileTypes?: string;
  allowMultipleFiles?: boolean;
}

const UiFileInputButton = ({
  label,
  uploadFileName,
  buttonLabel,
  setFile,
  acceptedFileTypes,
  allowMultipleFiles,
}: Props) => {
  const fileInputRef = useRef<any>();

  const onClickHandler = () => {
    fileInputRef.current?.click();
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return;
    const formData = new FormData();
    Array.from(event.target.files).forEach((file) => {
      formData.append(event.target.name, file);
      console.log("on change file", file);
      setFile(file);
    });
  };

  return (
    <>
      <Button
        variant="contained"
        component="span"
        startIcon={<HiOutlineUpload />}
        onClick={onClickHandler}
      >
        {buttonLabel}
      </Button>
      <input
        accept={acceptedFileTypes}
        multiple={allowMultipleFiles}
        name={uploadFileName}
        onChange={onChangeHandler}
        ref={fileInputRef}
        style={{ display: "none" }}
        type="file"
      />
    </>
  );
};

export default UiFileInputButton;
