$(document).ready(function () {
    console.log("test");
    var callvalue = "test";
    var urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('action') === null) {
        charger();
    }
    $("#add").on("click",function(){
        console.log($("#toItem").val());
        $.ajax({
            type: 'GET',
            url: 'service.php',
            data:{action:"add",name:$("#toItem").val(),member:$('#selmember').val(),callback:callvalue},
            success: function (data) {
                charger();
            },
            error: function () {
                $('#myUL').html('Cette requête AJAX n\'a pas abouti');
            }
        });
    });
    $(document).on("click",".close",function(){
        console.log($(this).attr("data-id"));
        $.ajax({
            type: 'GET',
            url: 'service.php',
            data:{action:"remove",id:$(this).attr("data-id"),callback:callvalue},
            success: function (data) {
                charger();
            },
            error: function () {
                $('#myUL').html('Cette requête AJAX n\'a pas abouti');
            }
        });
    });
    $(document).on("click",".modifBtn",function(){
        console.log($(this).attr("data-id"));
        console.log();
        $.ajax({
            type: 'GET',
            url: 'service.php',
            data:{action:"update",id:$(this).attr("data-id"),name:$(this).parent().find(".name").html(),callback:callvalue},
            success: function (data) {
                charger();
            },
            error: function () {
                $('#myUL').html('Cette requête AJAX n\'a pas abouti');
            }
        });
    });
    function charger() {
        $.ajax({
            type: 'GET',
            url: 'service.php',
            timeout: 3000,
            success: function (data) {
                var Json = JSON.parse(data);
                var html = "<table>";
                for (var i = 0; i < Json.length; i++){
                    html+= "<li class='item' data-id='"+Json[i]["id"]+"'><span class='name' contenteditable='true'>"+Json[i]["name"]+"</span><br><span class='date'>le "+Json[i]["date"]+" pour "+Json[i]["nom"]+"</span><a class='modifBtn fas fa-edit' data-id='"+Json[i]["id"]+"'> </a><div data-id='"+Json[i]["id"]+"' class='close'></div></li>";
                }
                $('#list').html(html);
                chargermembre();
            },
            error: function () {
                $('#myUL').html('Cette requête AJAX n\'a pas abouti');
            }
        });
    }
    function chargermembre() {
        $.ajax({
            type: 'GET',
            url: 'service.php',
            timeout: 3000,
            data:{action:"listemembre",callback:callvalue},
            success: function (data) {
                var Json = JSON.parse(data);
                var html = "<option disabled>Selectionnez le membre</option>";
                for (var i = 0; i < Json.length; i++){
                    html+= "<option value="+Json[i]["id"]+">"+Json[i]["nom"]+"</option>";
                }
                $('#selmember').html(html);
            },
            error: function () {
                $('#myUL').html('Cette requête AJAX n\'a pas abouti');
            }
        });
    }
});