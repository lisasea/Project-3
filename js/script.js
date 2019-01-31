/********************
 * Global Variables *
 *******************/
    $('#name').focus(); //focus Name text field on page load
    $('#other').hide(); //hide "Other" Job Role 
    $('#other-title').hide(); //hide "Other" Job Role 
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
        $('#other').hide();
    }
 });
 
 /***********
 * T-Shirt  *
 ***********/
$('#design').change(function() { // displays only the color options that match the design selected
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
    let nameValue = $('#name').val();
    if (isValidName(nameValue)== false){
        $('#name').css('border-color', 'red');
        setTimeout(function(){alert('Error! Please enter your name.');}, 3000);//name input. give error message an disable submit button');
    } 

    let emailValue = $('#mail').val();
    if (isValidEmail(emailValue)== false){
        $('#mail').css('border-color', 'red');
        setTimeout(function(){alert('Error! Please enter valid email.');}, 1500);
    } 

    if (totalCost === 0) { 
        alert('Error! You must select at least 1 activity. Please make your selection.');
    }

    let cardNumber = $('#cc-num').val();
    let zip = $('#zip').val();
    let cvv = $('#cvv').val();

    if (payMethod.val() === 'credit card') {

        if (isValidCardNumber(cardNumber)== false){
            $('#cc-num').css('border-color', 'red');
            setTimeout(function(){alert('Error! CC# is invalid. Must be 13-16 digits long.');}, 1500);
            }  

        else if (isValidZip(zip)== false){
            $('#zip').css('border-color', 'red');
            setTimeout(function(){alert('Error! Your zip code is invalid. Must be 5 digits long.');}, 1500);
            } 
            
        else if (isValidCvv(cvv)== false) {
            $('#cvv').css('border-color', 'red');
            setTimeout(function(){alert('Error! Your cvv is invalid. Must be 3 digits long.');}, 1500);
            }
    };
 
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
    e.preventDefault();
    
    validateForm();
  });

  // https://github.com/lisasea/Project-3/blob/master/js/script.js

// if not validate form (any false) 
//e.preventDefault();

//activity if totalCost === 0 // then error you must select


//const emailInput = document.getEmailbyId('mail');
////const nameValue = $('#name').val();

//console.log('isValidEmail function ran');



/*
$(document).ready(function() {
$('.submit').click(function() { // why don't I need another } ? // function(event?)
    validateForm();
});

function validateForm() {
    let validName = /^[A-Za-z]+$/; //const?
    //let validNumber = /^[0-9]+$/;  //const?
    let validEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/; //const?
};
// if validateitem(x) = validTest(x)
// then item is valid
// in case of paying with CC check the addition 3 validation 
    //paying w/ CC? - 13-16 digits/   which is \d{13,16}
    //zip 5 digits
    //cvv 3 digits
// else = failed test
// alert error and valid requirement message
// and disable submit button

const validName = () => {
    let validN = /^[A-Za-z\s]+$/;
}

console.log('first if'); //to test code
console.log('first else'); // to test code

$('button').on('click', function(e) {
    e.preventDefault();
    
    validateForm();
  });
/*
meta function
tests validity: name; email; activity; paying w/ CC? - 13-16 digits/zip 5 digits/cvv 3 digits

or

function for each validity test and then

if validName || validNumber || validEmail || validActivity || validCcInfo = false
    alert error message // Error.  ____ is invalid.  Please enter...
    disable submit button //e.preventDefault();
*/

//if 

// else
// alert "Error! Please enter Name using letters only."
// disable submit

//if

//else
// alert "Error! Please enter valid email."
// disable submit

//if
//function isValidActivity() {

//};
///else 
// alert "Error! Please choose at least one activity."
// disable submit

//if
//function isValidCcInfo(creditcard) {
  //if payment === credit-card
 // function isValidLength () {
 //    return /\d{13,16}/.test(input.length);
 // } else {
   // alert "Error! Please enter a valid credirt card number between 13 and 16 digits long."
// disable submit
 // }
  //if 
  //function isValidZip(zip) {
  //    return /\d{5}/.test(zip);
  //} //else {
    // alert "Error! Please enter a valid zip code 5 digits long."
 // disable submit



/*
//essentially making a meta function that checks that each individual part does not 
have an error . 
//don't check the error on the cc if it is not the form of payment.
Keep in mind how if else statements work when designing your validation. 
Only the first matching condition is going to be acted upon. As you will see when you 
add the console statements, if the user tries to submit the form with the name field
left blank it is the if else statement that currently just returns false that is
triggered not the else statement that adds the error message.

essentially making a meta function that checks that each individual part does not 
have an error . 
//don't check the error on the cc if it is not the form of payment.
Keep in mind how if else statements work when designing your validation. 
Only the first matching condition is going to be acted upon. As you will see when you 
add the console statements, if the user tries to submit the form with the name field
left blank it is the if else statement that currently just returns false that is
triggered not the else statement that adds the error message.
*/
/*
else all is valid
    submit data
    alert "Your information has been successfully submitted! Thank you."

or

if validName && validNumber && validEmail && validActivity && validCcInfo = true
    submit data
    alert "Your information has been successfully submitted! Thank you."
else 
    alert error message // "Error.  ____ is invalid.  Please enter..."
    disable submit button //e.preventDefault();
*/

//error message if error exists
// disable submit button
// name field can not be blank
// email must be valid email
// activities - must have checked at least 1 activity
// if paying with CC make sure CC # is between 13-16 digits long
// if paying with CC zipcode - 5 digit number
// if paying with CC cvv - only accept a 3 digit number



/*
If any of the following validation errors exist, prevent the user from submitting the form:
Name field can't be blank.
Email field must be a validly formatted e-mail address (you don't have to check that it's a real e-mail address, just that it's formatted like one: dave@teamtreehouse.com for example.
User must select at least one checkbox under the "Register for Activities" section of the form.
If the selected payment option is "Credit Card," make sure the user has supplied a Credit Card number, a Zip Code, and a 3 number CVV value before the form can be submitted.
Credit Card field should only accept a number between 13 and 16 digits.
The Zip Code field should accept a 5-digit number.
The CVV should only accept a number that is exactly 3 digits long.
NOTE: Don't rely on the built in HTML5 validation by adding the required attribute to your DOM elements. You need to actually create your own custom validation checks and error messages.

NOTE: Avoid using snippets or plugins for this project. To get the most out of the experience, you should be writing all of your own code for your own custom validation.

NOTE: Make sure your validation is only validating Credit Card info if Credit Card is the selected payment method.

Form validation messages
Provide some kind of indication when there’s a validation error. The field’s borders could turn red, for example, or even better for the user would be if a red text message appeared near the field.
The following fields should have some obvious form of an error indication:
Name field
Email field
Register for Activities checkboxes (at least one must be selected)
Credit Card number (Only if Credit Card payment method is selected)
Zip Code (Only if Credit Card payment method is selected)
CVV (Only if Credit Card payment method is selected)
Note: Error messages or indications should not be visible by default. They should only show upon submission, or after some user interaction.

Form works without JavaScript - Progressive Enhancement
The user should still have access to all form fields and payment information if JS isn't working for whatever reason. For example, when the JS is removed from the project:
The “Other” text field under the "Job Role" section should be visible
All information for Bitcoin, PayPal or Credit Card payments should be visible.
CSS styles
It is not required, but you are encouraged to experiment with things like the color, background color, font, transitions, animations, box shadows and text shadows. So dive into the CSS file and see if you can make this project your own with a few adjustments to the styles. But the basic layout and positioning of elements should not be changed.
Add good code comments
Cross-Browser consistency
Get in the habit of checking your project in multiple browsers. But to pass, the project only needs to work in Chrome.
Review the "How you'll be graded" section.
Check out the "How you'll be graded" section, located above, next to the instructions tab, just below the project title. This section lists specifically what will be considered and checked when your project is being reviewed, and your project grade is being determined.
Quality Assurance and the Student Project Submission Checklist
Web development work bears the need for a high level of precision. We're talking about an industry that measures performance by the pixel, kilobyte, and millisecond. So it's very important to pay attention to the details and take the time to do your own thorough quality assurance testing on all your own projects. Before you submit your project for review, please do be sure to check off all of the items on the Student Project Submission Checklist. The checklist is designed to help make sure you’ve met the grading requirements, that your project is complete and ready to be submitted, and that you are developing good habits as a developer!
NOTE: Sometimes just getting started is the hardest part.

It's not uncommon to feel overwhelmed and confused when beginning to build a project. If you feel this way, try not to get too focused on seeing the project as a whole. Instead, just take it one small piece at a time. After familiarizing yourself with the instructions, start by downloading the source files, and creating a GitHub repo to store them. That is always a great place to start. Then just start tackling the project one small step at a time. Remember, your first attempt isn't likely to be perfect, and it doesn't have to be. As coders, we focus first on creating something that works. And then we refactor and optimize on later iterations.
NOTE: Seeking assistance

If you're feeling stuck or having trouble with this project
Reach out to the team on Slack.
Review material in the unit.
Practice your Google skills by finding different ways to ask the questions you have, paying close attention to the sort of results you get back depending on how your questions are worded.
NOTE: What you submit is what will get reviewed.

When you submit your project, a snapshot is taken of your repository, and that is what the reviewer will see. Consequently, any changes you make to your repo after you submit will not be seen by the reviewer. So before you submit, it's a smart idea to do a final check to make sure everything in your repo is exactly what you want to submit*/