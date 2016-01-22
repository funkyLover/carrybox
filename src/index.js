// 逻辑界面
var GameUI = React.createClass({
  render: function() {
    return (
      <section className='gameUI'>
        <h1>搬箱子</h1>
        <button>开始游戏</button>
      </section>
    );
  }
});

// 游戏界面
var Game = React.createClass({
  getInitialState: function() {
    return { 
      width: window.document.documentElement.clientWidth,
      height: window.document.documentElement.clientHeight
    }
  },
  render: function() {
    return (
      <canvas id='game' width={this.state.width} height={this.state.height} />
    );
  }
});

// 容器
var GameWrapper = React.createClass({
  render: function() {
    return (
      <section className='game-wrapper'>
        <GameUI />
        <Game />
      </section>
    )
  }
});

ReactDOM.render(
  <GameWrapper />,
  document.getElementById('Content')
);
