import {
    initializeMaterializecss
} from './libraries/initialize-materializecss.js';
import {
    fixMaterializecssSelect
} from './libraries/fix-materializecss-select.js';

class App {
    constructor() {
        initializeMaterializecss();
        fixMaterializecssSelect();
    }
}

new App();