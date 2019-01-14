import 'style-loader/lib/addStyles'

import './scss/base.scss'

var loaded = false;

window.addEventListener('click', function () {
    if (!loaded) {
        import(/*webpackChunkName:'style' */ './scss/common.scss').then(() => {
            console.log('change bg-color');
            loaded = true
        })
    }
})