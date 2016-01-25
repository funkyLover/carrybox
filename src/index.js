// topic
var LeftBoxAction = 'select or drop left box';
var CenterBoxAction = 'select or drop center box';
var RightBoxAction = 'select or drop right box';
var StartGame = 'let\'s do the shit!';
var EndGame = 'Game Over! Mother Fucker!';
var GetScore = 'get score';

var boxWidth = window.document.documentElement.clientWidth / 3 - 2;
var boxHeight = window.document.documentElement.clientHeight / 11 - 2;

var colors = ["#FF0000", "#00FF00", "#0000FF", "#CCFF00", "#FF66FF", "#CC00FF", "#99FFFF", "#009966"];


function roundRect(ctx, x, y, w, h, r, style) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  ctx.strokeStyle = style;
  ctx.beginPath();
  ctx.moveTo(x+r, y);
  ctx.arcTo(x+w, y, x+w, y+h, r);
  ctx.arcTo(x+w, y+h, x, y+h, r);
  ctx.arcTo(x, y+h, x, y, r);
  ctx.arcTo(x, y, x+w, y, r);
  ctx.closePath();
}

// 逻辑界面
var GameUI = React.createClass({
  getInitialState: function() {
    return {score: 0, isGameStart: false, gameOver: false};
  },
  componentDidMount: function() {
    PubSub.subscribe(EndGame, this.leftBoxAction);
    PubSub.subscribe(GetScore, this.updateScore);
  },
  leftBoxAction: function(event) {
    PubSub.publish(LeftBoxAction);
  },
  centerBoxAction: function(event) {
    PubSub.publish(CenterBoxAction);
  },
  rightBoxAction: function(event) {
    PubSub.publish(RightBoxAction);
  },
  startGame: function(event) {
    event.stopPropagation();
    this.state.isGameStart ? this.setState({
      score: 0,
      isGameStart: false
    }) : this.setState({
      isGameStart: true
    });
    PubSub.publish(StartGame);
  },
  endGame: function(event) {
    this.setState({
      isGameStart: false,
      gameOver: true
    });
  },
  updateScore: function(score) {
    var total = this.state.score + score;
    this.setState({
      score: total
    });
  },
  render: function() {
    var UI = !this.state.isGameStart ? 
              <div>
                <h1>搬箱子</h1>
                <button onClick={this.startGame}>开始游戏</button>
              </div> : 
              <div>
                <p className='score'>得分为: {this.state.score}</p>
                <div className='tap-pad'>
                  <div className='cols' onClick={this.leftBoxAction}/>
                  <div className='cols' onClick={this.centerBoxAction}/>
                  <div className='cols' onClick={this.rightBoxAction}/>
                </div>
              </div>
    return (
      <section className='game-ui' width={this.props.width} height={this.props.height}>
        {UI}
      </section>
    );
  }
});

// 游戏界面
var Game = React.createClass({
  getInitialState: function() {
    return {leftBoxes: [], centerBoxes: [], rightBoxes: [], isSelected: false, selectedBox: '', score: 0, ctx: null};
  },
  componentDidMount: function () {
    // 订阅搬箱子
    PubSub.subscribe(LeftBoxAction, this.leftBoxAction);
    PubSub.subscribe(RightBoxAction, this.centerBoxAction);
    PubSub.subscribe(CenterBoxAction, this.rightBoxAction);

    PubSub.subscribe(StartGame, this.preStartGame);

    // 获取canvas 2d引用
    this.setState({
      ctx: document.getElementById('Game').getContext('2d')
    }, function() {
      var ctx = this.state.ctx;
      ctx.fillStyle = '#000066';
      ctx.fillRect(0, 0, this.props.width/3, this.props.height);

      ctx.fillStyle =  '#330066';
      ctx.fillRect(this.props.width/3, 0, this.props.width/3, this.props.height);

      ctx.fillStyle =  '#000066';
      ctx.fillRect(this.props.width/3 * 2, 0, this.props.width/3, this.props.height);
    });    
  },
  leftBoxAction: function() {
    !this.state.isSelected ? this.select('left') : this.drop('left');
  },
  centerBoxAction: function() {
    !this.state.isSelected ? this.select('center') : this.drop('center');
  },
  rightBoxAction: function() {
    !this.state.isSelected ? this.select('right') : this.drop('right');
  },
  select: function(type) {
    this.setState({
      isSelected: true,
      selectedBox: type
    });
    // 这里选择箱子逻辑
    console.log('select ' + type);
  },
  drop: function(type) {
    this.setState({
      isSelected: false,
      selectedBox: ''
    });
    // 这里放置箱子逻辑
    console.log('drop ' + type);
  },
  moveDownBoxes: function() {
    var ctx = this.state.ctx;

    // 左列箱子
    var lefts = this.state.leftBoxes;
    for(var i = 0; i < lefts.length; i++){
      context.save();
      context.fillStyle = lefts[i];
      roundRect(context, lefts[i].x, lefts[i].y, lefts[i].width, lefts[i].height, 10, lefts[i].linecolor);
      context.stroke();
      context.fill();
      context.restore();
    }

    // 中间箱子
    var centers = this.state.centerBoxes;
    for(var i = 0; i < centers.length; i++){
      context.save();
      context.fillStyle = centers[i];
      roundRect(context, centers[i].x, centers[i].y, centers[i].width, centers[i].height, 10, centers[i].linecolor);
      context.stroke();
      context.fill();
      context.restore();
    }

    // 右边箱子
    var rights = this.state.rightBoxes;
    for(var i = 0; i < rights.length; i++){
      context.save();
      context.fillStyle = rights[i];
      roundRect(context, rights[i].x, rights[i].y, rights[i].width, rights[i].height, 10, rights[i].linecolor);
      context.stroke();
      context.fill();
      context.restore();
    }


  },
  pushBox: function(boxes) {
    var num;
    var boxColor;
    //按得分增加游戏难度
    //每得100分增加一种箱子
    var i;
    i = i==8 ? 8 : (3 + Math.floor(point/100));
    num = Math.floor(Math.random()*i);
    boxColor = colors[num];
    boxes.push(box);

  },
  removeBoxes: function(boxes) {
    var removeColor = boxes[0];//将该方位的一个箱子颜色作为消除标准
    var count = 1;//记录相同颜色的箱子有几个
    for(var i=1;i<boxes.length;i++){
      if(boxes[i] != removeColor) {
        break;
      } else {
        count++;
      }
    }
    if(count >= 3){
      //颜色相同的箱子大于3时则进行消除
      // context.clearRect(boxes[count-1].x - 1, boxes.length*40 - count*40, boxes[count-1].width + 2, count*40 + 2);
      boxes.splice(0,count);

      // score
      PubSub.publish(GetScore, count);
      this.setState({score: this.state.score + count});
    }
  },
  preStartGame: function() {
    this.setState({
      ctx: document.getElementById('Game').getContext('2d')
    });
  },
  game: function() {
    this.pushBox(this.state.leftBoxes);
    this.pushBox(this.state.centerBoxes);
    this.pushBox(this.state.rightBoxes);

    this.moveDownBoxes()

    
  },
  render: function() {
    return (
      <canvas id='Game' className='game-canvas' width={this.props.width} height={this.props.height}/>
    );
  }
});

// 容器
var GameWrapper = React.createClass({
  propTypes: {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired
  },
  render: function() {
    return (
      <section className='game-wrapper' width={this.props.width} height={this.props.height} >
        <GameUI width={this.props.width} height={this.props.height}/>
        <Game width={this.props.width} height={this.props.height}/>
      </section>
    )
  }
});

ReactDOM.render(
  <GameWrapper width={window.document.documentElement.clientWidth} height={window.document.documentElement.clientHeight} />,
  document.getElementById('Content')
);
