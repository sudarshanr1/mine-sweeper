var path = require('path');
module.exports = {
  entry: './app/app.js',
  output: {
    path: __dirname,
    filename: './public/bundle.js',
    start: 'node server.js'
  },
  resolve: {
    root: __dirname,
    alias: {
      UnlockImage: 'app/img/unlock.png',
      MineImage: 'app/img/mine.png',
      FlagImage: 'app/img/flag.png',
      Main: 'app/components/main.js',
      MainView:'app/view/main.html',
      GameLevel: 'app/components/gamelevel.js',
      GameLevelView: 'app/view/gamelevel.html',
      MineSweeper: 'app/components/minesweeper.js',
      MineSweeperView:'app/view/minesweeper.html',
      Timer: 'app/components/timer.js',
      TimerView:'app/view/timer.html',
      MineSweeperService:'app/service/minesweeperservice.js',
      MineSweeperStyles: 'app/style/minesweeper.css'
    },
    extensions: ['', '.js'],
    module: {
      loaders: [
            {
            test: /\.html$/,
            loaders: [
                "html?" + JSON.stringify({
                    attrs: ["img:src", "img:ng-src"]
                })
            ]},
            {
              test: /\.(png|jpg|gif)$/,
              loader: 'url-loader'
            },
            { test: /\.css$/, loader: 'style-loader!css-loader'}
        ],
      exclude: /(node_modules)/
    }
  }
};
