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

  const url = 'http://0.0.0.0:5001/api/v1/status/';

  function getStatus () {
    $.get(url, function(res, status) {
      if (res.status === 'OK') {
        if (!$('div#api_status').hasClass('available')) {
          $('div#api_status').addClass('available');
        }
      } else {
        console.log('Unavailable');
        if ($('div#api_status').hasClass('available')) {
          $('div#api_status').removeClass('available');
        }
      }
    });
  }

  getStatus();

}));
