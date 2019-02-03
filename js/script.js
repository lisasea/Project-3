/********************
 * Global Variables *
 *******************/
    $('#name').focus(); //focus Name text field on page load
    $('#other').hide(); //hide "Other" Job Role 
    $('#color').hide(); //hide color menu for t-shirts on load
    const payMethod = $('#payment'); //used in "Payment" section below

 /***********
 * Job Role *
 ***********/
 $('#title').on('change', function() { //text field for "other" option in Job Role section 
    if($('#title').val() === 'other') {
        $('#other').slideDown(); 
        $('#other').focus();
        $('#other-title').html(); 
    }else {
        $('#other').slideUp();
    }
 });
 
 /***********
 * T-Shirt  *
 ***********/
$('#design').change(function() { // displays only the color options that match the design selected
    $('#color').show();
    if ($('#design').val() === 'js puns') {
        $('#colors-js-puns').show();
        $('#color option[value="cornflowerblue"]').show().attr('selected', '');
        $('#color option[value="darkslategrey"]').show();
        $('#color option[value="gold"]').show();
        $('#color option[value="tomato"]').hide().removeAttr('selected');
        $('#color option[value="steelblue"]').hide();
        $('#color option[value="dimgrey"]').hide();

    } else if ($('#design').val() === 'heart js') {
        $('#colors-js-puns').show();
        $('#color option[value="cornflowerblue"]').hide().removeAttr('selected');
        $('#color option[value="darkslategrey"]').hide();
        $('#color option[value="gold"]').hide();
        $('#color option[value="tomato"]').show().attr('selected', '');
        $('#color option[value="steelblue"]').show();
        $('#color option[value="dimgrey"]').show();

    } else {
        $('#colors-js-puns').hide();
    };
});

 /*************
 * Activities *
 *************/
$('.activities input').on('change', function (){ //This function disables activities with competing time-slot 
    if ($('input[name="js-frameworks"]').prop('checked')) {
            $('input[name="express"]').attr('disabled', true); 
            $('input[name="express"]').parent().addClass('disable');
    } else {
            $('input[name="express"]').removeAttr('disabled');
            $('input[name="express"]').parent().removeClass('disable');
    } 
    if ($('input[name="express"]').prop('checked')) {
            $('input[name="js-frameworks"]').attr('disabled', true); 
            $('input[name="js-frameworks"]').parent().addClass('disable'); 
    } else {
            $('input[name="js-frameworks"]').removeAttr('disabled');
            $('input[name="js-frameworks"]').parent().removeClass('disable');
    }
    if ($('input[name="js-libs"]').prop('checked')) {
            $('input[name="node"]').attr('disabled', true); 
            $('input[name="node"]').parent().addClass('disable'); 
        $('input[name="node"]').parent().addClass('disable'); 
            $('input[name="node"]').parent().addClass('disable'); 
    } else {
            $('input[name="node"]').removeAttr('disabled');
            $('input[name="node"]').parent().removeClass('disable');
    }
    if ($('input[name="node"]').prop('checked')) {
            $('input[name="js-libs"]').attr('disabled', true); 
            $('input[name="js-libs"]').parent().addClass('disable'); 
    } else {
            $('input[name="js-libs"]').removeAttr('disabled');
            $('input[name="js-libs"]').parent().removeClass('disable'); 
    }
});


const activityOptions = $('.activities input'); //create space to track total cost of activities chosen
let totalCost = 0;
let costDiv = $('<div id="costDiv"><span>Total Cost $'+ totalCost + '</span></div>');
$('.activities').append(costDiv);
 
$('.activities').on('change', function(event){ //track total cost of activities chosen
    const activityString = $(event.target).parent().text(); //the parent is the label and it contains the text we are targetiong the last 3 characters which is the price
    const pricePerActivity = parseInt(activityString.substring(activityString.length-3));
    if ($(event.target).is(':checked')) {
        totalCost += pricePerActivity;
    } else { 
        totalCost -= pricePerActivity;
    }
$(costDiv).html('<div id="costDiv"><span>Total Cost $'+ totalCost + '</span></div>');
});


 /**********
 * Payment *
 **********/

$('#credit-card').next().addClass('paypal'); //make it possible to select paypal and bitcoin
$('#credit-card').next().next().addClass('bitcoin');

$('#credit-card').show();// make credit card the default payment option by hiding other options 
$('.paypal').hide(); 
$('.bitcoin').hide();
$('#payment option[value="select_method"]').hide();

$(payMethod).on('change', function(event){ //once a payment method has been chosen hide the other options
    $('#payment option[value="select_method"]').hide();
    if (payMethod.val() === 'credit card') { 
        $('#credit-card').show();
        $('.paypal').hide();
        $('.bitcoin').hide();
    } else if (payMethod.val() === 'paypal') {
        $('.paypal').show();
        $('.bitcoin').hide();
        $('#credit-card').hide();
    } else if (payMethod.val() === 'bitcoin') {
        $('.bitcoin').show();
        $('.paypal').hide();
        $('#credit-card').hide();
    }
}); 

 /******************
 * Form Validation *
 ******************///worked together with Natia and Indasia

function validateForm() { //function to make sure inputs are valid before submit can be executed
    let isValid = true;
    let nameValue = $('#name').val();
    if (isValidName(nameValue)== false){
        isValid = false;
        $('#name').css('border-color', 'red');
        $('#name').attr('placeholder', 'Error! Please enter your name using only letters.');
    } 

    let emailValue = $('#mail').val();
    if (isValidEmail(emailValue)== false){
        isValid = false;
        $('#mail').css('border-color', 'red');
        $('#mail').attr('placeholder', 'Error! Please enter valid email.');
    } 

    if (totalCost === 0) { 
        isValid = false;
        $('.activities legend').css('color', 'red');
        $('.activities legend').text('Error! You must select at least 1 activity. Please make your selection.');
    }

    let cardNumber = $('#cc-num').val();
    let zip = $('#zip').val();
    let cvv = $('#cvv').val();

    if (payMethod.val() === 'credit card') {

        if (isValidCardNumber(cardNumber)== false){
            isValid = false;
            $('#cc-num').css('border-color', 'red');
            $('#cc-num').attr('placeholder', 'Error! Enter 13-16 digit CC #.');
            }  

        else if (isValidZip(zip)== false){
            isValid = false;
            $('#zip').css('border-color', 'red');
            $('#zip').attr('placeholder', 'Error! Enter a 5 digit zip code.');
            } 
            
        else if (isValidCvv(cvv)== false) {
            isValid = false;
            $('#cvv').css('border-color', 'red');
            $('#cvv').attr('placeholder', 'Error! Enter 3 digit CVV #.');
            }
    };
    return isValid;
};

function isValidName(nameValue) { //test to see the 'Name' input is letters only
    return /^[a-zA-Z][a-zA-Z\s]+$/i.test(nameValue); 
};


function isValidEmail(emailValue) {	//test to see email is valid. This regex taken from https://emailregex.com/
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emailValue);
};

function isValidCardNumber(cardNumber) { //test to see the credit card number provided is 13-16 digits long
    return /^\d{13,16}D*$/.test(cardNumber);
}

function isValidZip(zip) { //test to see the zip code provided is 5 digits long
    return /^\d{5}$/.test(zip);
    console.log(zip);
}

function isValidCvv(cvv) { //test to see the cvv number provided is 3 digits long
    return /^\d{3}$/.test(cvv);
}

$('button').on('click', function(e) { //when "Submit" button is pushed validate form first
    if(!validateForm()) { //!validateForm means "not validateForm"
    alert('Please correct errors and resubmit.');
    e.preventDefault();
    }
});
