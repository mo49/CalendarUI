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
            '日',
            '月',
            '火',
            '水',
            '木',
            '金',
            '土'
        ],
        en: [
            'Sun',
            'Mon',
            'Tue',
            'Wed',
            'Thu',
            'Fri',
            'Sat'
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
