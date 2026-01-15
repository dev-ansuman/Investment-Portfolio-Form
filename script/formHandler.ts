import { validatePart3AutomatedRebalancing, validatePart3AckCheckBox } from './validations.ts'
import { showDataInTable } from './tableHandler.ts'
import { addAsset } from './assetManagement.ts'

const getFormData = () => {
    const form = document.getElementById('portfolioForm') as HTMLFormElement | null

    if (form) {
        const assetData: any[] = [];
        const assets: NodeListOf<HTMLDivElement> = document.querySelectorAll('.assets');
        assets.forEach((asset) => {
            const data = {};
            data.assetClass = asset.querySelector('.assetClassDropdown').value;
            data.percentageAllocation = asset.querySelector('.percentageAllocationInput').value;
            data.specificFund = asset.querySelector('.specificFundInputAuto').value;
            data.currentValue = asset.querySelector('.getCurrentValue').value;

            assetData.push(data);
        })

        const investmentStyleCheckbox = document.querySelectorAll('input[name=investmentStyle]') as NodeListOf<HTMLInputElement>;
        const selectedinvestmentStyle: any[] = [];
        investmentStyleCheckbox.forEach((checkBox) => {
            if (checkBox.checked) {
                selectedinvestmentStyle.push(checkBox.value);
            }
        });

        let id: null | number

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

        if (formData) {
            let localStorageDataString: string | null = localStorage.getItem('portfolioFormData');

            let localStorageData: any[], newId: number;

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
        }
    }

}

export const editRecord = () => {

    const formData = getFormData();

    let localStorageDataString: string | null = localStorage.getItem('portfolioFormData');
    if (localStorageDataString) {
        const localStorageData: any[] = JSON.parse(localStorageDataString);
        const index: number = localStorageData.findIndex(record => record.id == selectedRowId)

        if (index != -1) {
            localStorageData[index] = formData;
        }

        localStorageDataString = JSON.stringify(localStorageData);
        localStorage.setItem('portfolioFormData', localStorageDataString);

        showDataInTable();
    }
}

// Remove a record (record is retrieved based on the Portfolio Name - Unique Field)
export const removeRecord = () => {
    const localStorageDataString: string | null = localStorage.getItem('portfolioFormData')

    if (localStorageDataString) {

        const localStorageData: any[] = JSON.parse(localStorageDataString);

        const updatedLocalStorage: any[] = localStorageData.filter((record) => record.id != selectedRowId);
        const updatedLocalStorageString: string = JSON.stringify(updatedLocalStorage);

        localStorage.setItem('portfolioFormData', updatedLocalStorageString);

        const table = document.getElementById('formTable') as HTMLTableElement
        table.innerHTML = ''

        showDataInTable()
    }
    else {
        console.log('NO SUCH RECORD EXISRS');
    }


}

// Edit a record (record is retrieved based on the Portfolio Name - Unique Field)
export const popupateForm = () => {

    // Part-1
    const portfolioNameInput = document.getElementById('portfolioNameInput') as HTMLInputElement;
    const portfolioTypeRadio = document.getElementsByName('portfolioType') as NodeListOf<HTMLInputElement>;
    const investmentGoalSelect = document.getElementById('investmentGoal') as HTMLInputElement;
    const investmentHorizonSelect = document.getElementById('investmentHorizon') as HTMLInputElement;
    const riskToleranceRadio = document.getElementsByName('riskTolerance') as NodeListOf<HTMLInputElement>;

    // Part-2
    const annualInvestmentCapacityInput = document.getElementById('annualInvestmentCapacityInput') as HTMLInputElement;
    const lumpSumAmountInput = document.getElementById('lumpSumAmountInput') as HTMLInputElement;
    const monthlyContributionInput = document.getElementById('monthlyContributionInput') as HTMLInputElement;
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

    const investmentStyleCheckbox = document.getElementsByName('investmentStyle') as NodeListOf<HTMLInputElement>;

    // Part-3
    const automatedRebalancingRadio = document.getElementsByName('automatedRebalancing') as NodeListOf<HTMLInputElement>;
    const taxSavingPrefernceRadio = document.getElementsByName('taxSavingPrefernce') as NodeListOf<HTMLInputElement>;
    const financialGoalsInput = document.getElementById('financialGoalsInput') as HTMLInputElement;

    const riskAckCheckbox = document.getElementById('riskAck') as HTMLInputElement;
    const riskAcknowledgementLabel = document.getElementById('riskAckLabelText') as HTMLLabelElement;

    // Get existing data from localStorage
    const localStorageDataString: string | null = localStorage.getItem('portfolioFormData');

    const submitButton = document.getElementById('submitButton') as HTMLButtonElement;

    if (localStorageDataString) {

        const localStorageData: any[] = JSON.parse(localStorageDataString);

        const requiredRecordToEdit: any[] = localStorageData.filter(record => record.id == selectedRowId);

        // Fill the form to edit the record

        // Part-1
        portfolioNameInput.value = requiredRecordToEdit[0].portfolioName;

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
        const assetCount: number = requiredRecordToEdit[0].assets.length;
        for (let i = 0; i < assetCount - 1; i++) {
            addAsset();
        }

        for (let i = 0; i < assetCount; i++) {
            const assetRow = document.getElementById(`asset-${i}`) as HTMLDivElement
            // console.log(assetRow);
            const assetClassSelect: HTMLSelectElement | null = assetRow.querySelector('.assetClassDropdown')
            const percentageAllocationInput: HTMLSelectElement | null = assetRow.querySelector('.percentageAllocationInput')
            const specificFundInput: HTMLSelectElement | null = assetRow.querySelector('.specificFundInputAuto')
            const currentValueInput: HTMLSelectElement | null = assetRow.querySelector('.getCurrentValue')

            if (assetClassSelect && percentageAllocationInput && specificFundInput && currentValueInput) {
                assetClassSelect.value = requiredRecordToEdit[0].assets[i].assetClass;
                percentageAllocationInput.value = requiredRecordToEdit[0].assets[i].percentageAllocation;
                specificFundInput.value = requiredRecordToEdit[0].assets[i].specificFund;
                currentValueInput.value = requiredRecordToEdit[0].assets[i].currentValue;
            }

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
    }
}

// empty fields after submission
export const emptyFields = () => {

    // Part-1
    const portfolioName = document.getElementById('portfolioNameInput') as HTMLInputElement
    portfolioName.value = '';

    const portfolioTypeRadio = document.getElementsByName('portfolioType') as NodeListOf<HTMLInputElement>
    portfolioTypeRadio.forEach(radio => {
        if (radio.checked == true) {
            radio.checked = false
        }
    })

    const investmentGoal = document.getElementById('investmentGoal') as HTMLInputElement
    investmentGoal.value = '';

    const investmentHorizon = document.getElementById('investmentHorizon') as HTMLInputElement
    investmentHorizon.value = '';

    const riskToleranceRadio = document.getElementsByName('riskTolerance') as NodeListOf<HTMLInputElement>
    riskToleranceRadio.forEach(radio => {
        if (radio.checked == true) {
            radio.checked = false
        }
    })

    // Part-2
    const annualInvestmentCapacityInput = document.getElementById('annualInvestmentCapacityInput') as HTMLInputElement
    annualInvestmentCapacityInput.value = '';

    const lumpSumAmountInput = document.getElementById('lumpSumAmountInput') as HTMLInputElement
    lumpSumAmountInput.value = '';

    const monthlyContributionInput = document.getElementById('monthlyContributionInput') as HTMLInputElement
    monthlyContributionInput.value = '';

    // assets
    const assetContainer = document.querySelector('.assetContainer') as HTMLDivElement;
    if (assetContainer) {

        while (assetContainer.children.length > 1) {
            assetContainer.removeChild(assetContainer.lastElementChild)
        }

        const firstAsset = assetContainer.children[0];
        firstAsset.querySelector('.assetClassDropdown').value = ''
        firstAsset.querySelector('.percentageAllocationInput').value = ''
        firstAsset.querySelector('.specificFundInputAuto').value = ''
        firstAsset.querySelector('.getCurrentValue').value = ''
    }


    const investmentStyleCheckbox = document.getElementsByName('investmentStyle') as NodeListOf<HTMLInputElement>;
    investmentStyleCheckbox.forEach(checkbox => {
        if (checkbox.checked == true) {
            checkbox.checked = false
        }
    })


    // Part-3
    const automatedRebalancingRadio = document.getElementsByName('automatedRebalancing') as NodeListOf<HTMLInputElement>;
    automatedRebalancingRadio.forEach(radio => {
        if (radio.checked == true) {
            radio.checked = false
        }
    })
    const taxSavingPrefernceRadio = document.getElementsByName('taxSavingPrefernce') as NodeListOf<HTMLInputElement>;
    taxSavingPrefernceRadio.forEach(radio => {
        if (radio.checked == true) {
            radio.checked = false
        }
    })

    const financialGoals = document.getElementById('financialGoalsInput') as HTMLInputElement;
    financialGoals.value = '';

    const riskAckCheckbox = document.getElementsByName('riskAcknowledgement') as NodeListOf<HTMLInputElement>;
    riskAckCheckbox.forEach(checkbox => {
        if (checkbox.checked == true) {
            checkbox.checked = false
        }
    })
}

let selectedRowId: number | null = null;
export const selectRow = (id: number | null) => {
    selectedRowId = id;
}