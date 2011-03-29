
function onStateChange(type, arg) {
    switch (type) {
        case "session-began":
        case "session-ended":
    }
}

$(document).ready(function($) {
    
    if (!window.navigator.service || !window.navigator.service.media) {
        alert("Rainbow is not installed! The app will not work :(");
        return;
    }
    
    // Start preview after couple seconds?
    var Me;
    var ctx;
    setTimeout(function() {
        Me = window.navigator.service.media;
        ctx = document.getElementById('tehcanvas').getContext("2d");
        Me.beginSession(
            {'width':800,'height':600,'audio':false}, ctx, onStateChange
        );
    }, 500);
    
    // Take a picture
    $('#ohSnap').bind('click', function() {
        
        var numbers = $('#numbers');
        var dots    = $('#dots');
        var flash   = $('#flash');
        var ohSnap  = $(this);
        
        // Display the countdown and remove the dotted overlay
        numbers.show();
        dots.addClass('fadeOut');
        
        // Show and fadeout individual numbers 1 second apart
        numbers.children().each(function(i) {
            var e = $(this);
            setTimeout(function(){
                e.show(0, function() {
                    $(this).addClass('fadeOut');  
                });
            }, i*1000);
        });
        
        // Fade out the shutter button
        ohSnap.addClass('fadeOut');
        setTimeout(function(){
            ohSnap.remove();
        }, 1000);    
            
        // Display a camera flash after the countdown (3 second delay)
        // TO DO: actually capture the image at this time
        setTimeout(function(){
            flash.show(0, function() {
                $(this).addClass('fadeOut');  
            });
            numbers.remove();
        }, 3000);
        
        // Fade in the redo and tweet buttons, give focus to the textarea
        setTimeout(function(){
            $('#redo, #flickr').show(0, function () {
                $(this).addClass('fadeIn').css({ display : 'inline-block' });
            });
            $('#compose').show(0, function() {
                $(this).addClass('fadeIn');
            });
            $('#area').focus();
        }, 4000);
    });
    
    // Insert default twitter message 
    // TO DO: limit to 140 characters
    $('#area').val('I just took a photograph using Rainbow by Mozilla Labs!');

});
