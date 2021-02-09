export const generateUpdateStatement = (document, mutations) => {
  const conditionsAndOperations = {};
  getConditionsAndOperations(mutations).forEach((c) => {
    conditionsAndOperations[c._id] = c;
  });
  const updateStatement = {
    $update: {},
  };
  document.posts.forEach((post, index) => {
    const mut = conditionsAndOperations[post._id];
    if (mut) {
      updateStatement[mut.operation][mut.key({ ...post, index })] = mut.value(
        post
      );
    }
  });
  return updateStatement;
};

const isDeleteOperation = ({ _delete } = {}) => _delete === true;

const isUpdateOperation = ({ _id } = {}) => !isNaN(parseInt(_id, 10));

const getConditionsAndOperations = (mutations) =>
  Object.keys(mutations)
    .map((key) =>
      mutations[key].map((mutation) =>
        generate({
          key,
          mutation,
        })
      )
    )
    .flat();

const operation = ({ _id, operation, key, value }) => ({
  _id,
  operation,
  key,
  value,
});
const generate = ({ key, mutation }) => {
  const { _id, ...props } = mutation;
  if (isUpdateOperation(mutation)) {
    const [prop, value] = Object.entries(props)[0];
    return operation({
      _id,
      operation: '$update',
      key: ({ index }) => `${key}.${index}.${prop}`,
      value: () => value,
    });
  }
};
