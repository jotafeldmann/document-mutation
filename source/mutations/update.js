import { Mutation } from './mutation';
import { isSubProp } from './subProp';
import { isValidId } from './isValidId';

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
        key: `${prop}.${index}.${Object.keys(subProp)[0]}`,
        value: Object.values(subProp)[0],
        index,
      };
    }
    index++;
  }

  return '';
};

export const isSubPropUpdate = (mentions = []) =>
  !!mentions.filter((m) => isValidId(m._id)).length;

export const isUpdateMutation = ({ _id, mentions } = {}) =>
  (isValidId(_id) && !mentions) || isSubPropUpdate(mentions);

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
