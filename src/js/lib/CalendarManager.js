import $ from 'jquery';
import Calendar from './Calendar';

class CalendarManager {

    constructor(){
        this.init();
    }

    init() {
        const calendar = new Calendar({
            $calendar: $(".calendar[data-type='year']"),
            // monthRange: 1, // 年カレンダーの表示数（奇数のみ）
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
    
        // 年カレンダーの中の月をクリック
        $(`.calendar[data-type="year"] table`).on("click", evt => {
            const monthIndex = evt.currentTarget.getAttribute("data-month-index");
            calendar.createMonthCalendar($(`.calendar[data-type="month"]`), monthIndex);
        })
    
        // 月カレンダーの中の日にちをクリック
        // new Calendar({
        //     $calendar: $(".calendar[data-type='day']"),
        //     type: 'day',
        //     // 日を渡す
        // });
    }
}

module.exports = new CalendarManager();


/*
http://www.frontendmemo.xyz/entry/2017/02/04/044306
*/
