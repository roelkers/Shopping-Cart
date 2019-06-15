'use strict'

$(document).ready(function(){
    const user = JSON.parse(Cookies.get('token')); 

    $('form').each(function(){

        $(this).submit(function(event){
            event.preventDefault();
            $.ajax({
                method: 'POST',
                url: `/api/shop/cart/${$(this).attr('id')}`,
                data : {
                    userId : user._id,
                    quantity: $(this).find('input').val()
                },
                beforeSend: function (xhr) {   //Include the bearer token in header
                    xhr.setRequestHeader("authorization", 'Token '+ user.token);
                },
                success: function(item){
                    $('#cartMessage').text(`Successfully added ${item.quantity} items.`)
                },
                error: function(error){
                    $('#cartMessage').text(`Error: ${error}`)
                }
            })
        })
    })
})