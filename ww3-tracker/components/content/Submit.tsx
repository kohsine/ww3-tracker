import {
  styled,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Button,
  Stack,
  Tabs,
  Tab,
  Box,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import UiFileInputButton from "../upload/Upload";
import { useMutation } from "@apollo/client";
import { gql } from "../../types/__generated_graphql__/gql";
import axios from "axios";
import { S3_URL_BASE } from "../../data/constants";

const Input = styled("input")({
  display: "none",
});

export const SUBMIT_POST = gql(`
  mutation submitPost(
    $title: String!
    $url: String!
    $description: String
    $lng: Float
    $lat: Float
  ) {
    submitPost(
      title: $title
      url: $url
      description: $description
      lng: $lng
      lat: $lat
    ) {
      success
      message
      postId
    }
  }
`);

export default function SubmitContent(props) {
  const { open, onClose, coords } = props;
  const [file, setFile] = useState<File | undefined>(undefined);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [url, setUrl] = useState("");
  const [mediaType, setMediaType] = useState(0);
  const [submitPost, { loading, error }] = useMutation(SUBMIT_POST);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (coords) {
      setLat(coords.lng);
      setLng(coords.lat);
    } else {
      setLat("");
      setLng("");
    }
  }, [coords]);

  function submitDisabled() {
    if (!title || !description || !lat || !lng || !(url || file)) return true;
    // check valid lat/lng
    if (
      parseFloat(lat) > 90 ||
      parseFloat(lat) < -90 ||
      parseFloat(lng) > 180 ||
      parseFloat(lng) < -180
    )
      return true;
    return false;
  }

  async function submit() {
    setDisabled(true);
    const filekey = Date.now().toString();
    if (mediaType === 0) {
      await uploadFileToServer(filekey);
    }

    console.log("submitting post to database");
    const res = await submitPost({
      variables: {
        title,
        url: mediaType === 0 ? new URL(filekey, S3_URL_BASE).toString() : url,
        description,
        lng: parseFloat(lng),
        lat: parseFloat(lat),
      },
    });
    onClose();
    setDisabled(false);

    setFile(undefined);
    setTitle("");
    setDescription("");
    setLat("");
    setLng("");
    setUrl("");
  }

  const submitFile = async (formData: FormData) => {
    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: ({ loaded, total }) => {
        console.log(`Current progress:`, Math.round((loaded * 100) / total));
      },
    };

    const response = await axios.post("/api/upload", formData, config);

    return response.data;
  };

  const uploadFileToClient = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      console.log("upload to client", i);
      setFile(i);
      //setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  const uploadFileToServer = async (filekey: string) => {
    const body = new FormData();
    if (file == null) throw new Error("file is undefined");
    const arrayBuffer = await file.arrayBuffer();
    const blob = new Blob([new Uint8Array(arrayBuffer)], { type: file.type });
    console.log("blob", blob);
    body.append("file", blob);
    body.append("filename", filekey);
    const res = await fetch("/api/upload", {
      method: "POST",
      body,
    });
    console.log("upload files response", res);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Submit New Content</DialogTitle>
      <DialogContent>
        <DialogContentText marginBottom={3}>
          Choose a summarizing title and make your description descriptive
          (refrain from using obscenity unless it`&apos;`s contextual). Be sure
          to give context and as much information on the event as possible.
          Select a location (latitude and longitude) to help other users find
          your content by left-clicking somewhere on the map. Finally upload a
          photo or video, or paste a link related to your submission!
        </DialogContentText>
        <Stack spacing={2}>
          <TextField
            label="Title"
            required
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <TextField
            label="Description"
            required
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <TextField
            label="Lat"
            required
            value={lat}
            onChange={(e) => {
              setLat(e.target.value);
            }}
          />
          <TextField
            label="Lng"
            required
            value={lng}
            onChange={(e) => {
              setLng(e.target.value);
            }}
          />
          <Tabs
            value={mediaType}
            onChange={(e, v) => {
              setMediaType(v);
            }}
          >
            <Tab label="file" {...a11yProps(0)} />
            <Tab label="url" {...a11yProps(1)} />
          </Tabs>
          <TabPanel value={mediaType} index={0}>
            <label htmlFor="contained-button-file">
              <input type="file" name="myImage" onChange={uploadFileToClient} />
            </label>
          </TabPanel>
          <TabPanel value={mediaType} index={1}>
            <TextField
              label="URL"
              fullWidth
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
              }}
            />
          </TabPanel>

          <Button onClick={submit} disabled={disabled || submitDisabled()}>
            Submit
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

// credit https://mui.com/components/tabs/

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
