"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var baseUrl = "https://s3-us-west-1.amazonaws.com/marsfromspace.com/";

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
    key: "checkMatch",
    value: function checkMatch(key, e) {
      if (this.state.clickedPair[0] == key) {
        alert("please click a different box"); // this box was already clicked
        return;
      }

      this.state.clickedPair.push(key);

      var imageNames = this.state.clickedPair.map(function (x) {
        return x.split(".jpg")[0];
      });
      if (imageNames.length == 2) {
        var msg = imageNames[0] === imageNames[1] ? "you win!" : "NOPE";
        alert(msg);
        this.state.clickedPair = Array();
      }
    }
  }, {
    key: "renderImage",
    value: function renderImage(imageUrl, index) {
      var _this2 = this;

      var key = imageUrl.split("/").pop() + String(index); // unique key

      return React.createElement(
        "li",
        { key: key, onClick: function onClick(e) {
            return _this2.checkMatch(key, e);
          } },
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
      var _this3 = this;

      return React.createElement(
        "div",
        { className: "gallery" },
        React.createElement(
          "ul",
          { className: "images" },
          this.props.imageUrls.map(function (imageUrl, index) {
            return _this3.renderImage(imageUrl, index);
          })
        )
      );
    }
  }]);

  return Gallery;
}(React.Component);

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

var uniqueGlobesCount = 10; // number of unique globes, this will be times 2 for match game

var allLinks = Array.prototype.slice.call(document.getElementsByTagName("img"));
var imageLinks = allLinks.slice(0, uniqueGlobesCount).concat(allLinks.slice(0, uniqueGlobesCount));
imageLinks = shuffle(imageLinks);
var imageUrls = imageLinks.map(function (lnk) {
  return baseUrl + lnk.src.split("/").pop();
});

document.getElementById("prerendered").remove();

ReactDOM.render(React.createElement(Gallery, { imageUrls: imageUrls }), document.getElementById("root"));

