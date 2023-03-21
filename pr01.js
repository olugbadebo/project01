$(document).ready(function () {
    $(".input-group.date").datepicker({
      autoclose: true,
      format: "mm/dd/yyyy"
    });
  
    $(".input-group.date, #adults").on("change", function () {
      var startdate = moment($("#checkin").val(), "MM-DD-YYYY");
      var enddate = moment($("#checkout").val(), "MM-DD-YYYY");
      var daydif = enddate.diff(startdate, "days");
      $("#days").val(daydif);
      var numadults = $("#adults").val();
      $("#cost").val(150 * daydif * numadults);
    });
  
    $("#resetbutton").on("click", function () {
      $("#pj1")[0].reset();
      toastr["info"]("All fields were successfully cleared ", "Reset Succeeded");
    });
  
    $("#pj1").submit(function () {
      var isFormValid = true;
  
      $(".required-field").each(function () {
        if (!$(this).val()) {
          $(this).addClass("error");
          isFormValid = false;
          var name = $(this).attr("name");
          toastr["error"](name + " is missing");
        } else {
          $(this).removeClass("error");
        }
      });
  
      if (!$("#cost").val() || isNaN($("#cost").val())) {
        isFormValid = false;
        toastr["error"]("No cost was calculate");
      }
  
      if ($("#cost").val() < 0) {
        isFormValid = false;
        toastr["error"]("Cost is negative");
      }
  
      if (isFormValid) {
        toastr["success"]("Form was successfully submitted");
      }
  
      return isFormValid;
    });
  });
  