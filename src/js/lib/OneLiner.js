import $ from 'jquery';
import _ from 'lodash';
import info from '../data/info';
import ds from '../data/DateSingleton';

export default class OneLiner {
    constructor(opts={}) {
        this.info = opts.info || null;
    }

    createOneLiner(monthIndex, dayIndex) {

        // 選択している日が中央にくる
        const $table = $(`<table><tr></tr></table>`);
        const selectedDate = new Date(ds.year, monthIndex - 1, dayIndex);
        const centerId = Math.ceil(this.info.dayRange / 2); // 5 -> 3
        const startDayIndex = dayIndex - centerId;
        const firstDayOfWeekIndex = this.getDayOfWeekIndex(selectedDate.getDay() - centerId + 1);

        console.log(firstDayOfWeekIndex);

        this.insertWeekLabel($table, firstDayOfWeekIndex);

        for (let i = 1; i <= this.info.dayRange; i++) {
            let $td = $(`<td data-oneliner-index="${i}"></td>`);
            if(i === centerId){
                $td.addClass("is-center");
            }
            if((startDayIndex + i) > 0){
                $td.text(startDayIndex + i);
            }
            $table.append($td);
        }
        return $table;
    }

    insertWeekLabel($table, firstDayOfWeekIndex) {
        let week = info.week[this.info.lang.week];
        let $tr = $(`<tr class="calendar__week"></tr>`);
        for (let i = 0; i < this.info.dayRange; i++) {
            let key = this.getDayOfWeekIndex(firstDayOfWeekIndex + i);
            let $td = $(`<td data-dayofweek-type="${key}">${week[key][key]}</td>`);
            $tr.append($td);
        }
        $table.append($tr);
    }

    getDayOfWeekIndex(day) {
        const WEEK_NUM = 7;
        // under
        if(day < 0) {
            day = WEEK_NUM + (day%WEEK_NUM);
        }
        // over
        if(day >= WEEK_NUM) {
            day = day%7;
        }
        return day;
    }
}
