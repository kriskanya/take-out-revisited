/* global ajax */
/* jshint unused: false */

(function(){
  'use strict';

  $(document).ready(init);

  function init(){
    $('#order').on('change', '.menu', getMenu);  //on change, run the getMenu function
    $('#add').click(getRow);
    $('#order').on('click', '#delete', deleteRow);

    $('form#order').on('change', 'input', changeText);
    // $('form#order').on('change', '.dish', changeText);
    // $('form#order').on('change', '.menu', changeText);
    $('form#order').on('blur', 'input', changeText);
  }

  function changeText(){
    var total = 0;
    var calories = 0;

    $('.menu-item').toArray().forEach(x=>{

      var quantity = $(x).children('input').val();
      var cost = $(x).children('.dish').find(':selected').attr('data-cost');
      var cals = $(x).children('.dish').find(':selected').attr('data-calories');

      if(quantity > 0){
        total += quantity * cost;
        calories += cals * quantity;
      }
    });

    $('#orderTotal').text(total);
    $('#calories').text(calories);

    $('.calories').val(calories);
    $('.cost').val(total);

  }

  function getMenu(){
    var menu = $(this).val();    //this represents the select
    var next = $(this).next();  //selects the 'next' select box
    ajax(`/dishes/${menu}`, 'get', null, h=>{  //the last one is what we want to get back
      next.empty().append(h);
    });
  }

  function getRow(){
    //this will create a new row
    // ajax(`/orders/addmenu`, 'get', null, m=>{
    //   $('#order').append(m);
    // });

    var item = $('.menu-item:first-child').clone();
    $('#order').append(item);
  }

  function deleteRow(e){
    var menus = $('.menu-item').length;
    if(menus > 1){
      $(this).closest('.menu-item').remove();
    }
    e.preventDefault();  //prevents the button from submitting the form
  }


})();
