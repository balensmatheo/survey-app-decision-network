// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Categorie, Reponses, Questions, Formulaire, Formation } = initSchema(schema);

export {
  Categorie,
  Reponses,
  Questions,
  Formulaire,
  Formation
};