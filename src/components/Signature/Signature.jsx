import React, {useState} from 'react'
import {Flex, Heading} from "@aws-amplify/ui-react";
import {SignatureComponent} from "@syncfusion/ej2-react-inputs";
import {Auth, Storage} from "aws-amplify";
import {Button} from "@mui/material";

function Signature(props) {

    let signObj = null;
    const [disable, setDisable] = useState(false);

    function onSave() {
        const filename = "signature"+Date.now()+Auth.user.attributes.email+".png"
        const result =  Storage.put(filename, signObj.saveAsBlob(), {
            level: "private",
            contentType: "image/png",
        });
        setDisable(true);
        props.getSignature(signObj);
    }


    function onClear() {
        signObj.clear();
    }


    return (
            <Flex marginTop={"3em"} direction={"column"} width={"100%"} alignItems={"center"}>
                <Heading fontFamily={"Roboto"} fontSize={"calc(10px + 1.5vmin)"} fontWeight={400} level={3}>Merci de signer ci-dessous</Heading>
                <Flex direction={"row"} width={"100%"} justifyContent={"center"}>
                    <SignatureComponent velocity={2} ref={sign => signObj = sign}></SignatureComponent>
                </Flex>

                <Flex direction={"row"}>
                    <Button disabled={disable} onClick={onSave}>Envoyer</Button>
                    <Button onClick={onClear}>Effacer</Button>
                </Flex>

            </Flex>
    )
}


export default Signature;
