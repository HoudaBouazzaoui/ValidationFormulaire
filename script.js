/**
 * form initialization
 */
function formInit() {
    const form = document.querySelector('form')
    form.reset()
    $(document).ready(function(){
    $("#other-title").hide();
    $("#colors-js-puns").hide();
    $("#credit-card").hide();
    $("#exp-month").hide();
    $("#exp-year").hide();
    $("#paypal").hide();
    $("#bitcoin").hide();
    
    });
    
    // Add activities cost container
    $('<span>').appendTo('.activities').text('Total : ').addClass('cost');
    

}

/**
 * @param  {} evt
 */
var s=0;
function updateAcivitiesRegistration(evt){
    // we can not be present at the same time at two activities
    // Calculate the overall cost of the selected activities
    // update styles to prevent the user from checking a parallel activity
    // The overall cost must be inside a 'span' with the '.cost' css class
    var cheTime= $("input:checkbox:checked").attr("data-day-and-time")
    $("input:checkbox").each(function(){
        if ($(this).attr("data-day-and-time")==cheTime){ 
            $(this).attr('disabled',true);
            $(this).parent().addClass('activity-disabled');
            $("input:checkbox:checked").parent().removeClass('activity-disabled');
        }
    })
    s=s+parseInt($("input:checkbox:checked").attr("data-cost").substring(1, 4));
    $("span").text('Total : '+s).addClass('cost');   
}

/**
 * called when the user selects the other option of Job role select
 */
function updateJobRole() {
    // When the user chooses the 'other' option, 
        if (this.value=="other"){
            $("#other-title").show();
        
    }
    // the 'title' text box should be displayed
    
}

/**
 * Called when the user selects a design theme
 * @param  {} evt
 */
function updateTShirtColor(evt) {
    // depending on the color theme chosen by the user, 
    // display only the corresponding options.
    $("#colors-js-puns").show(evt);
    if(this.value=="JS Puns"){
        $('#color [value="tomato"]').attr('disabled',true);
        $('#color [value="steelblue"]').attr('disabled',true);
        $('#color [value="dimgrey"]').attr('disabled',true);
    }
    else {
        $('#color [value="cornflowerblue"]').attr('disabled',true);
        $('#color [value="darkslategrey"]').attr('disabled',true);
        $('#color [value="gold"]').attr('disabled',true);
    }
    
}

/**
 * Called when the user selects the payment method
 */
function updatePaymentInfo() {
    // depending on the choice of payment type, 
    // the corresponding fields are displayed.
    if (this.value=="Credit Card"){
        $("#credit-card").show();
    }
    else if (this.value=="paypal"){
        $("#paypal").show();
    }
    else {
        $("#bitcoin").show();
    }
    
}

/**
 * validate a specific rule and show error if any
 * @param  {} rule
 */

function validate(rule){
    // Executed for each of the rules in the table given at the end. 
    // Depending on the rule type and if there is an error, 
    // it is displayed in a 'div' tag with the class 'error' 
    // and added before the validated field
    
    if(rule.selector=='#name' || rule.selector=='#mail' || rule.selector=='#cc-num' || rule.selector=='#zip' || rule.selector=='#cvv'){
        if(!rule.regExp.test(document.getElementById(rule.selector.substring(1, 9)).value)){
            $('<div>').insertBefore(rule.selector).text(rule.errorMessage).addClass('error');
        }
    }

    else if (rule.selector=='.activities'){
        if(rule.minValues>$("input:checkbox:checked").length){
            $('<div>').insertBefore(rule.selector).text(rule.errorMessage).addClass('error');
        }
    }
    else {
        if(""==document.getElementById(rule.selector.substring(1, 9)).value){
            $('<div>').insertBefore(rule.selector).text(rule.errorMessage).addClass('error');
        }
    }
}

// no comment

document.addEventListener('DOMContentLoaded', formInit)

$('#title').on('change', updateJobRole)

$('.activities').on('change', '[type=checkbox]', updateAcivitiesRegistration)

$('#design').on('change', updateTShirtColor)

$('#payment').on('change', updatePaymentInfo)

$('form').on('submit', (evt) => {
    evt.preventDefault()
    // remove all previous errors before computing the overall validation
    $('form .error').remove()
    validationRules.forEach(validate)
})

// all validation rules array.  
const validationRules = [
    {
        type: 'regExp',
        selector: '#name', 
        regExp: /^[AZ][AZ',\.\-]+$/i,
        errorMessage: 'This field must contains at least 2 characters'
    },
    {
        type: 'regExp',
        selector: '#mail', 
        regExp: /^[^@]+@[^@]+$/,
        errorMessage: 'Please enter a valid email'
    },
    {
        type: 'regExp',
        selector: '#cc-num', 
        regExp: /^d{13,16}$/,
        errorMessage: 'Please enter a valid credit card Num'
    },
    {
        type: 'regExp',
        selector: '#zip', 
        regExp: /^d{5}$/,
        errorMessage: 'Please enter a valid zip code'
    },
    {
        type: 'regExp',
        selector: '#cvv', 
        regExp: /^d{3}$/,
        errorMessage: 'Please enter a valid CVV'
    },
    {
        type: 'multiCheck',
        tag: 'input:checked',
        selector: '.activities', 
        minValues: 1,
        errorMessage: 'Please check at least one activity'
    },
    {
        type: 'empty',
        selector: '#title', 
        errorMessage: 'Please select a job title'
    },
    {
        type: 'empty',
        selector: '#design', 
        errorMessage: 'Please select a design theme'
    },
    {
        type: 'empty',
        selector: '#colors-js-puns select', 
        errorMessage: 'Please select a color'
    },
    {
        type: 'empty',
        selector: '#exp-month', 
        errorMessage: 'Please select a month'
    },
    {
        type: 'empty',
        selector: '#exp-month', 
        errorMessage: 'Please select an expiration year'
    },
    {
        type: 'empty',
        selector: '#payment', 
        errorMessage: 'Please select a payment method'
    },
    
]

