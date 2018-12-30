//Version : 1.0.0
//Author : Neha Verma
//Details : Feth data from movie api

getMovie();
function getMovie() {
    $.ajax({
        type: "GET",
        url: "https://raw.githubusercontent.com/prust/wikipedia-movie-data/master/movies.json",
        success: function (data) {
            var parseData = JSON.parse(data);
            var arr = [];
            var count = 0;
            for (var i = 0; i < parseData.length; i++) {
                if ((parseData[i].year) == 2015 && count < 10) {
                    arr[count] = parseData[i];
                    count++;
                }
            }
            
            for (var i = 0; i < 10; i++) {
                //console.log(arr[i].title);
                
                var div = document.createElement('div');
                div.setAttribute('id', 'detail-' + i);
                div.setAttribute('class', 'details row');
               $(".movie-container").append(div);

                var col1 = document.createElement('div');
                col1.setAttribute('id', 'img-' + i);
                col1.setAttribute('class', 'class-img col-md-3');
                div.appendChild(col1);

                var col2 = document.createElement('div');
                col2.setAttribute('id', 'col2-' + i);
                col2.setAttribute('class', 'class-col2 col-md-6');
                div.appendChild(col2);

                
                var col3 = document.createElement('div');
                col3.setAttribute('id', 'col3-' + i);
                col3.setAttribute('class', 'class-col3 col-md-2');
                div.appendChild(col3);

                var title = document.createElement('h4');
                title.setAttribute('id', 'title-' + i);
                title.setAttribute('class', 'class-title');
                title.textContent = arr[i].title;
                col2.appendChild(title);

                var year = document.createElement('h4');
                year.setAttribute('id', 'year-' + i);
                year.setAttribute('class', 'class-year');
                year.textContent = "Year : " + arr[i].year;
                col2.appendChild(year);


                var cast = document.createElement('h4');
                cast.setAttribute('id', 'cast-' + i);
                cast.setAttribute('class', 'class-cast');
                cast.textContent = "Cast : ";
                col2.appendChild(cast);

                if (arr[i].cast.length > 0) {
                    for (var j = 0; j < arr[i].cast.length; j++) {
                        var cast = document.createElement('p');
                        cast.setAttribute('id', 'cast-' + i);
                        $('#cast-' + i).append(arr[i].cast[j] + ", ");
                    }
                }
                else {
                    $('#cast').append("No Details Available");
                }

                var rating = document.createElement('button');
                rating.setAttribute('id', 'btn-rating-' + i);
                rating.setAttribute('class', 'btn btn-primary btn-blue btn-rating');
                rating.textContent = "5.6";
                col3.appendChild(rating);
              
                var btn = document.createElement('button');
                btn.setAttribute('id', 'btn-' + i);
                btn.setAttribute('class', 'btn btn-primary mybtn btn-blue');
                btn.setAttribute('data-toggle', 'modal');
                btn.textContent = "Go";
                col3.appendChild(btn);
 
            }

            $('.mybtn').on("click", function (e) {
                e.preventDefault();
                var id = this.id;
                id = id.split("-");
                var movie = fun(id[1]);
                //console.log(movie);
                //console.log(movie["title"]);
                $("#modal-index").text(movie["index"]);
                $("#modal-title").text(movie["title"]);
                $("#modal-year").text(movie["year"]);
                $("#modal-cast").text(movie["cast"]);
                $('#myModal').modal('show');
                
            });
        }
    });
}

function fun(id) {
    //console.log($(this).text());
    var data = [];
    $('#detail-' + id + '>#col2-' + id).map(function () {
        // console.log(document.getElementById("index-" + id).textContent);
        //data["index"] = document.getElementById("index-" + id).textContent;
        data["title"] = document.getElementById("title-" + id).textContent;
        data["year"] = document.getElementById("year-" + id).textContent;
        data["cast"] = document.getElementById("cast-" + id).textContent;
    })
    return (data);
}
