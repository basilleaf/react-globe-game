"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var allLinks = ["ESP_013368_1885.jpg", "ESP_013954_1780.jpg", "ESP_014185_1095.jpg", "ESP_014351_1995.jpg", "ESP_016700_2075.jpg", "ESP_017154_1390.jpg", "ESP_017174_1730.jpg", "ESP_019753_2000.jpg", "ESP_020065_1335.jpg", "ESP_020087_1515.jpg", "ESP_020090_1985.jpg", "ESP_020782_1610.jpg", "ESP_020795_2025.jpg", "ESP_020798_2040.jpg", "ESP_021676_1430.jpg", "ESP_021915_1005.jpg", "ESP_022405_1910.jpg", "ESP_026086_2115.jpg", "ESP_027077_1785.jpg", "ESP_027339_2060.jpg", "ESP_027834_1755.jpg", "ESP_027989_1425.jpg", "ESP_028004_1825.jpg", "ESP_028020_2560.jpg", "ESP_028269_1755.jpg", "ESP_028335_1755.jpg", "ESP_028575_1890.jpg", "ESP_028799_1565.jpg", "ESP_029226_1670.jpg", "ESP_030373_1755.jpg", "ESP_031944_1790.jpg", "ESP_032011_1425.jpg", "ESP_032078_1420.jpg", "ESP_032522_1345.jpg", "ESP_032562_1670.jpg", "ESP_032836_1790.jpg", "ESP_033014_2260.jpg", "ESP_033108_1800.jpg", "ESP_033242_1845.jpg", "ESP_033242_2315.jpg", "ESP_033243_2165.jpg", "ESP_033248_1520.jpg", "ESP_033252_2070.jpg", "ESP_033264_1640.jpg", "ESP_033293_1755.jpg", "ESP_033297_1745.jpg", "ESP_033371_1080.jpg", "ESP_033433_2650.jpg", "ESP_033483_1805.jpg", "ESP_033556_1890.jpg", "ESP_033564_1405.jpg", "ESP_033565_1945.jpg", "ESP_033591_1805.jpg", "ESP_033599_2160.jpg", "ESP_033722_1710.jpg", "ESP_033814_1525.jpg", "ESP_033902_2125.jpg", "ESP_033995_1410.jpg", "ESP_034084_1655.jpg", "ESP_034101_1385.jpg", "ESP_034131_1670.jpg", "ESP_034132_1750.jpg", "ESP_034189_1740.jpg", "ESP_034209_1605.jpg", "ESP_034228_2150.jpg", "ESP_034234_1255.jpg", "ESP_034255_1840.jpg", "ESP_034259_2040.jpg", "ESP_034285_1835.jpg", "ESP_034309_1485.jpg", "ESP_034329_1670.jpg", "ESP_034342_1315.jpg", "ESP_034441_2565.jpg", "ESP_034572_1755.jpg", "ESP_034656_2195.jpg", "ESP_034716_1875.jpg", "ESP_034801_1300.jpg", "ESP_034815_2035.jpg", "ESP_034829_1325.jpg", "ESP_034830_1670.jpg", "ESP_034864_1825.jpg", "ESP_034883_1645.jpg", "ESP_034887_1870.jpg", "ESP_034909_1755.jpg", "ESP_034922_1385.jpg", "ESP_034941_2130.jpg", "ESP_034942_1615.jpg", "ESP_034948_1720.jpg", "ESP_034948_2165.jpg", "ESP_034970_2040.jpg", "ESP_034987_1595.jpg", "ESP_035028_1685.jpg", "ESP_035033_2635.jpg", "ESP_035062_1995.jpg", "ESP_035078_2185.jpg", "ESP_035098_2065.jpg", "ESP_035143_1325.jpg", "ESP_035164_1655.jpg", "ESP_035189_2240.jpg", "ESP_035226_2090.jpg", "ESP_035295_2670.jpg", "ESP_035408_1775.jpg", "ESP_035409_1525.jpg", "ESP_035421_1810.jpg", "ESP_035558_1830.jpg", "ESP_035603_1890.jpg", "ESP_035702_2270.jpg", "ESP_035777_1320.jpg", "ESP_035807_1885.jpg", "ESP_035863_1710.jpg", "ESP_035909_1775.jpg", "ESP_035926_2640.jpg", "ESP_035945_1755.jpg", "ESP_035969_1825.jpg", "ESP_035998_1555.jpg", "ESP_036059_1835.jpg", "ESP_036099_2615.jpg", "ESP_036182_2230.jpg", "ESP_036376_2160.jpg", "ESP_036382_2255.jpg", "ESP_036397_1785.jpg", "ESP_036436_2645.jpg", "ESP_036485_1765.jpg", "ESP_036598_1735.jpg", "ESP_036654_1490.jpg", "ESP_036815_2330.jpg", "ESP_036867_2655.jpg", "ESP_036927_1790.jpg", "ESP_036934_1915.jpg", "ESP_036947_1390.jpg", "ESP_037030_1880.jpg", "ESP_037056_2650.jpg", "ESP_037070_1985.jpg", "ESP_037117_1755.jpg", "ESP_037122_2165.jpg", "ESP_037125_1315.jpg", "ESP_037137_1360.jpg", "ESP_037142_1430.jpg", "ESP_037161_1785.jpg", "ESP_037163_1590.jpg", "ESP_037190_1765.jpg", "ESP_037222_1820.jpg", "ESP_037237_1435.jpg", "ESP_037300_1825.jpg", "ESP_037328_1845.jpg", "ESP_037371_1350.jpg", "ESP_037474_1380.jpg", "ESP_037494_1685.jpg", "ESP_037545_1730.jpg", "ESP_037551_2540.jpg", "ESP_037626_0985.jpg", "ESP_037641_1560.jpg", "ESP_037714_1935.jpg", "ESP_037811_0985.jpg", "ESP_037877_0985.jpg", "ESP_038022_0985.jpg", "ESP_038044_1965.jpg", "ESP_038117_1385.jpg", "ESP_038143_2205.jpg", "ESP_038224_1890.jpg", "ESP_038227_2020.jpg", "ESP_038299_0985.jpg", "ESP_038646_1805.jpg", "ESP_038798_1665.jpg", "ESP_038821_1235.jpg", "ESP_038851_1900.jpg", "ESP_038877_1875.jpg", "ESP_038877_2135.jpg", "ESP_038896_1255.jpg", "ESP_038903_1115.jpg", "ESP_038904_1430.jpg", "ESP_038918_1650.jpg", "ESP_038931_1355.jpg", "ESP_038932_1635.jpg", "ESP_038949_1485.jpg", "ESP_038967_1230.jpg", "ESP_039113_1915.jpg", "ESP_039114_1115.jpg", "ESP_039115_0945.jpg", "ESP_039117_1745.jpg", "ESP_039121_1905.jpg", "ESP_039122_1080.jpg", "ESP_039147_1940.jpg", "ESP_039148_1980.jpg", "ESP_039187_1915.jpg", "ESP_039240_1730.jpg", "ESP_039274_2055.jpg", "ESP_039280_1755.jpg", "ESP_039326_1650.jpg", "ESP_039348_1985.jpg", "ESP_039384_2100.jpg", "ESP_039405_1575.jpg", "ESP_039424_1700.jpg", "ESP_039432_2115.jpg", "ESP_039485_1660.jpg", "ESP_039524_1445.jpg", "ESP_039555_1430.jpg", "ESP_039563_1730.jpg", "ESP_039568_1120.jpg", "ESP_039581_1520.jpg", "ESP_039633_0950.jpg", "ESP_039655_1835.jpg", "ESP_039658_1425.jpg", "ESP_039708_1765.jpg", "ESP_039731_1580.jpg", "ESP_039747_1090.jpg", "ESP_039867_1805.jpg", "ESP_039893_1550.jpg", "ESP_039955_1875.jpg", "ESP_039997_2170.jpg", "ESP_040028_1315.jpg", "ESP_040170_1440.jpg", "ESP_040258_1215.jpg", "ESP_040386_1915.jpg", "ESP_040485_1330.jpg", "ESP_040504_1920.jpg", "ESP_040566_0935.jpg", "ESP_040579_1920.jpg", "ESP_040590_1335.jpg", "ESP_040605_1575.jpg", "ESP_040618_1875.jpg", "ESP_040770_1755.jpg", "ESP_040776_2115.jpg", "ESP_041864_1745.jpg", "ESP_043816_1750.jpg", "ESP_045390_2215.jpg", "ESP_047502_1730.jpg", "PSP_001521_2025.jpg", "PSP_001578_1425.jpg", "PSP_002208_1755.jpg", "PSP_002390_1320.jpg", "PSP_003077_1530.jpg", "PSP_003617_1835.jpg", "PSP_003637_2020.jpg", "PSP_003639_1345.jpg", "PSP_003708_1335.jpg", "PSP_003711_1275.jpg", "PSP_003931_1370.jpg", "PSP_003948_0935.jpg", "PSP_003972_1305.jpg", "PSP_004000_0945.jpg", "PSP_004038_1255.jpg", "PSP_004233_1980.jpg", "PSP_004274_1225.jpg", "PSP_004277_1530.jpg", "PSP_004311_1050.jpg", "PSP_004340_1235.jpg", "PSP_004421_1850.jpg", "PSP_004434_1885.jpg", "PSP_004673_0935.jpg", "PSP_004708_1000.jpg", "PSP_004739_0935.jpg", "PSP_004742_0990.jpg", "PSP_004748_0945.jpg", "PSP_004765_0940.jpg", "PSP_004778_0945.jpg", "PSP_004847_1745.jpg", "PSP_004917_1080.jpg", "PSP_004959_0865.jpg", "PSP_004980_1035.jpg", "PSP_004981_1435.jpg", "PSP_004996_1065.jpg", "PSP_005011_0885.jpg", "PSP_005019_1970.jpg", "PSP_005071_2150.jpg", "PSP_005082_1700.jpg", "PSP_005095_0935.jpg", "PSP_005109_1770.jpg", "PSP_005149_1715.jpg", "PSP_005155_1030.jpg", "PSP_005160_1150.jpg", "PSP_005194_1070.jpg", "PSP_005336_1620.jpg", "PSP_005342_1225.jpg", "PSP_005414_1735.jpg", "PSP_005419_1380.jpg", "PSP_005581_1815.jpg", "PSP_005588_1445.jpg", "PSP_007338_2640.jpg", "PSP_007535_1755.jpg", "PSP_007744_2055.jpg", "PSP_008829_1735.jpg", "PSP_010034_2250.jpg", "PSP_010397_1725.jpg"];

var baseUrl = "https://s3-us-west-1.amazonaws.com/marsfromspace.com/";

var clickedStyles = {
  clicked: {
    border: "1px solid white"
  },
  default: {
    border: "1px solid black"
  }
};

var finishedStyles = {
  finished: {
    display: "none"
  }
};

var Gallery = function (_React$Component) {
  _inherits(Gallery, _React$Component);

  function Gallery(props) {
    _classCallCheck(this, Gallery);

    var _this = _possibleConstructorReturn(this, (Gallery.__proto__ || Object.getPrototypeOf(Gallery)).call(this, props));

    _this.state = {
      clickedPair: Array(),
      finished: Array(),
      imageUrls: getGameBoardUrls(allLinks)
    };
    return _this;
  }

  _createClass(Gallery, [{
    key: "startOver",
    value: function startOver() {
      this.setState({ finished: Array() });
      this.setState({ imageUrls: getGameBoardUrls(allLinks) });
      this.renderStartOver(false, "", "");
    }
  }, {
    key: "clickIndicatorClassName",
    value: function clickIndicatorClassName(key) {
      return this.state.clickedPair.includes(key) ? clickedStyles.clicked : clickedStyles.default;
    }
  }, {
    key: "finishedIndicatorClassName",
    value: function finishedIndicatorClassName(key) {
      if (this.state.finished.includes(key)) {
        return finishedStyles.finished;
      }
    }
  }, {
    key: "globeClickHandler",
    value: function globeClickHandler(key) {
      var _this2 = this;

      if (this.state.finished.includes(key)) {
        return;
      }
      var clickedPair = this.state.clickedPair.slice();

      if (clickedPair[0] == key) {
        // they clicked the same box again, unset it
        this.setState({ clickedPair: Array() });
        return;
      }

      clickedPair.push(key);
      this.setState({ clickedPair: clickedPair });

      if (clickedPair.length == 2) {
        // setTimeout gets the 2nd clicked globe style to render
        setTimeout(function () {
          return _this2.checkMatch(clickedPair);
        }, 300);
      }
    }
  }, {
    key: "checkMatch",
    value: function checkMatch(clickedPair) {
      var _this3 = this;

      var imageNames = this.state.clickedPair.map(function (x) {
        return x.split(".jpg")[0];
      });
      this.setState({ clickedPair: Array() }); // resets clicked pair highlighting

      if (imageNames[0] !== imageNames[1]) {
        return; // these do not match
      }

      // we have a match..
      var finished = this.state.finished.slice().concat(clickedPair);
      this.setState({ finished: finished });

      if (finished.length == 2 * uniqueGlobesCount) {
        // all matches on the board have been found
        setTimeout(function () {
          _this3.renderStartOver(true, "good job!", "play again");
        }, 200);
      }
    }
  }, {
    key: "renderStartOver",
    value: function renderStartOver(display, msg, btnMsg) {
      var _this4 = this;

      ReactDOM.render(React.createElement(MessageScreen, {
        display: display,
        msg: msg,
        btnMsg: btnMsg,
        restartHandler: function restartHandler() {
          _this4.startOver();
        }
      }), document.getElementById("msg"));
    }
  }, {
    key: "renderGlobe",
    value: function renderGlobe(imageUrl, index) {
      var _this5 = this;

      var key = imageUrl.split("/").pop() + String(index); // unique key

      return React.createElement(
        "li",
        {
          key: key,
          style: this.clickIndicatorClassName(key),
          onClick: function onClick() {
            return _this5.globeClickHandler(key);
          }
        },
        React.createElement(
          "section",
          { style: this.finishedIndicatorClassName(key), className: "stage" },
          React.createElement(
            "figure",
            {
              className: "ball",
              style: { background: "url('" + imageUrl + "') repeat-x" }
            },
            React.createElement("span", { className: "shadow" })
          )
        )
      );
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      return React.createElement(
        "div",
        { className: "gallery" },
        React.createElement(
          "ul",
          { className: "images" },
          this.state.imageUrls.map(function (imageUrl, index) {
            return _this6.renderGlobe(imageUrl, index);
          })
        )
      );
    }
  }]);

  return Gallery;
}(React.Component);

var MessageScreen = function (_React$Component2) {
  _inherits(MessageScreen, _React$Component2);

  function MessageScreen() {
    _classCallCheck(this, MessageScreen);

    return _possibleConstructorReturn(this, (MessageScreen.__proto__ || Object.getPrototypeOf(MessageScreen)).apply(this, arguments));
  }

  _createClass(MessageScreen, [{
    key: "render",
    value: function render() {
      var styleName = this.props.display ? "block" : "none";
      return React.createElement(
        "div",
        { className: "win", style: { display: styleName } },
        React.createElement(
          "h2",
          null,
          this.props.msg
        ),
        React.createElement(
          "button",
          { onClick: this.props.restartHandler },
          this.props.btnMsg
        )
      );
    }
  }]);

  return MessageScreen;
}(React.Component);

function getGlobesCount() {
  // try to fill the page
  var w = window.innerWidth;
  var h = window.innerHeight;
  var globeSizeRem = 10; // css .ball width/height (ish) (this is janky guesswork)
  if (w < 569) {
    globeSizeRem = 5.6;
  }
  var globeSize = convertRemToPixels(globeSizeRem);
  var colCount = Math.floor(w / globeSize); //
  var rowCount = Math.floor(h / globeSize); //

  return Math.floor(colCount * rowCount / 2);
}

function getGameBoardUrls(allLinks) {
  allLinks = shuffle(allLinks);
  var imageLinks = allLinks.slice(0, uniqueGlobesCount).concat(allLinks.slice(0, uniqueGlobesCount));
  return imageLinks.map(function (lnk) {
    return baseUrl + lnk;
  });
}

function startGame() {
  ReactDOM.render(React.createElement(MessageScreen, { display: false }), document.getElementById("msg"));

  ReactDOM.render(React.createElement(Gallery, { imageUrls: allLinks }), document.getElementById("root"));
}

// ready go
var uniqueGlobesCount = getGlobesCount(); // number of unique globes, this will be times 2 for match game

var welcomeMsg = "Welcome! This is a visual matching game. Click on the pairs of matching globes.";

ReactDOM.render(React.createElement(MessageScreen, {
  display: true,
  msg: welcomeMsg,
  btnMsg: "Start Game",
  restartHandler: function restartHandler() {
    startGame();
  }
}), document.getElementById("msg"));
"use strict";

// some util functions
function shuffle(array) {
  // shuffles a javascript array
  // via https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  var currentIndex = array.length,
      temporaryValue,
      randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function convertRemToPixels(rem) {
  // via https://stackoverflow.com/questions/36532307/rem-px-in-javascript
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}
