import React, {useState} from "react"
import {Flex} from '@aws-amplify/ui-react'
import {Auth, DataStore} from "aws-amplify";
import {Formation} from "../../models";
import {useEffect} from "react";
import {Button, Card, CardContent, Divider, Snackbar, TextField, Typography} from "@mui/material";
import {SearchOff} from "@mui/icons-material";
import {Alert} from "@mui/lab";


const initialState = {email: "", verification: "", actualPassword: "", newPassword: ""}

function MyFormations() {

    useEffect(() => {
        fetchUserFormations();
    }, [])


    const [email, setEmail] = useState(Auth.user.attributes.email);
    const [request, setRequest] = useState(false);
    const [formState, setFormState] = useState(initialState);
    const [verif, setVerif] = useState(false);
    function setInput(key, value) {
        setFormState({...formState, [key]: value})
    }
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [userFormations, setUserFormations] = useState([]);
    const [attributes, setAttributes] = useState("");
    const [requestP, setRequestP] = useState(false);

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

    function handleClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }

    async function updateEmail() {
        let user = await Auth.currentAuthenticatedUser();
        let result = await Auth.updateUserAttributes(user, {
            'email': formState.email
        })
        // A partir de ce moment, un code est envoyé à l'adresse mail entrée par l'utilisateur
        setEmail(formState.email);
        setRequest(false);
        setVerif(true);
    }

    async function mailVerification(){
        try{
            let result = await Auth.verifyCurrentUserAttributeSubmit('email', formState.verification)
            setVerif(false);
            setRequest(false);
            setMessage("Merci, votre changement à bien été pris en compte.");
        } catch (e) {
            console.log("Erreur lors de la verification de l'email")
        }
    }

    async function changePassword(){
        try{
            Auth.currentAuthenticatedUser()
                .then(user => {
                    return Auth.changePassword(user, formState.actualPassword, formState.newPassword);
                })
                .then(data => console.log(data))
                .catch( err => setMessage("error"))
            setMessage("success")
        } catch (e) {
            console.log("Erreur lors du changement de mot de passe", e)
        }
    }
    if (Auth.user == null || attributes == null) {
        return (
            <div>Vous n'etes plus connécté</div>
        )
    }

    return (
        <Flex direction={"column"} width={"100%"} marginTop={"1em"} padding={"2em"} height={"100vh"}>
            <Flex direction={"row"}>
                <Typography marginTop={1} variant={"h4"} fontSize={"calc(10px+1.1vmin)"} fontWeight={400} fontFamily={"Roboto"}>Voici vos informations personnelles :</Typography>
            </Flex>
            <Divider textAlign={"left"}/>
            <Flex direction={"column"}>
                <Flex direction={"row"}>
                    <p>Adresse e-mail : {email}</p>
                    {
                        !request ?
                            <Button size={"small"} variant={"text"} color={'info'} onClick={() => setRequest(true)}>Modifier</Button>
                            :
                            <Button size={"small"} variant={"text"} color={'error'} onClick={() => setRequest(false)}>Annuler</Button>
                    }
                </Flex>
                {
                    request ?
                        <Flex>
                            <TextField
                                size={"small"}
                                id={'email'}
                                label={"Nouvel Email"}
                                value={formState.email}
                                type={"email"}
                                required={true}
                                onChange={event => setInput('email', event.target.value)}
                            />
                            <Button size={"small"} onClick={() => updateEmail()}>Valider le changement</Button>
                        </Flex>
                        :
                        verif ?
                            <Flex direction={"column"}>
                                <Typography variant={"body2"} color={"text.secondary"}>Merci de saisir le code reçu par mail</Typography>
                                <TextField
                                    size={"small"}
                                    id={'verification'}
                                    label={"Code de verification"}
                                    value={formState.verification}
                                    type={"text"}
                                    required={true}
                                    onChange={event => setInput('verification', event.target.value)}
                                />
                                <Button size={"small"} onClick={() => mailVerification()}>Valider le code</Button>
                            </Flex>
                            :
                            null
                }

                {
                    message ?
                    <Flex marginBottom={"2em"}>
                        <Snackbar open={open} autoHideDuration={600} onClose={handleClose}>
                            <Alert onClose={() => handleClose()} severity="success" sx={{ width: '100%' }}>
                                Le changement à été effectué avec succes !
                            </Alert>
                        </Snackbar>
                    </Flex>
                        :
                    null
                }

                <Flex direction={'row'}>
                    <p>Mot de passe : ******</p>
                    {
                        !requestP ?
                            <Button size={"small"} variant={"text"} color={'info'} onClick={() => setRequestP(true)}>Modifier</Button>
                            :
                            <Button size={"small"} variant={"text"} color={'error'} onClick={() => setRequestP(false)}>Annuler</Button>
                    }
                </Flex>

                {
                    requestP ?
                        <Flex>
                            <TextField
                                size={"small"}
                                id={'actualPassword'}
                                label={"Mot de passe actuel"}
                                value={formState.actualPassword}
                                type={"password"}
                                required={true}
                                onChange={event => setInput('actualPassword', event.target.value)}
                            />
                            <Flex>
                                <TextField
                                    size={"small"}
                                    id={'newPassword'}
                                    label={"Nouveau mot de passe"}
                                    value={formState.newPassword}
                                    type={"password"}
                                    required={true}
                                    onChange={event => setInput('newPassword', event.target.value)}
                                />
                            </Flex>
                            <Button size={"small"} onClick={() => changePassword()}>Changer le mot de passe</Button>
                        </Flex>
                        :
                        null
                }

                {
                    message==="error" ?
                        <Typography color={"red"} variant={"body2"}>Erreur lors du changement de mot de passe</Typography>
                        :
                        message ==="success" ?
                            <Typography color={"green"} variant={"body2"} fontFamily={"Roboto"}>Changement effectué</Typography>
                            :
                            null
                }

                <Flex direction={"column"}>
                    <Typography variant={'h6'} fontWeight={400} fontFamily={"Roboto"}>
                        Voici les formations dans lesquelles vous êtes inscrit(e) :
                    </Typography>
                    <Divider textAlign={"left"}/>
                    {
                        userFormations.length === 0 ?
                            <Flex direction={"column"} height={"30vh"} width={"100%"} justifyContent={"center"}
                                  alignItems={"center"}>
                                <SearchOff fontSize={"large"}/>
                                <Flex direction={"row"}>
                                    <Typography
                                        variant={"h5"}
                                        align={"center"}
                                        fontFamily={"Roboto"}
                                        fontWeight={300}
                                    >
                                        Vous n'avez pas de Formation
                                    </Typography>
                                </Flex>
                            </Flex>
                            :
                            userFormations.map(
                                (formation, index) => (
                                    <Card elevation={3} sx={{width: "100%"}} key={index}>
                                        <CardContent>
                                            <Flex direction={'row'}>
                                                <Flex direction={"row"} flex={"1 1 auto"}>
                                                    <Typography gutterBottom={false} variant={"h5"} component={"div"}>
                                                        {formation.nom_formation}
                                                    </Typography>
                                                </Flex>
                                                <Flex>
                                                    <Typography variant={"body2"}
                                                                color={"text.secondary"}>{formation.formateur}</Typography>
                                                </Flex>
                                            </Flex>
                                            <Typography paddingTop={"0.5em"} variant={"body2"}
                                                        color={"text.secondary"}>Du {formation.date} jusqu'au {formation.date_fin}</Typography>
                                        </CardContent>
                                    </Card>
                                )
                            )
                    }
                </Flex>
            </Flex>
        </Flex>
    )
}

export default MyFormations;
