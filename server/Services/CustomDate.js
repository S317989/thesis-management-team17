const dateObject = new Date()

class CustomDate {
    constructor() {
        if (!CustomDate.instance) {
            CustomDate.instance = this;
        }
        this._date = dateObject.toJSON().slice(0, 10);
        return CustomDate.instance;
    }

    set date(newDate) {
        this._date = newDate;
    }

    resetDate() {
        this._date = dateObject.toJSON().slice(0, 10);
    }

    get date() {
        return this._date;
    }
}

const instance = new CustomDate();
module.exports = instance;