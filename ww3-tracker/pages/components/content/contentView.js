import { Card, CardActions, CardContent, CardMedia, Typography, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'

export default function ContentView(props) {
    const [preview, setPreview] = useState({});

    /* useEffect(() => {
        getMediaPreview(props.url).then(preview => {
            setPreview(preview);
        });
    }, [props.url]); */
    
    return (
        <Card>
            <CardMedia 
                component={preview.type}
                height="30vh"
                src={preview.image}
            />
            <CardContent>
                <Typography gutterBottom variant="h5">{}</Typography>
                <Typography variant="body2">{}</Typography>
            </CardContent>
            <CardActions>
                <Button></Button>
            </CardActions>
        </Card>
    )
}