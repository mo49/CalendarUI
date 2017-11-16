import $ from 'jquery';
import _ from 'lodash';
import label from '../config/label';
import LabelSingleton from '../data/LabelSingleton';


export default class Month {
    constructor(opts={}) {
        this.date = opts.date;
        this.year = this.date.getFullYear();
        this.month = this.date.getMonth() + 1;
        this.today = this.date.getDate();

        this.columnNum = opts.columnNum;

        // LabelSingleton.month;
    }

    createMonth(month) {
        const date = new Date(this.year, month - 1, 1);

        // その月の1日が何曜日なのか / 日 ~ 土 0 ~ 6
        const firstDayWeekIndex = date.getDay();

        // その月の日数
        const dayNum = this.getMonthDays(this.year, month);

        // その月の行数
        const rowNum = this.getMonthRows(firstDayWeekIndex, dayNum);

        // その月のすべてのセル（空も含める）
        let cells = new Array(rowNum * this.columnNum);
        // 日付を入れる
        for(let i = 0; i < dayNum; i++) {
            cells[i+firstDayWeekIndex] = i+1;
        }

        return this.createTable(month, rowNum, cells);
    }

    createTable(month, rowNum, cells) {
        let $table = $(`<table data-month-index="${month}"><tbody></tbody></table>`);
        this.insertTitle($table, month);
        this.insertWeekLabel();

        for(let i = 0; i < rowNum; i++) {
            let $tr = $(`<tr data-row-index="${i+1}"></tr>`);
            for(let j = 0; j < this.columnNum; j++) {
                let day = cells[j+(i*this.columnNum)];
                let $td = day 
                    ? $(`<td data-day-index="${day}">${day}</td>`)
                    : $(`<td></td>`);
                $tr.append($td);
            }
            $table.append($tr);
        }
        return $table;
    }

    insertTitle($table, month) {
        $table.append(
            $(`<tr data-month-index="${month}">
                <td colspan="${this.columnNum}">${label.month.ja[month-1]}</td>
            </tr>`)
        );
    }

    insertWeekLabel() {

    }

    getMonthDays(year, month) {
        return new Date(year, month, 0).getDate();
    }

    getMonthRows(firstDayWeekIndex, dayNum) {
        // row = ceil ( その月の1日のオフセット ＋ その月の日数 / 列数 )
        return Math.ceil((firstDayWeekIndex + dayNum) / this.columnNum);
    }

}
