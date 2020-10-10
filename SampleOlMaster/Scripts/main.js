var _Map, _Draw, _Source, _Layer, pDatas ;

InitializeMap = () => {
    _Source = new ol.source.Vector({
        wrapX: false
    });
    _Layer = new ol.layer.Vector({
        source: _Source
    });
    _Map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            }),
            _Layer
        ],
        view: new ol.View({
            center: [3875337.272593909, 4673762.797695817],
            zoom: 7
        })
    });
}
InitializeMap = (iconFeatures) => {

    _Source = new ol.source.Vector({
        wrapX: false,
        features: iconFeatures

    });

    _Layer = new ol.layer.Vector({
        source: _Source

    });
    _Map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            }),
            _Layer
        ],
        view: new ol.View({
            center: [3875337.272593909, 4673762.797695817],
            zoom: 7
        })
    });
}
AddInteraction = () => {
    _Draw = new ol.interaction.Draw({
        source: _Source,
        type: "Point"
    });
    _Map.addInteraction(_Draw);
    _Draw.setActive(false);
    _Draw.on(
        "drawend",
        (_event) => {
            //console.log(_event.feature.getGeometry().getCoordinates());
            jsPanel.modal.create({
                theme: 'info filleddark',
                headerTitle: '<h4>User Info</h4>',
                content: '<div style="padding:10px;" class="form-group"><p><b>Name:<label id="message"></label></b></p><input type="text" class="form-control" id="name" placeholder="Write name." name="name">Number :<input type="number" minlength="1" class="form-control" id="number" placeholder="Write number." name="number"></div><div style="padding:10px;" class="form-group"><button id="btnSave" type="submit" style="margin:center;" class="btn btn-default">Save</button></div>',
            });

            $("#btnSave").click(
                function () {
                    pDatas = {

                        Name: document.getElementById("name").value,
                        Number: document.getElementById("number").value,
                        Coordinates: _event.feature.getGeometry().getCoordinates()
                    };
                    if (pDatas.Name != "" && pDatas.Number != "") {
                        $.ajax({
                            type: 'Post',
                            url: '/Home/PostAllSave/',
                            data: JSON.stringify({ userData: pDatas }),
                            contentType: 'application/json; charset=utf-8',
                            dataType: 'json',
                            success: function (data) {
                                alert("Success!");
                                location.reload(true);
                            },
                            error: function (xhr, ajaxOptions, thrownError) {
                                alert('error; ' + eval(thrownError));

                            }

                        });
                    } else {
                        alert("Name and Number is not null");
                    }
                });
            _Draw.setActive(false);
        });
}
AddPoint = () => {
    _Draw.setActive(true);
}
QueryPoint = () => {
    $('#table_id').DataTable(
        {    
            "ajax":
            {
                "url": "/Home/GetAllData/",
                "type": "POST",
                "dataType": "json",
                "dataSrc": function (json) {                 
                    jsonObj = $.parseJSON(json.data)                 
                    return jsonObj.data;
                    
                }
            },
            "aoColumns":
                [
                    { "mDataProp": "Name" },
                    { "mDataProp": "Number" },
                    { "mDataProp": "Coordinates" }
                                 
                ],
          
        });  
}






