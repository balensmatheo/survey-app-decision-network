import React, {useState} from "react"
import {Button, TextField} from "@mui/material";

import LoadingButton from '@mui/lab/LoadingButton';

import {Divider, Flex, Heading} from '@aws-amplify/ui-react'
import {Auth} from "aws-amplify";
import {useNavigate} from "react-router-dom";
import "./singin.css"

function SignIn({onSignIn, getUser}) {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [challenge, setChallenge] = useState(false);
    const [error, setError] = useState(false);

    const navigate = useNavigate();


    async function changePassword() {
        const user = await Auth.signIn(mail, password).then(
            user => {
                Auth.completeNewPassword(
                    user,
                    newPassword,
                    {},
                )
            }
        )
        onSignIn();
        getUser(user);
        setChallenge(false);
        setLoading(false);

    }

    async function signIn() {
        try {
            setLoading(true);
            const user = await Auth.signIn(mail, password)
                .then(user => {
                    if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
                        setChallenge(true);
                    } else {
                        onSignIn();
                        navigate('*');
                        setLoading(false)
                        setError(true);
                    }
                });
            getUser(user);
        } catch (e) {
            console.log("Error while Sign-In" + e);
            setLoading(false);
            setError(true);
        }

    }


    return (
        <div className={"signin-main-container"}>
            <Flex marginBottom={"2em"} direction={"column"} width={"40%"} minWidth={"300px"}>
                <Heading fontFamily={"Roboto"} level={2} fontSize={"calc(15px + 2vmin)"} textAlign={"center"} fontWeight={500}>Connectez
                    vous à votre compte</Heading>
                <Divider orientation={"horizontal"}></Divider>
            </Flex>
            <Flex direction={"column"} width={"40%"} minWidth={"300px"}>
                <TextField
                    id={'username'}
                    label={"Adresse email"}
                    value={mail}
                    type={"email"}
                    required={true}
                    onChange={event => setMail(event.target.value)}
                />
                {
                    error ?
                        <TextField
                            id={'password'}
                            error={true}
                            helperText={
                            password.length>=8 ?
                            "Vous avez saisi le mauvais mot de passe !"
                                :
                                "Le mot de passe doit comporter plus de 8 caractères"
                        }
                            label={"Mot de Passe"}
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                            type={"password"}
                        />
                        :
                        <TextField
                            id={'password'}
                            error={false}
                            label={"Mot de Passe"}
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                            type={"password"}
                        />
                }


                {challenge ?
                    <>
                        <TextField
                            id={'new_password'}
                            label={'Nouveau Mot de Passe'}
                            value={newPassword}
                            error={newPassword.length<8}
                            helperText={
                            newPassword.length<8 ?
                            "Le nouveau mot de passe doit etre composé de 8 caractères au moins !"
                                :
                                ""
                        }
                            onChange={event => setNewPassword(event.target.value)}
                            type={"password"}
                        />
                        <Button disabled={newPassword.length<8} onClick={changePassword}>Mettre à jour mes informations</Button>
                    </>
                    :
                    loading ?
                        <LoadingButton loading variant={"outlined"}>Connexion</LoadingButton>
                        :
                        <Button variant={"outlined"} onClick={signIn}>Connexion</Button>
                }
            </Flex>
        </div>
    )
}

export default SignIn
