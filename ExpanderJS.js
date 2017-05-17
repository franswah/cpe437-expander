$.makeExpander = function(root) {
   var eb, children = root.children(); 
   eb = $('<div></div>').addClass('expander-block').appendTo(root);

   children.each(function() {
      $('<div></div>').addClass('expander')
       .append($('<img class="but" src="up.png"/>').click(function() {
         $(this.parentNode).prev().insertAfter(this.parentNode);
       })).append($('<img class="but" src="down.png"/>').click(function() {
         $(this.parentNode).next().insertBefore(this.parentNode);
      })).append($('<div></div>').addClass('title-block')
      .append($(this).attr('title')).click(function() {
         $(this).toggleClass('expanded').next().toggleClass('hidden');
      })).append($(this).addClass('hidden')).appendTo(eb);
   });
};