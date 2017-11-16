import $ from 'jquery';
import Calendar from './lib/Calendar';

(() => {
    new Calendar({
        $calendar: $(".calendar[data-type='year']"),
        // monthRange: 1, // 奇数のみ
        // dayRange: 5, // 5 or 7
        // type: 'month',
        // virtual:{
        //     year: 2020,
        //     month: 10,
        //     // today: 1,
        // },
        // lang:{
        //     month: 'en',
        //     // week: 'ja',
        // },
    });
    new Calendar({
        $calendar: $(".calendar[data-type='month']"),
        type: 'month',
    });
    new Calendar({
        $calendar: $(".calendar[data-type='day']"),
        type: 'day',
    });
})()
