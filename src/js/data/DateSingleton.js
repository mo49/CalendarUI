import _ from 'lodash';

/**
 * カレンダーを複数つくったとしても、
 * "今"という瞬間はユニークなのでシングルトン
 */

class DateSingleton {

    static MAX_MONTH = 12;
    static MAX_DAY = 31;
    
    constructor() {
        console.log("generate DateSingleton instance.");
        this._date  = null
        this._base  = null;
        this._year  = null;
        this._month = null;
        this._today = null;
    }

    set date(_virtual) {
        if(
            // YYYY/MM/DD がすべてあれば仮想の日時を設定
            _virtual &&
            (/^[0-9]{4}$/).test(_virtual.year) &&
            _.inRange(_virtual.month, 1, DateSingleton.MAX_MONTH + 1) &&
            _.inRange(_virtual.today, 1, DateSingleton.MAX_DAY + 1)
        ) {
            this._year = _virtual.year;
            this._month = _virtual.month;
            this._today = _virtual.today;
            this._base = new Date(this._year, this._month - 1, this._today);
        } else {
            this._base = new Date();
            this._year = this._base.getFullYear();
            this._month = this._base.getMonth() + 1;
            this._today = this._base.getDate();
        }

        this._date = {
            date: this._base,
            year: this._year,
            month: this._month,
            today: this._today,
        }
    }

    get date() {
        return this._date;
    }
}

export default new DateSingleton();
