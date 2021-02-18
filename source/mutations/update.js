import { Mutation } from './mutation';
import { getProp, getValue } from './isSubProp';

export const isUpdateMutation = ({ _id } = {}) => !isNaN(parseInt(_id, 10));

export const generateUpdateMutation = ({ _id, key, props, obj }) => {
  const [prop, value] = Object.entries(props)[0];
  const { key: endKey, value: endValue } = getProp({ prop, value, obj });
  return Mutation({
    _id,
    mutation: '$update',
    key: ({ index }) => `${key}.${index}.${endKey}`,
    value: () => endValue,
  });
};
