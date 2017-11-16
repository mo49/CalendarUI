import $ from 'jquery';
import Calendar from './lib/Calendar';

(() => {
    new Calendar({
        // lang: 'en'
        // monthRange: 1, // 奇数のみ
        // dayRange: 5, // 5 or 7
        // type: 'month',
        virtual:{
            year: 2018,
            month: 10,
            // today: 1,
        }
    });
})()
