$( document ).ready(function() {
    console.log( "ready!" );
    $.ajax({
        type: "get",
        url: "https://api.bookfon.com/api/business/update/",
        data: {
            myLuckyNumber: 13
        },
        success: function(response) {
            console.log(response);
        }
    });
});