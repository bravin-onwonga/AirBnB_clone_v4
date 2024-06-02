$(document).ready($(function () {
  const lst = [];

  $('.popover ul li').each(function (index, element) {
    const $input = $(element).find('input');
    if ($input.is(':checked')) {
      const id = $input.data('id');
      lst.push(id);
    } else {
      const id = $input.data('id');
      if (lst.includes(id)) {
        const idx = lst.indexOf(id);

        if (idx !== -1) {
          lst.splice(idx, 1);
        }
      }
    }
  });

  function updateAmenitiesH4 () {
    let str = '';

    $('.popover ul li').each(function (index, element) {
      const $input = $(element).find('input');

      const id = $input.data('id');

      if (lst.includes(id)) {
        const name = $input.data('name');
        if (str.length === 0) {
          str = str + name;
        } else {
          str = str + ', ' + name;
        }
      }
    });

    $('.amenities h4').text(str);
  }

  $('.popover ul li input').on('change', function () {
    const id = $(this).data('id');

    if ($(this).is(':checked')) {
      if (!(lst.includes())) {
        lst.push(id);
      }
    } else {
      const idx = lst.indexOf(id);
      if (idx !== -1) {
        lst.splice(idx, 1);
      }
    }
    updateAmenitiesH4();
  });
  updateAmenitiesH4();
}));
