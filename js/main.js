const slider = tns({
  container: '.carosel__inner',
  items: 1,
  slideBy: 'page',
  controls: false,
  nav: true,
  autoplay: false,
  autoplayTimeout: 5000,
  responsive: {
    992: {
      autoplay: false
    }
  }
});

document.querySelector('.prev').addEventListener('click', function () {
slider.goTo('prev');
});

document.querySelector('.next').addEventListener('click', function () {
slider.goTo('next');
});


$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
  $(this)
  .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
  .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
});

function toggleSlide(item) {
  $(item).each(function(i){
    $(this).on('click', function(e){
      e.preventDefault();
      $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
      $('.catalog-item__block').eq(i).toggleClass('catalog-item__block_active');
    })
  });
}

toggleSlide('.catalog-item__link');
toggleSlide('.catalog-item__back');

//modal

$('[data-modal=consultation]').on('click', function() {
  $('.overlay, #consultation').fadeIn('slow');
});

$('.modal__close').on('click', function() {
  $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
});

$('.button_mini').each(function(i) {
  $(this).on('click', function() {
    $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
    $('.overlay, #order').fadeIn('slow');
  })
})

function validateForm(form) {
  $(form).validate({
    rules: {
      name: "required",
      phone: "required",
      email: {
        required: true,
        email: true
      }
    },
    messages: {
      name: "Пожалуйста, введите своё имя",
      phone: "Пожалуйста, введите свой номер телефона",
      email: {
        required: "Пожалуйста, введите свою почту",
        email: "Неправильно введён адрес почты"
      }
    }
  });
}

validateForm('#consultation-form');
validateForm('#consultation form');
validateForm('#order form');

$('input[name=phone]').mask("+38 (999) 99-9999");

$('form').submit(function(e) {
  e.preventDefault();
  $.ajax({
    type: "POST",
    url: "mailer/smart.php",
    data: $(this).serialize()
  }).done(function() {
    $(this).find("input").val("");
    $('#consultation, #order').fadeOut();
    $('.overlay, #thanks').fadeIn('slow');

    $('form').trigger('reset');
  });
  return false;
});

//Slow scroll and pageup

$(window).scroll(function() {
  if ($(this).scrollTop() > 1600) {
    $('.pageup').fadeIn();
  } else {
    $('.pageup').fadeOut();
  }
});

$("a[href=#up]").click(function() {
  const _href = $(this).attr("href");
  $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
  return false;
});

new WOW().init();