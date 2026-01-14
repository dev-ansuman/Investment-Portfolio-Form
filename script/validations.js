import {checkName, checkNumber} from './utils.js'

// Validations for part 1 of the form
// validate the portfolio name (input, required field)
export const validatePart1PortfolioName = () => {

    const portfolioNameInput = document.getElementById("portfolioNameInput")
    const portfolioName = document.querySelector(".portfolioInput")

    let checkError = document.querySelector(".errorPortfolioNameInput")
    if (checkError) {
        checkError.remove();
    }

    if (portfolioNameInput.value.trim().length === 0) {
        const errorMessage = document.createElement("div")
        errorMessage.className = 'errorPortfolioNameInput'
        errorMessage.innerText = "This is a required Field!"
        errorMessage.style.color = "red"
        portfolioName.append(errorMessage)
        return false
    }

    if (!checkName(portfolioNameInput.value.trim())) {
        const errorMessage = document.createElement("div")
        errorMessage.className = 'errorPortfolioNameInput'
        errorMessage.innerText = "Name cannot contain Numbers or Symbols!"
        errorMessage.style.color = "red"
        portfolioName.append(errorMessage)
        return false
    }

    if (portfolioNameInput.value.trim().length <= 2) {
        const errorMessage = document.createElement("div")
        errorMessage.className = 'errorPortfolioNameInput'
        errorMessage.innerText = "atleast 3 characters required!"
        errorMessage.style.color = "red"
        portfolioName.append(errorMessage)
        return false
    }

    return true
}

// validate the portfolio type (radio, required field)
export const validatePart1PortfolioType = () => {

    const portfolioTypeInput = document.getElementsByName("portfolioType")
    const radioPortfolioType = document.querySelector(".portfolioType")

    let checkError = document.querySelector('.errorPortfolioTypeInput')
    if (checkError) {
        checkError.remove()
    }
    const len = portfolioTypeInput.length
    let presence = false

    for (let i = 0; i < len; i++) {
        if (portfolioTypeInput[i].checked == false) {
            presence = false
        } else {
            presence = true
            break
        }
    }

    if (!presence) {
        const errorMessage = document.createElement("div")
        errorMessage.className = 'errorPortfolioTypeInput'
        errorMessage.innerText = "This is a required Field!"
        errorMessage.style.color = "red"
        errorMessage.style.fontSize = '13.65px'
        radioPortfolioType.append(errorMessage)
    }

    return presence
}

// validate the Investment Goal (dropdown, required field)
export const validatePart1InvestmentGoal = () => {
    const selectedField = document.getElementById('investmentGoal')
    const investmentGoalContainer = document.querySelector('.investmentGoalDropdown')
    let checkError = document.querySelector('.errorInvestmentGoal')
    if (checkError) {
        checkError.remove()
    }

    if (selectedField.value === '') {
        const errorMessage = document.createElement('div')
        errorMessage.className = 'errorInvestmentGoal'
        errorMessage.innerText = 'This is a required Field!'
        errorMessage.style.color = 'red'
        errorMessage.style.fontSize = '13.65px'
        investmentGoalContainer.append(errorMessage)
        return false
    }

    return true
}

// validate the portfolio type (dropdown, required field)
export const validatePart1InvestmentHorizon = () => {
    const selectedField = document.getElementById('investmentHorizon')
    const investmentGoalContainer = document.querySelector('.investmentHorizonDropdown')
    let checkError = document.querySelector('.errorInvestmentHorizon')
    if (checkError) {
        checkError.remove()
    }

    if (selectedField.value === '') {
        const errorMessage = document.createElement('div')
        errorMessage.className = 'errorInvestmentHorizon'
        errorMessage.innerText = 'This is a required Field!'
        errorMessage.style.color = 'red'
        errorMessage.style.fontSize = '13.65px'
        investmentGoalContainer.append(errorMessage)
        return false
    }

    return true
}

// validate the portfolio type (radio, required field)
export const validatePart1RiskTolerance = () => {

    const riskToleranceInput = document.getElementsByName("riskTolerance")
    const riskToleranceTypes = document.querySelector(".riskTolerance")

    let checkError = document.querySelector('.errorRiskTolerance')
    if (checkError) {
        checkError.remove()
        console.log('removed from last')
    }
    const len = riskToleranceInput.length
    let presence = false

    for (let i = 0; i < len; i++) {
        if (riskToleranceInput[i].checked == false) {
            presence = false
        } else {
            presence = true
            break
        }
    }

    if (!presence) {
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

    const annualInvestmentCapacityInput = document.getElementById("annualInvestmentCapacityInput")
    const annualInvestment = document.querySelector(".annualCapacityContainer")

    let checkError = document.querySelector(".errorAnnualInvestmentCapacityInput")
    if (checkError) {
        checkError.remove();
    }

    if (annualInvestmentCapacityInput.value == '') {

        console.log(annualInvestmentCapacityInput.value.length)
        let errorMessage = document.createElement("div")
        errorMessage.className = 'errorAnnualInvestmentCapacityInput'
        errorMessage.innerText = "This is a required field!"
        errorMessage.style.color = "red"
        errorMessage.style.fontSize = '13.65px'
        annualInvestment.after(errorMessage)

        return false
    }
    // if (annualInvestmentCapacityInput.value.length < 0) {

    //     console.log(annualInvestmentCapacityInput.value.length)
    //     let errorMessage = document.createElement("div")
    //     errorMessage.className = 'errorAnnualInvestmentCapacityInput'
    //     errorMessage.innerText = "must be more"
    //     errorMessage.style.color = "red"
    //     errorMessage.style.fontSize = '13.65px'
    //     annualInvestment.appendChild(errorMessage)

    //     return false
    // }

    if ((!checkNumber(annualInvestmentCapacityInput.value) || annualInvestmentCapacityInput.value < 1) && annualInvestmentCapacityInput.value != '') {
        let errorMessage = document.createElement("div")
        errorMessage.className = 'errorAnnualInvestmentCapacityInput'
        errorMessage.innerText = "Invalid Input! Must be a number greater than 1!"
        errorMessage.style.color = "red"
        errorMessage.style.fontSize = '12px'
        annualInvestment.after(errorMessage)

        return false
    }

    return true
}

// validate the Asset Class (dropdown, required field)
export const validatePart2AssetClass = () => {

    let presence = true

    const assets = document.querySelectorAll('.assets')

    assets.forEach((row) => {

        const deleteButton = row.querySelector('.removeAsset')
        const assetClass = row.querySelector('.assetClassDropdown')
        const assetDropdownContainer = row.querySelector('.assetDropdown')
        // const specificFundAuto = row.querySelector('.specificFundAuto')

        const checkError = row.querySelector('.errorAssetClass')
        if (checkError) {
            checkError.remove()
        }

        if (assetClass.value == '') {
            const errorMessage = document.createElement('div')
            errorMessage.className = 'errorAssetClass'
            errorMessage.innerText = 'This is a required field!'
            errorMessage.style.color = 'red'
            errorMessage.style.fontSize = '12px'
            assetDropdownContainer.append(errorMessage)

            // deleteButton.style.alignSelf = 'center'

            presence = false
        }

    })

    return presence
}

export const autoSuggestSpecificFund = (assetId, specificFundId) => {

    const specificFundInput = document.getElementById(specificFundId)
    const assetChosen = document.getElementById(assetId)

    specificFundInput.value = assetChosen.value

}

// validate the Percentage Allocation (input, required field)
export const validatePart2percentageAllocation = () => {

    let presence = true

    const assets = document.querySelectorAll('.assets')

    assets.forEach((row) => {

        const deleteButton = row.querySelector('.removeAsset')
        const percentageAllocationInput = row.querySelector('.percentageAllocationInput')
        const percentageAllocation = row.querySelector('.percentageAllocation')

        const checkError = row.querySelector('.errorPercentageAllocation')
        if (checkError) {
            checkError.remove()
        }

        // if (percentageAllocationInput.value.length < 0) {
        //     const errorMessage = document.createElement("div")
        //     errorMessage.className = 'errorPercentageAllocation'
        //     errorMessage.innerText = "This is a required Field!"
        //     errorMessage.style.color = "red"
        //     errorMessage.style.fontSize = '13.65px'
        //     percentageAllocation.appendChild(errorMessage)
        //     deleteButton.style.alignSelf = 'center'
        //     presence = false
        // }

        if (percentageAllocationInput.value === '') {
            const errorMessage = document.createElement("div")
            errorMessage.className = 'errorPercentageAllocation'
            errorMessage.innerText = "This is a required Field!"
            errorMessage.style.color = "red"
            errorMessage.style.fontSize = '12px'
            percentageAllocation.appendChild(errorMessage)
            deleteButton.style.alignSelf = 'center'
            presence = false
        }

        else if (percentageAllocationInput.value < 1 || percentageAllocationInput.value > 100) {
            const errorMessage = document.createElement("div")
            errorMessage.className = 'errorPercentageAllocation'
            errorMessage.innerText = "Invalid Percentage!"
            errorMessage.style.color = "red"
            errorMessage.style.fontSize = '12px'
            percentageAllocation.appendChild(errorMessage)
            deleteButton.style.alignSelf = 'center'
            presence = false
        }
    })

    return presence

}

// const validatePart2percentageAllocation = (inputId, containerId, deleteId) => {

//     let presence = true

//     const assets = document.querySelectorAll('.assets')

//     const deleteButton = document.getElementById(deleteId)
//     const percentageAllocationInput = document.getElementById(inputId)
//     const percentageAllocation = document.getElementById(containerId)

//     const checkError = document.getElementById(`errorPercentageAllocation-${deleteId}`)
//     if (checkError) {
//         checkError.remove()
//     }

//     // if (percentageAllocationInput.value.length < 0) {
//     //     const errorMessage = document.createElement("div")
//     //     errorMessage.className = 'errorPercentageAllocation'
//     //     errorMessage.innerText = "This is a required Field!"
//     //     errorMessage.style.color = "red"
//     //     errorMessage.style.fontSize = '13.65px'
//     //     percentageAllocation.appendChild(errorMessage)
//     //     deleteButton.style.alignSelf = 'center'
//     //     presence = false
//     // }

//     if (percentageAllocationInput.value === '') {
//         const errorMessage = document.createElement("div")
//         errorMessage.className = `errorPercentageAllocation-${deleteId}`
//         errorMessage.innerText = "This is a required Field!"
//         errorMessage.style.color = "red"
//         errorMessage.style.fontSize = '13.65px'
//         percentageAllocation.appendChild(errorMessage)
//         deleteButton.style.alignSelf = 'center'
//         presence = false
//     }

//     else if (percentageAllocationInput.value < 1 || percentageAllocationInput.value > 100 || !checkNumber(percentageAllocationInput.value)) {
//         const errorMessage = document.createElement("div")
//         errorMessage.className = `errorPercentageAllocation-${deleteId}`
//         errorMessage.innerText = "Invalid Percentage!"
//         errorMessage.style.color = "red"
//         errorMessage.style.fontSize = '13.65px'
//         percentageAllocation.appendChild(errorMessage)
//         deleteButton.style.alignSelf = 'center'
//         presence = false
//     }

//     return presence

// }


// Validations for part 3 of the form
// validate the automatic rebalancing (radio, required field)
export const validatePart3AutomatedRebalancing = () => {

    const automatedRebalancing = document.getElementsByName("automatedRebalancing")
    // const automatedRebalancingContainer = document.querySelector(".automatedRebalancing")
    const automatedRebalancingContainer = document.querySelector(".optContainer")

    let checkError = document.querySelector('.errorAutomatedRebalancing')
    if (checkError) {
        checkError.remove()
    }

    const len = automatedRebalancing.length
    let presence = false

    for (let i = 0; i < len; i++) {
        if (automatedRebalancing[i].checked == false) {
            presence = false
        } else {
            presence = true
            break
        }
    }

    if (!presence) {
        const errorMessage = document.createElement("div")
        errorMessage.className = 'errorAutomatedRebalancing'
        errorMessage.innerText = "This is a required Field!"
        errorMessage.style.color = "red"
        errorMessage.style.fontSize = '13.65px'
        automatedRebalancingContainer.append(errorMessage)
    }

    return presence
}

// validate the Acknowledgement (checkbox, required field)
export const validatePart3AckCheckBox = () => {
    const checkBoxElement = document.getElementById('riskAck')
    // const checkBoxParent = document.querySelector('.riskAcknowledgement')
    const checkBoxParent = document.querySelector('.riskAcknowledgementContainer')

    const checkError = document.querySelector('.errorAckCheck')
    if (checkError) {
        checkError.remove()
    }

    if (checkBoxElement.checked == false) {
        const errorMessage = document.createElement("div")
        errorMessage.className = 'errorAckCheck'
        errorMessage.innerText = "This is a required Field!"
        errorMessage.style.color = "red"
        errorMessage.style.fontSize = '13.65px'
        errorMessage.style.marginLeft = '6%'
        checkBoxParent.after(errorMessage)
        return false
    }

    return true
}