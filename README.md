![AutoHeight_2|](https://playground.maxziebell.de/Hype/AutoHeight/HypeAutoHeight.jpg) 

Here is an extension based on @h_classen [great work/code on proportional scaling](https://forums.tumult.com/t/creating-a-flexible-tumult-hype-document-within-a-div-with-no-set-height/13224?u=maxzieb) and the recurring need for proportional scaling in Hype. I used a Unicode character (↕️) and turned the logic on its head. Meaning for scenes/layouts you want it to work you add the character. The setup and condition can be easily removed/tweak or enabled for all scenes if you don't like that logic. Another thing I did is to move the code into the Hype document itself, so it should work out-of-the-box in settings, this approach is most needed like WordPress. 

---

### Content Delivery Network (CDN)

The latest version of HypeAutoHeight can be linked into your project using the following in the head section of your project:

```html
<script src="https://cdn.jsdelivr.net/gh/worldoptimizer/HypeAutoHeight/HypeAutoHeight.min.js"></script>
```

Optionally, you can also link a SRI version or specific releases. Read more about that on the JsDelivr (CDN) page for this extension at [https://www.jsdelivr.com/package/gh/worldoptimizer/HypeAutoHeight](https://www.jsdelivr.com/package/gh/worldoptimizer/HypeAutoHeight).

Learn how to use the latest extension version and how to combine extensions into one file at [https://github.com/worldoptimizer/HypeCookBook/wiki/Including-external-files-and-Hype-extensions](https://github.com/worldoptimizer/HypeCookBook/wiki/Including-external-files-and-Hype-extensions).

---

### Changing the rule to determine if proportional layout should be applied (optional)

As mentioned, you can use another icon if you don't like the one I set. The rule determining if proportional scaling should be applied is defined in the function `installAutoHeightIfNecessary`. In there you will find a test of sorts and if the test return `true` it enables proportional scaling. Look for this code:
```javascript
// Your conditions to enable autoHeight 
hypeDocument.enableAutoHeight = function(hypeDocument, element, event){
	//  Rule goes here
}
```

### Here are some alternative rules

To change the icon to let's say ↧ just replace the existing rule with the following instead:
```javascript
// return true to enable: currently its scenes or layouts containing (↧)
return hypeDocument.currentSceneName().includes('↧') || hypeDocument.currentLayoutName().includes('↧'); 
```
And while we are at it… here is a replacement to always enable it:
```javascript
// return true to enable
return true; 
```
And finally a replacement to enable in a reverse logic. So, scenes or layouts containing the icon will not be resizing proportionally, but the rest will:
```javascript
// return false to disable: currently its scenes or layouts containing (✖️)
return !(hypeDocument.currentSceneName().includes('✖️') || hypeDocument.currentLayoutName().includes('✖️')); 
``` 
