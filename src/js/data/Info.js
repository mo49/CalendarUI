module.exports = {
    // 順番変わることはない
    month:{
        ja: [
            '1月',
            '2月',
            '3月',
            '4月',
            '5月',
            '6月',
            '7月',
            '8月',
            '9月',
            '10月',
            '11月',
            '12月'
        ],
        en: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ],
    },
    // 順番変わることはありうる
    week:{
        ja: [
            { 0: '日' },
            { 1: '月' },
            { 2: '火' },
            { 3: '水' },
            { 4: '木' },
            { 5: '金' },
            { 6: '土' }
        ],
        en: [
            { 0: 'Sun' },
            { 1: 'Mon' },
            { 2: 'Tue' },
            { 3: 'Wed' },
            { 4: 'Thu' },
            { 5: 'Fri' },
            { 6: 'Sat' }
        ],
    },
    label:{
        month:{},
        week:{}
    },
    columnNum: 7,
    monthRange: null,
    dayRange: null,
    firstDayOfWeekOffset: 0,
}
