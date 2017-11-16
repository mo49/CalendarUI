import $ from 'jquery';
import _ from 'lodash';
import ds from '../data/DateSingleton';

export default class Month {
    constructor(opts={}) {
        this.info = opts.info || null;
        console.log(this.info);
    }

    createMonth(month) {
        const date = new Date(ds.date.year, month - 1, 1);

        // その月の1日が何曜日なのか / 日 ~ 土 0 ~ 6
        const firstDayOfWeekIndex = date.getDay() + this.info.firstDayOfWeekOffset;

        // その月の日数
        const dayNum = this.getMonthDays(ds.date.year, month);

        // その月の行数
        const rowNum = this.getMonthRows(firstDayOfWeekIndex, dayNum);

        // その月のすべてのセル（空も含める）
        let cells = new Array(rowNum * this.info.columnNum);
        // 日付を入れる
        for(let i = 0; i < dayNum; i++) {
            cells[i+firstDayOfWeekIndex] = i+1;
        }

        return this.createTable(month, rowNum, cells);
    }

    createTable(month, rowNum, cells) {
        let $table = $(`<table data-month-index="${month}"><tbody></tbody></table>`);
        this.insertMonthLabel($table, month);
        this.insertWeekLabel($table);

        for(let i = 0; i < rowNum; i++) {
            let $tr = $(`<tr data-row-index="${i+1}"></tr>`);
            for(let j = 0; j < this.info.columnNum; j++) {
                let day = cells[j+(i*this.info.columnNum)];
                let $td = day 
                    ? $(`<td data-day-index="${day}">${day}</td>`)
                    : $(`<td></td>`);
                $tr.append($td);
            }
            $table.append($tr);
        }
        return $table;
    }

    insertMonthLabel($table, month) {
        $table.append(
            $(`<tr data-month-index="${month}">
                <td colspan="${this.info.columnNum}">${this.info.label.month[month-1]}</td>
            </tr>`)
        );
    }

    insertWeekLabel($table) {
        let $tr = $(`<tr></tr>`);
        _.each(this.info.label.week, (elm,index) => {
            let key = Object.keys(elm)[0];
            $tr.append(
                $(`<td data-weekday-type="${key}">${elm[key]}</td>`)
            )
        })
        $table.append($tr);
    }

    getMonthDays(year, month) {
        return new Date(year, month, 0).getDate();
    }

    getMonthRows(firstDayOfWeekIndex, dayNum) {
        // row = ceil ( その月の1日のオフセット ＋ その月の日数 / 列数 )
        return Math.ceil((firstDayOfWeekIndex + dayNum) / this.info.columnNum);
    }

}
