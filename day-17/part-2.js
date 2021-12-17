const input = 'target area: x=14..50, y=-267..-225';

const targetArea = input.split(': ')[1].split(', ').map(x => x.split('=')[1].split('..').map(Number));

let highY = 0;

let breakX = false;
let count = 0;
let i;

for ( i = 0; i <= targetArea[0][1] || !breakX; i++) {
    let breakY = false;
    for (let j = targetArea[1][0]; j <= Math.abs(targetArea[1][0]) || !breakY; j++) {
        const { result, lastPosition, heighestY } = launch([i, j]);
        console.log([i, j], lastPosition, result);

        if (result) {
            count++;
        }

        breakX = lastPosition[0] > targetArea[0][1];
        breakY = (breakX || lastPosition[1] < targetArea[1][0]);
        console.log();
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

        if (targetArea[0][0] <= position[0] && position[0] <= targetArea[0][1] && targetArea[1][0] <= position[1] && position[1] <= targetArea[1][1]) {
            return { result: true, lastPosition: position, heighestY };
        } else if (position[0] > targetArea[0][1] || position[1] < targetArea[1][0]) {
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