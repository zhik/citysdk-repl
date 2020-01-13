export function censusPromise(args) {
    return new Promise(function (resolve, reject) {
        census(args, function (err, json) {
            if (!err) {
                resolve(json);
            } else {
                reject(err);
            }
        });
    });
}