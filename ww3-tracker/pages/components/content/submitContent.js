import { styled, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Button, Stack } from '@mui/material'
import React, { useState } from 'react'
import { HiOutlineUpload } from 'react-icons/hi'

const Input = styled('input')({
    display: 'none',
});

export default function SubmitContent(props) {

    const { open, onClose } = props
    const [file, setFile] = useState(null)

    function handleChange(e) {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0])
        }
    }

    return <Dialog open={open} onClose={onClose}>
        <DialogTitle>Submit New Content</DialogTitle>
        <DialogContent>
            <DialogContentText marginBottom={3}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eleifend erat ut ex laoreet fermentum. Cras quis sollicitudin arcu. Maecenas non ornare dui. Curabitur rutrum malesuada massa, sed rutrum neque auctor et. Nulla id neque odio. Morbi vel imperdiet turpis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec commodo non felis eget volutpat. Phasellus aliquet dolor at elit mattis, a porttitor nisl feugiat. Ut eu nibh rutrum, rutrum sapien vitae, condimentum mi. In eget nunc at libero sollicitudin gravida. Fusce consequat fermentum turpis.</DialogContentText>
            <Stack spacing={2}>

                <TextField label="Title" />
                <TextField label="Description" />
                <TextField label="Lat" />
                <TextField label="Lon" />
                <label htmlFor="contained-button-file">
                    <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={handleChange} />
                    <Button variant="contained" component="span" startIcon={<HiOutlineUpload />}>
                        {file?.name || "Upload"}
                    </Button>
                </label>

                <Button>Submit</Button>

            </Stack>
        </DialogContent>


    </Dialog>
}
