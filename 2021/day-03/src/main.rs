use std::fs;

fn main() {
    let input = parse_input();

    println!("Part one: {}", part_one(&input));
    println!("Part two: {}", part_two(&input));
}

fn parse_input() -> Vec<Vec<u32>> {
    fs::read_to_string("2021/day-03/input.txt")
        .unwrap()
        .lines()
        .map(|line| line.chars().map(|c| c.to_digit(10).unwrap()).collect())
        .collect()
}

fn part_one(input: &Vec<Vec<u32>>) -> usize {
    let mut total = 0;

    for i in (0..5).rev() {
        let mut total_0 = 0;
        let mut total_1 = 0;

        for bits in input {
            if bits[i] == 0 {
                total_0 += 1;
            } else if bits[i] == 1 {
                total_1 += 1;
            }
        }

        if total_1 > total_0 {
            total += 2 ^ (4 - i);
        }
    }

    total
}

fn part_two(input: &Vec<Vec<u32>>) -> usize {
    let mut total = 0;

    let mut x = input;

    for i in (0..5).rev() {
        let mut total_0 = 0;
        let mut total_1 = 0;

        for bits in input {
            if bits[i] == 0 {
                total_0 += 1;
            } else if bits[i] == 1 {
                total_1 += 1;
            }
        }

        if total_1 > total_0 {
            println!("{:?}", input.into_iter().filter(|c| c[0] == 1).collect::<Vec<&Vec<u32>>>());
            //x = input.into_iter().filter(|c| c[0] == 0).collect::<Vec<Vec<u32>>>();
        }
    }

    total
}
