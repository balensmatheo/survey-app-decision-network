// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Reponses, Questions, Formulaire, Formation } = initSchema(schema);

export {
  Reponses,
  Questions,
  Formulaire,
  Formation
};