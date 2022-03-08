export const handleTags = ({ items = [], maxLength = 3 }) => items.reduce((acc, cur, ind) => {
  if (ind < maxLength) {
    return [...acc, cur];
  }
  if (ind === maxLength) {
    const str = `+${items.length - ind}`;
    return [...acc, str];
  }
  return [...acc];
}, []);
