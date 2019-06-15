'use strict'

$(document).ready(function(){

    $('#login').submit(function(event){
        event.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/api/users/login',
            data: {
                email: $('#email').val(),
                password: $('#password').val()
            },
            success: function(data){
                $('h1').text('Sucess! You are logged in.')
                Cookies.set('token',data.user)
            },
            error: function(error){
                $('h1').text('Error! Please try again.')
            }
        })
    })
})