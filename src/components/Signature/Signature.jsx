import React from 'react'
import {Flex, Heading} from "@aws-amplify/ui-react";

function Signature(){
    return(
        <div className={"signature-main-container"}>
            <Flex>
                <Heading>Merci de signer ci-dessous</Heading>
            </Flex>
        </div>
    )
}

export default Signature;
