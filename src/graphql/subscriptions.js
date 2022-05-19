/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCategorie = /* GraphQL */ `
  subscription OnCreateCategorie {
    onCreateCategorie {
      id
      nom
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCategorie = /* GraphQL */ `
  subscription OnUpdateCategorie {
    onUpdateCategorie {
      id
      nom
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCategorie = /* GraphQL */ `
  subscription OnDeleteCategorie {
    onDeleteCategorie {
      id
      nom
      createdAt
      updatedAt
    }
  }
`;
export const onCreateReponses = /* GraphQL */ `
  subscription OnCreateReponses {
    onCreateReponses {
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
export const onUpdateReponses = /* GraphQL */ `
  subscription OnUpdateReponses {
    onUpdateReponses {
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
export const onDeleteReponses = /* GraphQL */ `
  subscription OnDeleteReponses {
    onDeleteReponses {
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
export const onCreateQuestions = /* GraphQL */ `
  subscription OnCreateQuestions {
    onCreateQuestions {
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
export const onUpdateQuestions = /* GraphQL */ `
  subscription OnUpdateQuestions {
    onUpdateQuestions {
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
export const onDeleteQuestions = /* GraphQL */ `
  subscription OnDeleteQuestions {
    onDeleteQuestions {
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
export const onCreateFormulaire = /* GraphQL */ `
  subscription OnCreateFormulaire {
    onCreateFormulaire {
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
export const onUpdateFormulaire = /* GraphQL */ `
  subscription OnUpdateFormulaire {
    onUpdateFormulaire {
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
export const onDeleteFormulaire = /* GraphQL */ `
  subscription OnDeleteFormulaire {
    onDeleteFormulaire {
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
export const onCreateFormation = /* GraphQL */ `
  subscription OnCreateFormation {
    onCreateFormation {
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
export const onUpdateFormation = /* GraphQL */ `
  subscription OnUpdateFormation {
    onUpdateFormation {
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
export const onDeleteFormation = /* GraphQL */ `
  subscription OnDeleteFormation {
    onDeleteFormation {
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
