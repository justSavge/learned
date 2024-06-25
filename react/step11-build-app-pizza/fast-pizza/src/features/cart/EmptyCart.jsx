import { Link } from 'react-router-dom';

function EmptyCart() {
  return (
    <div>
      <Link to="/menu">&larr; Back to menu</Link>

      <p>您的购物车仍然是空的。去添加一些披萨吧！</p>
    </div>
  );
}

export default EmptyCart;
