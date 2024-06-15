/*!
 * Hype Auto Height v1.0.0
 * Copyright (2024) Max Ziebell, (https://maxziebell.de). MIT-license
 */

/*
 * Version-History
* 1.0.0 released under the MIT license
 */

// Ensure the extension isn't redefined
if ("HypeAutoHeight" in window === false) {
  window['HypeAutoHeight'] = (function () {

    // Define default settings
    var _default = {
      keyword: '↕️', // Default keyword to enable auto height
      enableAutoHeight: function (hypeDocument, element, event) {
        const keyword = HypeAutoHeight.getDefault('keyword');
        return hypeDocument.currentSceneName().includes(keyword) || 
               hypeDocument.currentLayoutName().includes(keyword);
      }
    };

    // Set or update a default value
    function setDefault(key, value) {
      if (typeof key === 'object') {
        _default = Object.assign(_default, key);
      } else {
        _default[key] = value;
      }
    }

    // Get the current value of a default
    function getDefault(key) {
      return key ? _default[key] : _default;
    }

    // Handle the layout request event
    function layoutRequest(hypeDocument, element, event) {
      if (!HypeAutoHeight.getDefault('enableAutoHeight')(hypeDocument, element, event)) return;

      var currentLayout = hypeDocument.layoutsForSceneNamed(hypeDocument.currentSceneName())
        .filter(layout => hypeDocument.currentLayoutName() === layout.name)[0];

      var hypeElm = document.getElementById(hypeDocument.documentId());
      var newHeight = hypeElm.offsetWidth * currentLayout['height'] / currentLayout['width'];
      hypeElm.style.height = newHeight + 'px';
      hypeDocument.relayoutIfNecessary();
    }

    // Register the event listener
    if ("HYPE_eventListeners" in window === false) { window.HYPE_eventListeners = Array(); }
    window.HYPE_eventListeners.push({ "type": "HypeLayoutRequest", "callback": layoutRequest });

    // Public API for the extension
    return {
      version: '1.0.0',
      setDefault: setDefault,
      getDefault: getDefault
    };

  })();
}
