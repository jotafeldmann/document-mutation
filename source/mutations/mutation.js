import { isUpdateMutation, generateUpdateMutation } from './update';
import { isDeleteMutation, generateDeleteMutation } from './delete';

export const Mutation = ({ _id, mutation, key, value }) => ({
  _id,
  mutation,
  key,
  value,
});

export const getMutations = (mutations) => {
  const mutationsMap = {};
  Object.keys(mutations)
    .map((key) =>
      mutations[key].map((mutation) =>
        generateMutation({
          key,
          mutation,
          obj: mutations[key],
        })
      )
    )
    .flat()
    .forEach((c) => {
      mutationsMap[c._id] = c;
    });

  return mutationsMap;
};

const generateMutation = ({ key, mutation, obj }) => {
  const { _id, _delete, ...props } = mutation;
  if (isDeleteMutation(mutation)) {
    return generateDeleteMutation({ _id, key, props, obj });
  }
  if (isUpdateMutation(mutation)) {
    return generateUpdateMutation({ _id, key, props, obj });
  }
};

export const generateStatementsForDocumentMutations = ({
  document,
  mutationsMap,
}) => {
  const statements = {};

  document.forEach((post, index) => {
    const mut = mutationsMap[post._id];
    if (mut) {
      if (!statements[mut.mutation]) {
        statements[mut.mutation] = {};
      }
      statements[mut.mutation][mut.key({ ...post, index })] = mut.value(post);
    }
  });

  return statements;
};
