export const isSubProp = (prop) => prop === 'mentions';

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
      const { _id, ...subProp } = o;
      return {
        key: `${prop}.${index}.${Object.keys(subProp)[0]}`,
        value: Object.values(subProp)[0],
      };
    }
    index++;
  }

  return '';
};
