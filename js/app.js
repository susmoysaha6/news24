// load all categories 
const loadCategories = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategories(data.data.news_category))
        .catch(err => console.log(err))
}
// display categories 
const displayCategories = (categories) => {
    // console.log(categories);
    const newsCategories = document.getElementById('categories');
    categories.forEach(category => {
        // console.log(category);
        const li = document.createElement('li');
        li.classList.add('nav-item');
        li.innerHTML = `
            <a onclick="loadNews('${category.category_id}')"  id="news-category" class="nav-link text-muted" aria-current="page" href="#">${category.category_name}</a>
        `
        newsCategories.appendChild(li);
    })
}
// load category wise news 
const loadNews = (category_id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayNews(data.data))
        .catch(err => console.log(err));
    toggleSpinner(true);
}
// display category wise news
const displayNews = (categoriesNews) => {

    const newsContainer = document.getElementById('news-conatainer');
    newsContainer.textContent = '';
    categoriesNews.forEach(categoryNews => {
        console.log(categoryNews);
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('card');
        newsDiv.classList.add('mb-3');

        newsDiv.innerHTML = `
        <div class="row g-0 shadow-lg">
                    <div class="col-md-4">
                        <img src="${categoryNews.thumbnail_url}" class="w-100" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${categoryNews.title}</h5>
                            <p class="card-text">${categoryNews.details.length > 200 ? categoryNews.details.slice(0, 200) + '...' : categoryNews.details}</p>
                            <div>
                            <div class="d-flex justify-content-around align-items-center mt-5">
                                <div class="d-flex align-items-center">
                                    <div>
                                        <img style="width:60px; border-radius:50px" src="${categoryNews.author.img}" alt="" />
                                    </div>
                                    <div class="ps-2 text-muted">
                                        <p>
                                            <small>${categoryNews.author.name}</small>
                                        </p>
                                        <p><small>
                                        ${categoryNews.author.published_date}
                                        </small></p>
                                    </div>
                                </div>
                                <div>
                                    <p><i class="bi bi-eye"></i> ${categoryNews.total_view}</p>
                                </div>
                                <div>
                                    <p class="text-warning">${categoryNews.rating.number} <i class="bi bi-star-fill"></i></p>
                                </div>
                                <div>
                                    <button type="button" class="btn btn-info text-white" data-bs-toggle="modal" data-bs-target="#exampleModal"onclick="loadDetails('${categoryNews._id}')">
                                    <i class="bi bi-arrow-right"></i>
                                    </button>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
        </div>
        `;
        newsContainer.appendChild(newsDiv);
    })
    toggleSpinner(false);
}
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    } else {
        loaderSection.classList.add('d-none');
    }
}
// load news details
const loadDetails = (news_id) => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetails(data.data))
        .catch(err => clg(err));
}
// display news details
const displayDetails = (details) => {
    console.log(details);
    const detailsContainer = document.getElementById('details');
    const newsTitle = document.getElementById('title');
    newsTitle.innerText = `${details[0].title}`
    detailsContainer.innerHTML = `
    <div class="text-center">
        <p>Author: ${details[0].author ? details[0].author.name : 'No Result found'}</p>
        <img style="width:50px;" src="${details[0].author ? details[0].author.img : 'No Result found'}" alt="" />
        <p>Publish Date: ${details[0].author ? details[0].author.published_date : 'No Result found'}</p>
    </div>
    <div class="d-flex justify-content-between" >
        <p class="text-warning">Rating: ${details[0].rating ? details[0].rating.number : 'No Rating Found'} <i class="bi bi-star-fill"></i> </p>
        <p>Total Views: <i class="bi bi-eye"></i> ${details[0].total_view ? details[0].total_view : 'No data available'
        }</p>
    </div >
    <div>
        <div class="text-center">
            <img src="${details[0].thumbnail_url ? details[0].thumbnail_url : 'No Image Found'}" alt="" />
        </div>
        <h3>Details:</h3>
        <p><small>${details[0].details ? details[0].details : 'No Details Found'}</small></p>
    </div>
    
    `
}
loadCategories();
// loadNews('')