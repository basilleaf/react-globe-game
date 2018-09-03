"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Gallery = function (_React$Component) {
  _inherits(Gallery, _React$Component);

  /* gallery of globe images is the matching game board */
  function Gallery(props) {
    _classCallCheck(this, Gallery);

    var _this = _possibleConstructorReturn(this, (Gallery.__proto__ || Object.getPrototypeOf(Gallery)).call(this, props));

    _this.state = {
      display: true,
      clicked: Array(),
      finished: Array(),
      imageUrls: Array(), // full set of possible image urls
      boardKeys: Array(),
      remainingLinks: Array(), // image urls that have not appeared yet, subset of imageUrls
      isUsingKeyboardNav: false,
      focusStyle: "mouse"
    };

    window.addEventListener("keyup", _this.handleKeyUp.bind(_this));
    return _this;
  }

  _createClass(Gallery, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setState({ imageUrls: this.getGameBoardUrls(allLinks) }); // ajax call
    }
  }, {
    key: "componentWillUnMount",
    value: function componentWillUnMount() {
      window.removeEventListener("keyup", this.handleKeyUp.bind(this));
    }
  }, {
    key: "getGameBoardUrls",
    value: function getGameBoardUrls(links) {
      /* the gameboard presents a random
         subset of the available images from data.json,
         based on available screen size */
      links = shuffle(links); // the big list of all links
      var imageLinks = shuffle(links.slice(0, uniqueGlobesCount).concat(links.slice(0, uniqueGlobesCount)));
      this.setState({ boardKeys: imageLinks }); // help for arrow key navigation

      var remainingLinks = links.filter(function (x) {
        return !imageLinks.includes(x);
      });

      // don't repeat images between games until there are no more,
      // then start over with allLinks again..
      remainingLinks = remainingLinks.length < uniqueGlobesCount ? allLinks : remainingLinks;

      this.setState({ remainingLinks: remainingLinks });
      return imageLinks.map(function (lnk) {
        return baseUrl + lnk;
      });
    }
  }, {
    key: "moveFocus",
    value: function moveFocus(parentEl, direction, moveUpDownIndex) {
      if (["up", "down"].includes(direction)) {
        var currentKey = parentEl.getAttribute("data-key").split(".jpg")[0] + ".jpg";
        var boardKeys = this.state.boardKeys.slice();
        var currentIndex = boardKeys.indexOf(currentKey);
        console.log(moveUpDownIndex);
        console.log(boardKeys);
        console.log(currentKey);
        console.log(currentIndex);
        var nextIndex;
        switch (direction) {
          case "up":
            nextIndex = currentIndex - moveUpDownIndex;
            break;
          case "down":
            nextIndex = currentIndex + moveUpDownIndex;
            break;
        }
        var nextKey = boardKeys[nextIndex];

        console.log(moveUpDownIndex);
        console.log(nextIndex);
        console.log(nextKey);
        console.log(document.querySelectorAll("[data-key='{nextKey}']")[0]);
      }

      // moves focus from parentEl to next available globe
      // el is the <li> element
      // direction = next/prev (or right/left arrow key)

      // find the appropriate next sibling (before or after this one)
      var siblingContainer = direction == "next" ? parentEl.nextSibling : parentEl.previousSibling;

      try {
        var siblingKey = siblingContainer.getAttribute("data-key");
        if (this.state.finished.includes(siblingKey)) {
          // this globe is hidden, move to next available sibling
          return this.moveFocus(siblingContainer, direction);
        }
        // this is available, focus this element
        siblingContainer.focus();
      } catch (e) {
        // this happens on the begnning and end of the list of globes
        // we want the arrow keys have a wraparound behavior
        var currentKey = parentEl.getAttribute("data-key").split(".jpg")[0] + ".jpg";
        var _boardKeys = this.state.boardKeys;
        if (currentKey == _boardKeys[0] & direction == "prev") {
          // they hit left arrow while on the first globe
          // bring focus to last globe
          document.getElementById("images").lastChild.focus();
          // they are at the beginning of the list, send them to the end
        }
        if (currentKey == _boardKeys[_boardKeys.length - 1] & direction == "next") {
          // they hit right arrow while on the last globe,
          // bring focus to first globe
          document.getElementById("images").firstChild.focus();
        }
      }
    }
  }, {
    key: "handleKeyDown",
    value: function handleKeyDown(e) {
      e.persist();

      // for navigating with arrow key
      var accepted = ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"];
      if (!e.key | !accepted.includes(e.key)) {
        return;
      }

      var direction;
      switch (e.key) {
        case "ArrowLeft":
          direction = "prev";
          break;
        case "ArrowRight":
          direction = "next";
          break;
        case "ArrowUp":
          direction = "up";
          break;
        case "ArrowDown":
          direction = "down";
          break;
      }

      this.moveFocus(e.target, direction);
    }
  }, {
    key: "handleGlobeClick",
    value: function handleGlobeClick(key, e) {
      var _this2 = this;

      // handle a single globe click
      // key is the react internal key for the element
      e.persist();

      if (!e.key) {
        // they switched back to using clicks/taps
        if (this.state.focusStyle == "keyboard") {
          this.setState({ isUsingKeyboardNav: false });
          this.setState({ focusStyle: "mouse" });
        }
      }
      /* a globe was clicked */
      if (e.key & ![" ", "Enter"].includes(e.key)) {
        return; // this was not an enter or spacebar click
      }
      if (this.state.finished.includes(key)) {
        return; // prevents clicking in the space of a removed globe
      }
      var clicked = this.state.clicked.slice();
      if (clicked[0] == key) {
        // they clicked the same box again, unset it
        this.setState({ clicked: Array() });
        return;
      }
      // this is a legit clicked thing..
      clicked.push(key);
      this.setState({ clicked: clicked }, function () {
        if (clicked.length == 2) {
          // a pair has been selected..
          _this2.handlePairIsSelected(clicked, e.target);
        }
      });
    }
  }, {
    key: "handlePairIsSelected",
    value: function handlePairIsSelected(clicked, el) {
      var _this3 = this;

      // el is the last dom element clicked
      /* player selected a pair, check for matching
         and handle match game play behavior */

      // image names are found in the file name, but the extensions may differ
      // (an index is appended to make them unique on the board as "key")
      var imageNames = this.state.clicked.map(function (x) {
        return x.split(".jpg")[0];
      });

      this.setState({ clicked: Array() });

      if (imageNames[0] !== imageNames[1]) {
        return; // these do not match
      }

      // we have a match, update the finished list..
      var finished = this.state.finished.slice().concat(clicked);

      this.setState({ finished: finished }, function () {
        // move focus to the next dom element for keyboard nav users
        if (_this3.state.isUsingKeyboardNav) {
          _this3.moveFocus(el, "next");
        }
      });

      if (finished.length == 2 * uniqueGlobesCount) {
        this.setState({ display: false });
        // there are no more globes to match! ask user to play again..
        setTimeout(function () {
          _this3.renderMessageScreen(true, "good job!", "play again");
        }, 200);
      }
    }
  }, {
    key: "handleKeyUp",
    value: function handleKeyUp(e) {
      // they may be trying to navigate with keyboard..
      if (e.key != "Tab") {
        return; // no
      }
      if (!this.state.isUsingKeyboardNav) {
        this.setState({ isUsingKeyboardNav: true });
      }
      if (this.state.focusStyle == "mouse") {
        this.setState({ focusStyle: "keyboard" });
      }
    }
  }, {
    key: "handlePlayAgain",
    value: function handlePlayAgain() {
      /* "play again" button handler */
      this.setState({ finished: Array() });
      this.setState({
        imageUrls: this.getGameBoardUrls(this.state.remainingLinks)
      });
      this.setState({ display: true });
      this.renderMessageScreen(false, "", "");
    }
  }, {
    key: "renderMessageScreen",
    value: function renderMessageScreen(display, msg, btnMsg) {
      ReactDOM.render(React.createElement(MessageScreen, {
        display: display,
        msg: msg,
        btnMsg: btnMsg,
        handleRestart: this.handlePlayAgain.bind(this)
      }), document.getElementById("msg"));
    }
  }, {
    key: "renderGlobe",
    value: function renderGlobe(imageUrl, index) {
      var _this4 = this;

      var key = imageUrl.split("/").pop() + String(index); // unique key

      return React.createElement(
        "li",
        {
          key: key,
          tabIndex: 0,
          "data-key": key,
          style: getGlobeStyle({ key: key, clicked: this.state.clicked }),
          className: this.state.focusStyle,
          onClick: function onClick(e) {
            return _this4.handleGlobeClick(key, e);
          },
          onKeyPress: function onKeyPress(e) {
            return _this4.handleGlobeClick(key, e);
          },
          onKeyDown: function onKeyDown(e) {
            return _this4.handleKeyDown(e);
          }
        },
        React.createElement(
          "section",
          {
            style: getFinishedStyle({ key: key, finished: this.state.finished }),
            className: "stage"
          },
          React.createElement(
            "figure",
            {
              role: "group",
              "aria-labelledby": key,
              className: "ball",
              style: { background: "url('" + imageUrl + "') repeat-x center" }
            },
            React.createElement("span", { className: "shadow" })
          )
        )
      );
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      if (!this.state.display) {
        return null;
      }
      return React.createElement(
        "div",
        { className: "gallery" },
        React.createElement(
          "ul",
          { id: "images", className: "images" },
          this.state.imageUrls.map(function (imageUrl, index) {
            return _this5.renderGlobe(imageUrl, index);
          })
        )
      );
    }
  }]);

  return Gallery;
}(React.Component);
"use strict";

var MessageScreen = function MessageScreen(props) {
  /* interstitial screen for welcome and between games */
  if (!props.display) {
    return null;
  }
  var styleName = props.display ? "block" : "none";
  return React.createElement(
    "div",
    { className: "win" },
    React.createElement(
      "h2",
      null,
      props.msg
    ),
    React.createElement(
      "button",
      { onClick: props.handleRestart },
      props.btnMsg
    )
  );
};
"use strict";

var moveUpDownIndex = function moveUpDownIndex() {
  // returns number of globes in 2d array to move back/forward
  // to simulate moving up/down (for use with arrow keys)
  var w = window.innerWidth;
  var h = window.innerHeight;
  /* tries to guess how many unique globes are needed
     to fill the screen so gallery doesn't require scrolling  */
  var globeSize = getGlobeSize(w, h);
  var countPerRow = Math.floor(w / globeSize);
  console.log(countPerRow);
};

var getGlobeSize = function getGlobeSize(w, h) {
  // returns globe size in pixels given width and height of window
  var globeSizeRem = 10; // css .ball width/height (ish) (this is janky guesswork)
  if (w < 569) {
    // iphone media query width
    globeSizeRem = 5.6; // this was tweaked and may not match globe size in scss
  }
  var globeSize = convertRemToPixels(globeSizeRem);
  return globeSize;
};

var getGlobesCount = function getGlobesCount() {
  var w = window.innerWidth;
  var h = window.innerHeight;
  /* tries to guess how many unique globes are needed
     to fill the screen so gallery doesn't require scrolling  */
  var globeSize = getGlobeSize();
  var colCount = Math.floor(w / globeSize); //
  var rowCount = Math.floor(h / globeSize); //

  return Math.floor(colCount * rowCount / 2);
};

var startGame = function startGame() {
  /* hide the message screen */

  ReactDOM.render(React.createElement(MessageScreen, { display: false }), document.getElementById("msg"));

  /* render the gallery  */
  ReactDOM.render(React.createElement(Gallery, { imageUrls: allLinks }), document.getElementById("root"));
};
"use strict";

var allLinks = ["ESP_013368_1885.jpg", "ESP_013954_1780.jpg", "ESP_014185_1095.jpg", "ESP_014351_1995.jpg", "ESP_016700_2075.jpg", "ESP_017154_1390.jpg", "ESP_017174_1730.jpg", "ESP_019753_2000.jpg", "ESP_020065_1335.jpg", "ESP_020087_1515.jpg", "ESP_020090_1985.jpg", "ESP_020782_1610.jpg", "ESP_020795_2025.jpg", "ESP_020798_2040.jpg", "ESP_021676_1430.jpg", "ESP_021915_1005.jpg", "ESP_022405_1910.jpg", "ESP_026086_2115.jpg", "ESP_027077_1785.jpg", "ESP_027339_2060.jpg", "ESP_027834_1755.jpg", "ESP_027989_1425.jpg", "ESP_028004_1825.jpg", "ESP_028020_2560.jpg", "ESP_028269_1755.jpg", "ESP_028335_1755.jpg", "ESP_028575_1890.jpg", "ESP_028799_1565.jpg", "ESP_029226_1670.jpg", "ESP_030373_1755.jpg", "ESP_031944_1790.jpg", "ESP_032011_1425.jpg", "ESP_032078_1420.jpg", "ESP_032522_1345.jpg", "ESP_032562_1670.jpg", "ESP_032836_1790.jpg", "ESP_033014_2260.jpg", "ESP_033108_1800.jpg", "ESP_033242_1845.jpg", "ESP_033242_2315.jpg", "ESP_033243_2165.jpg", "ESP_033248_1520.jpg", "ESP_033252_2070.jpg", "ESP_033264_1640.jpg", "ESP_033293_1755.jpg", "ESP_033297_1745.jpg", "ESP_033371_1080.jpg", "ESP_033433_2650.jpg", "ESP_033483_1805.jpg", "ESP_033556_1890.jpg", "ESP_033564_1405.jpg", "ESP_033565_1945.jpg", "ESP_033591_1805.jpg", "ESP_033599_2160.jpg", "ESP_033722_1710.jpg", "ESP_033814_1525.jpg", "ESP_033902_2125.jpg", "ESP_033995_1410.jpg", "ESP_034084_1655.jpg", "ESP_034101_1385.jpg", "ESP_034131_1670.jpg", "ESP_034132_1750.jpg", "ESP_034189_1740.jpg", "ESP_034209_1605.jpg", "ESP_034228_2150.jpg", "ESP_034234_1255.jpg", "ESP_034255_1840.jpg", "ESP_034259_2040.jpg", "ESP_034285_1835.jpg", "ESP_034309_1485.jpg", "ESP_034329_1670.jpg", "ESP_034342_1315.jpg", "ESP_034441_2565.jpg", "ESP_034572_1755.jpg", "ESP_034656_2195.jpg", "ESP_034716_1875.jpg", "ESP_034801_1300.jpg", "ESP_034815_2035.jpg", "ESP_034829_1325.jpg", "ESP_034830_1670.jpg", "ESP_034864_1825.jpg", "ESP_034883_1645.jpg", "ESP_034887_1870.jpg", "ESP_034909_1755.jpg", "ESP_034922_1385.jpg", "ESP_034941_2130.jpg", "ESP_034942_1615.jpg", "ESP_034948_1720.jpg", "ESP_034948_2165.jpg", "ESP_034970_2040.jpg", "ESP_034987_1595.jpg", "ESP_035028_1685.jpg", "ESP_035033_2635.jpg", "ESP_035062_1995.jpg", "ESP_035078_2185.jpg", "ESP_035098_2065.jpg", "ESP_035143_1325.jpg", "ESP_035164_1655.jpg", "ESP_035189_2240.jpg", "ESP_035226_2090.jpg", "ESP_035295_2670.jpg", "ESP_035408_1775.jpg", "ESP_035409_1525.jpg", "ESP_035421_1810.jpg", "ESP_035558_1830.jpg", "ESP_035603_1890.jpg", "ESP_035702_2270.jpg", "ESP_035777_1320.jpg", "ESP_035807_1885.jpg", "ESP_035863_1710.jpg", "ESP_035909_1775.jpg", "ESP_035926_2640.jpg", "ESP_035945_1755.jpg", "ESP_035969_1825.jpg", "ESP_035998_1555.jpg", "ESP_036059_1835.jpg", "ESP_036099_2615.jpg", "ESP_036182_2230.jpg", "ESP_036376_2160.jpg", "ESP_036382_2255.jpg", "ESP_036397_1785.jpg", "ESP_036436_2645.jpg", "ESP_036485_1765.jpg", "ESP_036598_1735.jpg", "ESP_036654_1490.jpg", "ESP_036815_2330.jpg", "ESP_036867_2655.jpg", "ESP_036927_1790.jpg", "ESP_036934_1915.jpg", "ESP_036947_1390.jpg", "ESP_037030_1880.jpg", "ESP_037056_2650.jpg", "ESP_037070_1985.jpg", "ESP_037117_1755.jpg", "ESP_037122_2165.jpg", "ESP_037125_1315.jpg", "ESP_037137_1360.jpg", "ESP_037142_1430.jpg", "ESP_037161_1785.jpg", "ESP_037163_1590.jpg", "ESP_037190_1765.jpg", "ESP_037222_1820.jpg", "ESP_037237_1435.jpg", "ESP_037300_1825.jpg", "ESP_037328_1845.jpg", "ESP_037371_1350.jpg", "ESP_037474_1380.jpg", "ESP_037494_1685.jpg", "ESP_037545_1730.jpg", "ESP_037551_2540.jpg", "ESP_037626_0985.jpg", "ESP_037641_1560.jpg", "ESP_037714_1935.jpg", "ESP_037811_0985.jpg", "ESP_037877_0985.jpg", "ESP_038022_0985.jpg", "ESP_038044_1965.jpg", "ESP_038117_1385.jpg", "ESP_038143_2205.jpg", "ESP_038224_1890.jpg", "ESP_038227_2020.jpg", "ESP_038299_0985.jpg", "ESP_038646_1805.jpg", "ESP_038798_1665.jpg", "ESP_038821_1235.jpg", "ESP_038851_1900.jpg", "ESP_038877_1875.jpg", "ESP_038877_2135.jpg", "ESP_038896_1255.jpg", "ESP_038903_1115.jpg", "ESP_038904_1430.jpg", "ESP_038918_1650.jpg", "ESP_038931_1355.jpg", "ESP_038932_1635.jpg", "ESP_038949_1485.jpg", "ESP_038967_1230.jpg", "ESP_039113_1915.jpg", "ESP_039114_1115.jpg", "ESP_039115_0945.jpg", "ESP_039117_1745.jpg", "ESP_039121_1905.jpg", "ESP_039122_1080.jpg", "ESP_039147_1940.jpg", "ESP_039148_1980.jpg", "ESP_039187_1915.jpg", "ESP_039240_1730.jpg", "ESP_039274_2055.jpg", "ESP_039280_1755.jpg", "ESP_039326_1650.jpg", "ESP_039348_1985.jpg", "ESP_039384_2100.jpg", "ESP_039405_1575.jpg", "ESP_039424_1700.jpg", "ESP_039432_2115.jpg", "ESP_039485_1660.jpg", "ESP_039524_1445.jpg", "ESP_039555_1430.jpg", "ESP_039563_1730.jpg", "ESP_039568_1120.jpg", "ESP_039581_1520.jpg", "ESP_039633_0950.jpg", "ESP_039655_1835.jpg", "ESP_039658_1425.jpg", "ESP_039708_1765.jpg", "ESP_039731_1580.jpg", "ESP_039747_1090.jpg", "ESP_039867_1805.jpg", "ESP_039893_1550.jpg", "ESP_039955_1875.jpg", "ESP_039997_2170.jpg", "ESP_040028_1315.jpg", "ESP_040170_1440.jpg", "ESP_040258_1215.jpg", "ESP_040386_1915.jpg", "ESP_040485_1330.jpg", "ESP_040504_1920.jpg", "ESP_040566_0935.jpg", "ESP_040579_1920.jpg", "ESP_040590_1335.jpg", "ESP_040605_1575.jpg", "ESP_040618_1875.jpg", "ESP_040770_1755.jpg", "ESP_040776_2115.jpg", "ESP_041864_1745.jpg", "ESP_043816_1750.jpg", "ESP_045390_2215.jpg", "ESP_047502_1730.jpg", "PSP_001521_2025.jpg", "PSP_001578_1425.jpg", "PSP_002208_1755.jpg", "PSP_002390_1320.jpg", "PSP_003077_1530.jpg", "PSP_003617_1835.jpg", "PSP_003637_2020.jpg", "PSP_003639_1345.jpg", "PSP_003708_1335.jpg", "PSP_003711_1275.jpg", "PSP_003931_1370.jpg", "PSP_003948_0935.jpg", "PSP_003972_1305.jpg", "PSP_004000_0945.jpg", "PSP_004038_1255.jpg", "PSP_004233_1980.jpg", "PSP_004274_1225.jpg", "PSP_004277_1530.jpg", "PSP_004311_1050.jpg", "PSP_004340_1235.jpg", "PSP_004421_1850.jpg", "PSP_004434_1885.jpg", "PSP_004673_0935.jpg", "PSP_004708_1000.jpg", "PSP_004739_0935.jpg", "PSP_004742_0990.jpg", "PSP_004748_0945.jpg", "PSP_004765_0940.jpg", "PSP_004778_0945.jpg", "PSP_004847_1745.jpg", "PSP_004917_1080.jpg", "PSP_004959_0865.jpg", "PSP_004980_1035.jpg", "PSP_004981_1435.jpg", "PSP_004996_1065.jpg", "PSP_005011_0885.jpg", "PSP_005019_1970.jpg", "PSP_005071_2150.jpg", "PSP_005082_1700.jpg", "PSP_005095_0935.jpg", "PSP_005109_1770.jpg", "PSP_005149_1715.jpg", "PSP_005155_1030.jpg", "PSP_005160_1150.jpg", "PSP_005194_1070.jpg", "PSP_005336_1620.jpg", "PSP_005342_1225.jpg", "PSP_005414_1735.jpg", "PSP_005419_1380.jpg", "PSP_005581_1815.jpg", "PSP_005588_1445.jpg", "PSP_007338_2640.jpg", "PSP_007535_1755.jpg", "PSP_007744_2055.jpg", "PSP_008829_1735.jpg", "PSP_010034_2250.jpg", "PSP_010397_1725.jpg"];


var baseUrl = "https://s3-us-west-1.amazonaws.com/marsfromspace.com/";

var uniqueGlobesCount = getGlobesCount();
var moveUpDownIndex = moveUpDownIndex();
console.log("hello");
console.log(moveUpDownIndex);
var welcomeMsg = "\n  Welcome! This is a visual matching game.\n  Click on the pairs of matching globes.\n  ";

/* globe behavior styles */
var clickedStyles = {
  clicked: {
    border: "3px solid #525C65"
  },
  default: {
    border: "3px solid black"
  }
};
var finishedStyles = {
  finished: {
    display: "none"
  }
};

var getGlobeStyle = function getGlobeStyle(props) {
  return props.clicked.includes(props.key) ? clickedStyles.clicked : clickedStyles.default;
};

var getFinishedStyle = function getFinishedStyle(props) {
  if (props.finished.includes(props.key)) {
    return finishedStyles.finished;
  }
};

// homescreen
ReactDOM.render(React.createElement(MessageScreen, {
  display: true,
  msg: welcomeMsg,
  btnMsg: "Start Game",
  handleRestart: startGame
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
