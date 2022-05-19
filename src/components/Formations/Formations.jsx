import React, {useEffect, useState} from "react";
import "./formations.css";
import {Auth, DataStore} from "aws-amplify";
import {Formation} from "../../models";
import {Badge, Button, Card, Collection, Divider, Flex, Heading} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import {useNavigate} from 'react-router-dom';
import ReactLoading from "react-loading";

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
            if (original.participants.find(element => element === props.user.attributes.email)) {
                alert('Vous êtes déjà inscrit dans cette formation')
            } else {
                await DataStore.save(
                    Formation.copyOf(original, updated => {
                        updated.participants.push(props.user.attributes.email);
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
                <Heading className={"welcome"} marginTop={"2em"} level={4}>Bonjour {props.user.attributes.email}, voici
                    les formations disponibles</Heading>
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
                                        <Heading level={4}>
                                            {item.nom_formation}
                                        </Heading>
                                        <Flex flex={"1 1 auto"} direction={"row"} alignItems={"flex-end"}
                                              justifyContent={"flex-end"}>
                                            <Badge borderRadius={"2px"} size={"small"}>Formateur
                                                : {item.formateur}</Badge>
                                        </Flex>
                                    </Flex>

                                    <Flex
                                        direction={"row"}
                                        width={"100%"}
                                        alignItems={"center"}
                                    >
                                        <Flex marginLeft={"1em"} direction={"row"} width={"100%"}
                                              justifyContent={"flex-start"} alignItems={"center"}>
                                            <Badge size={"small"} variation={"info"}>{item.date}</Badge>
                                            <Badge className={"formation-length"} size={"small"}
                                                   variation={"success"}>{getDuree(item.date, item.date_fin)} jours</Badge>
                                        </Flex>
                                        <Flex direction={"column"} alignItems={"center"} justifyContent={"center"}>
                                            {
                                                item.participants.find(participant => participant === props.user.attributes.email) ?
                                                    <Button size={"small"} className={"continue-form"}
                                                            onClick={() => navigateToForm(item)}>Continuer</Button>
                                                    :
                                                    <Button className={"subscribe-btn"}
                                                            isDisabled={item.participants.find(participant => participant === props.user.attributes.email)}
                                                            onClick={() => subscribe(item.id, item)}>S'inscrire</Button>
                                            }
                                        </Flex>
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
