// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Signatures, Categorie, Reponses, Questions, Formulaire, Formation } = initSchema(schema);

export {
  Signatures,
  Categorie,
  Reponses,
  Questions,
  Formulaire,
  Formation
};