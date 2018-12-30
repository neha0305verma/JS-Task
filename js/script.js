//Version : 2.0.0
//Author : Neha Verma
//Details : Movie Details

$(document).ready(function (resolve, reject) {
    var arr = [];
    $.ajax({
        type: "GET",
        url: "https://api.themoviedb.org/3/discover/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb",
        success: function (data) {
            var count = 0;
            for (var i = 0; i < data.results.length; i++) {
                if (count < 10) {
                    arr[count] = data.results[i];
                    count++;
                }
            }
        },
        complete: function () { createhtml(arr); }
    })
});

//create all html element dynamically
function createhtml(arr) {
    // console.log(arr[0]);
    for (var i = 0; i < 10; i++) {
        var div = parentdiv();
        var col1 = col1fun(arr[i].poster_path, div);
        var col2 = col2fun(div);
        var col3 = col3fun(div);
        title(arr[i].title, col2);
        releasedate(arr[i].release_date, col2);
        overview(arr[i].overview, col2);
        btnrating(arr[i].vote_average, col3);
        go(col3);
    }


}

//Create Parent Div (Details)
function parentdiv() {
    var div = document.createElement('div');
    div.setAttribute('class', 'details row');
    $(".movie-container").append(div);
    return div;
}

//Create column 1 in detail div
function col1fun(poster_path, div) {
    var col1 = document.createElement('img');
    col1.setAttribute('class', 'class-img col-md-3');
    //console.log(arr[i].poster_path);
    col1.setAttribute('src', "http://image.tmdb.org/t/p/w500/" + poster_path);
    div.appendChild(col1);
}

//Create column 2 in detail div
function col2fun(div) {
    var col2 = document.createElement('div');
    col2.setAttribute('class', 'class-col2 col-md-6');
    div.appendChild(col2);
    return col2;
}

//Create column 3 in detail div
function col3fun(div) {
    var col3 = document.createElement('div');
    col3.setAttribute('class', 'class-col3 col-md-2');
    div.appendChild(col3);
    return col3;

}

//create title element
function title(title, col2) {
    var titlevar = document.createElement('h4');
    titlevar.setAttribute('class', 'class-title');
    titlevar.textContent = title;
    col2.appendChild(titlevar);

}

//create year element
function releasedate(release_date, col2) {
    var year = document.createElement('h4');
    year.setAttribute('class', 'class-year');
    year.textContent = "Release Date : " + release_date;
    col2.appendChild(year);

}

//create overview element
function overview(overview, col2) {

    var overviewvar = document.createElement('h4');
    overviewvar.setAttribute('class', 'class-overview');
    overviewvar.textContent = "Overview : " + overview;
    col2.appendChild(overviewvar);
}

//create rating button element
function btnrating(vote_average, col3) {

    var rating = document.createElement('button');
    rating.setAttribute('class', 'btn btn-primary btn-blue btn-rating');
    rating.textContent = vote_average;
    col3.appendChild(rating);
}

//create go button
function go(col3) {
    var btn = document.createElement('button');
    btn.setAttribute('class', 'btn btn-primary mybtn btn-blue');
    btn.setAttribute('data-toggle', 'modal');
    btn.textContent = "Go";
    col3.appendChild(btn);

}

//click on any go button modal open
$(document).on("click", ".mybtn", function (e) {
    e.preventDefault();
    var details = $(this).parents("div.details");
    var title = $(details).find("h4.class-title").text();
    var year = $(details).find("h4.class-year").text();
    var overview = $(details).find("h4.class-overview").text();
    $("#modal-title").text(title);
    $("#modal-year").text(year);
    $("#modal-overview").text(overview);
    $('#myModal').modal('show');
});