export function blockingTask (ms = 200) {
    let arr = [];
    const blockingStart = performance.now();

    console.log(`Synthetic task running for ${ms} ms`);

    while (performance.now() < (blockingStart + ms)) {
        arr.push(Math.random() * performance.now / blockingStart / ms);
    }
}