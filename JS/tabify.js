var TabsV6 = {};

TabsV6.makeDiv = function(classAttr) {
   var div = document.createElement('div');
   
   div.setAttribute('class', classAttr);
   return div;
}

TabsV6.tabify = function(root) {
   var tab, tabs = [], pages = [], children = root.childNodes; 
   var tabBlock, rowDiv, page, margin, p;
   
   tabBlock = TabsV6.makeDiv('tab-block');

   for (p = 0; p < children.length; p++) {
      if (children[p].nodeType !== 3) {
         pages.push(page = children[p]);
         tabBlock.appendChild(page);
      }
   }
   root.appendChild(tabBlock);
   
   rowDiv = TabsV6.makeDiv('row back-row');
   tabBlock.insertBefore(rowDiv, pages[0]);
   
   margin = rowDiv.offsetWidth;
   for (p = 0; p < pages.length; p++) {
      pages[p].setAttribute('class', 'page');
      tabs.push(tab = TabsV6.makeDiv('tab'));
      tab.appendChild(document.createTextNode
       (pages[p].getAttribute('title') || "Page " + (p+1)));
      rowDiv.appendChild(tab);  // Must parent the tab to get a width

      margin -= tab.offsetWidth;
      if (margin < 0) {
         rowDiv.removeChild(tab); 
         tabBlock.insertBefore(rowDiv = TabsV6.makeDiv('row back-row'),
          pages[0]);
         rowDiv.appendChild(tab);
         margin = rowDiv.offsetWidth - tab.offsetWidth;  
      }
   }
   rowDiv.setAttribute('class', 'row');
   
   // Same as TabsV5 from here on.
   tabs[0].setAttribute('class', 'tab selected-tab');
   pages[0].setAttribute('class', 'page selected-page');
   tabBlock.selectedTab = tabs[0];
   tabBlock.selectedPage = pages[0];

   for (j = 0; j < tabs.length; j++) {
      tabs[j].matchPage = pages[j];
      tabs[j].control = tabBlock;
      tabs[j].addEventListener('click', function() {
         var control = this.control;
            
         control.selectedTab.setAttribute('class', 'tab');
         control.selectedPage.setAttribute('class', 'page');
         this.setAttribute('class', 'tab selected-tab');
         this.matchPage.setAttribute('class', 'page selected-page');
         control.selectedTab = this;
         control.selectedPage = this.matchPage;
      });
   }
};

window.onload = function() {
   TabsV6.tabify(document.getElementById('block1'));
};