import { checkName, checkNumber } from './utils.js';
import { showError, checkExistingError } from './error.js';
// Validations for part 1 of the form
// validate the portfolio name (input, required field)
export const validatePart1PortfolioName = () => {
    const portfolioNameInput = document.getElementById("portfolioNameInput");
    checkExistingError('errorPortfolioNameInput');
    if (portfolioNameInput) {
        if (portfolioNameInput.value.trim().length === 0) {
            showError('errorPortfolioNameInput', 'portfolioInput', 'append', '13.65px', 'This is a required Field!', '');
            return false;
        }
        if (!checkName(portfolioNameInput.value.trim())) {
            showError('errorPortfolioNameInput', 'portfolioInput', 'append', '13.65px', 'Name cannot contain Numbers or Symbols!', '');
            return false;
        }
        if (portfolioNameInput.value.trim().length <= 2) {
            showError('errorPortfolioNameInput', 'portfolioInput', 'append', '13.65px', 'atleast 3 characters required!', '');
            return false;
        }
    }
    return true;
};
// validate the portfolio type (radio, required field)
export const validatePart1PortfolioType = () => {
    const portfolioTypeInput = document.getElementsByName("portfolioType");
    let isValid = false;
    checkExistingError('errorPortfolioTypeInput');
    const len = portfolioTypeInput.length;
    for (let i = 0; i < len; i++) {
        if (typeof portfolioTypeInput[i] !== undefined) {
            if (portfolioTypeInput[i]?.checked === true) {
                isValid = true;
                break;
            }
        }
    }
    if (!isValid) {
        showError('errorPortfolioTypeInput', 'portfolioType', 'append', '13.65px', 'This is a required Field!', '');
    }
    return isValid;
};
// validate the Investment Goal (dropdown, required field)
export const validatePart1InvestmentGoal = () => {
    const selectedField = document.getElementById('investmentGoal');
    checkExistingError('errorInvestmentGoal');
    if (selectedField.value === '') {
        showError('errorInvestmentGoal', 'investmentGoalDropdown', 'append', '13.65px', 'This is a required field!', '');
        return false;
    }
    return true;
};
// validate the portfolio type (dropdown, required field)
export const validatePart1InvestmentHorizon = () => {
    const selectedField = document.getElementById('investmentHorizon');
    checkExistingError('errorInvestmentHorizon');
    if (selectedField.value === '') {
        showError('errorInvestmentHorizon', 'investmentHorizonDropdown', 'append', '13.65px', 'This is a required Field!', '');
        return false;
    }
    return true;
};
// validate the portfolio type (radio, required field)
export const validatePart1RiskTolerance = () => {
    const riskToleranceInput = document.getElementsByName("riskTolerance");
    checkExistingError('errorRiskTolerance');
    const len = riskToleranceInput.length;
    let presence = false;
    for (let i = 0; i < len; i++) {
        if (riskToleranceInput[i]?.checked == false) {
            presence = false;
        }
        else {
            presence = true;
            break;
        }
    }
    if (!presence) {
        showError('errorRiskTolerance', 'riskTolerance', 'append', '13.65px', 'This is a required Field!', '');
    }
    return presence;
};
// Validations for part 2 of the form
// validate the Annual Investment Capacity (input, required field)
export const validatePart2AnnualInvestmentCapacity = () => {
    const annualInvestmentCapacityInput = document.getElementById("annualInvestmentCapacityInput");
    let isValid = true;
    checkExistingError('errorAnnualInvestmentCapacityInput');
    if (annualInvestmentCapacityInput?.value === '') {
        showError('errorAnnualInvestmentCapacityInput', 'annualCapacityContainer', 'after', '13.65px', 'This is a required field!', '');
        isValid = false;
    }
    if (annualInvestmentCapacityInput) {
        if (!checkNumber(annualInvestmentCapacityInput.value) || Number(annualInvestmentCapacityInput.value) < 1) {
            showError('errorAnnualInvestmentCapacityInput', 'annualCapacityContainer', 'after', '13.65px', 'Invalid Input! Must be a number greater than 1!', '');
            isValid = false;
        }
    }
    return isValid;
};
// validate the Asset Class (dropdown, required field)
export const validatePart2AssetClass = () => {
    let isValid = true;
    const assets = document.querySelectorAll('.assets');
    assets.forEach((row) => {
        const assetClass = row.querySelector('.assetClassDropdown');
        // const specificFundAuto = row.querySelector('.specificFundAuto')
        checkExistingError('errorAssetClass');
        if (assetClass?.value === '') {
            showError('errorAssetClass', 'assetDropdown', 'append', '12px', 'This is a required field!', '');
            isValid = false;
        }
    });
    return isValid;
};
// export const autoSuggestSpecificFund = (assetId: string, specificFundId: string) => {
//     const specificFundInput = document.getElementById(specificFundId) as HTMLInputElement | null
//     const assetChosen = document.getElementById(assetId) as HTMLSelectElement | null
//     specificFundInput?.value = assetChosen.value
// }
// validate the Percentage Allocation (input, required field)
export const validatePart2percentageAllocation = () => {
    let isValid = true;
    const assets = document.querySelectorAll('.assets');
    assets.forEach((row) => {
        const percentageAllocationInput = row.querySelector('.percentageAllocationInput');
        checkExistingError('errorPercentageAllocation');
        if (percentageAllocationInput?.value === '') {
            showError('errorPercentageAllocation', 'percentageAllocation', 'append', '12px', 'This is a required field!', '');
            isValid = false;
        }
        else if (Number(percentageAllocationInput?.value) < 1 || Number(percentageAllocationInput?.value) > 100) {
            showError('errorPercentageAllocation', 'percentageAllocation', 'append', '12px', 'Invalid Percentage!', '');
            isValid = false;
        }
    });
    return isValid;
};
// Validations for part 3 of the form
// validate the automatic rebalancing (radio, required field)
export const validatePart3AutomatedRebalancing = () => {
    const automatedRebalancing = document.getElementsByName("automatedRebalancing");
    checkExistingError('errorAutomatedRebalancing');
    const len = automatedRebalancing.length;
    let isValid = false;
    for (let i = 0; i < len; i++) {
        if (automatedRebalancing[i]?.checked === true) {
            isValid = true;
            break;
        }
    }
    if (!isValid) {
        showError('errorAutomatedRebalancing', 'optContainer', 'append', '13.65px', 'This is a required Field!', '');
    }
    return isValid;
};
// validate the Acknowledgement (checkbox, required field)
export const validatePart3AckCheckBox = () => {
    const checkBoxElement = document.getElementById('riskAck');
    // const checkBoxParent = document.querySelector('.riskAcknowledgement')
    const checkBoxParent = document.querySelector('.riskAcknowledgementContainer');
    checkExistingError('errorAckCheck');
    if (checkBoxElement?.checked == false) {
        showError('errorAckCheck', 'riskAcknowledgementContainer', 'after', '13.65px', 'This is a required Field!', '6%');
        return false;
    }
    return true;
};
