$.makeExpander = function(root) {
   var eb, children = root.children(); 
   if (children.length)
      eb = $('<div></div>').addClass('expander-block').appendTo(root);
   children.each(function() {
      $('<div></div>').addClass('expander')
       .append($('<img class="but" src="up.png"/>').bind('click', function() {
         $(this.parentNode).prev().insertAfter(this.parentNode);
       })).append($('<img class="but" src="down.png"/>')
       .bind('click', function() {
         $(this.parentNode).next().insertBefore(this.parentNode);
      })).append($('<div></div>').addClass('title-block')
      .append($(this).attr('title')).bind('click', function() {
         if ($(this).hasClass('expanded'))
            $(this).removeClass('expanded').next().addClass('hidden');
         else
            $(this).addClass('expanded').next().removeClass('hidden');
      })).append($(this).addClass('expander-content hidden')).appendTo(eb);
   });
};