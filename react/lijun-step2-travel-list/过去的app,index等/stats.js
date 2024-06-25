export default function Stats({ items }) {
  const num = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  if (num > 0) {
    return (
      <footer className="stats">
        <em>
          你选中了{num}个盒子，已开启{numPacked}个盒子
        </em>
      </footer>
    );
  } else {
    return;
  }
}
