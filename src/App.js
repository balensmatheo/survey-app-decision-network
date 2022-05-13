import './App.css';
import "@aws-amplify/ui-react/styles.css"

import {Routes, Route, Link} from "react-router-dom"
import {Amplify} from "aws-amplify"
import awsExports from "./aws-exports";
import {
    Authenticator,
    Button,
    Heading,
    Icon,
    Text,
    useAuthenticator,
    useTheme,
    View
} from "@aws-amplify/ui-react";

import Formations from "./components/Formations/Formations"
import Formulaires from "./components/Formulaires/Formulaires";

Amplify.configure(awsExports);


const formFields = {
    confirmVerifyUser: {
        confirmation_code: {
            labelHidden: false,
            label: 'New Label',
            placeholder: 'Enter your Confirmation Code:',
            isRequired: false,
        },
    },
};

const components = {
    SignIn: {
        Header(){
            const { tokens } = useTheme();
            return (
                <Heading
                    textAlign={"center"}
                    marginTop={"0.5em"}
                    marginRight={"0.5em"}
                    marginLeft={"0.5em"}
                    padding={`${tokens.space.xs} 00 ${tokens.space.xs}`}
                    level={3}
                >
                    Connectez vous à votre compte
                </Heading>
            )
        },
        Footer(){
            const { toResetPassword } = useAuthenticator();
            return(
                <View textAlign="center">
                    <Button
                        fontWeight="normal"
                        onClick={toResetPassword}
                        size="small"
                        variation="link"
                    >
                        Mot de passe oublié ?
                    </Button>
                </View>
            )
        }
    },

    VerifyUser: {
        Header() {
            const { tokens } = useTheme();
            return (
                <Heading
                    padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
                    level={3}
                >
                    Enter Information:
                </Heading>
            );
        },
        Footer() {
            return <Text>Footer Information</Text>;
        },
    },

    ConfirmVerifyUser: {
        Header() {
            const { tokens } = useTheme();
            return (
                <Heading
                    padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
                    level={3}
                >
                    Enter Information:
                </Heading>
            );
        },
        Footer() {
            return <Text>Footer Information</Text>;
        },
    },
};

function App() {
  return (
          <Authenticator
              className={"auth"}
              formFields={formFields}
              components={components}
              hideSignUp={true}
          >
              {({signOut, user}) => (
                  <main>
                      <nav className={"navbar"}>
                          <Heading flex={"1 1 auto"} fontWeight={500} color={"whitesmoke"} level={1}><Link className={"nav-heading"} to={'*'}>Espace Formations</Link></Heading>
                          <Link className={"link-accueil"} to={"*"}>
                              <Icon marginRight={"1em"} marginTop={"0.1em"} fontSize={"26pt"} viewBox={{width: 48, height: 48}} color={"white"} ariaLabel={"accueil"} pathData={"M8.25 41.75V18.1L24.1 6.25L39.8 18.1V41.75H28.25V27.7H19.75V41.75Z"}></Icon>
                          </Link>
                          <Button size={"small"} border={"none"} backgroundColor={"#ffaeae"} marginRight={"1em"} onClick={signOut}>Déconnexion</Button>
                      </nav>
                      <Routes>
                          <Route element={<Formations user={user}/>} path={"*"} component={Formations}/>
                          <Route path={"formulaire"} element={<Formulaires user={user}/>} component={Formulaires}/>
                      </Routes>
                      <footer>
                              <a href={"https://decision-network.eu/"}>Decision Network ©</a>
                      </footer>

                  </main>
              )}
          </Authenticator>
  );
}

export default App;
