'use strict'

$(document).ready(function(){

    $('#register').submit(function(event){
        event.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/api/users/register',
            data: {
                email: $('#email').val(),
                password: $('#password').val()
            },
            success: function(data){
                $('h1').text('Sucess! You are now registered.')
                Cookies.set('token',data.user)
            },
            error: function(error){
                $('h1').text('Error! Please try again.')
            }
        })
    })
})