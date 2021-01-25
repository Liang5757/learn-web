let memorize = function (memo, formula) {
    let recur = function (n) {
        let result = memo[n];
        if (typeof result !== 'number') {
            result = formula(recur, n);
            memo[n] = result;
        }
        return result
    };
    return recur;
};

let memo = [1, 1];

let fibonacci = memorize(memo, function (recur, n) {
    return recur(n - 1) + recur(n - 2);
});

console.log(fibonacci(6), memo);