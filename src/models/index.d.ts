import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type CategorieMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ReponsesMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type QuestionsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type FormulaireMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type FormationMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Categorie {
  readonly id: string;
  readonly nom?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Categorie, CategorieMetaData>);
  static copyOf(source: Categorie, mutator: (draft: MutableModel<Categorie, CategorieMetaData>) => MutableModel<Categorie, CategorieMetaData> | void): Categorie;
}

export declare class Reponses {
  readonly id: string;
  readonly rating?: number | null;
  readonly submitted_by?: string | null;
  readonly questionsID: string;
  readonly formationID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Reponses, ReponsesMetaData>);
  static copyOf(source: Reponses, mutator: (draft: MutableModel<Reponses, ReponsesMetaData>) => MutableModel<Reponses, ReponsesMetaData> | void): Reponses;
}

export declare class Questions {
  readonly id: string;
  readonly titre?: string | null;
  readonly Reponses?: (Reponses | null)[] | null;
  readonly Categorie?: Categorie | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly questionsCategorieId?: string | null;
  constructor(init: ModelInit<Questions, QuestionsMetaData>);
  static copyOf(source: Questions, mutator: (draft: MutableModel<Questions, QuestionsMetaData>) => MutableModel<Questions, QuestionsMetaData> | void): Questions;
}

export declare class Formulaire {
  readonly id: string;
  readonly nom?: string | null;
  readonly prenom?: string | null;
  readonly societe?: string | null;
  readonly email?: string | null;
  readonly formationID: string;
  readonly remarques?: string | null;
  readonly signature?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Formulaire, FormulaireMetaData>);
  static copyOf(source: Formulaire, mutator: (draft: MutableModel<Formulaire, FormulaireMetaData>) => MutableModel<Formulaire, FormulaireMetaData> | void): Formulaire;
}

export declare class Formation {
  readonly id: string;
  readonly nom_formation?: string | null;
  readonly formateur?: string | null;
  readonly date?: string | null;
  readonly date_fin?: string | null;
  readonly Formulaires?: (Formulaire | null)[] | null;
  readonly participants?: (string | null)[] | null;
  readonly Reponses?: (Reponses | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Formation, FormationMetaData>);
  static copyOf(source: Formation, mutator: (draft: MutableModel<Formation, FormationMetaData>) => MutableModel<Formation, FormationMetaData> | void): Formation;
}