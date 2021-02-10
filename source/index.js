import {
  getMutations,
  generateStatementsForDocumentMutations,
} from './mutations/mutation';

export const generateUpdateStatement = (document, mutations) => {
  const mutationsMap = getMutations(mutations);

  const updateStatement = generateStatementsForDocumentMutations({
    document: document.posts, // TODO: apply beyond posts
    mutationsMap,
  });

  return updateStatement;
};
