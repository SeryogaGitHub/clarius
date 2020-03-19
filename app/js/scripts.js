'use strict';

let productChecked = {
  anesthesia: {
    checked1: ['l15'],
    checked2: ['c3'],
    checked12: ['l7'],
    checked123: ['l15, c3'],
  }
};

$(document).ready(function() {
  let $specialtyList = $('#specialty-list');
  let $dropdownContainer = $specialtyList.find('.dropdown-container');
  let $scannersContainer = $('#scanners-container');
  let $scannerItems = $scannersContainer.children('.scanner-item');

  let closeDropdown = () => {
    $dropdownContainer.stop().slideUp();
    $specialtyList.removeClass('open');
  };

  // відкриття dropdown
  $('#specialty-list .toggle').on("click", function (e) {
    $dropdownContainer.stop().slideToggle();
    $specialtyList.toggleClass('open');
  });

  // показати відповідний товар
  let showChangeItem = (item) => {
    let id = item.attr('data-id');

    $scannerItems.each(function () {
      let scanner = $(this);
      let scannerId = scanner.attr('data-id');

      if(scannerId === id){
        scanner.show();
      } else {
        scanner.hide();
      }
    });
  };

  // показати редагування вибіру товарів
  let showCheckboxItems = (item) => {
    let checkbox = item.attr('data-checked');

    $('.step-1').removeClass('active');
    $('.step-2').addClass('active');
  };

  // змінана назви товара в кнопці
  $('#specialty-list .item').on("click", function (e) {
    let $this = $(this);
    let text = $this.text();
    let $dropdown = $(this).parents('#specialty-list');

    $dropdown.find('.toggle').text(text);

    closeDropdown();

    if($this.hasClass('checkbox')){
      showCheckboxItems($this);
    } else {
      showChangeItem($this);
    }
  });

  $('#filter-products').on('mouseup', function () {
    let checked1 = $(this).find('#products-1');
    console.log(checked1.prop("checked"));
    console.log(checked1);
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
