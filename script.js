const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", function () {
  const inputKeyword = document.querySelector(".input-keyword");
  fetch("http://www.omdbapi.com/?apikey=dca61bcc&s=" + inputKeyword.value)
    .then((response) => response.json())
    .then((response) => {
      const movies = response.Search;
      let cards = "";
      movies.forEach(
        (m) =>
          (cards += `<div class="col-md-4 my-3">
                        <div class="card">
                          <img src="${m.Poster}" class="card-img-top" />
                          <div class="card-body">
                            <h5 class="card-title">${m.Title}</h5>
                            <h6 class="card-subtitle mb-2 text-muted"></h6>
                            <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieModal" data-imdbid="${m.imdbID}">Show Detail</a>
                          </div>
                        </div>
                      </div>`)
      );
      const movieContainer = document.querySelector(".movie-container");
      movieContainer.innerHTML = cards;

      // When Click show Detail
      const modalDetailButton = document.querySelectorAll(".modal-detail-button");
      modalDetailButton.forEach((btn) => {
        btn.addEventListener("click", function () {
          const dataImdbid = this.dataset.imdbid;
          fetch("http://www.omdbapi.com/?apikey=dca61bcc&i=" + dataImdbid)
            .then((response) => response.json())
            .then((m) => {
              const movieDetail = `<div class="container-fluid">
                                    <div class="row">
                                      <div class="col-md-3">
                                        <img src="${m.Poster}" class="img-fluid" alt="" />
                                      </div>
                                      <div class="col-md">
                                        <ul class="list-group">
                                          <li class="list-group-item">
                                            <h4>${m.Title}</h4>
                                          </li>
                                          <li class="list-group-item"><strong>${m.Genre}</strong></li>
                                          <li class="list-group-item"><strong>${m.Director}</strong></li>
                                          <li class="list-group-item"><strong>${m.Actors}</strong></li>
                                          <li class="list-group-item"><strong>${m.Runtime}</strong> <br />${m.Plot}</li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>`;
              const modalBody = document.querySelector(".modal-body");
              modalBody.innerHTML = movieDetail;
            });
        });
      });
    });
});

// function showCards(m) {
//   return ``;
// }

// function showDetailMovies(m) {
//   return ``;
// }
