
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
        },
        function() {
            /* Success implies flickr for demo purposes only */
            $('#area').val("Image was successfully sent to flickr!");
            $('#area').css(
                "-moz-transition-property",
                "text-shadow"
            );
            $('#area').css(
                "-moz-transition-duration",
                "3s"
            );
            $('#area').css(
                "text-shadow",
                "1px 1px 2px black, 0 0 1em blue, 0 0 0.2em blue"
            );
        },
        function(errObj) {
            alert("There was an error! ("+ errObj.code +"): " + errObj.message);
        }
    );
}

function onStateChange(type, arg) {
    switch (type) {
        case "session-began":
        case "session-ended":
    }
}

$(window).unload(function() {
    Me.endSession();
});

$(document).ready(function($) {
    Me = window.navigator.service.media;
    App = window.navigator.apps;
    Ctx = document.getElementById('tehcanvas').getContext("2d");
    
    // Preload Image
    var img = new Image();
    img.src = "i/rainbow.png";
    img.onload = function() {
        Ctx.drawImage(img, 472, 322);
    }
    
    // Start preview 
    Me.beginSession(
        {'width':1200,'height':900,'audio':false}, Ctx, onStateChange
    );
    
    // Take a picture
    $('#ohSnap').bind('click', function() {
        var canvas  = $('#canvas');
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
            canvas.hide();
            numbers.remove();
            Me.endSession();
            
            $('#flickr').bind('click', function() {
                sendImage(Me.fetchImage());
            });
            
            flash.show();
            canvas.show();
            
        }, 3000);
        
        // Fade in the redo and flickr buttons, give focus to the textarea
        setTimeout(function(){
            flash.addClass('fadeOut');
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
    $('#redo').bind('click', function() window.location.reload());
});
