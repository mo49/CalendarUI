import $ from 'jquery';
import Calendar from './lib/Calendar';

/*
検討
別ブランチ

new Calendarで年・月・今日をつくれるようにする
３つのカレンダーに設定が共有されることが重要
calendar = new Calendar({
    // 設定はここで一回のみ
    $yearTarget
    $monthTarget
    $todayTarget
})
calendar.createYearCalendar() みたいな

カレンダーを2こ作ったときに崩壊するのでinfo.jsはだめ


*/

(() => {

    new Calendar({
        $calendar: $(".calendar[data-type='year']"),
        type: 'year',
        // monthRange: 1, // 年カレンダーの表示数（奇数のみ）
        // dayRange: 5, // 日カレンダーの表示数（5 or 7）
        virtual:{
            year: 2020,
            month: 10,
            today: 1,
        },
        // lang:{
        //     month: 'en',
        //     // week: 'ja',
        // },
        // firstDayOfWeekOffset: 1, // 曜日始まりが1つ右にずれる
    });

    // new Calendar({
    //     $calendar: $(".calendar[data-type='year']"),
    //     type: 'year',
    //     virtual:{
    //         year: 2030,
    //         month: 12,
    //         today: 31,
    //     },
    // });

    // 年カレンダーの中の月をクリック
    $(`.calendar[data-type="year"] table`).on("click", evt => {
        $(`.calendar[data-type="month"]`).empty();
        const monthIndex = evt.currentTarget.getAttribute("data-month-index");
        new Calendar({
            $calendar: $(".calendar[data-type='month']"),
            type: 'month',
            // 月を渡す monthIndex
        });
    })


    // 月カレンダーの中の日にちをクリック
    new Calendar({
        $calendar: $(".calendar[data-type='day']"),
        type: 'day',
        // 日を渡す
    });

})()

/*
http://www.frontendmemo.xyz/entry/2017/02/04/044306
*/
