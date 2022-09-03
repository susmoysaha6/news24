// load all categories 
const loadCategories = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategories(data.data.news_category))
        .catch(err => console.log(err));
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
    categoriesNews.sort((a, b) => {
        return b.total_view - a.total_view;
    })
    console.log(categoriesNews);
    const newsContainer = document.getElementById('news-conatainer');
    const newsCount = document.getElementById('news-count');

    newsContainer.textContent = '';
    newsCount.textContent = '';
    if (categoriesNews.length > 0) {
        newsCount.innerHTML = `${categoriesNews.length} News found for this categories`;
    } else {
        newsCount.innerHTML = `No news found`;
    }
    categoriesNews.forEach(categoryNews => {
        console.log(categoryNews);
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('card');
        newsDiv.classList.add('mb-3');

        newsDiv.innerHTML = `
        <div class="row g-0 shadow-lg">
                    <div class="col-md-4">
                        <img src="${categoryNews.thumbnail_url}" class="w-100 h-100" alt="...">
                    </div>
                    <div class="col-md-8 pt-5">
                        <div class="card-body">
                            <h5 class="card-title ps-5">${categoryNews.title}</h5>
                            <p class="card-text ps-5">${categoryNews.details.length > 300 ? categoryNews.details.slice(0, 300) + '...' : categoryNews.details}</p>
                            <div class="d-flex justify-content-between justify-content-md-evenly align-items-center mt-5 my-1">
                                <div class="d-flex flex-column flex-md-row align-items-center justify-content-center ">
                                    <div>
                                        <img style="width:60px; border-radius:50px" src="${categoryNews.author.img ? categoryNews.author.img : 'No Images to show'}" alt="" />
                                    </div>
                                    <div class="ps-2 text-muted d-flex flex-column align-items-center">
                                        <p>
                                            <small>Name: ${categoryNews.author?.name ? categoryNews.author?.name : 'No Name Found'}</small>
                                        </p>
                                        <p><small class="text-wrap">
                                        ${categoryNews.author?.published_date ? categoryNews.author?.published_date : 'No Date Found'}
                                        </small></p>
                                    </div>
                                </div>
                                <div>
                                    <p><i class="bi bi-eye"></i> ${categoryNews.total_view ? categoryNews.total_view : 'No Data Available'}</p>
                                </div>
                                <div>
                                    <p class="text-warning">${categoryNews.rating.number ? categoryNews.rating.number : 'No Rating Found'} <i class="bi bi-star-fill"></i></p>
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
        .catch(err => console.log(err));
}
// display news details
const displayDetails = (details) => {
    console.log(details);
    const detailsContainer = document.getElementById('details');
    const newsTitle = document.getElementById('title');
    newsTitle.innerText = `${details[0].title}`
    detailsContainer.innerHTML = `
    <div class="text-center">
        <p>Author: ${details[0].author.name ? details[0].author.name : 'No Name Found'}</p>
        <img style="width:50px;" src="${details[0].author?.img ? details[0].author.img : 'No Image Found'}" alt="" />
        <p>Publish Date: ${details[0].author.published_date ? details[0].author.published_date : 'No Date Found'}</p>
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
        <p><small>${details[0].details ? details[0].details.slice(0, 1000) + '...' : 'No Details Found'}</small></p>
    </div>
    `;
}
loadCategories();
