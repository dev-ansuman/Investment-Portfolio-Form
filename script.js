const previousPage = () => {
    const investmentDetailLogo = document.getElementById('investmentDetailLogo')
    const progressBar1 = document.getElementById('progressBar1')
    const assetAllocationLogo = document.getElementById('assetAllocationLogo')
    const progressBar2 = document.getElementById('progressBar2')
    const preferenceLogo = document.getElementById('preferencesLogo')

    if (document.getElementById('part1').style.display === 'none' && document.getElementById('part2').style.display === 'none' && document.getElementById('part3').style.display === '') {

        // document.getElementById('part1').style.display = 'none';
        document.getElementById('part2').style.display = ''
        document.getElementById('part3').style.display = 'none';

        assetAllocationLogo.src = './images/asset.svg'
        preferenceLogo.style.backgroundColor = ''
        progressBar2.style.backgroundColor = 'black'
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

        investmentDetailLogo.src = './images/details.svg'
        assetAllocationLogo.style.backgroundColor = ''
        progressBar1.style.backgroundColor = 'black'
        // document.getElementById('part3').style.display = 'none';

    }
}

const nextPage = () => {
    const investmentDetailLogo = document.getElementById('investmentDetailLogo')
    const progressBar1 = document.getElementById('progressBar1')
    const assetAllocationLogo = document.getElementById('assetAllocationLogo')
    const assetAllocationProgresstext = document.getElementById('assetAllocationProgresstext')
    const progressBar2 = document.getElementById('progressBar2')
    const preferenceLogo = document.getElementById('preferencesLogo')
    const preferenceProgressText = document.getElementById('preferenceProgressText')

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

            investmentDetailLogo.src = './images/tick.svg'
            progressBar1.style.backgroundColor = '#42e0ae'
            assetAllocationLogo.style.backgroundColor = '#42e0ae'
            assetAllocationProgresstext.style.color = '#127656'
            assetAllocationLogo.style.border = 'none'
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

            assetAllocationLogo.src = './images/tick.svg'
            progressBar2.style.backgroundColor = '#42e0ae'
            preferenceLogo.style.backgroundColor = '#42e0ae'
            preferenceProgressText.color = ''
            const button = document.getElementById('forward')
            button.style.display = 'none'
            const submitButton = document.getElementById('submitButton')
            submitButton.style.backgroundColor = '#42e0ae'
            submitButton.style.border = 'none'
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

let assetId = 0
const addAsset = () => {
    assetId++
    const newRow = document.createElement('div')
    newRow.className = 'assets'
    newRow.id = `asset-${assetId}`

    newRow.innerHTML = `
        <div class="assetClass subAssetDiv">
                                    <div class="assetLabel">
                                        <label class="assetSubheading">Asset Class <span class="required">*</span></label>
                                    </div>
                                    <div class="assetDropdown">
                                        <select name="assetClass" class="assetClassDropdown input assetSubheading" id="assetClass${assetId}" onchange="autoSuggestSpecificFund('assetClass${assetId}', 'specificFundAuto${assetId}')">
                                            <option value="">-- Select --</option>
                                            <option value="Equity">Stocks</option>
                                            <option value="Fixed Income">Bond</option>
                                            <option value="Cash Equivalent">Cash</option>
                                            <option value="REITs">Real Estate</option>
                                            <option value="Foreign Exchange">Forex</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="percentageAllocation subAssetDiv" id="percentageAllocation-${assetId}">
                                    <!-- Input for Percentage Allocation -->
                                    <div class="percentageAllocationLabel">
                                        <label class="assetSubheading">Percentage Allocation(%) <span class="required">*</span></label>
                                    </div>
                                    <div class="percentageAllocationContainer">
                                        <input name="percentage" type="number" class="percentageAllocationInput input assetSubheading" id="percentageAllocationInput-${assetId}" onkeypress="validatePart2percentageAllocation()" onchange="validatePart2percentageAllocation()">
                                    </div>
                                </div>

                                <div class="specificFund subAssetDiv">
                                    <!-- Input for specific fund -->
                                    <div class="specificFundLabel">
                                        <label class="assetSubheading">Specific Fund</label>
                                    </div>
                                    <div class="specificFundInput">
                                        <input name="specificFund" type="text" id="specificFundAuto${assetId}" class="specificFundInputAuto input assetSubheading">
                                    </div>
                                </div>

                                <div class="currentValue subAssetDiv">
                                    <!-- Input for current Value -->
                                    <div class="currentValueLabel">
                                        <label class="assetSubheading">Current Value</label>
                                    </div>
                                    <div class="deleteAssetDiv">
                                        <div class="currentValueInput">
                                            <input name="currentValue" type="number" placeholder="INR" class="getCurrentValue input assetSubheading">
                                        </div>
                                        <div class="removeAsset">
                                            <button onclick="removeAsset('asset-${assetId}')">🗑️</button>
                                        </div>
                                    </div>


                                </div>
    `

    const assetContainer = document.querySelector('.assetContainer')
    assetContainer.appendChild(newRow)
}

const removeAsset = (id) => {
    const assets = document.querySelectorAll('.assets')
    const rowToRemove = document.getElementById(id)

    if (rowToRemove && assets.length > 1) {
        rowToRemove.remove()
        assetId--
    }
    // if (rowToRemove && assetId > 0) {
    //     rowToRemove.remove()
    //     assetId--
    // }

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

// submit form and store data in localStorage
const form = document.getElementById('portfolioForm');
form.addEventListener('click', (event) => {
    event.preventDefault();

    const submitButton = document.getElementById('submitButton');

    if(submitButton.innerText == 'Update') {
        editRecord(event);
    }else {
        submitRecord(event);
    }
});

const submitRecord = (event) => {

    // Part-1
    const portfolioName = event.target.portfolioName.value;
    const portfolioType = event.target.portfolioType.value;
    const investmentGoal = event.target.investmentGoal.value;
    const investmentHorizon = event.target.investmentHorizon.value;
    const riskTolerance = event.target.riskTolerance.value;

    // Part-2
    const annualCapacityInput = event.target.annualCapacityInput.value;
    const lumpSumAmount = event.target.lumpSumAmount.value;
    const monthlyContribution = event.target.monthlyContribution.value;

    // assets
    const assetData = [];
    const assets = document.querySelectorAll('.assets');
    assets.forEach((asset) => {
        const data = {};
        data.assetClass = asset.querySelector('.assetClassDropdown').value;
        data.percentageAllocation = asset.querySelector('.percentageAllocationInput').value;
        data.specificFund = asset.querySelector('.specificFundInputAuto').value;
        data.currentValue = asset.querySelector('.getCurrentValue').value;

        assetData.push(data);
    })

    const investmentStyleCheckbox = document.querySelectorAll('input[name=investmentStyle]');
    const selectedinvestmentStyle = [];
    investmentStyleCheckbox.forEach((checkBox) => {
        if (checkBox.checked) {
            selectedinvestmentStyle.push(checkBox.value);
        }
    });



    // Part-3
    const automatedRebalancing = event.target.automatedRebalancing.value;
    const taxSavingPrefernce = event.target.taxSavingPrefernce.value;
    const financialGoals = event.target.financialGoals.value;
    const riskAcknowledgement = event.target.riskAcknowledgement.value;

    let localStorageDataString = localStorage.getItem('portfolioFormData');

    let localStorageData, newId;
    if (localStorageDataString) {
        localStorageData = JSON.parse(localStorageDataString);
        newId = localStorageData[localStorageData.length - 1].id + 1;
    } else {
        localStorageData = [];
        newId = 1;
    }

    const formData = {
        id: newId,

        portfolioName: portfolioName.trim(),
        portfolioType,
        investmentGoal,
        investmentHorizon,
        riskTolerance,

        annualInvestmentCapacity: annualCapacityInput,
        lumpSumAmount,
        monthlyContribution,
        assets: assetData,
        investmentStyle: selectedinvestmentStyle,

        automatedRebalancing,
        taxSavingPrefernce,
        financialGoals: financialGoals.trim(),
        riskAcknowledgement,
    }

    console.log(formData);

    // const localStorageDataToUpdate = localStorageData.filter(record => record.portfolioName != formData.portfolioName);

    localStorageData.push(formData);

    localStorageDataString = JSON.stringify(localStorageData);

    localStorage.setItem('portfolioFormData', localStorageDataString);
    showDataInTable();


    // console.log('portfolioName: ', portfolioName);
    // console.log('portfolioType: ', portfolioType);
    // console.log('investmentGoal: ', investmentGoal);
    // console.log('investmentHorizon: ', investmentHorizon);
    // console.log('riskTolerance: ', riskTolerance);

    // console.log('annualCapacityInput: ', annualCapacityInput);
    // console.log('lumpSumAmount: ', lumpSumAmount);
    // console.log('monthlyContribution: ', monthlyContribution);
    // console.log('asset data', assetData);
    // console.log('investmentStyle: ', selectedinvestmentStyle)

    // console.log('automatedRebalancing: ', automatedRebalancing);
    // console.log('taxSavingPrefernce: ', taxSavingPrefernce);
    // console.log('financialGoals: ', financialGoals);
    // console.log('riskAcknowledgement: ', riskAcknowledgement);

    // console.log('whole form data:', formData);
}

const editRecord = (event) => {
    // Part-1
    const portfolioName = event.target.portfolioName.value;
    const portfolioType = event.target.portfolioType.value;
    const investmentGoal = event.target.investmentGoal.value;
    const investmentHorizon = event.target.investmentHorizon.value;
    const riskTolerance = event.target.riskTolerance.value;

    // Part-2
    const annualCapacityInput = event.target.annualCapacityInput.value;
    const lumpSumAmount = event.target.lumpSumAmount.value;
    const monthlyContribution = event.target.monthlyContribution.value;

    // assets
    const assetData = [];
    const assets = document.querySelectorAll('.assets');
    assets.forEach((asset) => {
        const data = {};
        data.assetClass = asset.querySelector('.assetClassDropdown').value;
        data.percentageAllocation = asset.querySelector('.percentageAllocationInput').value;
        data.specificFund = asset.querySelector('.specificFundInputAuto').value;
        data.currentValue = asset.querySelector('.getCurrentValue').value;

        assetData.push(data);
    })

    const investmentStyleCheckbox = document.querySelectorAll('input[name=investmentStyle]');
    const selectedinvestmentStyle = [];
    investmentStyleCheckbox.forEach((checkBox) => {
        if (checkBox.checked) {
            selectedinvestmentStyle.push(checkBox.value);
        }
    });



    // Part-3
    const automatedRebalancing = event.target.automatedRebalancing.value;
    const taxSavingPrefernce = event.target.taxSavingPrefernce.value;
    const financialGoals = event.target.financialGoals.value;
    const riskAcknowledgement = event.target.riskAcknowledgement.value;

    const formData = {
        id: selectedRowId,

        portfolioName: portfolioName.trim(),
        portfolioType,
        investmentGoal,
        investmentHorizon,
        riskTolerance,

        annualInvestmentCapacity: annualCapacityInput,
        lumpSumAmount,
        monthlyContribution,
        assets: assetData,
        investmentStyle: selectedinvestmentStyle,

        automatedRebalancing,
        taxSavingPrefernce,
        financialGoals: financialGoals.trim(),
        riskAcknowledgement,
    }

    let localStorageDataString = localStorage.getItem('portfolioFormData');
    if (localStorageDataString) {
        const localStorageData = JSON.parse(localStorageDataString);
        const index = localStorageData.findIndex(record => record.id == selectedRowId)

        if (index != -1){
            localStorageData[index] = formData;
        }

        localStorageDataString = JSON.stringify(localStorageData);
        localStorage.setItem('portfolioFormData', localStorageDataString);
    }
}

const showDataInTable = () => {
    const localStorageDataString = localStorage.getItem('portfolioFormData')


    if (localStorageDataString) {

        const localStorageData = JSON.parse(localStorageDataString);
        console.log(localStorageData);

        const table = document.getElementById('formTable')
        table.innerHTML = ''
        table.innerHTML = `
        <colGroup>
            <col style="width: 16%">
            <col style="width: 10%">
            <col style="width: 18%">
            <col style="width: 18%">
            <col style="width: 10%">
            <col style="width: 10%">
            <col style="width: 6%">
            <col style="width: 12%">
        </colGroup>

        <thead>
            <tr>
                <th>Portfolio Name</th>
                <th>Portfolio Type</th>
                <th>Investment Goal</th>
                <th>Investment Horizon</th>
                <th>Risk Tolerance</th>
                <th>Annual Investment</th>
                <th>Assets</th>
                <th>Automated Rebalancing</th>
            </tr>
        </thead>

        <tbody id="tableBody"></tbody>
    `
        const tbody = document.getElementById('tableBody');

        localStorageData.forEach(record => {
            const row = document.createElement('tr')
            row.dataset.id = record.id;
            row.addEventListener('click', () => {
                selectRow(record.id)
                popupateForm();
            })

            row.innerHTML = `
            <td>${record.portfolioName}</td>
            <td>${record.portfolioType}</td>
            <td>${record.investmentGoal}</td>
            <td>${record.investmentHorizon}</td>
            <td>${record.riskTolerance}</td>
            <td>${record.annualInvestmentCapacity}</td>
            <td>${record.assets.length}</td>
            <td>${record.automatedRebalancing}</td>
        `
            tbody.appendChild(row)
        })

    }
    else {
        console.log('NO DATA TO DISPLAY')
    }
}
showDataInTable();

let selectedRowId = null;
const selectRow = (id) => {
    selectedRowId = id;
    // console.log(selectedRowId);
}

// Remove a record (record is retrieved based on the Portfolio Name - Unique Field)
const removeRecord = () => {
    const localStorageDataString = localStorage.getItem('portfolioFormData')

    if (localStorageDataString) {

        const localStorageData = JSON.parse(localStorageDataString);

        const updatedLocalStorage = localStorageData.filter((record) => record.id != selectedRowId);
        const updatedLocalStorageString = JSON.stringify(updatedLocalStorage);

        localStorage.setItem('portfolioFormData', updatedLocalStorageString);
    }
    else {
        console.log('NO SUCH RECORD EXISRS');
    }


}

// Edit a record (record is retrieved based on the Portfolio Name - Unique Field)
const popupateForm = () => {

    // Part-1
    const portfolioNameInput = document.getElementById('portfolioNameInput');
    const portfolioTypeRadio = document.getElementsByName('portfolioType');
    const investmentGoalSelect = document.getElementById('investmentGoal');
    const investmentHorizonSelect = document.getElementById('investmentHorizon');
    const riskToleranceRadio = document.getElementsByName('riskTolerance');

    // Part-2
    const annualInvestmentCapacityInput = document.getElementById('annualInvestmentCapacityInput');
    const lumpSumAmountInput = document.getElementById('lumpSumAmountInput');
    const monthlyContributionInput = document.getElementById('monthlyContributionInput');
    // assets
    const assetContainer = document.querySelector('.assetContainer');
    while (assetContainer.children.length > 1) {
        assetContainer.removeChild(assetContainer.lastElementChild)
    }
    const firstAsset = assetContainer.children[0];
    firstAsset.querySelector('.assetClassDropdown').value = ''
    firstAsset.querySelector('.percentageAllocationInput').value = ''
    firstAsset.querySelector('.specificFundInputAuto').value = ''
    firstAsset.querySelector('.getCurrentValue').value = ''

    const investmentStyleCheckbox = document.getElementsByName('investmentStyle');

    // Part-3
    const automatedRebalancingRadio = document.getElementsByName('automatedRebalancing');
    const taxSavingPrefernceRadio = document.getElementsByName('taxSavingPrefernce');
    const financialGoalsInput = document.getElementById('financialGoalsInput');

    const riskAckCheckbox = document.getElementById('riskAck');
    const riskAcknowledgementLabel = document.getElementById('riskAckLabelText');

    // Get existing data from localStorage
    const localStorageDataString = localStorage.getItem('portfolioFormData');

    const submitButton = document.getElementById('submitButton');

    if (localStorageDataString) {

        const localStorageData = JSON.parse(localStorageDataString);

        const requiredRecordToEdit = localStorageData.filter(record => record.id == selectedRowId);

        // Fill the form to edit the record

        // Part-1
        portfolioNameInput.value = requiredRecordToEdit[0].portfolioName;
        // portfolioNameInput.disabled = true;
        // portfolioNameInput.classList.add('disable')
        // portfolioType
        portfolioTypeRadio.forEach(radio => {
            if (radio.value == requiredRecordToEdit[0].portfolioType) {
                radio.checked = true;
            }
        })
        investmentGoalSelect.value = requiredRecordToEdit[0].investmentGoal;
        investmentHorizonSelect.value = requiredRecordToEdit[0].investmentHorizon;
        // Risk Tolerance
        riskToleranceRadio.forEach(radio => {
            if (radio.value == requiredRecordToEdit[0].riskTolerance) {
                radio.checked = true;
            }
        })

        // Part-2
        annualInvestmentCapacityInput.value = requiredRecordToEdit[0].annualInvestmentCapacity;
        lumpSumAmountInput.value = requiredRecordToEdit[0].lumpSumAmount;
        monthlyContributionInput.value = requiredRecordToEdit[0].monthlyContribution;

        // assets
        const assetCount = requiredRecordToEdit[0].assets.length;
        for (let i = 0; i < assetCount - 1; i++) {
            addAsset();
        }

        const assetContainer = document.querySelector('.assetContainer')
        console.log(assetContainer);

        for (let i = 0; i < assetCount; i++) {
            const assetRow = document.getElementById(`asset-${i}`)
            console.log(assetRow);
            const assetClassSelect = assetRow.querySelector('.assetClassDropdown')
            const percentageAllocationInput = assetRow.querySelector('.percentageAllocationInput')
            const specificFundInput = assetRow.querySelector('.specificFundInputAuto')
            const currentValueInput = assetRow.querySelector('.getCurrentValue')

            assetClassSelect.value = requiredRecordToEdit[0].assets[i].assetClass;
            // assetClassSelect.value = 'Equity';
            percentageAllocationInput.value = requiredRecordToEdit[0].assets[i].percentageAllocation;
            specificFundInput.value = requiredRecordToEdit[0].assets[i].specificFund;
            currentValueInput.value = requiredRecordToEdit[0].assets[i].currentValue;

        }

        investmentStyleCheckbox.forEach(option => {
            if (requiredRecordToEdit[0].investmentStyle.includes(option.value)) {
                option.checked = true;
            }
        })

        // Part-3
        automatedRebalancingRadio.forEach(radio => {
            if (radio.value == requiredRecordToEdit[0].automatedRebalancing) {
                radio.checked = true;
            }
        })
        taxSavingPrefernceRadio.forEach(radio => {
            if (radio.value == requiredRecordToEdit[0].taxSavingPrefernce) {
                radio.checked = true;
            }
        })
        financialGoalsInput.value = requiredRecordToEdit[0].financialGoals;
        riskAckCheckbox.checked = true;
        riskAckCheckbox.disabled = true;
        riskAckCheckbox.classList.add('disable');
        riskAcknowledgementLabel.classList.add('disable');

        submitButton.innerText = 'Update'
        // submitButton.form = '';
        submitButton.addEventListener('click', editRecord);
    }
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


    return true
}

// validate the portfolio type (radio, required field)
const validatePart1PortfolioType = () => {

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
const validatePart2AnnualInvestmentCapacity = () => {

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
            errorMessage.style.fontSize = '12px'
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
const validatePart3AutomatedRebalancing = () => {

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
const validatePart3AckCheckBox = () => {
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

const checkName = (str) => {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(str);
}

const checkNumber = (str) => {
    const regex1 = /^[1-9]+\.[0-9]+$/;
    const regex2 = /^[1-9]+$/;
    return regex1.test(str) || regex2.test(str); // Use the test() method to check for a match
}