import React, {useEffect, useState} from "react";
import "./formations.css";
import { Auth, DataStore} from "aws-amplify";
import {Formation} from "../../models";
import {Badge as AmpBadge, Card, Collection, Divider, Flex, Heading} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import {useNavigate} from 'react-router-dom';
import ReactLoading from "react-loading";
import {Button, IconButton} from "@mui/material";
import {Assignment} from "@mui/icons-material";
import {Storage} from "aws-amplify";

function Formations(props) {
    useEffect(() => {
        fetchFormations();
    }, [])


    const navigate = useNavigate();
    const [formations, setFormations] = useState([]);
    const [loading, setLoading] = useState(true);


    // On récupère les formations, puis on les affiche dans une liste.
    async function fetchFormations() {
        try {
            const formations = await DataStore.query(Formation);
            setFormations(formations)
            setLoading(false);
        } catch (e) {
            console.log("Erreur lors de la récupération des formations")
        }
    }




    async function subscribe(id_formation, item) {
        // Cette fonction ajoute l'utilisateur courant a la liste des participants de la formation.
        try {
            const original = await DataStore.query(Formation, id_formation);
            if (original.participants.find(element => element === Auth.user.attributes.email)) {
                alert('Vous êtes déjà inscrit dans cette formation')
            } else {
                await DataStore.save(
                    Formation.copyOf(original, updated => {
                        updated.participants.push(Auth.user.attributes.email);
                    })
                )
                navigate('formulaire', {state: {id: id_formation, item: item}});
            }
        } catch (e) {
            console.log("Erreur lors de l'inscritpion", e)
        }
    }


    function navigateToForm(item) {
        navigate('formulaire', {state: {id: item.id, item: item}});
    }

    function navigateToSignature(item, date, date_fin){
        navigate('submitSignature', {state: {item: item, date: date, date_fin: date_fin}})
    }


    function getDuree(date_debut, date_fin) {
        const fin = Number(date_fin.split("-", 7).slice(2, 3));
        const debut = Number(date_debut.split("-", 7).slice(2, 3));
        return fin - debut;
    }


    if (loading === true) {
        return (
            <Flex direction={"column"} justifyContent={"center"} alignItems={"center"} width={"100%"} height={"100vh"}>
                <ReactLoading type={"bubbles"} color={"black"}></ReactLoading>
            </Flex>
        )
    } else
        return (
            <div className={"formations"}>
                {
                    Auth.user != null || undefined?
                        <Heading className={"welcome"}  fontSize={"calc(12px + 2.2vmin)"} marginTop={"1.5em"} level={3}>Bonjour {Auth.user.attributes.email},
                            voici les formations disponibles</Heading>
                        :
                        <Heading className={"welcome"} fontSize={"calc(12px + 2.2vmin)"} marginTop={"1.5em"} level={3}>Bienvenue, veuillez vous connecter
                            afin de choisir votre formation</Heading>
                }

                <Divider paddingTop={"1em"} orientation={"horizontal"}></Divider>
                <div className={"formations-container"}>
                    <Collection marginBottom={"2em"} paddingTop={"2em"} items={formations}>
                        {(item, index) => (
                            <Card className={"cards"} marginBottom={"2em"} key={index} padding={"1rem"}>
                                <Flex
                                    direction={"column"}
                                    flex={"1 1 auto"}
                                    justifyContent={"center"}
                                    alignItems={"flex-start"}
                                >
                                    <Flex
                                        direction={"row"}
                                        width={"100%"}
                                    >
                                        <Flex direction={"row"} justifyContent={"flex-start"}></Flex>
                                        <Heading fontFamily={"Roboto"} level={4}>
                                            {item.nom_formation}
                                        </Heading>
                                        <Flex flex={"1 1 auto"} direction={"row"} alignItems={"flex-end"}
                                              justifyContent={"flex-end"}>
                                            <AmpBadge fontFamily={"Roboto"} borderRadius={"2px"} size={"small"}>Formateur
                                                : {item.formateur}</AmpBadge>
                                        </Flex>
                                    </Flex>

                                    <Flex
                                        direction={"row"}
                                        width={"100%"}
                                        alignItems={"center"}
                                    >
                                        <Flex marginLeft={"1em"} direction={"row"} width={"100%"}
                                              justifyContent={"flex-start"} alignItems={"center"}>
                                            <AmpBadge size={"small"} variation={"info"} fontFamily={"Roboto"}>{item.date}</AmpBadge>
                                            <AmpBadge className={"formation-length"} fontFamily={"Roboto"} size={"small"}
                                                   variation={"success"}>{getDuree(item.date, item.date_fin)} jours</AmpBadge>
                                        </Flex>
                                        {
                                             Auth.user !== null || undefined ?
                                                <Flex direction={"column"} alignItems={"center"}
                                                      justifyContent={"center"}>
                                                    {
                                                        item.participants.find(participant => participant === Auth.user.attributes.email) ?
                                                            <Flex direction={"row"} alignItems={'center'}>
                                                                    <IconButton onClick={() => navigateToSignature(item, item.date, item.date_fin)}><Assignment sx={{color: 'black'}}/></IconButton>
                                                                <Button fontFamily={"Roboto"} size={"small"}
                                                                        variant={"contained"} color={"info"}
                                                                        disabled={props.submitted}
                                                                        onClick={() => navigateToForm(item)}>Accéder</Button>
                                                            </Flex>
                                                            :
                                                            <Button fontFamily={"Roboto"}
                                                                    color={"success"}
                                                                    variant={"contained"}
                                                                    size={"small"}
                                                                    disabled={item.participants.find(participant => participant === Auth.user.attributes.email)}
                                                                    onClick={() => subscribe(item.id, item)}>Choisir</Button>
                                                    }
                                                </Flex>
                                                :
                                                <Flex direction={"column"} alignItems={"center"}
                                                      justifyContent={"center"}>
                                                    {
                                                        <Button className={"subscribe-btn"}
                                                                size={"small"}
                                                                variant={"contained"}
                                                                color={"success"}
                                                                onClick={() => navigate("signIn")}>Choisir</Button>
                                                    }
                                                </Flex>
                                        }

                                    </Flex>
                                </Flex>
                            </Card>
                        )}
                    </Collection>
                </div>
            </div>
        )
}

export default Formations;
