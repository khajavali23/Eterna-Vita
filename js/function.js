(function ($) {
    "use strict";

    var $window = $(window);
    var $body = $("body");

    /* Preloader Effect */
    $window.on("load", function () {
        $(".preloader").fadeOut(600);
    });

    /* Sticky Header */
    if ($(".active-sticky-header").length) {
        $window.on("resize", function () {
            setHeaderHeight();
        });

        function setHeaderHeight() {
            $("header.main-header").css("height", $("header .header-sticky").outerHeight());
        }

        $window.on("scroll", function () {
            var fromTop = $(window).scrollTop();
            setHeaderHeight();
            var headerHeight = $("header .header-sticky").outerHeight();
            $("header .header-sticky").toggleClass("hide", fromTop > headerHeight + 100);
            $("header .header-sticky").toggleClass("active", fromTop > 600);
        });
    }

    /* Slick Menu JS */
    $("#menu").slicknav({
        label: "",
        prependTo: ".responsive-menu",
    });

    if ($("a[href='#top']").length) {
        $(document).on("click", "a[href='#top']", function () {
            $("html, body").animate({ scrollTop: 0 }, "slow");
            return false;
        });
    }

    /* testimonial Slider JS */
    if ($(".testimonial-slider").length) {
        const testimonial_slider = new Swiper(".testimonial-slider .swiper", {
            slidesPerView: 1,
            speed: 1000,
            spaceBetween: 60,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: ".testimonial-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".testimonial-button-next",
                prevEl: ".testimonial-button-prev",
            },
            breakpoints: {
                768: {
                    slidesPerView: 1,
                },
                991: {
                    slidesPerView: 1,
                },
            },
        });
    }

    /* Skill Bar */
    if ($(".skills-progress-bar").length) {
        $(".skills-progress-bar").waypoint(
            function () {
                $(".skillbar").each(function () {
                    $(this)
                        .find(".count-bar")
                        .animate(
                            {
                                width: $(this).attr("data-percent"),
                            },
                            2000
                        );
                });
            },
            {
                offset: "70%",
            }
        );
    }

    /* Youtube Background Video JS */
    if ($("#herovideo").length) {
        var myPlayer = $("#herovideo").YTPlayer();
    }

    /* Init Counter */
    if ($(".counter").length) {
        $(".counter").counterUp({ delay: 6, time: 3000 });
    }

    /* Image Reveal Animation */
    if ($(".reveal").length) {
        gsap.registerPlugin(ScrollTrigger);
        let revealContainers = document.querySelectorAll(".reveal");
        revealContainers.forEach((container) => {
            let image = container.querySelector("img");
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    toggleActions: "play none none none",
                },
            });
            tl.set(container, {
                autoAlpha: 1,
            });
            tl.from(container, 1, {
                xPercent: -100,
                ease: Power2.out,
            });
            tl.from(image, 1, {
                xPercent: 100,
                scale: 1,
                delay: -1,
                ease: Power2.out,
            });
        });
    }

    /* Text Effect Animation */
    if ($(".text-anime-style-1").length) {
        let staggerAmount = 0.05,
            translateXValue = 0,
            delayValue = 0.5,
            animatedTextElements = document.querySelectorAll(".text-anime-style-1");

        animatedTextElements.forEach((element) => {
            let animationSplitText = new SplitText(element, { type: "chars, words" });
            gsap.from(animationSplitText.words, {
                duration: 1,
                delay: delayValue,
                x: 20,
                autoAlpha: 0,
                stagger: staggerAmount,
                scrollTrigger: { trigger: element, start: "top 85%" },
            });
        });
    }

    if ($(".text-anime-style-2").length) {
        let staggerAmount = 0.03,
            translateXValue = 20,
            delayValue = 0.1,
            easeType = "power2.out",
            animatedTextElements = document.querySelectorAll(".text-anime-style-2");

        animatedTextElements.forEach((element) => {
            let animationSplitText = new SplitText(element, { type: "chars, words" });
            gsap.from(animationSplitText.chars, {
                duration: 1,
                delay: delayValue,
                x: translateXValue,
                autoAlpha: 0,
                stagger: staggerAmount,
                ease: easeType,
                scrollTrigger: { trigger: element, start: "top 85%" },
            });
        });
    }

    if ($(".text-anime-style-3").length) {
        let animatedTextElements = document.querySelectorAll(".text-anime-style-3");

        animatedTextElements.forEach((element) => {
            //Reset if needed
            if (element.animation) {
                element.animation.progress(1).kill();
                element.split.revert();
            }

            element.split = new SplitText(element, {
                type: "lines,words,chars",
                linesClass: "split-line",
            });
            gsap.set(element, { perspective: 400 });

            gsap.set(element.split.chars, {
                opacity: 0,
                x: "50",
            });

            element.animation = gsap.to(element.split.chars, {
                scrollTrigger: { trigger: element, start: "top 90%" },
                x: "0",
                y: "0",
                rotateX: "0",
                opacity: 1,
                duration: 1,
                ease: Back.easeOut,
                stagger: 0.02,
            });
        });
    }

    /* Parallaxie js */
    /* var $parallaxie = $('.parallaxie');
	if($parallaxie.length && ($window.width() > 991))
	{
		if ($window.width() > 768) {
			$parallaxie.parallaxie({
				speed: 0.55,
				offset: 0,
			});
		}
	} */

    /* Zoom Gallery screenshot */
    $(".gallery-items").magnificPopup({
        delegate: "a",
        type: "image",
        closeOnContentClick: false,
        closeBtnInside: false,
        mainClass: "mfp-with-zoom",
        image: {
            verticalFit: true,
        },
        gallery: {
            enabled: true,
        },
        zoom: {
            enabled: true,
            duration: 300, // don't foget to change the duration also in CSS
            opener: function (element) {
                return element.find("img");
            },
        },
    });

    /* Contact form validation */
    var $contactform = $("#contactForm");
    $contactform.validator({ focus: false }).on("submit", function (event) {
        if (!event.isDefaultPrevented()) {
            event.preventDefault();
            submitForm();
        }
    });

    function submitForm() {
        /* Ajax call to submit form */
        $.ajax({
            type: "POST",
            url: "form-process.php",
            data: $contactform.serialize(),
            success: function (text) {
                if (text === "success") {
                    formSuccess();
                } else {
                    submitMSG(false, text);
                }
            },
        });
    }

    function formSuccess() {
        $contactform[0].reset();
        submitMSG(true, "Message Sent Successfully!");
    }

    function submitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h4 text-success";
        } else {
            var msgClasses = "h4 text-danger";
        }
        $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
    }
    /* Contact form validation end */

    /* Appointment form validation */
    var $appointmentForm = $("#appointmentForm");
    $appointmentForm.validator({ focus: false }).on("submit", function (event) {
        if (!event.isDefaultPrevented()) {
            event.preventDefault();
            submitappointmentForm();
        }
    });

    function submitappointmentForm() {
        /* Ajax call to submit form */
        $.ajax({
            type: "POST",
            url: "form-appointment.php",
            data: $appointmentForm.serialize(),
            success: function (text) {
                if (text === "success") {
                    appointmentformSuccess();
                } else {
                    appointmentsubmitMSG(false, text);
                }
            },
        });
    }

    function appointmentformSuccess() {
        $appointmentForm[0].reset();
        appointmentsubmitMSG(true, "Message Sent Successfully!");
    }

    function appointmentsubmitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-success";
        } else {
            var msgClasses = "h3 text-danger";
        }
        $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
    }
    /* Appointment form validation end */

    /* Animated Wow Js */
    new WOW().init();

    /* Popup Video */
    if ($(".popup-video").length) {
        $(".popup-video").magnificPopup({
            type: "iframe",
            mainClass: "mfp-fade",
            removalDelay: 160,
            preloader: false,
            fixedContentPos: true,
        });
    }

    /* Services Item Active Start */
    var $service_list = $(".service-list");
    if ($service_list.length) {
        var $service_item = $service_list.find(".service-item");

        if ($service_item.length) {
            $service_item.on({
                mouseenter: function () {
                    if (!$(this).hasClass("active")) {
                        $service_item.removeClass("active");
                        $(this).addClass("active");
                    }
                },
                mouseleave: function () {
                    // Optional: Add logic for mouse leave if needed
                },
            });
        }
    }
    /* Services Item Active End */

    /* Feature Item Active Start */
    var $feature_item_box = $(".feature-item-box");
    if ($feature_item_box.length) {
        var $feature_item = $feature_item_box.find(".feature-item");

        if ($feature_item.length) {
            $feature_item.on({
                mouseenter: function () {
                    if (!$(this).hasClass("active")) {
                        $feature_item.removeClass("active");
                        $(this).addClass("active");
                    }
                },
                mouseleave: function () {
                    // Optional: Add logic for mouse leave if needed
                },
            });
        }
    }
    /* Feature Item Active End */
})(jQuery);

$(document).ready(function () {
    const $slider = $(".multiple-items");
    const $dots = $(".js-service-dots .service-dot");

    if (!$slider.length || !$dots.length) return;

    let slidesPerMove = 4; // default (desktop)

    $slider.on("init breakpoint", function (event, slick) {
        slidesPerMove = slick.options.slidesToScroll;
    });

    $slider.slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        dots: false,
        arrows: false,
        autoplay: false,
        autoplaySpeed: 3500,
        speed: 600,
        pauseOnHover: true,
        pauseOnFocus: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    });

    // DOT CLICK → MOVE SLIDER
    $dots.each(function (index) {
        $(this).on("click", function () {
            $slider.slick("slickGoTo", index * slidesPerMove);
            $dots.removeClass("active");
            $(this).addClass("active");
        });
    });

    // SYNC DOTS ON AUTO / SWIPE
    $slider.on("afterChange", function (event, slick, currentSlide) {
        const activeIndex = Math.floor(currentSlide / slidesPerMove);
        $dots.removeClass("active");
        $dots.eq(activeIndex).addClass("active");
    });
});

$(document).ready(function () {
    const $blogSlider = $(".our-blog .row").last();

    if (!$blogSlider.length) return;

    $blogSlider.slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        autoplay: true,
        autoplaySpeed: 3500,
        speed: 600,
        pauseOnHover: true,
        pauseOnFocus: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    });
});

$(document).ready(function () {
    const $teamSlider = $(".our-team .row").last();
    const $teamDots = $(".js-team-dots .team-dot");

    if (!$teamSlider.length || !$teamDots.length) return;

    let slidesPerMove = 4;

    $teamSlider.on("init breakpoint", function (event, slick) {
        slidesPerMove = slick.options.slidesToScroll;
    });

    $teamSlider.slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: false,
        dots: false,
        autoplay: true,
        autoplaySpeed: 3500,
        speed: 600,
        pauseOnHover: true,
        pauseOnFocus: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    });

    // DOT CLICK → MOVE SLIDER
    $teamDots.each(function (index) {
        $(this).on("click", function () {
            $teamSlider.slick("slickGoTo", index * slidesPerMove);
            $teamDots.removeClass("active");
            $(this).addClass("active");
        });
    });

    // SYNC DOTS ON AUTO / SWIPE
    $teamSlider.on("afterChange", function (event, slick, currentSlide) {
        const activeIndex = Math.floor(currentSlide / slidesPerMove);
        $teamDots.removeClass("active");
        $teamDots.eq(activeIndex).addClass("active");
    });
});


// WhatsApp button visible instantly
window.addEventListener("load", () => {
    const wa = document.querySelector(".whatsapp-float");
    if (wa) {
        wa.style.opacity = "1";
        wa.style.transform = "scale(1)";
    }
});




// -------- NAV ACTIVE LINKS --------
const links = document.querySelectorAll(".nav-link");
const current = location.pathname.split("/").pop();

links.forEach(link => {
    if (link.getAttribute("href") === current) {
        link.classList.add("active");
    }
});

const page = location.pathname.split("/").pop();
if (page === "services.html") {
    document.querySelector(".nav-item.submenu > .nav-link")
        ?.classList.add("active");
}


// -------- TEAM PAGINATION --------
const itemsPerPage = 8;
const items = document.querySelectorAll(".team-item");
const pages = document.querySelectorAll(".pagination li a");

function showPage(page) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    items.forEach((item, index) => {
        item.style.display = (index >= start && index < end) ? "block" : "none";
    });

    document.querySelector(".pagination .active")?.classList.remove("active");
    pages[page]?.parentElement.classList.add("active");
}

pages.forEach(btn => {
    btn.addEventListener("click", e => {
        e.preventDefault();
        if (!isNaN(btn.textContent)) showPage(Number(btn.textContent));
    });
});

showPage(1);


// -------- SERVICES PAGINATION --------
const servicesPerPage = 8;
const serviceItems = document.querySelectorAll(".service-item");
const servicePageLinks = document.querySelectorAll(".page-services .pagination li a");

let serviceCurrentPage = 1;
const serviceTotalPages = Math.ceil(serviceItems.length / servicesPerPage);

function showServicePage(page) {
    serviceCurrentPage = page;

    const start = (page - 1) * servicesPerPage;
    const end = start + servicesPerPage;

    serviceItems.forEach((item, index) => {
        item.style.display = (index >= start && index < end) ? "block" : "none";
    });

    document.querySelector(".page-services .pagination .active")
        ?.classList.remove("active");

    servicePageLinks.forEach(link => {
        if (link.textContent == page) link.parentElement.classList.add("active");
    });
}

servicePageLinks.forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();

        if (link.querySelector(".fa-angle-left") && serviceCurrentPage > 1)
            showServicePage(serviceCurrentPage - 1);

        else if (link.querySelector(".fa-angle-right") && serviceCurrentPage < serviceTotalPages)
            showServicePage(serviceCurrentPage + 1);

        else if (!isNaN(link.textContent.trim()))
            showServicePage(Number(link.textContent.trim()));
    });
});

showServicePage(1);


// -------- BLOG PAGINATION --------
const blogsPerPage = 6;
const blogItems = document.querySelectorAll(".page-blog .post-item");
const blogPageLinks = document.querySelectorAll(".page-blog .pagination li a");

let blogCurrentPage = 1;
const blogTotalPages = Math.ceil(blogItems.length / blogsPerPage);

function showBlogPage(page) {
    blogCurrentPage = page;

    const start = (page - 1) * blogsPerPage;
    const end = start + blogsPerPage;

    blogItems.forEach((item, index) => {
        item.style.display = (index >= start && index < end) ? "block" : "none";
    });

    document.querySelector(".page-blog .pagination .active")
        ?.classList.remove("active");

    blogPageLinks.forEach(link => {
        if (link.textContent == page)
            link.parentElement.classList.add("active");
    });
}

blogPageLinks.forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();

        if (link.querySelector(".fa-angle-left") && blogCurrentPage > 1)
            showBlogPage(blogCurrentPage - 1);

        else if (link.querySelector(".fa-angle-right") && blogCurrentPage < blogTotalPages)
            showBlogPage(blogCurrentPage + 1);

        else if (!isNaN(link.textContent.trim()))
            showBlogPage(Number(link.textContent.trim()));
    });
});

showBlogPage(1);
