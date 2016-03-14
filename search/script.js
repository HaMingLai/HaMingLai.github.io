$("#search_input").bind("keyup",function(){
    var searchForm = $("#search-form");
    var searchText = $("#search_input").val();
    $.get("http://api.bing.com/qsonhs.aspx?q=" + searchText,function(d){
        var data = d.AS.Results[0].Suggests;
        var html = "";
        for(var i=0;i< data.length;i++){
            html += "<li>"+data[i].Txt+"</li>";
        }
        $("#search-result").html(html);
        $("#search-suggest").show().css({
            top: searchForm.offset().top + 39 + "px",
            left: searchForm.offset().left + "px",
            position:"absolute"
        });
    },"json");
});

$(document).click(function(){
    $("#search-suggest").hide();
});

$("#search-result").delegate("li","click",function(){
    var keyword = $(this).text();
    location.href = "http://cn.bing.com/search?q=" + keyword;
});
