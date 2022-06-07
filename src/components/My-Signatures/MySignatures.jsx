import {Typography, Button, Box, Divider, CardContent, Card, CardActions} from "@mui/material";
import {Storage} from "aws-amplify";
import React, {useState} from "react"
import {useEffect} from "react";
import {AmplifyS3Image} from "@aws-amplify/ui-react/legacy";
import {Delete} from "@mui/icons-material";

function MySignatures(){

    useEffect(() => {
        listSignatures().then();
    }, [])


    const [signatures, setSignatures] = useState([]);

    async function listSignatures(){
        // On obtiens ici la liste des objets appartenant à l'utilisateur connecté
        const result = await Storage.list('', {level: 'private'})
            .then(result => setSignatures(result))
            .catch(err => console.log(err));
    }

    return(
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: '2em'
        }}>
            <Typography mb={1} variant={"h4"} fontWeight={300} fontSize={"calc(11px + 2.2vmin)"}>Voici vos signatures :</Typography>
            <Divider/>
            <Box sx={{display: 'flex', flexDirection:'column', marginTop: '2em', marginBottom: '2em'}}>
                {
                    signatures.length>0 ?
                        signatures.map((signature, index) => (
                            <Card sx={{ maxWidth: 456, marginBottom: "1em"}} elevation={4} key={index}>
                                <CardContent>
                                    <AmplifyS3Image level={"private"} imgKey={signature.key}/>
                                </CardContent>
                            </Card>
                        ))
                        :
                        <Box>
                            Vous n'avez jamais soumis de signatures.
                        </Box>
                }
            </Box>

        </Box>
    )
}

export default MySignatures;
