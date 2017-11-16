import $ from 'jquery';
import _ from 'lodash';
import info from '../data/Info';
import DateSingleton from '../data/DateSingleton';
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
        this.$calendar = opts.$calendar || $('.calendar') || $(document.createElement('div'));
        this.type = opts.type || 'year'; // year, month, day

        this.columnNum = isNaN(opts.columnNum) ? 7 : opts.columnNum;
        this.monthRange = isNaN(opts.monthRange) ? info.monthRange : opts.monthRange;
        this.dayRange = isNaN(opts.dayRange) ? info.dayRange : opts.dayRange;

        info.label.month = opts.lang ? info.month[opts.lang.month] : info.month.ja;
        info.label.week = opts.lang ? info.week[opts.lang.week] : info.week.en;

        DateSingleton.date = opts.virtual;
        this.dd = DateSingleton.date;

        if(opts.firstDayOfWeekOffset) {
            info.firstDayOfWeekOffset = opts.firstDayOfWeekOffset;
            for (let i = 0; i < info.firstDayOfWeekOffset; i++) {
                info.label.week.unshift(info.label.week.pop());
            }
        }

        this.init();
    }

    init() {
        this.$calendar.attr("data-type", this.type);
        this.createCalendar();
    }

    createCalendar() {
        switch (this.type) {
            case 'year': this.createYearCalendar(); break;
            case 'month': this.createMonthCalendar(); break;
            case 'day': this.createDayCalendar(); break;
        }
    }

    createYearCalendar() {
        this.insertYearLabel();
        for(let i = 1; i <= Calendar.MAX_MONTH; i++) {
            if(this.monthRange){
                let offset = Math.floor(this.monthRange/2);
                if(_.inRange(i, this.dd.month - offset, this.dd.month + offset + 1)){
                    this.insertMonth(i);
                }
                continue;
            }
            this.insertMonth(i);
        }
    }

    createMonthCalendar() {
        this.insertYearLabel();
        this.insertMonth(this.dd.month);
    }

    createDayCalendar() {
        // 必ずしもcolumnは7ではないので、weekではなくone-linerと命名
        this.insertOneLiner();
    }

    insertYearLabel() {
        this.$calendar.append($(`<p class='calendar__year'>${this.dd.year}</p>`));
    }

    insertMonth(index) {
        const monthTable = new Month().createMonth(index);
        this.$calendar.append(monthTable);
    }

    insertOneLiner() {
        // const oneLiner = new OneLiner({})
        // const oneLinerTable = oneLiner.createOneLiner(info.dayRange);
        // this.$calendar.append(oneLinerTable);
    }

}
