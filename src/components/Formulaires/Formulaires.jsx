import React, {useEffect, useState} from 'react'
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {Collection,Button, Divider, Flex, Heading, TabItem, Tabs, Text,} from "@aws-amplify/ui-react";
import Reponse from "../Reponses/Reponse"
import "./formulaires.css"
import {Auth, DataStore} from "aws-amplify";
import {Categorie, Formation, Formulaire, Questions, Reponses} from "../../models";
import {Box, Card, Checkbox, TextField, Tooltip} from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import ReactLoading from "react-loading";

const initialState = {nom: '', prenom: '', societe: '', commentaires: ''}

function Formulaires(props) {
    const navigate = useNavigate();
    const {state} = useLocation()

    useEffect(() => {
        fetchFormulaires();
        fetchQuestions();
        fetchCategories();
    }, [])

    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    async function fetchFormulaires() {
        try {
            // On récupère les formulaires soumis pas l'utilisateurs.
            const formulaires = await DataStore.query(Formulaire, f =>
                f.email("eq", Auth.user.attributes.email).formationID("eq", state.id)
            )
            if(formulaires.length>0){
                setSubmitted(true);
            } else {
                setSubmitted(false);
            }
        } catch (e) {
            console.log("Erreur lors de la récupération du formulaire !" + e)
        }
    }

    async function fetchCategories() {
        try {
            setLoading(true)
            const categories = await DataStore.query(Categorie);
            setCategories(categories);
            setLoading(false)
        } catch (e) {
            console.log(e)
        }
    }

    // On à passé l'objet de la formation en entier :)
    const {id, item} = state

    const [formState, setFormState] = useState(initialState)
    const [formulaires, setFormulaires] = useState([])

    function setInput(key, value) {
        setFormState({...formState, [key]: value})
    }


    const [questions, setQuestions] = useState([]);

    async function fetchQuestions() {
        try {
            setLoading(true);
            const questions = await DataStore.query(Questions);
            setQuestions(questions);
            setLoading(false);
        } catch (e) {
            console.log(e, 'Erreur lors de la récupération des questions...');
        }
    }


    async function unSubscribe() {
        try {
            // On récupère la formation actuelle.
            const original = await DataStore.query(Formation, item.id);
            // on tente de faire un update, pour supprimer l'email
            await DataStore.save(
                Formation.copyOf(original, updated => {
                    updated.participants = updated.participants.filter(participant => participant !== Auth.user.attributes.email);
                }))
            navigate('*');
        } catch (e) {
            console.log(e);
        }
    }

    const [notes, setnote] = useState([])


    function getChildValue(id, note) {
        // On effectue une copie du tableau des notes
        const tabCopy = [...notes];

        // Nous sommes obligé d'insérer la premiere valeur
        if (tabCopy.length === 0) {
            tabCopy.push({id, note});
        }
        // Si l'id passé en paramètre est dans le tableau, alors on met à jour uniquement la note
        if (tabCopy.find(elt => id === elt.id)) {
            // Ici il faut mettre à jour la note correspondante
            tabCopy.forEach(element => {
                if (element.id === id) {
                    element.note = note
                }
            })
        } else {
            tabCopy.push({id, note})
        }
        setnote(tabCopy);
    }


    async function createFormulaire() {
        try {
            setLoading(true)
            if (!formState.nom || !formState.prenom) return
            const formulaire = {...formState};
            setFormulaires([...formulaires, formulaire])
            setFormState(initialState)
            await DataStore.save(new Formulaire({
                    formationID: id,
                    nom: formState.nom,
                    prenom: formState.prenom,
                    societe: formState.societe,
                    email: Auth.user.attributes.email,
                    remarques: formState.commentaires,
                }
            ));
            if (notes.length > 0) {
                for (const reponse of notes) {
                    await DataStore.save(new Reponses({
                        formationID: id,
                        questionsID: reponse.id,
                        rating: reponse.note,
                        submitted_by: Auth.user.attributes.email,
                    }));
                }
            }
            setLoading(false);
            navigate("success")
        } catch (e) {
            console.log(e)
        }
    }

    const [categorie, setCategorie] = useState(0);

    const [checked, setChecked] = useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };


    if (loading === true) {
        return (
            <Flex direction={"column"} justifyContent={"center"} alignItems={"center"} width={"100%"} height={"100vh"}>
                <ReactLoading type={"bubbles"} color={"black"}></ReactLoading>
            </Flex>
        )
    } else if (submitted === true) {
        return (
            <Flex direction={"column"} justifyContent={"center"} alignItems={"center"} width={"100%"} height={"50vh"}>
                <Flex direction={"row"} justifyContent={"center"} alignItems={"center"}>
                    <Heading textAlign={"center"} fontWeight={500} fontSize={"calc(13pt + 2vmin)"} fontFamily={"Roboto"}>Vous avez déjà soumis le formulaire pour cette
                        formation.</Heading>
                </Flex>
                <Flex>
                    <NavLink to={{
                        pathname: '/',
                    }}><Button variation={"link"}>Retourner à l'accueil</Button></NavLink>
                </Flex>
            </Flex>
        )
    } else {

        return (
            <>
                <div className={"formulaire-container"}>
                    <div className={"form-title"}>
                        <Heading fontFamily={"Roboto"} flex={"1 1 auto"} level={3}>{item.nom_formation}</Heading>
                        <Button size={"small"} textAlign={"center"} fontFamily={"Roboto"} border={"none"}
                                backgroundColor={"#ffaeae"} onClick={unSubscribe}>Se
                            désinscrire ?</Button>
                    </div>
                    <Divider></Divider>
                            <div className={'formulaire'}>
                                <Flex width={"100%"} position={"absolute"} direction={"row"} justifyContent={"flex-end"}
                                      alignItems={"flex-end"} paddingRight={"2em"}>
                                </Flex>
                                <div className={'personnal-infos'}>
                                    <Heading fontFamily={"Roboto"} fontWeight={400} variation={"info"}
                                             textAlign={"center"} level={3}
                                             paddingBottom={"1em"} paddingTop={"1em"}>Informations
                                        personnelles</Heading>
                                    <Box
                                        sx={{
                                            padding: "2em",
                                            boxShadow: "-5px 5px 10px 2px whitesmoke",
                                            display: 'flex',
                                            flexDirection: 'column',
                                            marginTop: '1em',
                                            width: '100%',
                                            marginBottom: '2em',
                                        }}
                                    >
                                        <Flex direction={"row"} width={"100%"} justifyContent={"flex-end"}
                                              height={"100%"}>
                                            <Tooltip title={"Merci de compléter vos informations"} arrow>
                                                <InfoIcon color={"info"}/>
                                            </Tooltip>
                                        </Flex>
                                        <Flex
                                            direction={"column"}
                                        >
                                            <TextField
                                                variant={"standard"}
                                                onChange={event => setInput('nom', event.target.value)}
                                                value={formState.nom}
                                                label="Nom*"
                                            />
                                            <TextField
                                                variant={"standard"}
                                                onChange={event => setInput('prenom', event.target.value)}
                                                value={formState.prenom}
                                                label="Prénom*"
                                            />
                                            <TextField
                                                variant={"standard"}
                                                onChange={event => setInput('societe', event.target.value)}
                                                value={formState.societe}
                                                label="Société*"
                                            />
                                        </Flex>
                                    </Box>
                                </div>

                                <Flex width={"100%"} justifyContent={"center"}>
                                    <Tabs currentIndex={categorie} onChange={(i) => setCategorie(i)} width={"100%"}
                                          spacing={"equal"} justifyContent={"center"}>
                                        {
                                            categories.map((categorie, index) => (
                                                <TabItem width={"100%"} key={index} title={
                                                    <Flex direction={"row"} alignItems={"center"}
                                                          justifyContent={"center"}>
                                                        <Text fontFamily={"Roboto"}
                                                              color={"black"}>{categorie.nom}</Text>
                                                    </Flex>

                                                }>
                                                    <Collection width={"100%"} marginTop={"2em"} items={questions}>
                                                        {(item, index) => (
                                                            item.questionsCategorieId === categorie.id ?
                                                                <Card sx={{padding: '1em'}} width={"100%"} marginBottom={"1em"}
                                                                      boxShadow={"-4px 4px 5px 1px whitesmoke"}
                                                                      key={index}>
                                                                    <Flex direction={"row"} width={"100%"}
                                                                          alignItems={"center"}>
                                                                        <Flex flex={"1 1 auto"} alignSelf={"flex-start"}
                                                                              justifyContent={"flex-start"}
                                                                              alignItems={"center"}>
                                                                            <h1 className={"question-title"}>{item.titre}</h1>
                                                                        </Flex>
                                                                        <Flex direction={"row"}
                                                                              justifyContent={"flex-end"}>
                                                                            <Reponse id={item.id} user={Auth.user}
                                                                                     getNote={getChildValue}/>
                                                                        </Flex>
                                                                    </Flex>
                                                                </Card>
                                                                :
                                                                undefined
                                                        )}
                                                    </Collection>
                                                </TabItem>
                                            ))
                                        }
                                    </Tabs>
                                </Flex>


                                <Box className={"remarques"} sx={{
                                    display: 'flex',
                                    alignItems: 'flex-end',
                                    marginTop: '2em',
                                    marginBottom: '2em',
                                    width: '70%',
                                    minWidth: '300px',
                                }}>
                                    <TextField
                                        fullWidth
                                        variant={"outlined"}
                                        label={"Autres remarques :"}
                                        value={formState.commentaires}
                                        onChange={event => setInput('commentaires', event.target.value)}
                                    />
                                </Box>
                                <Flex direction={"row"} alignItems={"center"} width={"50%"} marginBottom={"2em"}>
                                    <Text fontSize={"calc(8pt + 0.7vmin)"} fontFamily={"Roboto"} fontWeight={"bolder"}>J'accepte
                                        que les données entrées ci-dessus soient stockées
                                        et traitées</Text>
                                    <Checkbox checked={checked} onChange={handleChange}/>
                                </Flex>
                                <Flex marginBottom={"2em"}>
                                    {
                                        !formState.nom || !formState.prenom || !formState.societe || !checked ?
                                            <Button fontFamily={"Roboto"} disabled={true} marginBottom={"5em"}
                                                    onClick={() => createFormulaire()}>Envoyer
                                                le formulaire</Button>
                                            :
                                            <Button fontFamily={"Roboto"} disabled={false} marginBottom={"5em"}
                                                    onClick={() => createFormulaire()}>Envoyer
                                                le formulaire</Button>
                                    }
                                </Flex>

                            </div>
                </div>
            </>
        )
    }
}

export default Formulaires;
