(function() {
  'use strict';
  $(document).ready(init);
  function init() {
    $('#order').on('change', '.menu', getMenu);
    $('#add').click(getRow);
    $('#order').on('click', '#delete', deleteRow);
    $('form#order').on('change', 'input', changeText);
    $('form#order').on('blur', 'input', changeText);
  }
  function changeText() {
    var total = 0;
    var calories = 0;
    $('.menu-item').toArray().forEach((function(x) {
      var quantity = $(x).children('input').val();
      var cost = $(x).children('.dish').find(':selected').attr('data-cost');
      var cals = $(x).children('.dish').find(':selected').attr('data-calories');
      if (quantity > 0) {
        total += quantity * cost;
        calories += cals * quantity;
      }
    }));
    $('#orderTotal').text(total);
    $('#calories').text(calories);
    $('.calories').val(calories);
    $('.cost').val(total);
  }
  function getMenu() {
    var menu = $(this).val();
    var next = $(this).next();
    ajax(("/dishes/" + menu), 'get', null, (function(h) {
      next.empty().append(h);
    }));
  }
  function getRow() {
    var item = $('.menu-item:first-child').clone();
    $('#order').append(item);
  }
  function deleteRow(e) {
    var menus = $('.menu-item').length;
    if (menus > 1) {
      $(this).closest('.menu-item').remove();
    }
    e.preventDefault();
  }
})();

//# sourceMappingURL=orders.map
