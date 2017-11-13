// Build app like you normally would;
(function() {
    var app = {
        init: function(){
            console.log('initing');
            document.querySelector('.page__title').innerHTML = 'Grapejuice!';
            document.querySelector('.page__description').innerHTML = 'It\'s ready to go! :)';
        }
    }

    app.init();
})();