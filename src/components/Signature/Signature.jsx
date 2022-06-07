import React, {useState} from 'react'
import {Flex, Heading} from "@aws-amplify/ui-react";
import {SignatureComponent} from "@syncfusion/ej2-react-inputs";
import {Auth, DataStore, Storage} from "aws-amplify";
import {Button, Divider, Typography} from "@mui/material";
import {useLocation} from "react-router-dom";
import {useEffect} from "react";
import {Signatures} from "../../models";
import ReactLoading from "react-loading";

function Signature(props) {

    useEffect(() => {
        getDuree();
        getSignatures().then();
    }, [])

    let signObj = null;
    const [disable, setDisable] = useState(false);
    const {state} = useLocation();

    const [duree, setDuree] = useState(0);
    const [nbSignatures, setNbSignatures] = useState(0)

    function getDuree() {
        const fin = Number(state.date_fin.split("-", 7).slice(2, 3));
        const debut = Number(state.date.split("-", 7).slice(2, 3));
        const result = fin-debut
        setDuree(result);
        setNbSignatures(result*2)
    }

    async function onSave() {
        const filename = state.item.nom_formation+Auth.user.attributes.email+Date.now()+".png"
        const result =  Storage.put(filename, signObj.saveAsBlob(), {
            level: "private",
            contentType: "image/png",
        });
        await DataStore.save(
            new Signatures({
                formulaireID: state.item.id,
                filename: (await result.then(value => value.key)).toString(),
            })
        )
        setUserSignatures(+1);
        setDisable(true);
    }


    const [loading, setLoading] = useState(false);

    const [userSignatures, setUserSignatures] = useState(0);
    // On veut savoir combien de signature ont été soumises par l'utilisateur pour une formation ?
    async function getSignatures(){
        try{
            setLoading(true);
            const signatures = await Storage.list('', {level: "private"})
            const result = signatures.filter(
                // eslint-disable-next-line array-callback-return
                signature => {
                    if (signature.key.includes(state.item.nom_formation)){
                        return signature;
                    }
                }
            );
            setUserSignatures(result.length);
            setLoading(false);
        } catch (e) {
            console.log(e)
        }
    }

    function onClear() {
        signObj.clear();
    }




    if(loading){
        return(
            <Flex direction={"column"} justifyContent={"center"} alignItems={"center"} width={"100%"} height={"80vh"}>
                <ReactLoading type={"bubbles"} color={"black"}></ReactLoading>
            </Flex>
        )
    }

    return (
            <Flex marginTop={"3em"} direction={"column"} width={"100%"} alignItems={"center"}>
                <Typography textAlign={"center"} fontSize={'calc(13px + 2.2vmin)'} variant={"h3"}>Espace Signature pour la formation {state.item.nom_formation}</Typography>
                <div>
                    <Divider variant={"middle"} textAlign={"center"}/>
                </div>
                <Typography fontFamily={"Roboto"} fontSize={"calc(10px + 1.5vmin)"} fontWeight={400} variant={'h6'}>Merci de signer ci-dessous</Typography>
                <Typography>Durée de la formation : du {state.date} au {state.date_fin} </Typography>
                <Flex direction={"row"} width={"100%"} justifyContent={"center"}>
                    <SignatureComponent velocity={2} ref={sign => signObj = sign}></SignatureComponent>
                </Flex>
                <Flex>
                    Vous avez soumis {userSignatures}/{nbSignatures} signatures pour cette formation.
                </Flex>
                <Flex direction={"row"}>
                    {
                        nbSignatures - userSignatures <= 0 ?
                            <Flex direction={'row'}>
                                <Button disabled={true} onClick={onSave}>Envoyer</Button>
                            </Flex>
                            :
                            <Flex direction={'row'}>
                                <Button disabled={disable} onClick={onSave}>Envoyer</Button>
                                <Button onClick={onClear}>Effacer</Button>
                            </Flex>
                    }

                </Flex>
            </Flex>
    )
}


export default Signature;
