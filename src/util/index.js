class Utils {

    static getCurrentTimeStamp() {

        // current timestamp in milliseconds
        const timestamp = Date.now();

        const dateObject = new Date(timestamp);
        const date = dateObject.getDate();
        const month = dateObject.getMonth() + 1;
        const year = dateObject.getFullYear();
        const time = dateObject.getTime();

        // prints date & time in YYYY-MM-DD format

        return `${date}-${month}-${year}-${time}-`;
    }

}

module.exports = Utils