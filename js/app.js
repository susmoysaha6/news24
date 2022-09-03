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
        .then(data => console.log(data.data))
        .catch(err => console.log(err));
}
const displayNews = (categoriesNews) => {
    const newsContainer = document.getElementById('news-conatainer');
    categoriesNews.forEach(categoryNews => {
        console.log(categoryNews);
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('row');
        newsDiv.classList.add('g-0');
        newsDiv.innerHTML
    })
}

loadCategories();