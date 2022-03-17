import { styled, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Button, Stack, Tabs, Tab, Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { HiOutlineUpload } from 'react-icons/hi'
import { UiFileInputButton } from '../upload/UiFileInputButton'

const Input = styled('input')({
    display: 'none',
});

export default function SubmitContent(props) {

    
    const { open, onClose, coords } = props
    const [file, setFile] = useState("");
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [url, setUrl] = useState('');
    const [mediaType, setMediaType] = useState(0);

    function handleChange(e) {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0])
        }
    }

    useEffect(() => {
        if (coords) {
            setLat(coords.lat)
            setLng(coords.lng)
        } else {
            setLat("")
            setLng("")
        }
    }, [coords])

    function submit() {
      const formData = new FormData();
      formData.append('title', title)
      formData.append('description', description)
      formData.append('lat', lat)
      formData.append('lng', lng)
      if (mediaType === 1) {
        formData.append('url', url)
      } else {
        formData.append('file', file)
      }
      // TODO
      for (let i of formData.values()) {
        console.log(i)
      }

      const fileData = new FormData();
      fileData.append('theFiles', file);
      submitFile(fileData);
    }

    const submitFile = async (formData) => {
      const axios = require('axios');
      const config = {
        headers: { 'content-type': 'multipart/form-data' },
        onUploadProgress: (event) => {
          console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
        },
      };
  
      const response = await axios.post('/api/upload', formData, config);
  
      console.log('response', response.data);
    };

    return <Dialog open={open} onClose={onClose}>
        <DialogTitle>Submit New Content</DialogTitle>
        <DialogContent>
            <DialogContentText marginBottom={3}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eleifend erat ut ex laoreet fermentum. Cras quis sollicitudin arcu. Maecenas non ornare dui. Curabitur rutrum malesuada massa, sed rutrum neque auctor et. Nulla id neque odio. Morbi vel imperdiet turpis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec commodo non felis eget volutpat. Phasellus aliquet dolor at elit mattis, a porttitor nisl feugiat. Ut eu nibh rutrum, rutrum sapien vitae, condimentum mi. In eget nunc at libero sollicitudin gravida. Fusce consequat fermentum turpis.</DialogContentText>
            <Stack spacing={2}>

                <TextField label="Title" required value={title} onChange={e => {setTitle(e.target.value)}}/>
                <TextField label="Description" required value={description} onChange={e => {setDescription(e.target.value)}}/>
                <TextField label="Lat" required value={lat} onChange={e => {setLat(e.target.value)}}/>
                <TextField label="Lon" required value={lng} onChange={e => {setLng(e.target.value)}}/>
                <Tabs value={mediaType} onChange={(e, v) => {setMediaType(v)}}>
                    <Tab label="file" {...a11yProps(0)}/>
                    <Tab label="url" {...a11yProps(1)}/>
                </Tabs>
                <TabPanel value={mediaType} index={0}>
                    <label htmlFor="contained-button-file">
                        {/*<Input accept="image/*" id="contained-button-file" multiple type="file" onChange={handleChange} />
                        <Button variant="contained" component="span" startIcon={<HiOutlineUpload />}>
                            {file?.name || "Upload"}
  </Button>*/}
                      <UiFileInputButton
                        label="Upload Single File"
                        uploadFileName="theFiles"
                        setFile={setFile}
                      />
                    </label>
                </TabPanel>
                <TabPanel value={mediaType} index={1}>
                    <TextField label="URL" fullWidth/>
                    
                </TabPanel>

                <Button onClick={submit}>Submit</Button>

            </Stack>
        </DialogContent>


    </Dialog>
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
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}