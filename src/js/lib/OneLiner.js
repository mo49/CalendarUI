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
        this.$table = $(`<div></div>`);
        const selectedDate = new Date(ds.year, monthIndex - 1, dayIndex);
        const dayNum = new Date(ds.year, monthIndex, 0).getDate();
        const centerId = Math.ceil(this.info.dayRange / 2); // 5 -> 3
        const startDayIndex = dayIndex - centerId;
        const firstDayOfWeekIndex = this.getDayOfWeekIndex(selectedDate.getDay() - centerId + 1);

        this.insertMonthLabel(monthIndex);
        this.insertWeekLabel(firstDayOfWeekIndex);

        for (let i = 1; i <= this.info.dayRange; i++) {
            let dayIndex = startDayIndex + i;
            let $td = $(`<span class="calendar__day" data-oneliner-index="${i}"></span>`);
            if(i === centerId){
                $td.addClass("is-center");
            }
            if(0 < dayIndex && dayIndex <= dayNum){
                $td.text(dayIndex);
                $td.addClass("js-change-day");
            }
            this.$table.append($td);
        }
        return this.$table;
    }

    insertMonthLabel(month) {
        let $tr = 
            $(`<div class="calendar__month" data-month-index="${month}">
                <span>
                    ${this.info.label.month[month-1]}
                </span>
            </div>`);
        this.$table.append($tr);
    }

    insertWeekLabel(firstDayOfWeekIndex) {
        let week = info.week[this.info.lang.week];
        let $tr = $(`<div class="calendar__week"></div>`);
        for (let i = 0; i < this.info.dayRange; i++) {
            let key = this.getDayOfWeekIndex(firstDayOfWeekIndex + i);
            let $td = $(`<span class="calendar__week__day" data-dayofweek-type="${key}">${week[key][key]}</span>`);
            $tr.append($td);
        }
        this.$table.append($tr);
    }

    getDayOfWeekIndex(day) {
        const DAY_NUM = 7;
        // under
        if(day < 0) {
            day = DAY_NUM + (day%DAY_NUM);
        }
        // over
        if(day >= DAY_NUM) {
            day = day%7;
        }
        return day;
    }
}
