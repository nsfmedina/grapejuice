const moment = require('moment');

(() => {
    const app = {
        init(){
            console.log('initing');
            document.querySelector('.container').innerHTML = 'Welcome!!';
        }
    }

    app.init();
})();