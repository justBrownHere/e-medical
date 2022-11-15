(function ($) {
  "use strict";
  $(document).ready(function () {
    // mobile menu responsive
    $(document).on("click", ".header-bar", function () {
      $(".header-bar").toggleClass("close");
      $(".mobile-menu").toggleClass("open");
    });

    //mobile drodown menu display
    $(".menu-item-has-children>a").on("click", function (e) {
      event.preventDefault();
    });
    $(".mobile-menu-area ul li a, .shop-menu li a").on("click", function (e) {
      var element = $(this).parent("li");
      if (element.hasClass("open")) {
        element.removeClass("open");
        element.find("li").removeClass("open");
        element.find("ul").slideUp(1000, "swing");
      } else {
        element.addClass("open");
        element.children("ul").slideDown(1000, "swing");
        element.siblings("li").children("ul").slideUp(1000, "swing");
        element.siblings("li").removeClass("open");
        element.siblings("li").find("li").removeClass("open");
        element.siblings("li").find("ul").slideUp(1000, "swing");
      }
    });

    // //menu options
    // var fixed_top = $(".header-area");
    // $(window).on("scroll", function () {
    //   if ($(this).scrollTop() > 100) {
    //     fixed_top.addClass("animated fadeInDown menu-fixed");
    //   } else {
    //     fixed_top.removeClass("animated fadeInDown menu-fixed");
    //   }
    // });

    // scroll up start here
    $(function () {
      $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
          $(".scrollToTop").css({
            bottom: "2%",
            opacity: "1",
            transition: "all .5s ease",
          });
        } else {
          $(".scrollToTop").css({
            bottom: "-30%",
            opacity: "0",
            transition: "all .5s ease",
          });
        }
      });
      //Click event to scroll to top
      $(".scrollToTop").on("click", function () {
        $("html, body").animate({ scrollTop: 0 }, 500);
        return false;
      });
    });
    new WOW().init();

   
  });
})(jQuery);
