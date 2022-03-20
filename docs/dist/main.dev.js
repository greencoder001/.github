"use strict";

function timeSince(date) {
  var seconds = Math.floor((new Date() - date) / 1000);
  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " Jahre";
  }

  interval = seconds / 2592000;

  if (interval > 1) {
    return Math.floor(interval) + " Monate";
  }

  interval = seconds / 86400;

  if (interval > 1) {
    return Math.floor(interval) + " Tage";
  }

  interval = seconds / 3600;

  if (interval > 1) {
    return Math.floor(interval) + " Stunden";
  }

  interval = seconds / 60;

  if (interval > 1) {
    return Math.floor(interval) + " Minuten";
  }

  return Math.floor(seconds) + " Sekunden";
}

function experience() {
  return timeSince(new Date('05/02/2021'));
}

function loadAuszeichnungen() {
  zGET({
    url: 'auszeichnungen.json'
  }).then(function (a) {
    a = JSON.parse(a);
    var i = 0;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      var _loop = function _loop() {
        var auszeichnung = _step.value;
        var nachweisliste = '';
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = auszeichnung.proof[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var nachweis = _step2.value;
            nachweisliste += "<li>- <a target=\"_blank\" href=\"".concat(nachweis, "\">").concat(nachweis, "</a></li>");
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        var html = "\n                ".concat(i == 0 ? '' : '<hr>', "\n                <h3>").concat(auszeichnung.name, "</h3>\n                <p>").concat(auszeichnung.description, "</p>\n                <br>\n                <p style=\"text-align:left;\">\n                    <b>Nachweise:</b>\n                    <br>\n                    <ul style=\"text-align:left;\">").concat(nachweisliste, "</ul>\n                </p>\n            ");

        if (auszeichnung.date) {
          auszeichnung.date = auszeichnung.date.replace(/(.*?)\/(.*?)\/(.*?)/, '$2.$1.$3');
        }

        html = html.replace(/\{(.*?)\}/g, function (match, key) {
          return auszeichnung[key];
        });
        $$('#auszeichnungentext').inner("".concat($$('#auszeichnungentext').inner(), "<div class=\"auszeichnung-single\">").concat(html, "</div>"));
        i += 1;
      };

      for (var _iterator = a[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        _loop();
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  });
}

$$(document)(function () {
  $$('.menu-icon').on('click', function () {
    $$('.menu-list').toggleClass('active');
  });
  loadAuszeichnungen();
});