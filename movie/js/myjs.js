$(function () {
    $("#bs-example-navbar-collapse-1 .dropdown-menu a").click(function () {
        var href = $(this).attr("href");
        $("#tab-list a[href='" + href + "']").tab("show");
    });
});
