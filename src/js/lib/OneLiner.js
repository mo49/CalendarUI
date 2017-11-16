import $ from 'jquery';
import _ from 'lodash';
import ds from '../data/DateSingleton';

export default class OneLiner {
    constructor(opts={}) {
        this.info = opts.info || null;
    }
}
