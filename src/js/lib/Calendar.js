import $ from 'jquery';
import _ from 'lodash';
import info from '../data/Info';
import ds from '../data/DateSingleton';
import Month from './Month';

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
            dayRange: isNaN(opts.dayRange) ? null : opts.dayRange,
            firstDayOfWeekOffset: isNaN(opts.firstDayOfWeekOffset) ? null : opts.firstDayOfWeekOffset,
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
        this.insertYearLabel($target);
        this.insertMonth($target, monthIndex);
    }

    createDayCalendar($target) {
        if(!$target){
            return;
        }
        // 必ずしもcolumnは7ではないので、weekではなくone-linerと命名
        this.insertOneLiner($target);
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

    insertOneLiner($target) {
        // const oneLiner = new OneLiner({})
        // const oneLinerTable = oneLiner.createOneLiner(info.dayRange);
        // $target.append(oneLinerTable);
    }

}
