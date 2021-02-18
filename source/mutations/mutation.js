import { isUpdateMutation, generateUpdateMutation } from './update';
import { isDeleteMutation, generateDeleteMutation } from './delete';
import { generateAddMutation } from './add';
import { isValidId } from './isValidId';

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
      if (!isValidId(c._id)) {
        c._id = 'posts';
      }
      mutationsMap[c._id] = c;
    });

  return mutationsMap;
};

const generateMutation = ({ key, mutation, obj }) => {
  const { _id, _delete, ...props } = mutation;

  if (isDeleteMutation(mutation)) {
    return generateDeleteMutation({ _id, key, props, obj, mutation });
  }

  if (isUpdateMutation(mutation)) {
    return generateUpdateMutation({ _id, key, props, obj, mutation });
  }

  return generateAddMutation({ _id, key, props, obj, mutation });
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

  if (mutationsMap.posts) {
    const mut = mutationsMap.posts;
    if (mut) {
      if (!statements[mut.mutation]) {
        statements[mut.mutation] = {};
      }
      statements[mut.mutation][mut.key()] = mut.value();
    }
  }

  return statements;
};
