import { checkName, checkNumber, checkExistingPorfolioName } from './common/validator.js'
import { showError, checkExistingError } from './common/error.js'
import { MESSAGE } from './common/messages.js'

// Validations for part 1 of the form

// validate the portfolio name (input, required field)
export const validatePart1PortfolioName = (): boolean => {

    const portfolioNameInput = document.getElementById("portfolioNameInput") as HTMLInputElement | null

    checkExistingError('errorPortfolioNameInput')

    if (portfolioNameInput) {

        if (portfolioNameInput.value.trim().length === 0) {
            showError('errorPortfolioNameInput', 'portfolioInput', 'append', '13.65px', MESSAGE.ERROR_MESSAGE.REQUIRED_FIELD, '')
            return false
        }

        if (!checkName(portfolioNameInput.value.trim())) {
            showError('errorPortfolioNameInput', 'portfolioInput', 'append', '13.65px', MESSAGE.ERROR_MESSAGE.INVALID_NAME, '')
            return false
        }

        if (portfolioNameInput.value.trim().length <= 2) {
            showError('errorPortfolioNameInput', 'portfolioInput', 'append', '13.65px', MESSAGE.ERROR_MESSAGE.MIN_CHARACTER, '')
            return false
        }

    }

    return true
}

let recordID: number | null = null;
export const getSelectedRecordID = (id: number | null) => {
    recordID = id ? Number(id) : null;
}

export const nameTaken = (): boolean => {

    const portfolioNameInput = document.getElementById("portfolioNameInput") as HTMLInputElement | null

    checkExistingError('errorPortfolioNameInput')

    if (portfolioNameInput) {
        if (checkExistingPorfolioName(portfolioNameInput.value.trim(), recordID)) {
            showError('errorPortfolioNameInput', 'portfolioInput', 'append', '13.65px', MESSAGE.ERROR_MESSAGE.NAME_EXISTS, '')
            return false
        }
    }

    return true
}

// validate the portfolio type (radio, required field)
export const validatePart1PortfolioType = (): boolean => {

    const portfolioTypeInput = document.getElementsByName("portfolioType") as NodeListOf<HTMLInputElement>

    let isValid: boolean = false;

    checkExistingError('errorPortfolioTypeInput')

    const len = portfolioTypeInput.length

    for (let i = 0; i < len; i++) {
        if (typeof portfolioTypeInput[i] !== undefined) {
            if (portfolioTypeInput[i]?.checked === true) {
                isValid = true;
                break;
            }
        }
    }

    if (!isValid) {
        showError('errorPortfolioTypeInput', 'portfolioType', 'append', '13.65px', MESSAGE.ERROR_MESSAGE.REQUIRED_FIELD, '')
    }

    return isValid;
}

// validate the Investment Goal (dropdown, required field)
export const validatePart1InvestmentGoal = () => {
    const selectedField = document.getElementById('investmentGoal') as HTMLSelectElement

    checkExistingError('errorInvestmentGoal')

    if (selectedField.value === '') {
        showError('errorInvestmentGoal', 'investmentGoalDropdown', 'append', '13.65px', MESSAGE.ERROR_MESSAGE.REQUIRED_FIELD, '')
        return false
    }

    return true
}

// validate the portfolio type (dropdown, required field)
export const validatePart1InvestmentHorizon = () => {
    const selectedField = document.getElementById('investmentHorizon') as HTMLSelectElement

    checkExistingError('errorInvestmentHorizon')

    if (selectedField.value === '') {
        showError('errorInvestmentHorizon', 'investmentHorizonDropdown', 'append', '13.65px', MESSAGE.ERROR_MESSAGE.REQUIRED_FIELD, '')
        return false
    }

    return true
}

// validate the portfolio type (radio, required field)
export const validatePart1RiskTolerance = () => {

    const riskToleranceInput = document.getElementsByName("riskTolerance") as NodeListOf<HTMLInputElement>

    checkExistingError('errorRiskTolerance')

    const len = riskToleranceInput.length
    let presence = false

    for (let i = 0; i < len; i++) {
        if (riskToleranceInput[i]?.checked == false) {
            presence = false
        } else {
            presence = true
            break
        }
    }

    if (!presence) {

        showError('errorRiskTolerance', 'riskTolerance', 'append', '13.65px', MESSAGE.ERROR_MESSAGE.REQUIRED_FIELD, '')
    }

    return presence
}

// Validations for part 2 of the form
// validate the Annual Investment Capacity (input, required field)
export const validatePart2AnnualInvestmentCapacity = () => {

    const annualInvestmentCapacityInput = document.getElementById("annualInvestmentCapacityInput") as HTMLInputElement | null

    let isValid = true;
    checkExistingError('errorAnnualInvestmentCapacityInput')

    if (annualInvestmentCapacityInput?.value === '') {

        showError('errorAnnualInvestmentCapacityInput', 'annualCapacityContainer', 'after', '13.65px', MESSAGE.ERROR_MESSAGE.REQUIRED_FIELD, '')

        isValid = false
    }

    if (annualInvestmentCapacityInput) {
        if (!checkNumber(annualInvestmentCapacityInput.value) || Number(annualInvestmentCapacityInput.value) < 1) {

            showError('errorAnnualInvestmentCapacityInput', 'annualCapacityContainer', 'after', '13.65px', MESSAGE.ERROR_MESSAGE.INVALID_NUMBER_INPUT, '')

            isValid = false
        }
    }


    return isValid
}

// validate the Asset Class (select, required field)
export const validatePart2AssetClass = () => {

    let presence = true

    const assets: NodeListOf<HTMLDivElement> | null = document.querySelectorAll('.assets')

    assets.forEach((row) => {
        const assetClass: HTMLSelectElement | null = row.querySelector('.assetClassDropdown')
        const assetDropdownContainer: HTMLInputElement | null = row.querySelector('.assetDropdown')

        const checkError: HTMLDivElement | null = row.querySelector('.errorAssetClass')
        if (checkError) {
            checkError.remove()
        }

        if (assetClass?.value == '') {
            const errorMessage = document.createElement('div')
            errorMessage.className = 'errorAssetClass'
            errorMessage.innerText = 'This is a required field!'
            errorMessage.style.color = 'red'
            errorMessage.style.fontSize = '12px'
            assetDropdownContainer?.append(errorMessage)

            presence = false
        }

    })

    return presence
}

// validate the Percentage Allocation (input, required field)
export const validatePart2percentageAllocation = () => {

    let presence = true

    const assets: NodeListOf<HTMLDivElement> | null = document.querySelectorAll('.assets')

    assets.forEach((row) => {

        // const deleteButton = row.querySelector('.removeAsset')
        const percentageAllocationInput = row.querySelector('.percentageAllocationInput') as HTMLInputElement | null
        const percentageAllocation = row.querySelector('.percentageAllocation') as HTMLDivElement | null

        const checkError = row.querySelector('.errorPercentageAllocation')
        if (checkError) {
            checkError.remove()
        }

        if (percentageAllocationInput?.value === '') {
            const errorMessage = document.createElement("div")
            errorMessage.className = 'errorPercentageAllocation'
            errorMessage.innerText = "This is a required Field!"
            errorMessage.style.color = "red"
            errorMessage.style.fontSize = '12px'
            percentageAllocation?.appendChild(errorMessage)
            presence = false
        }

        else if (Number(percentageAllocationInput?.value) < 1 || Number(percentageAllocationInput?.value) > 100) {
            const errorMessage = document.createElement("div")
            errorMessage.className = 'errorPercentageAllocation'
            errorMessage.innerText = "Invalid Percentage!"
            errorMessage.style.color = "red"
            errorMessage.style.fontSize = '12px'
            percentageAllocation?.appendChild(errorMessage)
            presence = false
        }
    })

    return presence

}

// Validations for part 3 of the form
// validate the automatic rebalancing (radio, required field)
export const validatePart3AutomatedRebalancing = () => {

    const automatedRebalancing = document.getElementsByName("automatedRebalancing") as NodeListOf<HTMLInputElement>

    checkExistingError('errorAutomatedRebalancing')

    const len: number = automatedRebalancing.length
    let isValid: boolean = false

    for (let i = 0; i < len; i++) {
        if (automatedRebalancing[i]?.checked === true) {
            isValid = true
            break;
        }
    }

    if (!isValid) {

        showError('errorAutomatedRebalancing', 'optContainer', 'append', '13.65px', MESSAGE.ERROR_MESSAGE.REQUIRED_FIELD, '')
    }

    return isValid
}

// validate the Acknowledgement (checkbox, required field)
export const validatePart3AckCheckBox = () => {
    const checkBoxElement = document.getElementById('riskAck') as HTMLInputElement | null
    // const checkBoxParent = document.querySelector('.riskAcknowledgement')
    const checkBoxParent: HTMLElement | null = document.querySelector('.riskAcknowledgementContainer')

    checkExistingError('errorAckCheck')

    if (checkBoxElement?.checked == false) {

        showError('errorAckCheck', 'riskAcknowledgementContainer', 'after', '13.65px', MESSAGE.ERROR_MESSAGE.REQUIRED_FIELD, '6%')

        return false
    }

    return true
}