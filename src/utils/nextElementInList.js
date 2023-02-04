export default function (list, item) {
  const currentIdx = list.indexOf(item);
  const nextIdx = (currentIdx + 1) % list.length;
  return list[nextIdx];
}
