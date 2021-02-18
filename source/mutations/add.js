import { isSubProp } from './subProp';
import { Mutation } from './mutation';

export const getProp = ({ prop, value, obj }) => {
  if (!isSubProp(prop)) {
    return {
      key: prop,
      value,
    };
  }

  let index = 0;
  for (let o of obj[0][prop]) {
    if (o._id === value[0]._id) {
      const { _id, _delete, ...subProp } = o;
      return {
        key: `${prop}`,
        value: Object.values(subProp)[0],
        index,
      };
    }
    index++;
  }

  return '';
};

export const generateAddMutation = ({ _id, key, props, obj, mutation }) => {
  const [prop, value] = Object.entries(props)[0];
  const { key: endKey } = getProp({ prop, value, obj });
  const endKeyProp = props.mentions ? `.${endKey}` : '';
  const endValue = props.mentions ? value : [props];
  return Mutation({
    _id,
    mutation: '$add',
    key: ({ index } = {}) => {
      const keyIndex = index ? `.${index}` : '';
      return `${key}${keyIndex}${endKeyProp}`;
    },
    value: () => endValue,
  });
};
