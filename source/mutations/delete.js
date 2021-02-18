import { Mutation } from './mutation';
import { isSubProp } from './subProp';

export const getProp = ({ prop, value, obj }) => {
  if (!isSubProp(prop)) {
    return null;
  }

  return {
    key: `${prop}`,
  };
};

export const isSubPropDelete = (mentions = []) =>
  !!mentions.filter((m) => m._delete === true).length;

export const isDeleteMutation = ({ _delete, mentions } = {}) =>
  _delete === true || isSubPropDelete(mentions);

export const getIndexFromSubProp = (indexToFind, subProps) => {
  let index = 0;
  for (let s of subProps) {
    if (s._id === indexToFind) {
      return index;
    }
    index++;
  }

  return null;
};

export const generateDeleteMutation = ({ _id, key, props, obj }) => {
  const [prop, value] = Object.entries(props)[0] || Object.entries(props);
  const subProp = getProp({ prop, value, obj });
  let subPropEndKey = subProp ? `.${subProp.key}` : '';
  return Mutation({
    _id,
    subPropId: props[0] ? props[0]._id : null,
    mutation: '$remove',
    key: ({ index, ...post }) => {
      if (post?.mentions && subPropEndKey) {
        const subProps = post.mentions;
        const indexToFind = value[0]._id;
        const indexFromSubProp = getIndexFromSubProp(indexToFind, subProps);
        if (indexFromSubProp && subPropEndKey) {
          subPropEndKey = `${subPropEndKey}.${indexFromSubProp}`;
        }
      }
      return `${key}.${index}${subPropEndKey}`;
    },
    value: () => true,
  });
};
