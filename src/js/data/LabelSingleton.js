const LABELS = {
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
}

class LabelSingleton {
    constructor() {
        this._month = LABELS.month.ja;
        this._week = LABELS.week.ja;
        console.log("generate LabelSingleton instance.");
    }

    set month(_lang) {
        this._month = LABELS.month[_lang];
        console.log("set month : ", this.month);
    }

    get month() {
        console.log("get month : ", this._month);
        return this._month;
    }

    set week(_lang) {
        this._week = LABELS.week[_lang];
        console.log("set week : ", this.week);
    }

    get week() {
        console.log("get week : ", this._week);
        return this._week;
    }
}

export default new LabelSingleton();
