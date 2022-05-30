import React, {useState} from "react"
import {Flex} from '@aws-amplify/ui-react'
import {Auth, DataStore} from "aws-amplify";
import {Formation} from "../../models";
import {useEffect} from "react";
import {Button, Card, CardContent, Divider, TextField, Typography} from "@mui/material";


const initialState = {username: ""}

function MyFormations() {


    useEffect(() => {
        fetchUserFormations();
    }, [])

    const [request, setRequest] = useState(false);
    const [formState, setFormState] = useState(initialState);

    function setInput(key, value) {
        setFormState({...formState, [key]: value})
    }

    const [userFormations, setUserFormations] = useState([]);
    const [attributes, setAttributes] = useState("");

    async function fetchUserFormations() {
        try {
            // On veut récupérer les formations dont l'email de l'utilisateur est dans la liste des particiapants
            const attributes = await Auth.currentAuthenticatedUser();
            setAttributes(attributes);
            const userFormations = await DataStore.query(Formation, f => f.participants("contains", attributes.attributes.email))
            setUserFormations(userFormations);
        } catch (e) {
            console.log("Erreur lors de la récupération des formations")
        }
    }

    async function updateUserName(){
         let user = await Auth.currentAuthenticatedUser();
    }

    return (
        <Flex direction={"column"} width={"100%"}  marginTop={"2em"} padding={"1em"} height={"100vh"}>
            <Flex direction={"row"}>
                <Typography variant={"h5"} fontWeight={400} fontFamily={"Roboto"}>Voici vos informations personnelles
                    :</Typography>
            </Flex>

            <Flex direction={"column"} marginLeft={"1em"}>
                <Flex direction={"row"} alignItems={"center"}>
                </Flex>
                {
                    request ?
                        <Flex>
                            <TextField
                                id={'username'}
                                label={"Nouveau nom d'utilisateur"}
                                value={formState.username}
                                type={"email"}
                                required={true}
                                onChange={event => setInput('username', event.target.value)}
                            />
                            <Button onClick={() => updateUserName()}>Valider le changement</Button>
                        </Flex>

                        :
                        null
                }
                <Flex direction={"row"} alignItems={"center"}>
                    <p>Adresse e-mail : {Auth.user.attributes.email}</p>
                </Flex>

                <Flex direction={"column"}>
                    <Typography variant={'h6'} fontWeight={400} fontFamily={"Roboto"}>
                        Voici les formations dans lesquelles vous êtes inscrit(e) :
                    </Typography>
                    <Divider textAlign={"left"} />
                    {userFormations.map(
                        (formation, index) => (
                            <Card  elevation={3} sx={{width: "100%"}} key={index}>
                                <CardContent>
                                    <Flex direction={'row'}>
                                        <Flex direction={"row"} flex={"1 1 auto"}>
                                            <Typography gutterBottom={false} variant={"h5"} component={"div"}>
                                                {formation.nom_formation}
                                            </Typography>
                                        </Flex>
                                        <Flex>
                                            <Typography variant={"body2"} color={"text.secondary"}>{formation.formateur}</Typography>
                                        </Flex>
                                    </Flex>
                                    <Typography paddingTop={"0.5em"} variant={"body2"} color={"text.secondary"}>Du {formation.date} jusqu'au {formation.date_fin}</Typography>
                                </CardContent>
                            </Card>
                        )
                    )}
                </Flex>
            </Flex>
        </Flex>
    )
}

export default MyFormations;
