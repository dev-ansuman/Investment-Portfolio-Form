import { checkName, checkNumber } from './utils.ts'

// Validations for part 1 of the form
// validate the portfolio name (input, required field)
export const validatePart1PortfolioName = (): boolean => {

    const portfolioNameInput = document.getElementById("portfolioNameInput") as HTMLInputElement | null
    const portfolioName: HTMLElement | null = document.querySelector(".portfolioInput")

    let checkError = document.querySelector(".errorPortfolioNameInput")
    if (checkError) {
        checkError.remove();
    }

    if (portfolioNameInput && portfolioName) {
        if (portfolioNameInput.value.length < 0) {
            const errorMessage = document.createElement("div")
            errorMessage.className = 'errorPortfolioNameInput'
            errorMessage.innerText = "This is a required Field!"
            errorMessage.style.color = "red"
            portfolioName.append(errorMessage)
            return false
        }

        if (portfolioNameInput.value.length <= 2) {
            const errorMessage = document.createElement("div")
            errorMessage.className = 'errorPortfolioNameInput'
            errorMessage.innerText = "atleast 3 characters required!"
            errorMessage.style.color = "red"
            portfolioName.append(errorMessage)
            return false
        }

        if (!checkName(portfolioNameInput.value)) {
            const errorMessage = document.createElement("div")
            errorMessage.className = 'errorPortfolioNameInput'
            errorMessage.innerText = "Name cannot contain Numbers or Symbols!"
            errorMessage.style.color = "red"
            portfolioName.append(errorMessage)
            return false
        }
    }


    return true
}

// validate the portfolio type (radio, required field)
export const validatePart1PortfolioType = (): boolean => {

    const portfolioTypeInput = document.getElementsByName("portfolioType") as NodeListOf<HTMLInputElement>
    const radioPortfolioType: HTMLElement | null = document.querySelector(".portfolioType")

    let isValid: boolean = false;

    let checkError = document.querySelector('.errorPortfolioTypeInput')
    if (checkError) {
        checkError.remove()
    }

    const len = portfolioTypeInput.length

    for (let i = 0; i < len; i++) {
        if (typeof portfolioTypeInput[i] !== undefined) {
            if (portfolioTypeInput[i]?.checked === true) {
                isValid = true;
                break;
            }
        }
    }

    if (!isValid && radioPortfolioType) {
        const errorMessage = document.createElement("div")
        errorMessage.className = 'errorPortfolioTypeInput'
        errorMessage.innerText = "This is a required Field!"
        errorMessage.style.color = "red"
        errorMessage.style.fontSize = '13.65px'
        radioPortfolioType.append(errorMessage)
    }

    return isValid;
}


// validate the Investment Goal (dropdown, required field)
export const validatePart1InvestmentGoal = () => {
    const selectedField = document.getElementById('investmentGoal') as HTMLSelectElement
    const investmentGoalContainer: HTMLElement | null = document.querySelector('.investmentGoalDropdown')
    let checkError: HTMLElement | null = document.querySelector('.errorInvestmentGoal')
    if (checkError) {
        checkError.remove()
    }

    if (investmentGoalContainer) {
        if (selectedField.value === '') {
            const errorMessage = document.createElement('div')
            errorMessage.className = 'errorInvestmentGoal'
            errorMessage.innerText = 'This is a required Field!'
            errorMessage.style.color = 'red'
            errorMessage.style.fontSize = '13.65px'
            investmentGoalContainer.append(errorMessage)
            return false
        }
    }

    return true
}

// validate the portfolio type (dropdown, required field)
export const validatePart1InvestmentHorizon = () => {
    const selectedField = document.getElementById('investmentHorizon') as HTMLSelectElement
    const investmentGoalContainer: HTMLElement | null = document.querySelector('.investmentHorizonDropdown')
    let checkError: HTMLElement | null = document.querySelector('.errorInvestmentHorizon')

    if (checkError) {
        checkError.remove()
    }

    if (investmentGoalContainer) {
        if (selectedField.value === '') {
            const errorMessage = document.createElement('div')
            errorMessage.className = 'errorInvestmentHorizon'
            errorMessage.innerText = 'This is a required Field!'
            errorMessage.style.color = 'red'
            errorMessage.style.fontSize = '13.65px'
            investmentGoalContainer.append(errorMessage)
            return false
        }
    }

    return true
}

// validate the portfolio type (radio, required field)
export const validatePart1RiskTolerance = () => {

    const riskToleranceInput = document.getElementsByName("riskTolerance") as NodeListOf<HTMLInputElement>
    const riskToleranceTypes: HTMLElement | null = document.querySelector(".riskTolerance")

    let checkError: HTMLElement | null = document.querySelector('.errorRiskTolerance')
    if (checkError) {
        checkError.remove()
        console.log('removed from last')
    }
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

    if (!presence && riskToleranceTypes) {
        const errorMessage = document.createElement("div")
        errorMessage.className = 'errorRiskTolerance'
        errorMessage.innerText = "This is a required Field!"
        errorMessage.style.color = "red"
        errorMessage.style.fontSize = '13.65px'
        riskToleranceTypes.append(errorMessage)
        console.log('added from last')
    }

    return presence
}

// Validations for part 2 of the form
// validate the Annual Investment Capacity (input, required field)
export const validatePart2AnnualInvestmentCapacity = () => {

    const annualInvestmentCapacityInput = document.getElementById("annualInvestmentCapacityInput") as HTMLInputElement | null
    const annualInvestment: HTMLElement | null = document.querySelector(".annualCapacityContainer")

    let checkError: HTMLElement | null = document.querySelector(".errorAnnualInvestmentCapacityInput")
    if (checkError) {
        checkError.remove();
    }

    if (annualInvestmentCapacityInput?.value === '') {

        console.log(annualInvestmentCapacityInput.value.length)
        let errorMessage = document.createElement("div")
        errorMessage.className = 'errorAnnualInvestmentCapacityInput'
        errorMessage.innerText = "This is a required field!"
        errorMessage.style.color = "red"
        errorMessage.style.fontSize = '13.65px'
        annualInvestment?.after(errorMessage)

        return false
    }

    if (annualInvestmentCapacityInput) {
        if (!checkNumber(annualInvestmentCapacityInput.value) || Number(annualInvestmentCapacityInput.value) < 1) {
            let errorMessage = document.createElement("div")
            errorMessage.className = 'errorAnnualInvestmentCapacityInput'
            errorMessage.innerText = "Invalid Input! Must be a number greater than 1!"
            errorMessage.style.color = "red"
            errorMessage.style.fontSize = '12px'
            annualInvestment?.after(errorMessage)

            return false
        }
    }


    return true
}

// validate the Asset Class (dropdown, required field)
export const validatePart2AssetClass = () => {

    let isValid = true

    const assets = document.querySelectorAll('.assets') as NodeListOf<HTMLElement>

    assets.forEach((row) => {

        // const deleteButton = row.querySelector('.removeAsset')
        const assetClass: HTMLSelectElement | null = row.querySelector('.assetClassDropdown')
        const assetDropdownContainer: HTMLElement | null = row.querySelector('.assetDropdown')
        // const specificFundAuto = row.querySelector('.specificFundAuto')

        const checkError: HTMLElement | null = row.querySelector('.errorAssetClass')
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

            isValid = false
        }

    })

    return isValid
}

// export const autoSuggestSpecificFund = (assetId: string, specificFundId: string) => {

//     const specificFundInput = document.getElementById(specificFundId) as HTMLInputElement | null
//     const assetChosen = document.getElementById(assetId) as HTMLSelectElement | null

//     specificFundInput?.value = assetChosen.value

// }


// validate the Percentage Allocation (input, required field)
export const validatePart2percentageAllocation = () => {

    let isValid = true

    const assets: NodeListOf<HTMLElement> = document.querySelectorAll('.assets')

    assets.forEach((row) => {

        // const deleteButton = row.querySelector('.removeAsset')
        const percentageAllocationInput: HTMLInputElement | null = row.querySelector('.percentageAllocationInput')
        const percentageAllocation: HTMLElement | null = row.querySelector('.percentageAllocation')

        const checkError: HTMLElement | null = row.querySelector('.errorPercentageAllocation')
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
            // deleteButton.style.alignSelf = 'center'
            isValid = false
        }

        else if (Number(percentageAllocationInput?.value) < 1 || Number(percentageAllocationInput?.value) > 100) {
            const errorMessage = document.createElement("div")
            errorMessage.className = 'errorPercentageAllocation'
            errorMessage.innerText = "Invalid Percentage!"
            errorMessage.style.color = "red"
            errorMessage.style.fontSize = '12px'
            percentageAllocation?.appendChild(errorMessage)
            // deleteButton.style.alignSelf = 'center'
            isValid = false
        }
    })

    return isValid

}

// Validations for part 3 of the form
// validate the automatic rebalancing (radio, required field)
export const validatePart3AutomatedRebalancing = () => {

    const automatedRebalancing = document.getElementsByName("automatedRebalancing") as NodeListOf<HTMLInputElement>
    // const automatedRebalancingContainer = document.querySelector(".automatedRebalancing")
    const automatedRebalancingContainer: HTMLElement | null = document.querySelector(".optContainer")

    let checkError: HTMLElement | null = document.querySelector('.errorAutomatedRebalancing')
    if (checkError) {
        checkError.remove()
    }

    const len: number = automatedRebalancing.length
    let isValid: boolean = false

    for (let i = 0; i < len; i++) {
        if (automatedRebalancing[i]?.checked === true) {
            isValid = true
            break;
        }
    }

    if (!isValid) {
        const errorMessage = document.createElement("div")
        errorMessage.className = 'errorAutomatedRebalancing'
        errorMessage.innerText = "This is a required Field!"
        errorMessage.style.color = "red"
        errorMessage.style.fontSize = '13.65px'
        automatedRebalancingContainer?.append(errorMessage)
    }

    return isValid
}

// validate the Acknowledgement (checkbox, required field)
export const validatePart3AckCheckBox = () => {
    const checkBoxElement = document.getElementById('riskAck') as HTMLInputElement | null
    // const checkBoxParent = document.querySelector('.riskAcknowledgement')
    const checkBoxParent: HTMLElement | null = document.querySelector('.riskAcknowledgementContainer')

    const checkError: HTMLElement | null = document.querySelector('.errorAckCheck')
    if (checkError) {
        checkError.remove()
    }

    if (checkBoxElement?.checked == false) {
        const errorMessage = document.createElement("div")
        errorMessage.className = 'errorAckCheck'
        errorMessage.innerText = "This is a required Field!"
        errorMessage.style.color = "red"
        errorMessage.style.fontSize = '13.65px'
        errorMessage.style.marginLeft = '6%'
        checkBoxParent?.after(errorMessage)
        return false
    }

    return true
}