module.exports = {
    getTest: () => {
        return new Promise((resolve, reject) => {
            console.log("GET /api/test");
            resolve('GET /api/test')
        });
    },
    postTest: (test) => {
        return new Promise((resolve, reject) => {
            console.log(test);
            resolve('POST /api/test');
        });
    }
};
