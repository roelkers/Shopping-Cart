'use strict'

$(document).ready(function(){

    const user = JSON.parse(Cookies.get('token'))

    $('#cart').submit(function(event){
        event.preventDefault();

        const cartItemUpdate = {};

        $('input').each(function(){
            const itemId = $(this).attr('id');
            const quantity = $(this).val();
            cartItemUpdate[itemId] = quantity;  
        })

        const data = {
            userId : user._id,
            cartItemUpdate : JSON.stringify(cartItemUpdate)
        }

        $.ajax({
            method: 'POST',
            url: '/api/shop/cart',
            data: data
        })
    })
})