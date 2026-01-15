import type { PortfolioFormData } from "./types.js";

export const checkName = (str: string): boolean => {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(str);
}

export const checkNumber = (str: string): boolean => {
    const num = Number(str);
    return !isNaN(num);
}

export const checkExistingPorfolioName = (portfolioName: string, recordId: number | null = null): boolean => {

    const localStorageDataString = localStorage.getItem('portfolioFormData')

    if (localStorageDataString) {
        let localStorageData: PortfolioFormData[] = JSON.parse(localStorageDataString);
        const nameExists: PortfolioFormData[] = localStorageData.filter(record => record.portfolioName === portfolioName);

        if (recordId) {
            if (nameExists.length > 0) {
                nameExists[0]!.id === recordId
                return false
            } else return true
        }else{
            return nameExists.length > 0
        }
    }

    return false


}