
var Me;
var App;
var Ctx;

function sendImage(img) {
    var hdr = "data:image/png;base64,";
    App.invokeService(
        "image.send",
        {
            data: img.slice(hdr.length),
            title: "Rainbooth Image!",
            description: $('#area').val(),
            contentType: "image/png"
        }
    );
}

function onStateChange(type, arg) {
    switch (type) {
        case "session-began":
        case "session-ended":
    }
}

$(document).ready(function($) {
    
    if (!window.navigator.service ||
        !window.navigator.service.media ||
        !window.navigator.apps ||
        !window.navigator.apps.invokeService) {
        alert("The Rainbow and OpenWebApps add-ons are not installed! The app will not work :(");
        return;
    }
    
    // Start preview 
    Me = window.navigator.service.media;
    App = window.navigator.apps;
    Ctx = document.getElementById('tehcanvas').getContext("2d");
    Me.beginSession(
        {'width':800,'height':600,'audio':false}, Ctx, onStateChange
    );
    
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
        setTimeout(function(){
            $('tehcanvas').hide();
            flash.show(0, function() {
                $(this).addClass('fadeOut');  
            });
            numbers.remove();
            
            var data = Me.fetchImage();
            sendImage(data);
        }, 3000);
        
        // Fade in the redo and flickr buttons, give focus to the textarea
        setTimeout(function(){
            $('#redo, #flickr').show(0, function () {
                $(this).addClass('fadeIn').css({ display : 'inline-block' });
            });
            $('#compose').show(0, function() {
                $(this).addClass('fadeIn');
            });
            $('#tehcanvas').show(0, function() {
                $(this).addClass('fadeIn');
            });
            $('#area').focus();
        }, 4000);
    });
    
    // Insert default twitter message 
    // TO DO: limit to 140 characters
    $('#area').val('I just took a photograph using Rainbow by Mozilla Labs!');

});
