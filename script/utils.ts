export const checkName = (str: string): boolean => {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(str);
}

export const checkNumber = (str: string): boolean => {
    const num = Number(str);
    return !isNaN(num);
}