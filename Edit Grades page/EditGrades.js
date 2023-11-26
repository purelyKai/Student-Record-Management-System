document.addEventListener('DOMContentLoaded', function () {
    const goBackButton = document.getElementById('go-back-button');

    goBackButton.addEventListener('click', function () {
        // Go back to the previous page
        history.back();
    });
});