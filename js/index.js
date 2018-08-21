"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var baseUrl = "https://s3-us-west-1.amazonaws.com/marsfromspace.com/";

var clickedStyles = {
  clicked: {
    border: "1px solid white"
  },
  default: {
    border: "0"
  }
};

var Gallery = function (_React$Component) {
  _inherits(Gallery, _React$Component);

  function Gallery(props) {
    _classCallCheck(this, Gallery);

    var _this = _possibleConstructorReturn(this, (Gallery.__proto__ || Object.getPrototypeOf(Gallery)).call(this, props));

    _this.state = {
      clickedPair: Array()
    };
    return _this;
  }

  _createClass(Gallery, [{
    key: "clickedClass",
    value: function clickedClass(key) {
      return this.state.clickedPair.includes(key) ? clickedStyles.clicked : clickedStyles.default;
    }
  }, {
    key: "clickHandler",
    value: function clickHandler(key) {
      var _this2 = this;

      var clickedPair = this.state.clickedPair;

      if (clickedPair[0] == key) {
        alert("please click a different box"); // this box was already clicked
        return;
      }

      clickedPair.push(key);
      this.setState({ clickedPair: clickedPair });

      if (clickedPair.length == 2) {
        setTimeout(function () {
          return _this2.checkMatch(clickedPair);
        }, 500);
      }
    }
  }, {
    key: "checkMatch",
    value: function checkMatch(clickedPair) {
      var imageNames = this.state.clickedPair.map(function (x) {
        return x.split(".jpg")[0];
      });
      var msg = imageNames[0] === imageNames[1] ? "you win!" : "NOPE";
      alert(msg);
      this.setState({ clickedPair: Array() });
    }
  }, {
    key: "renderImage",
    value: function renderImage(imageUrl, index) {
      var _this3 = this;

      var key = imageUrl.split("/").pop() + String(index); // unique key

      return React.createElement(
        "li",
        {
          key: key,
          style: this.clickedClass(key),
          onClick: function onClick() {
            return _this3.clickHandler(key);
          }
        },
        React.createElement(
          "section",
          { className: "stage" },
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
      var _this4 = this;

      return React.createElement(
        "div",
        { className: "gallery" },
        React.createElement(
          "ul",
          { className: "images" },
          this.props.imageUrls.map(function (imageUrl, index) {
            return _this4.renderImage(imageUrl, index);
          })
        )
      );
    }
  }]);

  return Gallery;
}(React.Component);

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

function getGlobesCount() {
  // try to fill the page
  var globeSize = convertRemToPixels(9); // css .ball width/height
  var w = window.innerWidth;
  var h = window.innerHeight;
  var colCount = Math.floor(w / (1.1 * globeSize)); // multiplier is just a guess
  var rowCount = Math.floor(h / (1.1 * globeSize)); // to account for padding

  return Math.floor(colCount * rowCount / 2);
}

function convertRemToPixels(rem) {
  // via https://stackoverflow.com/questions/36532307/rem-px-in-javascript
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

// ready go
var uniqueGlobesCount = getGlobesCount(); // number of unique globes, this will be times 2 for match game

var allLinks = shuffle(Array.prototype.slice.call(document.getElementsByTagName("img")));
var imageLinks = allLinks.slice(0, uniqueGlobesCount).concat(allLinks.slice(0, uniqueGlobesCount));
imageLinks = shuffle(imageLinks);
var imageUrls = imageLinks.map(function (lnk) {
  return baseUrl + lnk.src.split("/").pop();
});

document.getElementById("prerendered").remove();

ReactDOM.render(React.createElement(Gallery, { imageUrls: imageUrls }), document.getElementById("root"));

