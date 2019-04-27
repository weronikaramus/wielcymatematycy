
// Animacja górnego menu oraz animacje po przewinięciu 

var lastId,
    topMenu = $("#ul_nawigacja"),
    topMenuHeight = topMenu.outerHeight()+15,
    // Wszystkie elementy listy
    menuItems = topMenu.find("a"),
    // Kotwice do pozycji menu
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });

// Animacje po kliknięciu w pozycję menu
menuItems.click(function(e){
  var href = $(this).attr("href"),
      offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
  $('html, body').stop().animate({ 
      scrollTop: offsetTop
  }, 1000);
  e.preventDefault();
});

// Po przewinięciu
$(window).scroll(function(){
   // Pobierz pozycje kontenera 
   var fromTop = $(this).scrollTop()+topMenuHeight;
   
   // Pobierz identyfikator aktualnej pozycji przewinięcia
   var cur = scrollItems.map(function(){
     if ($(this).offset().top < fromTop)
       return this;
   });
   // Pobierz identyfikator aktualnego elementu
   cur = cur[cur.length-1];
   var id = cur && cur.length ? cur[0].id : "";
   
   if (lastId !== id) {
       lastId = id;
       // Ustaw lub usun "active" - odpowiada za podświetlenie pozycji w menu
       menuItems
         .parent().removeClass("active")
         .end().filter("[href=#"+id+"]").parent().addClass("active");
   }                   
});

// Karuzela
var $item = $('.carousel .item'); 
var $wHeight = $(window).height();
$item.eq(0).addClass('active');
$item.height($wHeight); 
$item.addClass('full-screen');

$('.carousel img').each(function() {
  var $src = $(this).attr('src');
  var $color = $(this).attr('data-color');
  $(this).parent().css({
    'background-image' : 'url(' + $src + ')',
    'background-color' : $color
  });
  $(this).remove();
});

$(window).on('resize', function (){
  $wHeight = $(window).height();
  $item.height($wHeight);
});

$('.carousel').carousel({
  interval: 6000,
  pause: "false"
});