var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return call && (typeof call === "object" || typeof call === "function")
    ? call
    : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError(
      "Super expression must either be null or a function, not " +
        typeof superClass
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}

var baseUrl = "https://s3-us-west-1.amazonaws.com/marsfromspace.com/";

var thumbnailStyle = function thumbnailStyle(imageUrl) {
  return {
    backgroundImage: "url(" + { imageUrl: imageUrl } + ")"
  };
};

var Gallery = (function(_React$Component) {
  _inherits(Gallery, _React$Component);

  function Gallery() {
    _classCallCheck(this, Gallery);

    return _possibleConstructorReturn(
      this,
      (Gallery.__proto__ || Object.getPrototypeOf(Gallery)).apply(
        this,
        arguments
      )
    );
  }

  _createClass(Gallery, [
    {
      key: "renderImage",
      value: function renderImage(imageUrl) {
        return React.createElement(
          "li",
          { key: imageUrl.split("/").pop() },
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
    },
    {
      key: "render",
      value: function render() {
        var _this2 = this;

        return React.createElement(
          "div",
          { className: "gallery" },
          React.createElement(
            "ul",
            { className: "images" },
            this.props.imageUrls.map(function(imageUrl) {
              return _this2.renderImage(imageUrl);
            })
          )
        );
      }
    }
  ]);

  return Gallery;
})(React.Component);

var imageUrls = []; // collect list full path urls
var imageLinks = document.getElementsByTagName("img");
for (var i = 0; i < imageLinks.length; i++) {
  imageName = imageLinks[i].src.split("/").pop();
  imageUrls.push(baseUrl + imageName);
}

document.getElementById("prerendered").remove();

ReactDOM.render(
  React.createElement(Gallery, { imageUrls: imageUrls }),
  document.getElementById("root")
);
