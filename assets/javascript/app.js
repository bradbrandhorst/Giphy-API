$(document).ready(function () {
    
    var gifs = ['The Beatles', 'David Bowie', "Bob Dylan", 'Kraftwerk', 'Brian Eno', 'Stereolab', 'Miles Davis', 'Wu Tang Clan'];

    function renderButtons(){ 

        
        $('#artistButtons').empty();

        
        for (var i = 0; i < gifs.length; i++){

            
            var a = $('<button>') 
            a.addClass('gif'); 
            a.attr('data-name', gifs[i]);
            a.addClass('artistBtn');
            a.text(gifs[i]); 
            $('#artistButtons').append(a); 
        } 
    }
    renderButtons();
    

    $('#addArtist').on('click', function(){

        
        var newGif = $('#artist-input').val().trim();

        
        gifs.push(newGif);
        
        
        renderButtons();

        
        return false;
    })

    $('#artistButtons').on('click', '.artistBtn', function() {
        var artist = $(this).data('name');
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + artist + "&api_key=668f0d11cb9841aeb32e33d262cacaa6&limit=10";

        $.ajax({
                url: queryURL,
                method: 'GET'
            })
            .done(function(response) {
               
                console.log(response)

                
                var results = response.data;

                for (var i = 0; i < results.length; i++) {

                   
                    var artistDiv = $('<div>');
                    var p = $('<p>').text("Rating: " + results[i].rating);
                    var artistImage = $('<img>').attr('src', results[i].images.fixed_height_still.url);
                    artistImage.attr('data-still', results[i].images.fixed_height_still.url);
                    artistImage.attr('data-animate', results[i].images.fixed_height.url);
                    artistImage.attr('data-state', 'still');
                    artistImage.addClass('artistGif');

                    artistDiv.append(p);
                    artistDiv.append(artistImage);
                    $('#artists').prepend(artistDiv);
                    
                }

            });
        $('#artists').empty();
    });
      $('#artists').on('click', '.artistGif', function(){
           

            var state = $(this).attr('data-state');
            var animate = $(this).attr('data-animate');
            var still = $(this).attr('data-still');
            console.log(animate);
            

            if (state == 'still') {
                $(this).attr('src', animate);
                $(this).attr('data-state', 'animate');
            } else {
                $(this).attr('src', still);
                $(this).attr('data-state', 'still');
            }
            
        });
});