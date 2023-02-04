const nextElementInList = (list, value) => {
  const index = list.indexOf(value);
  const nextIndex = (index + 1) % list.length;
  return list[nextIndex];
};

export default nextElementInList;
