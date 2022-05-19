/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCategorie = /* GraphQL */ `
  mutation CreateCategorie(
    $input: CreateCategorieInput!
    $condition: ModelCategorieConditionInput
  ) {
    createCategorie(input: $input, condition: $condition) {
      id
      nom
      createdAt
      updatedAt
    }
  }
`;
export const updateCategorie = /* GraphQL */ `
  mutation UpdateCategorie(
    $input: UpdateCategorieInput!
    $condition: ModelCategorieConditionInput
  ) {
    updateCategorie(input: $input, condition: $condition) {
      id
      nom
      createdAt
      updatedAt
    }
  }
`;
export const deleteCategorie = /* GraphQL */ `
  mutation DeleteCategorie(
    $input: DeleteCategorieInput!
    $condition: ModelCategorieConditionInput
  ) {
    deleteCategorie(input: $input, condition: $condition) {
      id
      nom
      createdAt
      updatedAt
    }
  }
`;
export const createReponses = /* GraphQL */ `
  mutation CreateReponses(
    $input: CreateReponsesInput!
    $condition: ModelReponsesConditionInput
  ) {
    createReponses(input: $input, condition: $condition) {
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
export const updateReponses = /* GraphQL */ `
  mutation UpdateReponses(
    $input: UpdateReponsesInput!
    $condition: ModelReponsesConditionInput
  ) {
    updateReponses(input: $input, condition: $condition) {
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
export const deleteReponses = /* GraphQL */ `
  mutation DeleteReponses(
    $input: DeleteReponsesInput!
    $condition: ModelReponsesConditionInput
  ) {
    deleteReponses(input: $input, condition: $condition) {
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
export const createQuestions = /* GraphQL */ `
  mutation CreateQuestions(
    $input: CreateQuestionsInput!
    $condition: ModelQuestionsConditionInput
  ) {
    createQuestions(input: $input, condition: $condition) {
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
export const updateQuestions = /* GraphQL */ `
  mutation UpdateQuestions(
    $input: UpdateQuestionsInput!
    $condition: ModelQuestionsConditionInput
  ) {
    updateQuestions(input: $input, condition: $condition) {
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
export const deleteQuestions = /* GraphQL */ `
  mutation DeleteQuestions(
    $input: DeleteQuestionsInput!
    $condition: ModelQuestionsConditionInput
  ) {
    deleteQuestions(input: $input, condition: $condition) {
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
export const createFormulaire = /* GraphQL */ `
  mutation CreateFormulaire(
    $input: CreateFormulaireInput!
    $condition: ModelFormulaireConditionInput
  ) {
    createFormulaire(input: $input, condition: $condition) {
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
export const updateFormulaire = /* GraphQL */ `
  mutation UpdateFormulaire(
    $input: UpdateFormulaireInput!
    $condition: ModelFormulaireConditionInput
  ) {
    updateFormulaire(input: $input, condition: $condition) {
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
export const deleteFormulaire = /* GraphQL */ `
  mutation DeleteFormulaire(
    $input: DeleteFormulaireInput!
    $condition: ModelFormulaireConditionInput
  ) {
    deleteFormulaire(input: $input, condition: $condition) {
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
export const createFormation = /* GraphQL */ `
  mutation CreateFormation(
    $input: CreateFormationInput!
    $condition: ModelFormationConditionInput
  ) {
    createFormation(input: $input, condition: $condition) {
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
export const updateFormation = /* GraphQL */ `
  mutation UpdateFormation(
    $input: UpdateFormationInput!
    $condition: ModelFormationConditionInput
  ) {
    updateFormation(input: $input, condition: $condition) {
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
export const deleteFormation = /* GraphQL */ `
  mutation DeleteFormation(
    $input: DeleteFormationInput!
    $condition: ModelFormationConditionInput
  ) {
    deleteFormation(input: $input, condition: $condition) {
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
