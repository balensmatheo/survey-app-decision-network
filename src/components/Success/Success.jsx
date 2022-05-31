import React, {useState} from 'react'
import {Flex, Heading} from "@aws-amplify/ui-react";
import {Alert, Button, Snackbar} from "@mui/material";
import {NavLink} from "react-router-dom";

function Success() {
    const [open, setOpen] = useState(true);

    const handleClick = () => {
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    return(
        <Flex direction={"column"} justifyContent={"center"} alignItems={"center"} height={"70vh"}>
            <Heading fontFamily={"Roboto"} fontWeight={400} level={2}>Vos données ont été soumises avec succes</Heading>
            <NavLink to={"/"}><Button>Retourner à l'accueil</Button></NavLink>
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}>
                    <Alert onClose={handleClose} severity={"success"} sx={{width: '100%'}}>
                        Données envoyées
                    </Alert>
                </Snackbar>
        </Flex>
    )
}

export default Success;
