'use strict';

let productChecked = {
  anesthesia: {
    checked1: {
      title: 'Superficial',
      products: 'l15'
    },
    checked2: {
      title: 'Deep (Hip, Facts, Sciatic)',
      products: 'c3'
    },
    checked3: {
      title: 'Budget for 2 scanners',
    },
    checked12: 'l7',
    checked123First: 'l15',
    checked123Next: 'c3',
  },
  criticalCare: {
    checked1: {
      title: 'Mostly cardiac',
      products: 'pa'
    },
    checkedNull: 'c3',
  },
  generalSurgery: {
    checked1: {
      title: 'Superficial',
      products: 'l15'
    },
    checked2: {
      title: 'Deep (>5cm)',
      products: 'c3'
    },
    checked3: {
      title: 'Budget for 2 scanners',
    },
    checked12: 'c3',
    checked123First: 'l15',
    checked123Next: 'c3',
  },
};

$(document).ready(function() {
  let $specialtyList = $('#specialty-list');
  let $dropdownContainer = $specialtyList.find('.dropdown-container');
  let $scannersContainer = $('#scanners-container');
  let $scannerItems = $scannersContainer.children('.scanner-item');
  let $filterProducts = $('#filter-products');
  let $step1 = $('.step-1');
  let $step2 = $('.step-2');
  let productName = "";
  let checked1 = $('#products-1');
  let checked2 = $('#products-2');
  let checked3 = $('#products-3');
  let $nextBtn = $('.next-btn');
  let activeCheckbox = "";
  let $checkbox1 = $filterProducts.find('.checkbox-1');
  let $checkbox2 = $filterProducts.find('.checkbox-2');
  let $checkbox3 = $filterProducts.find('.checkbox-3');

  let closeDropdown = () => {
    $dropdownContainer.stop().slideUp();
    $specialtyList.removeClass('open');
  };

  let twoStepActive = () => {
    $step1.removeClass('active');
    $step2.addClass('active');
  };

  let firstStepActive = () => {
    $step1.addClass('active');
    $step2.removeClass('active');
  };

  let scannerEach = (id, id2) => {
    $scannerItems.each(function () {
      let scanner = $(this);
      let scannerId = scanner.attr('data-id');

      if(scannerId === id || scannerId === id2){
        scanner.show();
      } else {
        scanner.hide();
      }
    });
  };

  // показати відповідний товар
  let showChangeItem = (item) => {
    let id = item.attr('data-id');
    let id2 = item.attr('data-id-2');

    scannerEach(id, id2);
  };

  // показати назви вибіро товарів трьох
  let showCheckboxItems = () => {
    $('#label-products-1').text(productChecked[productName].checked1.title);
    $('#label-products-2').text(productChecked[productName].checked2.title);
    $('#label-products-3').text(productChecked[productName].checked3.title);
  };

  // показати назви вибіро товарів одного і приховує немотрібні чекбокси
  let showCheckboxOne = () => {
    $('#label-products-1').text(productChecked[productName].checked1.title);

    $checkbox1.removeClass('active');
    $checkbox2.removeClass('active');
  };

  // відкриття dropdown
  $specialtyList.on("click", '.toggle', function (e) {
    $dropdownContainer.stop().slideToggle();
    $specialtyList.toggleClass('open');
  });

  // показати товари вобору трьох товарів
  let showDetailItems = () => {
    let $checkbox3 = $filterProducts.find('.checkbox-3');
    let id = "";

    $scannerItems.hide();

    if(!checked1.is(":checked") && !checked2.is(":checked") && !checked3.is(":checked")){
      id = productChecked[productName].checked1.products;
      $checkbox3.removeClass('active');
      checked3.attr('checked', false);

      if(!$nextBtn.hasClass('active')){
        $(`.scanner-item[data-id=${id}`).show();
      }
      return;
    }

    if(checked1.is(":checked") && checked2.is(":checked") && checked3.is(":checked")){
      let idFirst = productChecked[productName].checked123First;
      let idNext = productChecked[productName].checked123Next;
      id = productChecked[productName].checked1.products;

      $checkbox3.addClass('active');

      if(!$nextBtn.hasClass('active')) {
        $(`.scanner-item[data-id=${idFirst}`).show();
        $(`.scanner-item[data-id=${idNext}`).show();
      }
    } else if(checked1.is(":checked") && !checked2.is(":checked")){
      id = productChecked[productName].checked1.products;
      $checkbox3.removeClass('active');
      checked3.attr('checked', false);

    } else if(!checked1.is(":checked") && checked2.is(":checked")){
      id = productChecked[productName].checked2.products;
      $checkbox3.removeClass('active');
      checked3.attr('checked', false);

    } else if(checked1.is(":checked") && checked2.is(":checked")){
      id = productChecked[productName].checked12;
      $checkbox3.addClass('active');
    }

    if(!$nextBtn.hasClass('active')){
      $(`.scanner-item[data-id=${id}`).show();
    }
  };

  // показати товари вобору де є один варіант
  let oneShowDetailItems = () => {
    let id = "";
    $scannerItems.hide();

    if(checked1.is(":checked")){
      id = productChecked[productName].checked1.products;
    } else {
      id = productChecked[productName].checkedNull;
    }

    if(!$nextBtn.hasClass('active')){
      $(`.scanner-item[data-id=${id}`).show();
    }
  };

  // зміна назви товара в перемикачі, відображення відповідного вибраного товару
  $specialtyList.on("click", '.item', function (e) {
    let $this = $(this);
    let text = $this.text();
    let $dropdown = $(this).parents('#specialty-list');

    // добавляємо назву продукда для пошуку по обєкту
    productName = $this.attr('data-checked');

    // приховати всі елементи
    $scannerItems.hide();

    // відновлює дефолтне значення елементів
    $nextBtn.addClass('active');
    checked1.attr("checked", false);
    checked2.attr("checked", false);
    checked3.attr("checked", false);
    $checkbox2.addClass("active");
    $checkbox3.removeClass("active");


    // зміна назви товара в перемикачі
    $dropdown.find('.toggle').text(text);

    closeDropdown();

    if($this.hasClass('checkbox-list')){
      // присвоюємо значення для методів вибору
      activeCheckbox = "checkboxList";
      twoStepActive();
      showCheckboxItems();
    } else if($this.hasClass('one-checkbox')) {
      activeCheckbox = "oneCheckbox";
      twoStepActive();
      showCheckboxOne();
    } else {
      firstStepActive();
      showChangeItem($this);
    }
  });

  // клік по кнопці активній кнопці next-btn
  $filterProducts.on('click', '.next-btn.active', function () {
    $(this).removeClass('active');

    if(activeCheckbox === "checkboxList"){
      showDetailItems();
    } else if(activeCheckbox === "oneCheckbox"){
      oneShowDetailItems();
    }
  });

  // перемикання по checkbox
  $filterProducts.on('click', '.checkbox', function () {
    if(activeCheckbox === "checkboxList"){
      showDetailItems();
    } else if(activeCheckbox === "oneCheckbox"){
      oneShowDetailItems();
    }
  });

  // serch
  $('#search-product').on("keyup", function (e) {
    $nextBtn.addClass('active');

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
