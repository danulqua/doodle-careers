export default <T>(list: T[]) => {
  const [current, ...rest] = list;
  return [...rest, current];
};
