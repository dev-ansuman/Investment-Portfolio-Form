const previousPage = () => {
    if (document.getElementById('part1').style.display === 'none' && document.getElementById('part2').style.display === 'none' && document.getElementById('part3').style.display === '') {

        // document.getElementById('part1').style.display = 'none';
        document.getElementById('part2').style.display = ''
        document.getElementById('part3').style.display = 'none';
        const button = document.getElementById('forward')
        button.style.display = ''
        const submitButton = document.getElementById('submitButton')
        submitButton.style.display = 'none'

    }
    else if (document.getElementById('part1').style.display === 'none' && document.getElementById('part2').style.display === '' && document.getElementById('part3').style.display === 'none') {

        const previousButton = document.getElementById('prevButton')
        previousButton.disabled = true

        document.getElementById('part1').style.display = '';
        document.getElementById('part2').style.display = 'none';
        // document.getElementById('part3').style.display = 'none';

    }
}

const nextPage = () => {

    if (document.getElementById('part1').style.display === '' && document.getElementById('part2').style.display === 'none' && document.getElementById('part3').style.display === 'none') {


        const previousButton = document.getElementById('prevButton')

        validatePart1PortfolioName()
        validatePart1PortfolioType()
        validatePart1InvestmentGoal()
        validatePart1InvestmentHorizon()
        validatePart1RiskTolerance()

        let moveToNextPage = validatePart1PortfolioName() &&
            validatePart1PortfolioType() &&
            validatePart1InvestmentGoal() &&
            validatePart1InvestmentHorizon() &&
            validatePart1RiskTolerance()

        if (moveToNextPage) {

            document.getElementById('part1').style.display = 'none';
            document.getElementById('part2').style.display = ''
            document.getElementById('part3').style.display === 'none';
            previousButton.disabled = false

        }
        // else {
        //     alert('Please Fill all required fields')
        // }
    }

    else if (document.getElementById('part1').style.display === 'none' && document.getElementById('part2').style.display === '' && document.getElementById('part3').style.display === 'none') {

        validatePart2AnnualInvestmentCapacity()
        validatePart2AssetClass()
        validatePart2percentageAllocation()

        let moveToNextPage = validatePart2AnnualInvestmentCapacity() &&
            validatePart2AssetClass() &&
            validatePart2percentageAllocation()

        if (moveToNextPage) {
            document.getElementById('part1').style.display === 'none';
            document.getElementById('part2').style.display = 'none';
            document.getElementById('part3').style.display = '';
            const button = document.getElementById('forward')
            button.style.display = 'none'
            const submitButton = document.getElementById('submitButton')
            submitButton.style.display = ''
        }
        // else {
        //     alert('Please Fill all required fields')
        // }

    }
}

const formSubmit = () => {

    validatePart3AutomatedRebalancing()
    validatePart3AckCheckBox()

    // Submit
    let submit = validatePart3AutomatedRebalancing() && validatePart3AckCheckBox()

    if (submit) {
        alert('The form is submitted')
    } else {
        alert('Please fill all the required fields')
    }

}

let assetId = 1
const addAsset = () => {
    assetId++
    const newRow = document.createElement('div')
    newRow.className = 'assets'
    newRow.id = `asset-${assetId}`

    newRow.innerHTML = `
        <div class="assetClass">
                                    <div class="assetLabel">
                                        <label><b>Asset Class*</b></label>
                                    </div>
                                    <div class="assetDropdown">
                                        <select name="assetClass" class="assetClassDropdown" id="assetClass${assetId}" onchange="autoSuggestSpecificFund('assetClass${assetId}', 'specificFundAuto${assetId}')">
                                            <option value="">-- Select --</option>
                                            <option value="Equity">Stocks</option>
                                            <option value="Fixed Income">Bond</option>
                                            <option value="Cash Equivalent">Cash</option>
                                            <option value="REITs">Real Estate</option>
                                            <option value="Foreign Exchange">Forex</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="percentageAllocation" id="percentageAllocation-${assetId}">
                                    <!-- Input for Percentage Allocation -->
                                    <div class="percentageAllocationLabel" style="font-size: 14px;">
                                        <label><b>Percentage Allocation(%)*</b></label>
                                    </div>
                                    <div class="percentageAllocationContainer">
                                        <input type="text" class="percentageAllocationInput" id="percentageAllocationInput-${assetId}" onkeypress="validatePart2percentageAllocation()" onchange="validatePart2percentageAllocation()">
                                    </div>
                                </div>

                                <div class="specificFund">
                                    <!-- Input for specific fund -->
                                    <div class="specificFundLabel">
                                        <label><b>Specific Fund</b></label>
                                    </div>
                                    <div class="specificFundInput">
                                        <input type="text" id="specificFundAuto${assetId}">
                                    </div>
                                </div>

                                <div class="currentValue">
                                    <!-- Input for current Value -->
                                    <div class="currentValueLabel">
                                        <label><b>Current Value</b></label>
                                    </div>
                                    <div class="currentValueInput">
                                        <input type="text">
                                    </div>
                                </div>

                                <div class="removeAsset">
                                    <button onclick="removeAsset('asset-${assetId}')">🗑️</button>
                                </div>
    `

    const assetContainer = document.querySelector('.assetContainer')
    assetContainer.appendChild(newRow)
}

const removeAsset = (id) => {
    const rowToRemove = document.getElementById(id)

    if (rowToRemove && assetId > 1) {
        rowToRemove.remove()
        assetId--
    }

    // if (assetId == 1) {
    //     const errorMessage = document.createElement("div")
    //     errorMessage.className = 'errorPortfolioNameInput'
    //     errorMessage.innerText = "This row cannot be removed"
    //     errorMessage.style.color = "red"
    //     rowToRemove.appendChild(errorMessage)
    //     rowToRemove.style.display = 'flex'
    //     // rowToRemove.style.flexDirection = 'column'
    // }
}

// Validations for part 1 of the form
// validate the portfolio name (input, required field)
const validatePart1PortfolioName = () => {

    const portfolioNameInput = document.getElementById("portfolioNameInput")
    const portfolioName = document.querySelector(".portfolioInput")

    let checkError = document.querySelector(".errorPortfolioNameInput")
    if (checkError) {
        checkError.remove();
    }

    if (portfolioNameInput.value.length < 0) {
        const errorMessage = document.createElement("div")
        errorMessage.className = 'errorPortfolioNameInput'
        errorMessage.innerText = "This is a required Field!"
        errorMessage.style.color = "red"
        portfolioName.append(errorMessage)
        return false
    }

    if (portfolioNameInput.value.length < 2) {
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


    return true
}

// validate the portfolio type (radio, required field)
const validatePart1PortfolioType = () => {

    const portfolioTypeInput = document.getElementsByName("portfolioType")
    const radioPortfolioType = document.querySelector(".radioPortfolioType")

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
const validatePart1InvestmentGoal = () => {
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
const validatePart1InvestmentHorizon = () => {
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
const validatePart1RiskTolerance = () => {

    const riskToleranceInput = document.getElementsByName("riskTolerance")
    const riskToleranceTypes = document.querySelector(".riskToleranceRadio")

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
const validatePart2AnnualInvestmentCapacity = () => {

    const annualInvestmentCapacityInput = document.getElementById("annualInvestmentCapacityInput")
    const annualInvestment = document.querySelector(".annualCapacityContainer")

    let checkError = document.querySelector(".errorAnnualInvestmentCapacityInput")
    if (checkError) {
        checkError.remove();
    }

    if (annualInvestmentCapacityInput.value.length < 0) {

        console.log(annualInvestmentCapacityInput.value.length)
        let errorMessage = document.createElement("div")
        errorMessage.className = 'errorAnnualInvestmentCapacityInput'
        errorMessage.innerText = "must be more"
        errorMessage.style.color = "red"
        errorMessage.style.fontSize = '13.65px'
        annualInvestment.appendChild(errorMessage)

        return false
    }

    if ((!checkNumber(annualInvestmentCapacityInput.value) || annualInvestmentCapacityInput.value < 1) && annualInvestmentCapacityInput.value != '') {
        let errorMessage = document.createElement("div")
        errorMessage.className = 'errorAnnualInvestmentCapacityInput'
        errorMessage.innerText = "Invalid Input! Must be a number greater than 1!"
        errorMessage.style.color = "red"
        errorMessage.style.fontSize = '12px'
        annualInvestment.appendChild(errorMessage)

        return false
    }

    return true
}

// validate the Asset Class (dropdown, required field)
const validatePart2AssetClass = () => {

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
            errorMessage.style.fontSize = '8px'
            assetDropdownContainer.append(errorMessage)

            deleteButton.style.alignSelf = 'center'

            presence = false
        }

    })

    return presence
}

const autoSuggestSpecificFund = (assetId, specificFundId) => {

    const specificFundInput = document.getElementById(specificFundId)
    const assetChosen = document.getElementById(assetId)

    specificFundInput.value = assetChosen.value

}

// validate the Percentage Allocation (input, required field)
const validatePart2percentageAllocation = () => {

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
            errorMessage.style.fontSize = '13.65px'
            percentageAllocation.appendChild(errorMessage)
            deleteButton.style.alignSelf = 'center'
            presence = false
        }

        else if (percentageAllocationInput.value < 1 || percentageAllocationInput.value > 100 || !checkNumber(percentageAllocationInput.value)) {
            const errorMessage = document.createElement("div")
            errorMessage.className = 'errorPercentageAllocation'
            errorMessage.innerText = "Invalid Percentage!"
            errorMessage.style.color = "red"
            errorMessage.style.fontSize = '13.65px'
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
const validatePart3AutomatedRebalancing = () => {

    const automatedRebalancing = document.getElementsByName("automatedRebalancing")
    const automatedRebalancingContainer = document.querySelector(".automatedRebalancing")

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
const validatePart3AckCheckBox = () => {
    const checkBoxElement = document.getElementById('riskAck')
    const checkBoxParent = document.querySelector('.riskAcknowledgement')

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
        checkBoxParent.appendChild(errorMessage)
        return false
    }

    return true
}

const checkName = (str) => {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(str);
}

const checkNumber = (str) => {
    const regex1 = /^[1-9]+\.[0-9]+$/;
    const regex2 = /^[1-9]+$/;
    return regex1.test(str) || regex2.test(str); // Use the test() method to check for a match
}