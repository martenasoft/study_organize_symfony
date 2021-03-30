
if (window.jwtToken == '') {
    window.document.location.href('/login');
}

window.userLogin = function(obj, login, password) {
    console.log(login, password);
}
