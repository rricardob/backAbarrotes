class Utils {

    static getCurrentTimeStamp() {

        // current timestamp in milliseconds
        const timestamp = Date.now();

        const dateObject = new Date(timestamp);
        const date = dateObject.getDate();
        const month = dateObject.getMonth() + 1;
        const year = dateObject.getFullYear();

        // prints date & time in YYYY-MM-DD format

        return `${year}-${month}-${date}`;
    }

}

module.exports = Utils