(function ( $ ) {
    
    $.fn.tagIt = function(){
        $.fn.wrapTagger(this);

        $.fn.addTagsInput(this);

        this.keyup(function(event){
            var input = event.currentTarget;
            
            if(event.keyCode == 13 || event.keyCode == 32)
            {
                var text = $.trim(input.value);
                var tag = $.fn.addTag(text);
                $(input).before(tag);
                var tagsValue = $('#tags-input').val();
                if (tagsValue == "") {
                    tagsValue = text; 
                }else {
                    tagsValue = tagsValue + "," + text;
                }
                $('#tags-input').val(tagsValue);
                input.value = '';
                input.focus(); 
            }
            if(event.keyCode == 38){
                $(input).prev().focus();
            }
        });
    };

    $.fn.wrapTagger = function(element){
        var tagsWrapper = document.createElement("div");
        tagsWrapper.className = "tags";
        element.wrap(tagsWrapper);
    };

    $.fn.addTagsInput = function(element){
        var tagsInput = document.createElement("input");
        tagsInput.setAttribute("type", "hidden");
        tagsInput.setAttribute("value", "");
        tagsInput.setAttribute("name", "tags-input");
        tagsInput.setAttribute("id","tags-input");
        $(element).before(tagsInput);
    };

    $.fn.addTag = function(text){
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
                        return tagDiv;
                    }
                };
 
}( jQuery ));