import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Настройка CSRF токена для всех запросов
// Используем DOMContentLoaded для гарантии загрузки DOM
const setupCsrfToken = () => {
    const token = document.head.querySelector('meta[name="csrf-token"]');
    if (token) {
        window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupCsrfToken);
} else {
    setupCsrfToken();
}
