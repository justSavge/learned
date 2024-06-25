import { connect } from "react-redux";

function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function BalanceDisplay({ balance }) {
  return <div className="balance">{formatCurrency(balance)}</div>;
}

function mapStateToProps(state) {
  return {
    balance: state.account.balance,
  };
}
//远古写法，通过connect(mapStateToProps)获得一个函数，BalanceDisplay作为参数给提供这个函数，不需要会用，只需要在看到后知道是个啥  
export default connect(mapStateToProps)(BalanceDisplay);
