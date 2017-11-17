import $ from 'jquery';
import _ from 'lodash';
import info from '../data/Info';
import ds from '../data/DateSingleton';
import Month from './Month';
import OneLiner from './OneLiner';

/*
[機能]
・本日を仮想の日時に設定できる
・今年/今月/今日の3パターン
・好きな曜日始まりにできる
*/

export default class Calendar {

    static MAX_MONTH = 12;

    constructor(opts={}) {
        ds.date = opts.virtual;
        
        this.info = {
            columnNum: isNaN(opts.columnNum) ? 7 : opts.columnNum,
            monthRange: isNaN(opts.monthRange) ? null : opts.monthRange,
            dayRange: isNaN(opts.dayRange) ? 7 : opts.dayRange,
            firstDayOfWeekOffset: isNaN(opts.firstDayOfWeekOffset) ? null : opts.firstDayOfWeekOffset,
            lang: {
                month: opts.lang ? opts.lang.month || 'ja' : 'ja',
                week: opts.lang ? opts.lang.week || 'en' : 'en',
            },
            label: {
                month: opts.lang ? info.month[opts.lang.month] || info.month.ja : info.month.ja,
                week: opts.lang ? info.week[opts.lang.week] || info.week.en : info.week.en,
            },
        }

        if(this.info.firstDayOfWeekOffset) {
            for (let i = 0; i < this.info.firstDayOfWeekOffset; i++) {
                this.info.label.week.unshift(this.info.label.week.pop());
            }
        }
    }

    createYearCalendar($target) {
        if(!$target){
            return;
        }
        this.insertYearLabel($target);
        for(let i = 1; i <= Calendar.MAX_MONTH; i++) {
            if(this.info.monthRange){
                let offset = Math.floor(this.info.monthRange/2);
                if(_.inRange(i, ds.month - offset, ds.month + offset + 1)){
                    this.insertMonth($target, i);
                }
                continue;
            }
            this.insertMonth($target, i);
        }
    }

    createMonthCalendar($target, monthIndex) {
        if(!$target){
            return;
        }
        $target.empty();
        $target.attr("data-month-index", monthIndex);
        this.insertYearLabel($target);
        this.insertMonth($target, monthIndex);
    }

    createDayCalendar($target, monthIndex, dayIndex) {
        if(!$target){
            return;
        }
        $target.empty();
        $target.attr({
            "data-month-index": monthIndex,
            "data-day-index": dayIndex
        })
        this.insertYearLabel($target);
        this.insertOneLiner($target, monthIndex, dayIndex);
    }

    insertYearLabel($target) {
        $target.append($(`<p class='calendar__year'>${ds.year}</p>`));
    }

    insertMonth($target, index) {
        const month = new Month({
            info: this.info,
        })
        const monthTable = month.createMonth(index);
        $target.append(monthTable);
    }

    insertOneLiner($target, monthIndex, dayIndex) {
        // columnは必ずしも7ではないので、weekではなくone-linerと命名
        const oneLiner = new OneLiner({
            info: this.info,
        })
        const oneLinerTable = oneLiner.createOneLiner(monthIndex, dayIndex);
        $target.append(oneLinerTable);
    }

}
