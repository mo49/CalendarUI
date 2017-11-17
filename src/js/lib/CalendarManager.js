import $ from 'jquery';
import Calendar from './Calendar';

class CalendarManager {

    constructor(){
        this.init();
    }

    init() {
        const calendar = new Calendar({
            $calendar: $(".calendar[data-type='year']"),
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
        calendar.createYearCalendar($(`.calendar[data-type="year"]`));

        const zoomMonth = `.calendar[data-type="year"] .js-zoom-month`;
        const zoomDay = `.calendar[data-type="month"] .js-zoom-day`;
    
        // 年間カレンダーの中の月をクリック
        $(document).delegate(zoomMonth, 'click', evt => {
            const monthIndex = evt.currentTarget.getAttribute("data-month-index") | 0;
            calendar.createMonthCalendar($(`.calendar[data-type="month"]`), monthIndex);
        })
    
        // 月間カレンダーの中の日にちをクリック
        $(document).delegate(zoomDay, 'click', evt => {
            const dayIndex = evt.currentTarget.getAttribute("data-day-index") | 0;
            calendar.createDayCalendar($(`.calendar[data-type="day"]`), dayIndex);
        })
    }
}

module.exports = new CalendarManager();


/*
http://www.frontendmemo.xyz/entry/2017/02/04/044306
http://phiary.me/js-get-month-days/
*/
