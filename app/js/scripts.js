'use strict';

$(document).ready(function() {
  let $specialtyList = $('#specialty-list');
  let $dropdownContainer = $specialtyList.find('.dropdown-container');

  let closeDropdown = () => {
    $dropdownContainer.stop().slideUp();
    $specialtyList.removeClass('active');
  };

  // відкриття dropdown
  $('#specialty-list .toggle').on("click", function (e) {
    $dropdownContainer.stop().slideToggle();
    $specialtyList.toggleClass('active');
  });

  // змінана назви товара в кнопці
  $('#specialty-list .item').on("click", function (e) {
    let $this = $(this);
    let text = $this.text();
    let $dropdown = $(this).parents('#specialty-list');

    closeDropdown();
    $dropdown.find('.toggle').text(text);
  });

  // serch
  $('#search-product').on("keyup", function (e) {
    let val = $(this).val();
    val = val.toLowerCase();

    $('#specialty-list .item').each(function () {
      let $this = $(this);
      let text = $(this).text();
      text = text.toLowerCase();

      if(!text.match(val)){
        $this.hide();
      } else {
        $this.show();
      }
    });
  });

  // закриття dropdown в не поля
  $(document).mouseup(function (e){
    if (!$specialtyList.is(e.target)
      && $specialtyList.has(e.target).length === 0) {
      closeDropdown();
    }
  });
});
