// let _instance = null;

// module.exports = class Singleton {
//     constructor() {
//         console.log('_instance : ', _instance);
//         if(_instance) {
//             throw new Error('instance exist.');
//         } else {
//             _instance = this;
//         }
//         return _instance;
//     }

//     static instance() {
//         console.log('static instance : ', _instance);
//         if(_instance === null) {
//             _instance = new Singleton();
//         }
//         return _instance;
//     }

//     get score() {
//         console.log("get score : ", this.score);
//         return this.score;
//     }

//     set score(score) {
//         console.log("set score : ", score);
//         this.score = score;
//     }
// }

class Singleton {
    constructor() {
        this._score = 0;
        console.log("generate instance.");
    }

    set score(_score) {
        console.log("set score : ", _score);
        this._score = _score;
    }

    get score() {
        console.log("get score : ", this._score);
        return this._score;
    }
}

export default new Singleton();
