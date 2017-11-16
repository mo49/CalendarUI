import $ from 'jquery';
import _ from 'lodash';
import label from '../config/label';
import Month from './Month';
import LabelSingleton from '../data/LabelSingleton';

/*
[機能]
・本日を仮想の日時に設定できる
・今年/今月/今日の3パターン
・好きな曜日始まりにできる
*/

/*
TODO: 
DateとLabelをSingletonにして複数クラスから参照できるようにする
値のセットはCalendarクラスのコンストラクタの中で行う
*/

export default class Calendar {

    static MAX_MONTH = 12;
    static MAX_DAY = 31;

    constructor(opts={}) {
        this.$calendar = opts.$calendar || $('#calendar') || $(document.createElement('div'));
        this.type = opts.type || 'year'; // year, month, day

        this.setDate(opts.virtual);

        this.columnNum = isNaN(opts.columnNum) ? 7 : opts.columnNum;
        this.monthRange = isNaN(opts.monthRange) ? null : opts.monthRange;
        this.dayRange = isNaN(opts.dayRange) ? null : opts.dayRange;

        LabelSingleton.month = opts.lang ? opts.lang.month || 'ja' : 'ja';
        LabelSingleton.week = opts.lang ? opts.lang.week || 'en' : 'en';

        this.createCalendar();
    }

    setDate(virtual) {
        if(
            // YYYY/MM/DD がすべてあれば仮想の日時を設定
            virtual &&
            (/^[0-9]{4}$/).test(virtual.year) &&
            _.inRange(virtual.month, 1, Calendar.MAX_MONTH + 1) &&
            _.inRange(virtual.today, 1, Calendar.MAX_DAY + 1)
        ) {
            this.year = virtual.year;
            this.month = virtual.month;
            this.today = virtual.today;
            this.date = new Date(this.year, this.month - 1, this.today);
        } else {
            this.date = new Date();
            this.year = this.date.getFullYear();
            this.month = this.date.getMonth() + 1;
            this.today = this.date.getDate();
        }
    }

    createCalendar() {
        switch (this.type) {
            case 'year': this.createYearCalendar(); break;
            case 'month': this.createMonthCalendar(); break;
            case 'day': this.createDayCalendar(); break;
        }
    }

    createYearCalendar() {
        this.$calendar.append($(`<p class='calendar__year'>${this.year}</p>`));
        for(let i = 1; i <= Calendar.MAX_MONTH; i++) {
            if(this.monthRange){
                let offset = Math.floor(this.monthRange/2);
                if(_.inRange(i, this.month - offset, this.month + offset + 1)){
                    this.insertMonth(i);
                }
                continue;
            }
            this.insertMonth(i);
        }
    }

    createMonthCalendar() {
        // this.$calendar.append($(`<p class='calendar__year'>${this.year}</p>`));
        this.insertMonth(this.month);
    }

    createDayCalendar() {
        // 必ずしもcolumnは7ではないので、weekではなくone-linerと命名
        this.insertOneLiner();
    }

    insertMonth(index) {
        const month = new Month({
            date: this.date,
            columnNum : this.columnNum,
        });
        const monthTable = month.createMonth(index);
        this.$calendar.append(monthTable);
    }

    insertOneLiner() {
        // const oneLiner = new OneLiner({})
        // const oneLinerTable = oneLiner.createOneLiner(this.dayRange);
        // this.$calendar.append(oneLinerTable);
    }

}

/*
http://www.frontendmemo.xyz/entry/2017/02/04/044306
*/
