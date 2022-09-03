const loadCategories = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategories(data.data.news_category))
        .catch(err => console.log(err))
}
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
const loadNews = (category_id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayNews(data.data))
        .catch(err => console.log(err));
}
const displayNews = (categoriesNews) => {
    const newsContainer = document.getElementById('news-conatainer');
    newsContainer.textContent = '';
    categoriesNews.forEach(categoryNews => {
        console.log(categoryNews);
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('card');
        newsDiv.classList.add('mb-3');

        newsDiv.innerHTML = `
        <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${categoryNews.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${categoryNews.title}</h5>
                            <p class="card-text">${categoryNews.details.length > 200 ? categoryNews.details.slice(0, 200) + '...' : categoryNews.details}</p>
                            <div>
                            <div class="d-flex justify-content-around align-items-center mt-3">
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
                                    <button class="btn btn-info text-white" onclick="loadDetails('${categoryNews._id}')">
                                    <i class="bi bi-arrow-right"></i></button>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
        </div>
        `;
        newsContainer.appendChild(newsDiv);
    })
}
const loadDetails = (news_id) => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => console.log(data.data))
        .catch(err => clg(err));
}
loadCategories();
loadNews('');