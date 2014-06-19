(function ( $ ) {

    var MESSAGE = "Please enter valid input. ";
    
    $.fn.tagIt = function(options){
        $.fn.wrapTagger(this);
        $.fn.addTagsInput(this);

        this.keyup(function(event){
            $(this).removeClass('alert');
            $(this).removeAttr('placeholder');

            var input = event.currentTarget;
            
            if(event.keyCode == 13 || event.keyCode == 32)
            {
                var text = $.trim(input.value);
                var isValid = true;
                if(options){
                    isValid = $.fn.validateTag(text,options);
                }
                if(isValid){
                    var tag = $.fn.addTag(text);
                    $(input).before(tag);
                    var tagsValue = $('#tags-input').val();
                    if (tagsValue == "") {
                        tagsValue = text; 
                    }else {
                        tagsValue = tagsValue + "," + text;
                    }
                    $('#tags-input').val(tagsValue);
                }
                else{
                    $(this).addClass('alert');
                    $(this).attr('placeholder',MESSAGE);
                }

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

    $.fn.validateTag = function(text,options){
        if(text != ""){
            if(options.kind == "email"){
                if(options.domains){
                    return $.fn.checkEmail(text,options.domains);    
                }
                else{
                    return $.fn.checkEmail(text);                    
                }
            }
            else if(options.kind == "numeric"){
                MESSAGE = "Invalid input. Only numbers are allowed.";
                return $.isNumeric(text);
            }
            else{
                return true;
            }
        }
        else{
            return false;
        }
    };

    $.fn.checkEmail = function(email,domains) {
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if(filter.test(email)){
            if(domains){
                var matchesFlag = false;
                $.each(domains,function(index,value){
                    if(email.endsWith(value)){
                        matchesFlag = true;
                        // to break each loop
                        return false;
                    }                    
                });
                MESSAGE = matchesFlag ? "" : "Invalid input. Domain is not allowed.";
                return matchesFlag;
            }
            else{
                return true;
            }
        }
        else{
            MESSAGE = "Enter valid email id.";
            return false;
        }
    }

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
                                var tagText = selectedDiv.text();
                                var result = tagText.substring(0, tagText.length-1);
                                var originalValue = $('#tags-input').val();
                                var updatedValue = "";

                                if(originalValue.indexOf(result) == 0){
                                    if(originalValue.indexOf(',') < 0){
                                        updatedValue = originalValue.replace(result, "");    
                                    }
                                    else{
                                        updatedValue = originalValue.replace(result + ',', "");    
                                    }
                                }
                                else{
                                    updatedValue = originalValue.replace(',' + result, "");    
                                }
                                $('#tags-input').val(updatedValue);
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

String.prototype.endsWith = function(suffix) {
    return this.match(suffix+"$") == suffix;
};