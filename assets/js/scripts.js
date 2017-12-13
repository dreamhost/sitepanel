/*

SitePanel Scripts

    This document contains all of the SitePanel-specific front-
    end scripts.

*/

// Make closing Toaster animation controllable with JS
// Example shown here using jQuery
$('.js-toaster-close').on('click', function () {
    $(this).closest('.Toaster--persistent').addClass('Toaster--is-closing');
});
