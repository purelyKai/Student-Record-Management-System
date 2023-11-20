document.addEventListener('DOMContentLoaded', function () {
    const goBackButton = document.getElementById('go-back-button');


    function logOut(){
        location.href="../Login_Page/Login.html";
    }
    
    function returnToDash(){
        location.href="../Dashboard_Page/HomeScreen.html";
    }

    goBackButton.addEventListener('click', function () {
        // Go back to the previous page
        history.back();
    });
});