export const checkName = (str) => {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(str);
}

export const checkNumber = (str) => {
    const regex1 = /^[1-9]+\.[0-9]+$/;
    const regex2 = /^[1-9]+$/;
    return regex1.test(str) || regex2.test(str); // Use the test() method to check for a match
}