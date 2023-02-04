export default function (list) {
  const [current, ...rest] = list;
  return [...rest, current];
}
