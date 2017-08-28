// Install NPM modules and call them via require();
const moment = require('moment');

// Build app like you normally would;
(() => {
    const app = {
        init(){
            console.log('initing');
            document.querySelector('.page__title').innerHTML = 'Grapejuice!';
            document.querySelector('.page__description').innerHTML = 'It\'s ready to go! :)';
        }
    }

    app.init();
})();