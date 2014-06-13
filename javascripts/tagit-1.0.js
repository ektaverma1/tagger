function tagIt(text,elementBefore){
	if(text != ""){
		var html = text;
		var tagDiv = document.createElement("div");
		var closeSpan = document.createElement("span");
		closeSpan.innerHTML = 'x';

		tagDiv.className = "tag";
		$(tagDiv).attr('tabindex','0');
		$(tagDiv).html(html); 
		$(tagDiv).append(closeSpan);

		$(tagDiv).bind({
			keyup: function(event){
						var selectedDiv = $(this);
						if(event.keyCode == 8 || event.keyCode == 46){
							selectedDiv.next().focus();
							selectedDiv.remove();
						}
						else if(event.keyCode == 38){
							selectedDiv.prev().focus();
						}
						else if(event.keyCode == 40){
							selectedDiv.next().focus();
						}
					},
			'focus blur': function() {
						  var element = $( this );
						  setTimeout(function() {
						    element.toggleClass( "focused", element.is( ":focus" ) );
						  }, 0 );
						}

		});
		$(closeSpan).bind('click',function(){
			var divToClose = $(this).parent();
			divToClose.remove();
		});
		$(tagDiv).insertBefore(elementBefore);
	}
}