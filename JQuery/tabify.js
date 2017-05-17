var TabsV8 = {};

TabsV8.makeDiv = function(classAttr) {
   return $('<div></div>').addClass(classAttr);
}

TabsV8.tabify = function(root) {
   var children = root.children(); 
   var tabBlock, rowDiv, margin;

   tabBlock = TabsV8.makeDiv('tab-block').append(children).appendTo(root);
   rowDiv = TabsV8.makeDiv('row').prependTo(tabBlock);
   
   margin = rowDiv.outerWidth();
   children.each(function(p){
      var page = $(this).addClass('page');
      var tab = TabsV8.makeDiv('tab');
      
      tab.append(page.attr('title') || "Page " + (p+1)).appendTo(rowDiv);

      margin -= tab.outerWidth();
      if (margin < 0) {
         rowDiv.addClass('back-row');
         rowDiv = TabsV8.makeDiv('row').insertAfter(rowDiv).append(tab);
         margin = rowDiv.outerWidth() - tab.outerWidth();  
      }
       
      tab.matchPage = page;
      tab.control = tabBlock;
      tab[0].$ = tab;
      tab.bind('click', function() {
         var $this = this.$;
            
         $this.control.selectedTab.removeClass('selected-tab').matchPage
          .removeClass('selected-page');
         $this.addClass('selected-tab').matchPage.addClass('selected-page');
         $this.control.selectedTab = $this;
      });
   });
   tabBlock.selectedTab = tabBlock.find('div.row div.tab').first()
    .addClass('selected-tab')[0].$;
   tabBlock.selectedTab.matchPage.addClass('selected-page');
};

$(function() {
   TabsV8.tabify($('#block1'));
});