//Version : 1.3.0
//Author : Neha Verma
//Details : Traverse from child to parent

$(document).ready(function (resolve,reject) {
    $.ajax({
        type: "GET",
        url: "https://api.themoviedb.org/3/discover/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb",
        success: function (data) {
            var arr = [];
            var count = 0;
            for (var i = 0; i < data.results.length; i++) {
                if (count < 10) {
                    arr[count] = data.results[i];
                    count++;
                }
            }

            for (var i = 0; i < 10; i++) {
                var div = document.createElement('div');
                div.setAttribute('id', 'detail-' + i);
                div.setAttribute('class', 'details row');
                $(".movie-container").append(div);

                var col1 = document.createElement('img');
                col1.setAttribute('id', 'img-' + i);
                col1.setAttribute('class', 'class-img col-md-3');
                //console.log(arr[i].poster_path);
                col1.setAttribute('src', "http://image.tmdb.org/t/p/w500/" + arr[i].poster_path);
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
                year.textContent = "Release Date : " + arr[i].release_date;
                col2.appendChild(year);


                var overview = document.createElement('h4');
                overview.setAttribute('id', 'overview-' + i);
                overview.setAttribute('class', 'class-overview');
                overview.textContent = "Overview : " + arr[i].overview;
                col2.appendChild(overview);

                var rating = document.createElement('button');
                rating.setAttribute('id', 'btn-rating-' + i);
                rating.setAttribute('class', 'btn btn-primary btn-blue btn-rating');
                rating.textContent = arr[i].vote_average;
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
                var details=$(this).parents("div.details");
                var title=$(details).find("h4.class-title").text();
                var year=$(details).find("h4.class-year").text();
                var overview=$(details).find("h4.class-overview").text();
                $("#modal-title").text(title);
                $("#modal-year").text(year);
                $("#modal-overview").text(overview);
                $('#myModal').modal('show');
            });
        }
    });
});
