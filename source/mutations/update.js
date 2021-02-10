import { Mutation } from './mutation';

export const isUpdateMutation = ({ _id } = {}) => !isNaN(parseInt(_id, 10));

export const generateUpdateMutation = ({ _id, key, props }) => {
  const [prop, value] = Object.entries(props)[0];
  return Mutation({
    _id,
    mutation: '$update',
    key: ({ index }) => `${key}.${index}.${prop}`,
    value: () => value,
  });
};
