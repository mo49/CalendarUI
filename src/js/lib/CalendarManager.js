import $ from 'jquery';
import Calendar from './Calendar';

class CalendarManager {

    constructor(){
        this.init();
    }

    init() {
        const CALENDAR_YEAR = `.calendar[data-type="year"]`;
        const CALENDAR_MONTH = `.calendar[data-type="month"]`;
        const CALENDAR_DAY = `.calendar[data-type="day"]`;

        const zoomMonth = `${CALENDAR_YEAR} .js-zoom-month`;
        const zoomDay = `${CALENDAR_MONTH} .js-zoom-day`;
        const changeDay = `${CALENDAR_DAY} .js-change-day`;

        const calendar = new Calendar({
            // monthRange: 5, // 年カレンダーの表示数（奇数のみ）
            // dayRange: 5, // 日カレンダーの表示数（5 or 7）
            // virtual:{
            //     year: 2020,
            //     month: 10,
            //     today: 1,
            // },
            // lang:{
            //     month: 'en',
            //     week: 'ja',
            // },
            // firstDayOfWeekOffset: 1, // 曜日始まりが1つ右にずれる
        });
        calendar.createYearCalendar($(CALENDAR_YEAR));
    
        // 年間カレンダーの中の月をクリック
        $(document).delegate(zoomMonth, 'click', evt => {
            let monthIndex = evt.currentTarget.getAttribute("data-month-index") | 0;
            calendar.createMonthCalendar($(CALENDAR_MONTH), monthIndex);
        })
    
        // 月間カレンダーの中の日にちをクリック
        $(document).delegate(zoomDay, 'click', evt => {
            let monthIndex = $(`${CALENDAR_MONTH} table`).attr("data-month-index") | 0;
            let dayIndex = evt.currentTarget.getAttribute("data-day-index") | 0;
            calendar.createDayCalendar($(CALENDAR_DAY), monthIndex, dayIndex);
        })

        // 月間カレンダーの中の日にちをクリック
        $(document).delegate(changeDay, 'click', evt => {
            let monthIndex = $(`${CALENDAR_DAY}`).attr("data-month-index") | 0;
            let dayIndex = evt.currentTarget.textContent | 0;
            calendar.createDayCalendar($(CALENDAR_DAY), monthIndex, dayIndex);
        })

    }
}

module.exports = new CalendarManager();


/*
http://www.frontendmemo.xyz/entry/2017/02/04/044306
http://phiary.me/js-get-month-days/
*/
