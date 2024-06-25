import React from "react";

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 5 };
    this.handleLess = this.handleLess.bind(this); //如下面的jsx访问是无法访问到这个Counter的，因为js的指向
    this.handlePlus = this.handlePlus.bind(this);
  }
  handleLess() {
    // this.setState({ count: 10 });
    this.setState((state) => {
      return { count: state.count - 1 };
    });
  }
  handlePlus() {
    // this.setState({ count: 10 });
    this.setState((state) => {
      return { count: state.count + 1 };
    });
  }
  render() {
    //允许简单的逻辑
    const date = new Date("2024-6-6");
    date.setDate(date.getDate() + this.state.count);
    return (
      <div>
        <button onClick={this.handleLess}>-</button>
        <span>
          {date.toDateString()}
          {this.state.count}
        </span>
        <button onClick={this.handlePlus}>+</button>
      </div>
    );
  }
}

export default Counter;
