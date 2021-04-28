function Multiples(multipleOf) {
    const min = 1;
    const max = 10;
    const rand = Math.floor(min + Math.random() * (max - min));

    // 2/5 of our numbers should match
    if (Math.random() > .4) {
        return Math.floor(Math.random() * (max * multipleOf));
    } else {
        return multipleOf * rand;
    }
}

export default Multiples;