$(document).ready($(function () {
  const lst = [];
  const citiesLst = [];
  const statesLst = [];

  $('.amenities .popover ul li').each(function (index, element) {
    const $input = $(element).find('input');
    if ($input.is(':checked')) {
      const id = $input.data('id');
      if (!lst.includes(id)) {
        lst.push(id);
      }
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

  $('.locations .popover ul > li > input').each(function () {
    const $input = $(this);
    if ($input.is(':checked')) {
      const id = $input.data('id');
      statesLst.push(id);
    } else {
      const id = $input.data('id');
      if (statesLst.includes(id)) {
        const idx = statesLst.indexOf(id);

        if (idx !== -1) {
          statesLst.splice(idx, 1);
        }
      }
    }
  });

  $('.locations .popover ul li ul li').each(function (index, element) {
    const $input = $(element).find('input');
    if ($input.is(':checked')) {
      const id = $input.data('id');
      if (!citiesLst.includes(id)) {
        citiesLst.push(id);
      }
    } else {
      const id = $input.data('id');
      if (citiesLst.includes(id)) {
        const idx = citiesLst.indexOf(id);

        if (idx !== -1) {
          citiesLst.splice(idx, 1);
        }
      }
    }
  });

  $('.locations .popover ul > li > input').on('change', function () {
    const id = $(this).data('id');

    if ($(this).is(':checked')) {
      if (!(statesLst.includes(id))) {
        if (!statesLst.includes(id)) {
          statesLst.push(id);
        }
      }
    } else {
      const idx = statesLst.indexOf(id);
      if (idx !== -1) {
        statesLst.splice(idx, 1);
      }
    }
    updateLocationsH4();
    getPlaces();
  });
  updateLocationsH4();

  $('.locations .popover ul > li > ul > li > input').on('change', function () {
    const id = $(this).data('id');

    if ($(this).is(':checked')) {
      if (!(citiesLst.includes(id))) {
        citiesLst.push(id);
      }
    } else {
      const idx = citiesLst.indexOf(id);
      if (idx !== -1) {
        citiesLst.splice(idx, 1);
      }
    }
    updateLocationsH4();
    getPlaces();
  });

  function updateLocationsH4 () {
    let locationStr = '';
    $('.locations .popover ul li').each(function (index, element) {
      const $input = $(element).find('input');

      const id = $input.data('id');

      if (statesLst.includes(id)) {
        const name = $input.data('name');
        if (locationStr.length === 0) {
          locationStr = locationStr + name;
        } else {
          locationStr = locationStr + ', ' + name;
        }
      }
    });

    $('.locations .popover ul li ul li').each(function (index, element) {
      const $input = $(element).find('input');

      const id = $input.data('id');

      if (citiesLst.includes(id)) {
        const name = $input.data('name');
        if (locationStr.length === 0) {
          locationStr = locationStr + name;
        } else {
          locationStr = locationStr + ', ' + name;
        }
      }
    });
    $('.locations h4').text(locationStr);
  }

  function updateAmenitiesH4 () {
    let str = '';

    $('.amenities .popover ul li').each(function (index, element) {
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

  $('.amenities .popover ul li input').on('change', function () {
    const id = $(this).data('id');

    if ($(this).is(':checked')) {
      if (!(lst.includes(id))) {
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
      data: JSON.stringify({ amenities: lst, cities: citiesLst, states: statesLst }),
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
  updateAmenitiesH4();
  updateLocationsH4();
}));
