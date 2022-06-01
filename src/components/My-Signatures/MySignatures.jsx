import {Typography, Button, Box, Divider, CardContent, Card} from "@mui/material";
import {Storage} from "aws-amplify";
import React, {useState} from "react"
import {useEffect} from "react";
import {AmplifyS3Image} from "@aws-amplify/ui-react/legacy";

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
            <Box sx={{display: 'flex', flexDirection:'row', marginTop: '2em'}}>
                {
                    signatures.length>0 ?
                        signatures.map((signature, index) => (
                            <Card sx={{ maxWidth: 456, marginRight: "1em"}} elevation={4} key={index}>
                                <CardContent>
                                    <Typography variant={"body2"}>{signature.key}</Typography>
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
