// Dados simulados
const booksData = [
    {
        id: 1,
        title: "Dom Casmurro",
        author: "Machado de Assis",
        price: 29.90,
        originalPrice: 39.90,
        rating: 4.5,
        category: "literatura-brasileira",
        genre: "romance",
        cover: "📖"
    },
    {
        id: 2,
        title: "O Cortiço",
        author: "Aluísio Azevedo",
        price: 24.90,
        originalPrice: 34.90,
        rating: 4.2,
        category: "literatura-brasileira",
        genre: "realismo",
        cover: "📚"
    },
    {
        id: 3,
        title: "1984",
        author: "George Orwell",
        price: 32.90,
        originalPrice: 42.90,
        rating: 4.8,
        category: "ficcao",
        genre: "distopia",
        cover: "📘"
    },
    {
        id: 4,
        title: "O Pequeno Príncipe",
        author: "Antoine de Saint-Exupéry",
        price: 19.90,
        originalPrice: 29.90,
        rating: 4.7,
        category: "infantojuvenil",
        genre: "fabula",
        cover: "👑"
    },
    {
        id: 5,
        title: "Sapiens",
        author: "Yuval Noah Harari",
        price: 45.90,
        originalPrice: 55.90,
        rating: 4.6,
        category: "nao-ficcao",
        genre: "historia",
        cover: "🧠"
    },
    {
        id: 6,
        title: "Clean Code",
        author: "Robert C. Martin",
        price: 89.90,
        originalPrice: 109.90,
        rating: 4.4,
        category: "tecnicos",
        genre: "programacao",
        cover: "💻"
    }
];

const categoriesData = [
    { id: "ficcao", name: "Ficção", icon: "📖", count: 1250 },
    { id: "nao-ficcao", name: "Não-Ficção", icon: "📚", count: 890 },
    { id: "literatura-brasileira", name: "Literatura Brasileira", icon: "🇧🇷", count: 567 },
    { id: "infantojuvenil", name: "Infantojuvenil", icon: "👶", count: 423 },
    { id: "tecnicos", name: "Técnicos", icon: "🔧", count: 234 },
    { id: "biografias", name: "Biografias", icon: "👤", count: 189 }
];

// Estado da aplicação
let currentPage = 'home';
let currentFilters = {
    category: '',
    priceMin: 0,
    priceMax: 200,
    rating: 0,
    sortBy: 'relevance'
};
let cartItems = [];
let wishlistItems = [];

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    updateCartCount();
});

function initializeApp() {
    // Detectar página atual baseada na URL ou parâmetro
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get('page') || 'home';
    const bookId = urlParams.get('id');
    
    if (bookId) {
        currentPage = 'book-detail';
        renderBookDetail(parseInt(bookId));
    } else if (page === 'books') {
        currentPage = 'books';
        renderBooksPage();
    } else {
        currentPage = 'home';
        renderHomePage();
    }
}

function setupEventListeners() {
    // Busca
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }

    // Filtros
    setupFilterListeners();
    
    // Navegação
    setupNavigationListeners();
    
    // Carrinho
    setupCartListeners();
}

function setupFilterListeners() {
    // Filtros de categoria
    document.addEventListener('change', function(e) {
        if (e.target.type === 'checkbox' && e.target.name === 'category') {
            handleCategoryFilter(e.target);
        }
        
        if (e.target.type === 'checkbox' && e.target.name === 'rating') {
            handleRatingFilter(e.target);
        }
        
        if (e.target.id === 'sortSelect') {
            handleSortChange(e.target.value);
        }
    });

    // Slider de preço
    const priceSlider = document.getElementById('priceSlider');
    if (priceSlider) {
        priceSlider.addEventListener('input', handlePriceFilter);
    }
}

function setupNavigationListeners() {
    // Links de navegação
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('nav-link')) {
            e.preventDefault();
            const href = e.target.getAttribute('href');
            navigateTo(href);
        }
        
        if (e.target.classList.contains('category-card')) {
            e.preventDefault();
            const category = e.target.dataset.category;
            navigateToBooks(category);
        }
        
        if (e.target.classList.contains('book-card') || e.target.closest('.book-card')) {
            const bookCard = e.target.classList.contains('book-card') ? e.target : e.target.closest('.book-card');
            const bookId = bookCard.dataset.bookId;
            if (bookId && !e.target.classList.contains('btn') && !e.target.closest('.btn')) {
                navigateToBookDetail(parseInt(bookId));
            }
        }
    });
}

function setupCartListeners() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            e.preventDefault();
            e.stopPropagation();
            const bookId = parseInt(e.target.dataset.bookId);
            addToCart(bookId);
        }
        
        if (e.target.classList.contains('wishlist-btn') || e.target.closest('.wishlist-btn')) {
            e.preventDefault();
            e.stopPropagation();
            const btn = e.target.classList.contains('wishlist-btn') ? e.target : e.target.closest('.wishlist-btn');
            const bookId = parseInt(btn.dataset.bookId);
            toggleWishlist(bookId);
        }
    });
}

// Funções de navegação
function navigateTo(path) {
    if (path === '/') {
        currentPage = 'home';
        renderHomePage();
        updateURL('');
    } else if (path === '/livros') {
        currentPage = 'books';
        renderBooksPage();
        updateURL('?page=books');
    }
}

function navigateToBooks(category = '') {
    currentPage = 'books';
    currentFilters.category = category;
    renderBooksPage();
    updateURL(`?page=books${category ? '&category=' + category : ''}`);
}

function navigateToBookDetail(bookId) {
    currentPage = 'book-detail';
    renderBookDetail(bookId);
    updateURL(`?page=book-detail&id=${bookId}`);
}

function updateURL(params) {
    const newURL = window.location.pathname + params;
    window.history.pushState({}, '', newURL);
}

// Funções de renderização
function renderHomePage() {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
        <section class="hero">
            <div class="container">
                <h1>Bem-vindo à Livraria Horizonte</h1>
                <p>Descubra milhares de livros e encontre sua próxima leitura favorita</p>
                <button class="btn btn-primary" onclick="navigateToBooks()">Explorar Catálogo</button>
            </div>
        </section>
        
        <div class="container">
            <section class="categories-section">
                <h2 class="text-center mb-4">Explore por Categoria</h2>
                <div class="categories-grid">
                    ${renderCategories()}
                </div>
            </section>
            
            <section class="featured-books">
                <h2 class="text-center mb-4">Livros em Destaque</h2>
                <div class="books-grid">
                    ${renderBooks(booksData.slice(0, 6))}
                </div>
            </section>
        </div>
    `;
    
    updateBreadcrumb([{ text: 'Início', href: '/' }]);
}

function renderBooksPage() {
    const filteredBooks = filterBooks();
    const mainContent = document.getElementById('mainContent');
    
    mainContent.innerHTML = `
        <div class="container">
            <div class="main-content">
                <aside class="sidebar">
                    ${renderFilters()}
                </aside>
                
                <div class="content-area">
                    <div class="page-header">
                        <div>
                            <h1 class="page-title">Catálogo de Livros</h1>
                            <p class="page-subtitle">${filteredBooks.length} livros encontrados</p>
                        </div>
                        <div class="page-actions">
                            <select id="sortSelect" class="select">
                                <option value="relevance">Relevância</option>
                                <option value="price-asc">Menor Preço</option>
                                <option value="price-desc">Maior Preço</option>
                                <option value="rating">Melhor Avaliação</option>
                                <option value="title">Título A-Z</option>
                            </select>
                            
                            <div class="view-toggle">
                                <button class="view-btn active" data-view="grid">⊞</button>
                                <button class="view-btn" data-view="list">☰</button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="books-grid">
                        ${renderBooks(filteredBooks)}
                    </div>
                    
                    ${renderPagination()}
                </div>
            </div>
        </div>
    `;
    
    updateBreadcrumb([
        { text: 'Início', href: '/' },
        { text: 'Livros', href: '/livros', current: true }
    ]);
}

function renderBookDetail(bookId) {
    const book = booksData.find(b => b.id === bookId);
    if (!book) {
        renderNotFound();
        return;
    }
    
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
        <div class="container">
            <div class="book-detail">
                <div class="book-detail-content">
                    <div class="book-detail-image">
                        <div class="book-cover-large">${book.cover}</div>
                    </div>
                    
                    <div class="book-detail-info">
                        <h1 class="book-detail-title">${book.title}</h1>
                        <p class="book-detail-author">por ${book.author}</p>
                        
                        <div class="book-rating mb-3">
                            ${renderStars(book.rating)}
                            <span class="rating-text">(${book.rating}/5)</span>
                        </div>
                        
                        <div class="book-price mb-4">
                            <span class="price-current">R$ ${book.price.toFixed(2)}</span>
                            ${book.originalPrice ? `<span class="price-original">R$ ${book.originalPrice.toFixed(2)}</span>` : ''}
                        </div>
                        
                        <div class="book-actions">
                            <button class="btn btn-primary add-to-cart" data-book-id="${book.id}">
                                🛒 Adicionar ao Carrinho
                            </button>
                            <button class="btn btn-ghost wishlist-btn" data-book-id="${book.id}">
                                ${wishlistItems.includes(book.id) ? '❤️' : '🤍'} Lista de Desejos
                            </button>
                        </div>
                        
                        <div class="book-description">
                            <h3>Descrição</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
                        </div>
                        
                        <div class="book-details">
                            <h3>Detalhes do Produto</h3>
                            <ul>
                                <li><strong>Autor:</strong> ${book.author}</li>
                                <li><strong>Categoria:</strong> ${getCategoryName(book.category)}</li>
                                <li><strong>Gênero:</strong> ${book.genre}</li>
                                <li><strong>Páginas:</strong> 320</li>
                                <li><strong>Editora:</strong> Editora Exemplo</li>
                                <li><strong>ISBN:</strong> 978-85-123-4567-8</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div class="related-books">
                    <h2>Livros Relacionados</h2>
                    <div class="books-grid">
                        ${renderBooks(getRelatedBooks(book))}
                    </div>
                </div>
            </div>
        </div>
        
        <style>
            .book-detail {
                margin: 2rem 0;
            }
            
            .book-detail-content {
                display: grid;
                grid-template-columns: 300px 1fr;
                gap: 3rem;
                margin-bottom: 3rem;
            }
            
            .book-cover-large {
                width: 100%;
                height: 400px;
                background: var(--light-gray);
                border-radius: var(--border-radius);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 6rem;
                border: 1px solid var(--medium-gray);
            }
            
            .book-detail-title {
                font-size: 2.5rem;
                font-weight: bold;
                margin-bottom: 0.5rem;
                color: var(--black);
            }
            
            .book-detail-author {
                font-size: 1.25rem;
                color: var(--secondary-color);
                margin-bottom: 1rem;
            }
            
            .book-actions {
                display: flex;
                gap: 1rem;
                margin-bottom: 2rem;
            }
            
            .book-description,
            .book-details {
                margin-bottom: 2rem;
            }
            
            .book-description h3,
            .book-details h3 {
                font-size: 1.25rem;
                font-weight: 600;
                margin-bottom: 1rem;
                color: var(--black);
            }
            
            .book-details ul {
                list-style: none;
            }
            
            .book-details li {
                padding: 0.5rem 0;
                border-bottom: 1px solid var(--medium-gray);
            }
            
            .related-books {
                border-top: 1px solid var(--medium-gray);
                padding-top: 2rem;
            }
            
            .related-books h2 {
                margin-bottom: 1.5rem;
            }
            
            @media (max-width: 768px) {
                .book-detail-content {
                    grid-template-columns: 1fr;
                    gap: 2rem;
                }
                
                .book-cover-large {
                    height: 300px;
                    font-size: 4rem;
                }
                
                .book-detail-title {
                    font-size: 2rem;
                }
                
                .book-actions {
                    flex-direction: column;
                }
            }
        </style>
    `;
    
    updateBreadcrumb([
        { text: 'Início', href: '/' },
        { text: 'Livros', href: '/livros' },
        { text: book.title, current: true }
    ]);
}

function renderNotFound() {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
        <div class="container text-center" style="padding: 4rem 0;">
            <h1>Página não encontrada</h1>
            <p>O livro que você está procurando não foi encontrado.</p>
            <button class="btn btn-primary" onclick="navigateTo('/')">Voltar ao Início</button>
        </div>
    `;
}

function renderCategories() {
    return categoriesData.map(category => `
        <div class="category-card" data-category="${category.id}">
            <div class="category-icon">${category.icon}</div>
            <div class="category-title">${category.name}</div>
            <div class="category-count">${category.count} livros</div>
        </div>
    `).join('');
}

function renderBooks(books) {
    return books.map(book => `
        <div class="book-card" data-book-id="${book.id}">
            <button class="wishlist-btn" data-book-id="${book.id}">
                ${wishlistItems.includes(book.id) ? '❤️' : '🤍'}
            </button>
            <div class="book-cover">${book.cover}</div>
            <h3 class="book-title">${book.title}</h3>
            <p class="book-author">${book.author}</p>
            <div class="book-rating">
                ${renderStars(book.rating)}
            </div>
            <div class="book-price">
                <span class="price-current">R$ ${book.price.toFixed(2)}</span>
                ${book.originalPrice ? `<span class="price-original">R$ ${book.originalPrice.toFixed(2)}</span>` : ''}
            </div>
            <button class="btn btn-primary w-full add-to-cart" data-book-id="${book.id}">
                Adicionar ao Carrinho
            </button>
        </div>
    `).join('');
}

function renderStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let stars = '';
    for (let i = 0; i < fullStars; i++) {
        stars += '<span class="star">★</span>';
    }
    if (hasHalfStar) {
        stars += '<span class="star">☆</span>';
    }
    for (let i = 0; i < emptyStars; i++) {
        stars += '<span class="star empty">☆</span>';
    }
    
    return stars;
}

function renderFilters() {
    return `
        <div class="sidebar-title">
            Filtros
            <button class="btn btn-ghost" onclick="clearFilters()">Limpar</button>
        </div>
        
        <div class="filter-section">
            <div class="filter-title">Categorias</div>
            <div class="filter-content">
                <div class="checkbox-group">
                    ${categoriesData.map(category => `
                        <div class="checkbox-item">
                            <input type="checkbox" id="cat-${category.id}" name="category" value="${category.id}" 
                                   ${currentFilters.category === category.id ? 'checked' : ''}>
                            <label for="cat-${category.id}">${category.name} (${category.count})</label>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
        
        <div class="filter-section">
            <div class="filter-title">Faixa de Preço</div>
            <div class="filter-content">
                <div class="price-range">
                    <input type="range" id="priceSlider" class="range-slider" 
                           min="0" max="200" value="${currentFilters.priceMax}" step="10">
                    <div class="range-values">
                        <span>R$ 0</span>
                        <span id="priceValue">R$ ${currentFilters.priceMax}</span>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="filter-section">
            <div class="filter-title">Avaliação</div>
            <div class="filter-content">
                <div class="checkbox-group">
                    <div class="checkbox-item">
                        <input type="checkbox" id="rating-4" name="rating" value="4">
                        <label for="rating-4">★★★★☆ 4+ estrelas</label>
                    </div>
                    <div class="checkbox-item">
                        <input type="checkbox" id="rating-3" name="rating" value="3">
                        <label for="rating-3">★★★☆☆ 3+ estrelas</label>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderPagination() {
    return `
        <div class="pagination">
            <button class="pagination-btn" disabled>« Anterior</button>
            <button class="pagination-btn active">1</button>
            <button class="pagination-btn">2</button>
            <button class="pagination-btn">3</button>
            <button class="pagination-btn">Próximo »</button>
        </div>
    `;
}

function updateBreadcrumb(items) {
    const breadcrumb = document.getElementById('breadcrumb');
    if (!breadcrumb) return;
    
    breadcrumb.innerHTML = items.map(item => `
        <span class="breadcrumb-item">
            ${item.current ? 
                `<span class="breadcrumb-current">${item.text}</span>` :
                `<a href="${item.href}" class="breadcrumb-link">${item.text}</a>`
            }
        </span>
    `).join('');
}

// Funções de filtro e busca
function filterBooks() {
    let filtered = [...booksData];
    
    // Filtro por categoria
    if (currentFilters.category) {
        filtered = filtered.filter(book => book.category === currentFilters.category);
    }
    
    // Filtro por preço
    filtered = filtered.filter(book => 
        book.price >= currentFilters.priceMin && book.price <= currentFilters.priceMax
    );
    
    // Filtro por avaliação
    if (currentFilters.rating > 0) {
        filtered = filtered.filter(book => book.rating >= currentFilters.rating);
    }
    
    // Ordenação
    switch (currentFilters.sortBy) {
        case 'price-asc':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filtered.sort((a, b) => b.rating - a.rating);
            break;
        case 'title':
            filtered.sort((a, b) => a.title.localeCompare(b.title));
            break;
    }
    
    return filtered;
}

function handleSearch() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.toLowerCase().trim();
    
    if (query) {
        // Simular busca - em uma aplicação real, isso seria uma chamada para API
        console.log('Buscando por:', query);
        navigateToBooks();
    }
}

function handleCategoryFilter(checkbox) {
    if (checkbox.checked) {
        // Desmarcar outros checkboxes de categoria
        document.querySelectorAll('input[name="category"]').forEach(cb => {
            if (cb !== checkbox) cb.checked = false;
        });
        currentFilters.category = checkbox.value;
    } else {
        currentFilters.category = '';
    }
    
    if (currentPage === 'books') {
        renderBooksPage();
    }
}

function handleRatingFilter(checkbox) {
    currentFilters.rating = checkbox.checked ? parseInt(checkbox.value) : 0;
    
    if (currentPage === 'books') {
        renderBooksPage();
    }
}

function handlePriceFilter(slider) {
    currentFilters.priceMax = parseInt(slider.value);
    document.getElementById('priceValue').textContent = `R$ ${slider.value}`;
    
    if (currentPage === 'books') {
        renderBooksPage();
    }
}

function handleSortChange(sortBy) {
    currentFilters.sortBy = sortBy;
    
    if (currentPage === 'books') {
        renderBooksPage();
    }
}

function clearFilters() {
    currentFilters = {
        category: '',
        priceMin: 0,
        priceMax: 200,
        rating: 0,
        sortBy: 'relevance'
    };
    
    if (currentPage === 'books') {
        renderBooksPage();
    }
}

// Funções do carrinho
function addToCart(bookId) {
    const book = booksData.find(b => b.id === bookId);
    if (book) {
        cartItems.push(book);
        updateCartCount();
        showNotification(`"${book.title}" foi adicionado ao carrinho!`);
    }
}

function toggleWishlist(bookId) {
    const index = wishlistItems.indexOf(bookId);
    if (index > -1) {
        wishlistItems.splice(index, 1);
        showNotification('Removido da lista de desejos');
    } else {
        wishlistItems.push(bookId);
        showNotification('Adicionado à lista de desejos');
    }
    
    // Atualizar ícones de wishlist
    document.querySelectorAll(`[data-book-id="${bookId}"]`).forEach(btn => {
        if (btn.classList.contains('wishlist-btn')) {
            btn.innerHTML = wishlistItems.includes(bookId) ? '❤️' : '🤍';
        }
    });
}

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        cartCount.textContent = cartItems.length;
        cartCount.style.display = cartItems.length > 0 ? 'flex' : 'none';
    }
}

function showNotification(message) {
    // Criar notificação temporária
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Funções auxiliares
function getCategoryName(categoryId) {
    const category = categoriesData.find(c => c.id === categoryId);
    return category ? category.name : categoryId;
}

function getRelatedBooks(book) {
    return booksData
        .filter(b => b.id !== book.id && (b.category === book.category || b.genre === book.genre))
        .slice(0, 4);
}

// Adicionar estilos de animação
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);