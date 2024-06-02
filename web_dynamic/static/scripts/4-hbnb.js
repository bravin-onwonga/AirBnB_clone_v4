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
    getPlaces();
  });
  updateAmenitiesH4();

  const url = 'http://0.0.0.0:5001/api/v1/status/';

  function getStatus () {
    $.get(url, function (res, status) {
      if (res.status === 'OK') {
        if (!$('div#api_status').hasClass('available')) {
          $('div#api_status').addClass('available');
        }
        getPlaces();
      } else {
        if ($('div#api_status').hasClass('available')) {
          $('div#api_status').removeClass('available');
        }
      }
    });
  }

  getStatus();

  function getPlaces () {
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      data: JSON.stringify({ amenities: lst }),
      contentType: 'application/json',
      success: function (response) {
        $('section.places').empty();
        $.each(response, function (index, place) {
          const placeElement = `
          <article>
            <div class="title_box">
              <h2>${place.name}</h2>
              <div class="price_by_night">$${place.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
              <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
              <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
            </div>
            <div class="description">
              ${place.description || 'Safe'}
            </div>
          </article>`;

          $('section.places').append(placeElement);
        });
      },
      error: function (error) {
        console.log('Error:', error);
      }
    });
  }
  getPlaces();
}));
