// topic
var LeftBoxAction = 'select or drop left box';
var CenterBoxAction = 'select or drop center box';
var RightBoxAction = 'select or drop right box';
var StartGame = 'let\'s do the shit!';
var EndGame = 'Game Over! Mother Fucker!';
var GetScore = 'get score';

var positionWidth = window.document.documentElement.clientWidth / 3;
var positionHeight = window.document.documentElement.clientHeight / 12;

var boxWidth = positionWidth - 4;
var boxHeight = positionHeight - 4;

var gameId = null;

var colors = ["#FF0000", "#00FF00", "#0000FF", "#CCFF00", "#FF66FF", "#CC00FF", "#99FFFF", "#009966"];


function roundRect(ctx, x, y, w, h, r, style) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  ctx.strokeStyle = style;
  ctx.lineWidth = 2;
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
    return {
      score: 0, 
      isGameStart: false, 
      gameOver: false
    };
  },
  componentDidMount: function() {
    PubSub.subscribe(EndGame, this.endGame);
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

    clearTimeout(gameId);
  },
  updateScore: function(topic, score) {
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
    return {
      leftBoxes: [], 
      centerBoxes: [], 
      rightBoxes: [], 
      isSelected: false, 
      selectedBox: '',
      preSelectedBox: '',
      score: 0, 
      ctx: null
    };
  },
  componentDidMount: function () {
    // 订阅搬箱子
    PubSub.subscribe(LeftBoxAction, this.leftBoxAction);
    PubSub.subscribe(CenterBoxAction, this.centerBoxAction);
    PubSub.subscribe(RightBoxAction, this.rightBoxAction);

    PubSub.subscribe(StartGame, this.game);

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
    !this.state.isSelected ? this.select('left') : this.moving('left');
  },
  centerBoxAction: function() {
    !this.state.isSelected ? this.select('center') : this.moving('center');
  },
  rightBoxAction: function() {
    !this.state.isSelected ? this.select('right') : this.moving('right');
  },
  select: function(type) {
    // 这里选择箱子逻辑
    var position = 0;
    var boxes = null;
    switch(type) {
      case 'center':
        position = positionWidth;
        boxes = this.state.centerBoxes;
        break;
      case 'left':
        position = 0;
        boxes = this.state.leftBoxes;
        break;
      case 'right':
        position = positionWidth * 2;
        boxes = this.state.rightBoxes;
        break;
    }
    if (boxes.length === 0) {
      // 如果改列箱子为空即返回
      return ;
    }
    var context = this.state.ctx;
    var i = boxes.length - 1;
    this.setState({
      isSelected: true,
      selectedBox: boxes[i],
      preSelectedBox: type
    });
    context.fillStyle = boxes[i];
    roundRect(context, position + 1, positionHeight * i + 1, boxWidth, boxHeight, 10, '#fff');
    context.stroke();
    context.fill();
  },
  moving: function(type) {
    // 这里消除移动的箱子
    var position = 0;
    var boxes = null;
    var bgColor = '#000066';
    switch(this.state.preSelectedBox) {
      case 'center':
        position = positionWidth;
        boxes = this.state.centerBoxes;
        bgColor = '#330066';
        break;
      case 'left':
        position = 0;
        boxes = this.state.leftBoxes;
        break;
      case 'right':
        position = positionWidth * 2;
        boxes = this.state.rightBoxes;
        break;
    }
    
    var context = this.state.ctx;
    var i = boxes.length - 1;
    context.fillStyle = bgColor;
    context.fillRect(position, positionHeight * i, positionWidth, positionHeight);
    this.setState({
      preSelectedBox: ''
    });
    boxes.pop();
    this.drop(type);
  },
  drop: function(type) {
    // 这里放置箱子逻辑
    var position = 0;
    var boxes = null;
    switch(type) {
      case 'center':
        position = positionWidth;
        boxes = this.state.centerBoxes;
        break;
      case 'left':
        position = 0;
        boxes = this.state.leftBoxes;
        break;
      case 'right':
        position = positionWidth * 2;
        boxes = this.state.rightBoxes;
        break;
    }

    boxes.push(this.state.selectedBox);
    this.setState({
      isSelected: false,
      selectedBox: ''
    });
    var context = this.state.ctx;
    var i = boxes.length - 1;
    context.fillStyle = boxes[i];
    roundRect(context, position + 1, positionHeight * i + 1, boxWidth, boxHeight, 10, '#000');
    context.stroke();
    context.fill();

    // 每次移动箱子检查是否得分
    this.removeBoxes(boxes, type);
  },
  moveDownBoxes: function() {
    var context = this.state.ctx;

    // 左列箱子
    var lefts = this.state.leftBoxes;
    for(var i = 0; i < lefts.length; i++){
      context.save();
      context.fillStyle = lefts[i];
      roundRect(context, 0 + 1, positionHeight * i + 1, boxWidth, boxHeight, 10, '#000');
      context.stroke();
      context.fill();
      context.restore();
    }

    // 中间箱子
    var centers = this.state.centerBoxes;
    for(var j = 0; j < centers.length; j++){
      context.save();
      context.fillStyle = centers[j];
      roundRect(context, positionWidth + 1, positionHeight * j + 1, boxWidth, boxHeight, 10, '#000');
      context.stroke();
      context.fill();
      context.restore();
    }

    // 右边箱子
    var rights = this.state.rightBoxes;
    for(var k = 0; k < rights.length; k++){
      context.save();
      context.fillStyle = rights[k];
      roundRect(context, positionWidth * 2 + 1, positionHeight * k + 1, boxWidth, boxHeight, 10, '#000');
      context.stroke();
      context.fill();
      context.restore();
    }

    if (lefts.length > 12 || centers.length > 12 || rights.length > 12) {
      PubSub.publish(EndGame);
    }

  },
  pushBox: function(boxes) {
    var num;
    var boxColor;
    //按得分增加游戏难度
    //每得100分增加一种箱子
    var i;
    i = i==8 ? 8 : (3 + Math.floor(this.state.score/100));
    num = Math.floor(Math.random()*i);
    boxColor = colors[num];
    boxes.unshift(boxColor);
  },
  removeBoxes: function(boxes, type) {
    var removeColor = boxes[boxes.length - 1];//将该方位的一个箱子颜色作为消除标准
    var count = 1;//记录相同颜色的箱子有几个
    for(var i = boxes.length - 2; i >= 0 ; i--){
      if(boxes[i] != removeColor) {
        break;
      } else {
        count++;
      }
    }
    if(count >= 3){
      //颜色相同的箱子大于3时则进行消除
      // context.clearRect(boxes[count-1].x - 1, boxes.length*40 - count*40, boxes[count-1].width + 2, count*40 + 2);
      var bgColor = '#000066';
      var position = 0;
      switch(type) {
        case 'center':
          position = positionWidth;
          bgColor = '#330066';
          break;
        case 'left':
          position = 0;
          break;
        case 'right':
          position = positionWidth * 2;
          break;
      }
      var i = 0;
      var context = this.state.ctx;
      context.fillStyle = bgColor;
      context.fillRect(position, positionHeight * (boxes.length - count), positionWidth, positionHeight * count);
      boxes.splice(boxes.length - count, count);
      // var o = {};
      // o[type + 'Boxes'] = boxes;
      // this.setState(o);
      // score
      PubSub.publish(GetScore, count);
      this.setState({score: this.state.score + count});
    }
  },
  game: function() {
    // 开始游戏
    this.pushBox(this.state.leftBoxes);
    this.pushBox(this.state.centerBoxes);
    this.pushBox(this.state.rightBoxes);
    this.moveDownBoxes();

    gameId = setTimeout(this.game, 1500);

    
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
