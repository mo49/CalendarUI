import $ from 'jquery';
import _ from 'lodash';
import ds from '../data/DateSingleton';

export default class OneLiner {
    constructor(opts={}) {
        this.info = opts.info || null;
    }

    createOneLiner() {

        for (let i = 0; i < this.info.dayRange; i++) {
            console.log(i);
        }
        // return table;
    }

    insertWeekLabel() {

    }
}
