var Expander = {};

Expander.makeDiv = function(attr) {
   var div = document.createElement('div');

   div.setAttribute('class', attr);
   return div;
}

Expander.hasClass = function(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

Expander.makeExpander = function(root) {
   var expanderBlock, expander, contents = [], children = root.childNodes;

   for (c = 0; c < children.length; c++) {
      if (children[c].nodeType !== 3) {
         contents.push(expander = children[c]);
      }
   }

   if (contents.length)
      root.appendChild(expanderBlock = Expander.makeDiv('expander-block'));

   for (var c = 0; c < contents.length; c++) {
      var expander = Expander.makeDiv('expander');
      var titleBlock = Expander.makeDiv('title-block');
      var buttonBlock = Expander.makeDiv('button-block');
      var upButton = document.createElement('img');
      var downButton = document.createElement('img');

      upButton.setAttribute('src', 'up.png');
      downButton.setAttribute('src', 'down.png');
      upButton.setAttribute('class', 'button');
      downButton.setAttribute('class', 'button');

      contents[c].origClass = contents[c].getAttribute('class');
      contents[c].setAttribute('class', 
       contents[c].origClass + ' expander-content hidden');
      
      expander.appendChild(upButton)
      expander.appendChild(downButton);

      titleBlock.appendChild(document.createTextNode
       (contents[c].getAttribute('title') || "Expander " + (c+1)));

      expander.appendChild(titleBlock);
      expander.appendChild(contents[c]);
      expanderBlock.appendChild(expander);

      titleBlock.expander = expander;
      titleBlock.content = contents[c];
      titleBlock.addEventListener('click', function() {
         if (Expander.hasClass(this, 'expanded')) {
            this.content.setAttribute('class', 
             this.content.origClass + ' hidden');
            this.setAttribute('class', 'title-block');
         }
         else {
            this.content.setAttribute('class', 
             this.content.origClass);
            this.setAttribute('class', 'title-block expanded');
         }
      });

      upButton.expander = downButton.expander = expander;
      upButton.addEventListener('click', function() {
         if (this.expander.previousSibling)
            this.expander.parentNode.insertBefore(this.expander, 
             this.expander.previousSibling);
      });

      downButton.addEventListener('click', function() {
         if (this.expander.nextSibling)
            this.expander.parentNode.insertBefore(this.expander.nextSibling,
             this.expander);
      });
   }
}