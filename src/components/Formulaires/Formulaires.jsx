import React, {useEffect, useState} from 'react'
import {useLocation, useNavigate} from "react-router-dom";
import {Button, Card, Collection, Divider, Flex, Heading, TabItem, Tabs, Text,} from "@aws-amplify/ui-react";
import Reponse from "../Reponses/Reponse"
import "./formulaires.css"
import {DataStore} from "aws-amplify";
import {Categorie, Formation, Formulaire, Questions, Reponses} from "../../models";
import Signature from "../Signature/Signature";
import {Box, Checkbox, Fab, TextField, Tooltip} from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import SchoolIcon from '@mui/icons-material/School';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';

const initialState = {nom: '', prenom: '', societe: '', commentaires: ''}

function Formulaires(props) {
    const navigate = useNavigate();
    const {state} = useLocation()

    useEffect(() => {
        fetchQuestions();
        fetchCategories();
    }, [])

    const [categories, setCategories] = useState([])

    async function fetchCategories(){
        try {
            const categories = await DataStore.query(Categorie);
            setCategories(categories);
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
            const questions = await DataStore.query(Questions);
            setQuestions(questions);
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
                    updated.participants = updated.participants.filter(participant => participant !== props.user.attributes.email);
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
            if (!formState.nom || !formState.prenom) return
            const formulaire = {...formState};
            setFormulaires([...formulaires, formulaire])
            setFormState(initialState)
            await DataStore.save(new Formulaire({
                    formationID: id,
                    nom: formState.nom,
                    prenom: formState.prenom,
                    societe: formState.societe,
                    email: props.user.attributes.email,
                    remarques: formState.commentaires,
                }
            ));
            if (notes.length > 0) {
            for (const reponse of notes) {
                    await DataStore.save(new Reponses({
                        formationID: id,
                        questionsID: reponse.id,
                        rating: reponse.note,
                        submitted_by: props.user.attributes.email,
                    }));
                }
            }
        } catch (e) {
            console.log(e)
        }
    }

    const [checked, setChecked] = useState(true);
    const handleChange = (event) => {
      setChecked(event.target.checked);
    };
    const [index, setIndex] = useState(0);
    return (
        <>
            <div className={"formulaire-container"}>
                <div className={"form-title"}>
                    <Heading flex={"1 1 auto"} level={3}>{item.nom_formation}</Heading>
                    <Button textAlign={"center"} border={"none"} backgroundColor={"#ffaeae"} onClick={unSubscribe}>Se
                        désinscrire ?</Button>
                </div>
                <Divider></Divider>
                <Tabs currentIndex={index} onChange={(i) => setIndex(i)} marginTop={"1em"} justifyContent={"flex-start"} spacing={"equal"}>
                    <TabItem title={"Satisfaction"}>
                        <div className={'formulaire'}>
                            <Flex  width={"100%"} position={"absolute"} direction={"row"} justifyContent={"flex-end"} alignItems={"flex-end"} paddingRight={"2em"}>
                                <Fab color={"primary"} onClick={()=> setIndex(1)}>
                                    <ArrowForwardIosIcon/>
                                </Fab>
                            </Flex>
                            <div className={'personnal-infos'}>
                                <Heading fontWeight={400} variation={"info"} textAlign={"center"} level={3} paddingBottom={"1em"} paddingTop={"1em"}>Informations
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
                                    <Flex direction={"row"} width={"100%"} justifyContent={"flex-end"} height={"100%"}>
                                        <Tooltip title={"Entrez vos informations"} arrow>
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

                            <Flex width={"90%"} justifyContent={"center"}>
                                <Tabs width={"100%"} spacing={"equal"}>
                                    {
                                        categories.map((categorie, index) => (
                                            <TabItem width={"100%"} key={index} title={categorie.nom}>
                                                <Collection width={"100%"} marginTop={"2em"} items={questions}>
                                                    {(item, index) => (
                                                        item.questionsCategorieId === categorie.id ?
                                                            <Flex direction={"column"} width={"100%"} justifyContent={"center"} alignItems={"center"}>
                                                                <Card width={"100%"} marginBottom={"1em"} boxShadow={"-4px 4px 5px 1px whitesmoke"} key={index}>
                                                                    <Flex width={"100%"} direction={"row"}>
                                                                        <Heading fontSize={"calc(5px + 2vmin)"} marginRight={"3em"} flex={"1 1 auto"} fontWeight={500} level={4}>{item.titre}</Heading>
                                                                        <Reponse id={item.id} user={props.user} getNote={getChildValue}/>
                                                                    </Flex>
                                                                </Card>
                                                            </Flex>
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
                                width: '50%'
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
                                <Text fontWeight={"bolder"}>J'accepte que les données entrées ci-dessus soient stockées et traitées</Text>
                                <Checkbox checked={checked} onChange={handleChange}/>
                            </Flex>
                            <Flex marginBottom={"2em"}>
                                {
                                    !formState.nom || !formState.prenom || !formState.societe || !checked ?
                                        <Button disabled={true} marginBottom={"5em"} onClick={() => createFormulaire()}>Envoyer
                                            le formulaire</Button>
                                        :
                                        <Button disabled={false} marginBottom={"5em"} onClick={() => createFormulaire()}>Envoyer
                                            le formulaire</Button>
                                }
                            </Flex>

                        </div>
                    </TabItem>
                        <TabItem title={"Signature"}>
                            <Signature/>
                            <Flex direction={"row"} paddingLeft={"2em"} position={"fixed"} width={"100%"} justifyContent={"flex-start"} alignItems={"center"}>
                                <Fab color={"primary"} onClick={() => setIndex(0)}>
                                    <ArrowBackIosNewIcon/>
                                </Fab>
                            </Flex>
                        </TabItem>
                </Tabs>
            </div>
        </>
    )
}

export default Formulaires;
