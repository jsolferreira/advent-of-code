const input = 'target area: x=14..50, y=-267..-225';

const [[MIN_TARGET_X, MAX_TARGET_X], [MIN_TARGET_Y, MAX_TARGET_Y]] = input.split(': ')[1].split(', ').map(x => x.split('=')[1].split('..').map(Number));

let highY = 0;

let breakX = false;
let count = 0;
let i;

for (i = 0; i <= MAX_TARGET_X || !breakX; i++) {
    let breakY = false;
    for (let j = MIN_TARGET_Y; j <= Math.abs(MIN_TARGET_Y) || !breakY; j++) {
        const { result, lastPosition } = launch([i, j]);

        if (result) {
            count++;
        }

        breakX = lastPosition[0] > MAX_TARGET_X;
        breakY = (breakX || lastPosition[1] < MIN_TARGET_Y);
    }
}

console.log(count);

function launch(velocity) {
    const position = [0, 0];
    let heighestY = 0;

    while (true) {
        position[0] = position[0] + velocity[0];
        position[1] = position[1] + velocity[1];
        if (position[1] > heighestY) {
            heighestY = position[1];
        }

        if (MIN_TARGET_X <= position[0] && position[0] <= MAX_TARGET_X && MIN_TARGET_Y <= position[1] && position[1] <= MAX_TARGET_Y) {
            return { result: true, lastPosition: position, heighestY };
        } else if (position[0] > MAX_TARGET_X || position[1] < MIN_TARGET_Y) {
            return { result: false, lastPosition: position, heighestY };
        }

        if (velocity[0] > 0) {
            velocity[0]--;
        } else if (velocity[0] < 0) {
            velocity[0]++;
        }

        velocity[1]--;
    }
}