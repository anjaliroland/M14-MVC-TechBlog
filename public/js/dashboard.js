document.addEventListener('DOMContentLoaded', function () {
    const newPostBtn = document.getElementById('new-post-button-dashboard');
    newPostBtn.addEventListener('click', function () {
        window.location.href = '/dashboard/new';
    });
});