$(function() {
  $("form[name='donationform']").validate({
    // Specify validation rules
    rules: {
      // The key name on the left side is the name attribute
      // of an input field. Validation rules are defined
      // on the right side
      donorTitle: "required",
      donorFirstName: "required",
      donorLastName: "required",
      donorAddress: "required",
      donationValue: "required",
      donorConsent: "required",
      donorEmail: {
        required: true,
        email: true
      },
      donorPassword: {maxlength:0}
    },
    // Specify validation error messages
    messages: {
      donorFirstName: "Please enter your firstname",
      donorLastName: "Please enter your lastname",
      donorEmail: "Please enter a valid email address"
    },
    // Make sure the form is submitted to the destination defined
    // in the "action" attribute of the form when valid
    submitHandler: function(form) {
      sendEmail();
      submitFromValidator();
    }
  });
});
