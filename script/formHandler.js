import { validatePart3AutomatedRebalancing, validatePart3AckCheckBox } from './validations.js'
import { showDataInTable } from './tableHandler.js'
import { previousPage } from './navigation.js';

const getFormData = () => {
    const form = document.getElementById('portfolioForm')

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

    const formData = {

        portfolioName: form.portfolioName.value.trim(),
        portfolioType: form.portfolioType.value,
        investmentGoal: form.investmentGoal.value,
        investmentHorizon: form.investmentHorizon.value,
        riskTolerance: form.riskTolerance.value,

        annualInvestmentCapacity: form.annualCapacityInput.value,
        lumpSumAmount: form.lumpSumAmount.value,
        monthlyContribution: form.monthlyContribution.value,
        assets: assetData,
        investmentStyle: selectedinvestmentStyle,

        automatedRebalancing: form.automatedRebalancing.value,
        taxSavingPrefernce: form.taxSavingPrefernce.value,
        financialGoals: form.financialGoals.value.trim(),
        riskAcknowledgement: form.riskAcknowledgement.value,
    }

    return formData;

}

const formSubmit = () => {

    validatePart3AutomatedRebalancing()
    validatePart3AckCheckBox()

    // Submit
    let submit = validatePart3AutomatedRebalancing() && validatePart3AckCheckBox()

    return submit;

}

export const submitRecord = () => {

    if (formSubmit()) {
        const formData = getFormData();

        let localStorageDataString = localStorage.getItem('portfolioFormData');

        let localStorageData, newId;
        if (localStorageDataString) {
            localStorageData = JSON.parse(localStorageDataString);
            if (localStorageData.length > 0) {

                newId = localStorageData[localStorageData.length - 1].id + 1;
            }
        } else {
            localStorageData = [];
            newId = 1;
        }

        formData.id = newId;

        // console.log(formData);
        localStorageData.push(formData);
        localStorageDataString = JSON.stringify(localStorageData);
        localStorage.setItem('portfolioFormData', localStorageDataString);

        showDataInTable();
        return true;
    }

    return false;
}

export const editRecord = () => {

    const formData = getFormData();

    let localStorageDataString = localStorage.getItem('portfolioFormData');
    if (localStorageDataString) {
        const localStorageData = JSON.parse(localStorageDataString);
        const index = localStorageData.findIndex(record => record.id === selectedRowId)

        if (index != -1) {
            formData.id = selectedRowId
            localStorageData[index] = formData;
        }

        localStorageDataString = JSON.stringify(localStorageData);
        localStorage.setItem('portfolioFormData', localStorageDataString);

        showDataInTable();
        emptyFields();
        const riskAckCheckbox = document.getElementById('riskAck');
        const riskAcknowledgementLabel = document.getElementById('riskAckLabelText');

        riskAckCheckbox.checked = false;
        riskAckCheckbox.disabled = false;
        riskAckCheckbox.classList.remove('disable');
        riskAcknowledgementLabel.classList.remove('disable');

        submitButton.innerText = 'Submit'

        return true;
    }

    return false;
}

// Remove a record (record is retrieved based on the Portfolio Name - Unique Field)
export const removeRecord = () => {

    if (!selectedRowId) {
        alert('Please select a row to delete');
        return;
    }
    const localStorageDataString = localStorage.getItem('portfolioFormData')

    if (localStorageDataString) {

        const localStorageData = JSON.parse(localStorageDataString);

        const updatedLocalStorage = localStorageData.filter((record) => record.id !== selectedRowId);
        const updatedLocalStorageString = JSON.stringify(updatedLocalStorage);

        localStorage.setItem('portfolioFormData', updatedLocalStorageString);

        // const table = document.getElementById('formTable')
        // table.innerHTML = ''

        showDataInTable()
        selectedRowId = null
    }
    else {
        console.log('NO SUCH RECORD EXISRS');
    }


}

// Edit a record (record is retrieved based on the Portfolio Name - Unique Field)
export const populateForm = () => {

    if (!selectedRowId) {
        alert('Please select a record to edit')
        return;
    }

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

        const requiredRecordToEdit = localStorageData.filter(record => record.id === selectedRowId);

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
        // submitButton.addEventListener('click', editRecord);
    }
}

// empty fields after submission
export const emptyFields = () => {

    // Part-1
    document.getElementById('portfolioNameInput').value = '';
    const portfolioTypeRadio = document.getElementsByName('portfolioType');
    portfolioTypeRadio.forEach(radio => {
        if (radio.checked == true) {
            radio.checked = false
        }
    })
    document.getElementById('investmentGoal').value = '';
    document.getElementById('investmentHorizon').value = '';
    const riskToleranceRadio = document.getElementsByName('riskTolerance');
    riskToleranceRadio.forEach(radio => {
        if (radio.checked == true) {
            radio.checked = false
        }
    })

    // Part-2
    document.getElementById('annualInvestmentCapacityInput').value = '';
    document.getElementById('lumpSumAmountInput').value = '';
    document.getElementById('monthlyContributionInput').value = '';
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
    if (investmentStyleCheckbox) {
        investmentStyleCheckbox.forEach(checkbox => {
            if (checkbox.checked == true) {
                checkbox.checked = false
            }
        })
    }

    // Part-3
    const automatedRebalancingRadio = document.getElementsByName('automatedRebalancing');
    automatedRebalancingRadio.forEach(radio => {
        if (radio.checked == true) {
            radio.checked = false
        }
    })
    const taxSavingPrefernceRadio = document.getElementsByName('taxSavingPrefernce');
    taxSavingPrefernceRadio.forEach(radio => {
        if (radio.checked == true) {
            radio.checked = false
        }
    })
    document.getElementById('financialGoalsInput').value = '';

    const riskAckCheckbox = document.getElementsByName('riskAcknowledgement');
    if (riskAckCheckbox) {
        riskAckCheckbox.forEach(checkbox => {
            if (checkbox.checked == true) {
                checkbox.checked = false
            }
        })
    }
}

let selectedRowId = null;
export const selectRow = (id) => {
    selectedRowId = id ? parseInt(id) : null;
    // console.log(selectedRowId);
}