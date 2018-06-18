$(document).ready(function(){

    $(".car").on('click', loadModalInfo);
    $(".modal__thumbnail").on('click', changeImage);
    
    function changeImage(){
        var url = $(this).attr("src");

        $("#modal-image").attr("src", url);
    }

    function loadModalInfo(){
        
        var id = $(this).attr("data-id"),
            url = "/api/Modelos/" + id;

            console.log(url);

        $.ajax({
            url: url,
            method: "GET",
            dataType: "json",
            success: function(modelData){

                var model = modelData.data[0];

                console.log(model);

                var images = model.imagenes.urls;
                var galleryImages = $(".modal__thumbnail");

                console.log(model);
                
                //Setting main current image
                $("#modal-image").attr("src", images[0]);

                //Setting images for each of the thumbs
                $.each(galleryImages, function(key, value) {
                    $(value).attr("src", images.pop());
                });

                //Modal info
                $("#modal-title").text(model.nombre) +".";
                var description = model.descripcion.substr(0, 150);

                $("#modal-description").text(description);
                /*
                $("#feature-traccion").text(model.variantes[0].caracteristicas.traccion);
                $("#feature-transmision").text(model.variantes[0].caracteristicas.transmision);
                $("#feature-potencia").text(model.variantes[0].caracteristicas.potencia);
                $("#feature-rendimiento").text(model.variantes[0].caracteristicas.rendimiento);*/
                
                var seeMoreUrl = "/modelo/" + model.nombre + "/" + model._id;

                console.log(seeMoreUrl);
                
                $("#btn-see-more").attr("href", seeMoreUrl);

            }

        });
    }

});