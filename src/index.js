// topic
var BoxAction = 'select or drop box';
var StartGame = 'let\'s do the shit!';
var EndGame = 'Game Over! Mother Fucker!';
var GetScore = 'get score';
var RestartGame = 'reset game';

var isCenter = false;
var isLeft = false;
var isRight = false;

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
      isGameOver: false
    };
  },
  componentDidMount: function() {
    PubSub.subscribe(EndGame, this.endGame);
    PubSub.subscribe(GetScore, this.updateScore);
  },
  startGame: function(event) {
    event.stopPropagation();
    this.state.isGameOver ? PubSub.publish(RestartGame) : PubSub.publish(StartGame);
    this.setState({
      score: 0,
      isGameStart: true,
      isGameOver: false
    });    
  },
  endGame: function(event) {
    this.setState({
      isGameStart: false,
      isGameOver: true
    });
    
    document.title = '搬箱子有猴事!我得了足足' + this.state.score + '分!不服来战!';
    clearTimeout(gameId);
  },
  updateScore: function(topic, score) {
    var total = this.state.score + score;
    this.setState({
      score: total
    });
  },
  render: function() {
    var UI = null;
    if (!this.state.isGameStart) {
      if (this.state.isGameOver) {
        UI = <div className='intro'>
              <h1>搬箱子</h1>
              <p>你的得分为{this.state.score}</p>
              <p>100分可获赠品窗花一份</p>
              <p>150分购物全单9.5折</p>
              <p>200分购物全单9折</p>
              <p>300分购物全单8折</p>
              <p>400分请让我拜你为师!</p>
              <button onClick={this.startGame}>重开游戏</button>
             </div>
      } else {
        UI = <div className='intro'>
              <h1>搬箱子</h1>
              <p>-点击屏幕选择或移动箱子</p>
              <p>-到猴事多多花街店出示得分截图</p>
              <p>-即刻兑换窗花赠品或购物折扣</p>
              <p>-兑换规则见游戏结束画面</p>
              <button onClick={this.startGame}>开始游戏</button>
             </div>
      }
    } else {
      UI = <div>
            <p className='score'>得分为: {this.state.score}</p>
           </div>
    }
              
    var className = !this.state.isGameStart ? 'game-ui' : 'game-ui down';
    return (
      <section className={className} width={this.props.width} height={this.props.height}>
        {UI}
        <div className='tap-pad'>
          <div className='cols' />
          <div className='cols' />
          <div className='cols' />
        </div>
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
    // 订阅游戏开始
    PubSub.subscribe(StartGame, this.game);
    // 订阅再次游戏
    PubSub.subscribe(RestartGame, this.resetGame);

    // 获取canvas 2d引用
    this.setState({
      ctx: document.getElementById('Game').getContext('2d')
    });
    var self = this;
    $('#Game').tap(function(event) {
      var x = event._args.x1;
      if (x < positionWidth) {
        self.boxAction('left');
      } else if(x >= positionWidth && x <= 2 * positionWidth) {
        self.boxAction('center');
      } else {
        self.boxAction('right');
      }
    });    
  },
  boxAction: function(type) {
    !this.state.isSelected ? this.select(type) : this.moving(type);
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
    context.clearRect(position, positionHeight * i - 1, positionWidth, positionHeight + 2);
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
  moveDownBoxes: function(boxes, x, flag) {
    var context = this.state.ctx;
    var type = this.state.preSelectedBox;
    var lineColor = '#000';
    var range = boxes.length - 1;
    for(var i = 0; i < range; i++){
      // context.save();
      context.fillStyle = boxes[i];
      roundRect(context, x + 1, positionHeight * i + 1, boxWidth, boxHeight, 10, lineColor);
      context.stroke();
      context.fill();
      // context.restore();
    }
    if (flag) { 
      lineColor = '#fff';
    }
    context.fillStyle = boxes[range];
    roundRect(context, x + 1, positionHeight * range + 1, boxWidth, boxHeight, 10, lineColor);
    context.stroke();
    context.fill();
    if (boxes.length > 12) {
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
      var position = 0;
      switch(type) {
        case 'center':
          position = positionWidth;
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
      context.clearRect(position, positionHeight * (boxes.length - count), positionWidth, positionHeight * count);
      boxes.splice(boxes.length - count, count);

      PubSub.publish(GetScore, count);
      this.setState({score: this.state.score + count});
    }
  },
  game: function() {
    // 开始游戏
    this.pushBox(this.state.leftBoxes);
    this.pushBox(this.state.centerBoxes);
    this.pushBox(this.state.rightBoxes);

    isCenter = this.state.preSelectedBox === 'center';
    isLeft = this.state.preSelectedBox === 'left';
    isRight = this.state.preSelectedBox === 'right';

    this.moveDownBoxes(this.state.leftBoxes, 0, isLeft);
    this.moveDownBoxes(this.state.centerBoxes, positionWidth, isCenter);
    this.moveDownBoxes(this.state.rightBoxes, positionWidth * 2, isRight);


    gameId = setTimeout(this.game, 2000);

    
  },
  resetGame: function() {
    this.setState({
      leftBoxes: [], 
      centerBoxes: [], 
      rightBoxes: [], 
      isSelected: false, 
      selectedBox: '',
      preSelectedBox: '',
      score: 0
    });
    this.state.ctx.clearRect(0, 0, this.props.width, this.props.height);
    this.game();
  },
  render: function() {
    return (
      <canvas id='Game' className='game-canvas' width={this.props.width} height={this.props.height}/>
    );
  }
});

var WCIcon = React.createClass({
  render: function() {
    return (
        <div id='wx_logo' className='weixin-icon'>
          <img src='icon.jpg' />
        </div>
    )
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
        <WCIcon />
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
