jQuery(document).ready( function($) {
    $("#selectRole").change(function(){
        //alert($(this).val());
        $.ajax({
            type: "POST",
            data: "role=" + $(this).val() + "&action=getUser_action",
            url: ajaxurl,
            beforeSend: function () {
                $("#abcde").html('aaabb');
                //alert('hhhh');
            },
            success: function ($data) {
                //alert("nnnnn");
                $("#selectUser").html($data);
                if ($data){
                    $("#selectUser").html($data);
                }
            }
        });
    });
});