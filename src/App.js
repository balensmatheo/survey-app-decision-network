import './App.css';
import "@aws-amplify/ui-react/styles.css"
import '@fontsource/inter/variable.css';

import {Routes, Route, Link, useNavigate} from "react-router-dom"
import {Amplify, Auth} from "aws-amplify"
import awsExports from "./aws-exports";
import {
    Button,
    Heading,
    Icon,
} from "@aws-amplify/ui-react";

import Formations from "./components/Formations/Formations"
import Formulaires from "./components/Formulaires/Formulaires";
import Success from "./components/Success/Success";
import SignIn from "./components/SignIn/SignIn";


import {useEffect, useState} from "react";

Amplify.configure(awsExports);


function App() {

    useEffect(() => {
        assessLoggedInState();
    }, [])

    const [loggedIn, setLoggedIn] = useState(false);


    async function assessLoggedInState(){
        Auth.currentAuthenticatedUser().then(
            () => {
                setLoggedIn(true);
            }
        ).catch(() => {
            setLoggedIn(false);
        })
    }

    const navigate = useNavigate();

    async function signOut(){
        try{
            await Auth.signOut();
            setLoggedIn(false);
            navigate('*');

        } catch (e) {
            console.log("Error while signOut");
        }
    }

    function onSignIn(){
        setLoggedIn(true);
    }

    const [user, setUser] =useState();

    function getUser(user){
        setUser(user);
    }

    return (
        <main>
            <nav className={"navbar"}>
                <Heading flex={"1 1 auto"} fontWeight={500} color={"whitesmoke"} level={1}><Link
                    className={"nav-heading"} to={'*'}>Espace Formations</Link></Heading>
                <Link className={"link-accueil"} to={"*"}>
                    <Icon marginRight={"1em"} marginTop={"0.1em"} fontSize={"26pt"} viewBox={{width: 48, height: 48}}
                          color={"white"} ariaLabel={"accueil"}
                          pathData={"M8.25 41.75V18.1L24.1 6.25L39.8 18.1V41.75H28.25V27.7H19.75V41.75Z"}></Icon>
                </Link>
                {
                    loggedIn ?
                        <Button size={"small"} border={"none"} backgroundColor={"#ffaeae"} marginRight={"1em"}
                                onClick={signOut}>Déconnexion</Button>
                        :
                        <Link to={"signIn"}>
                            <Button size={"small"} border={"none"} backgroundColor={"#aee3ff"} marginRight={"1em"}>Connexion</Button>
                        </Link>
                }

            </nav>
            <Routes>
                <Route element={<Formations user={user}/>} path={"*"} component={Formations}/>
                <Route path={"formulaire"} element={<Formulaires user={user}/>} component={Formulaires}/>
                <Route path={"formulaire/success"} element={<Success/>} component={Success}/>
                <Route path={"signIn"} element={<SignIn onSignIn={onSignIn} getUser={getUser}/>}  component={SignIn}/>
            </Routes>
            <footer>
                <a href={"https://decision-network.eu/"}>Decision Network ©</a>
            </footer>

        </main>
    );
}

export default App;
