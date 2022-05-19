/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCategorie = /* GraphQL */ `
  query GetCategorie($id: ID!) {
    getCategorie(id: $id) {
      id
      nom
      createdAt
      updatedAt
    }
  }
`;
export const listCategories = /* GraphQL */ `
  query ListCategories(
    $filter: ModelCategorieFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCategories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        nom
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getReponses = /* GraphQL */ `
  query GetReponses($id: ID!) {
    getReponses(id: $id) {
      id
      rating
      submitted_by
      questionsID
      formationID
      createdAt
      updatedAt
    }
  }
`;
export const listReponses = /* GraphQL */ `
  query ListReponses(
    $filter: ModelReponsesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReponses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        rating
        submitted_by
        questionsID
        formationID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getQuestions = /* GraphQL */ `
  query GetQuestions($id: ID!) {
    getQuestions(id: $id) {
      id
      titre
      Reponses {
        items {
          id
          rating
          submitted_by
          questionsID
          formationID
          createdAt
          updatedAt
        }
        nextToken
      }
      Categorie {
        id
        nom
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      questionsCategorieId
    }
  }
`;
export const listQuestions = /* GraphQL */ `
  query ListQuestions(
    $filter: ModelQuestionsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listQuestions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        titre
        Reponses {
          nextToken
        }
        Categorie {
          id
          nom
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        questionsCategorieId
      }
      nextToken
    }
  }
`;
export const getFormulaire = /* GraphQL */ `
  query GetFormulaire($id: ID!) {
    getFormulaire(id: $id) {
      id
      nom
      prenom
      societe
      email
      formationID
      remarques
      signature
      createdAt
      updatedAt
    }
  }
`;
export const listFormulaires = /* GraphQL */ `
  query ListFormulaires(
    $filter: ModelFormulaireFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFormulaires(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        nom
        prenom
        societe
        email
        formationID
        remarques
        signature
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getFormation = /* GraphQL */ `
  query GetFormation($id: ID!) {
    getFormation(id: $id) {
      id
      nom_formation
      formateur
      date
      date_fin
      Formulaires {
        items {
          id
          nom
          prenom
          societe
          email
          formationID
          remarques
          signature
          createdAt
          updatedAt
        }
        nextToken
      }
      participants
      Reponses {
        items {
          id
          rating
          submitted_by
          questionsID
          formationID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listFormations = /* GraphQL */ `
  query ListFormations(
    $filter: ModelFormationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFormations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        nom_formation
        formateur
        date
        date_fin
        Formulaires {
          nextToken
        }
        participants
        Reponses {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
