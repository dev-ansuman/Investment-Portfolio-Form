import { validatePart3AutomatedRebalancing, validatePart3AckCheckBox } from './validations.js'
import { showDataInTable } from './tableHandler.js'
import { addAsset } from './assetManagement.js'

import type { Asset, PortfolioFormData } from './common/types.js'

const getFormData = (id: number | null) => {
    const form = document.getElementById('portfolioForm') as HTMLFormElement | null

    if (form) {
        const assetData: Asset[] = [];
        const assets: NodeListOf<HTMLDivElement> = document.querySelectorAll('.assets');
        assets.forEach((asset) => {
            const assetClass: HTMLInputElement | null = asset.querySelector('.assetClassDropdown');
            const percentageAllocation: HTMLInputElement | null = asset.querySelector('.percentageAllocationInput');
            const specificFund: HTMLInputElement | null = asset.querySelector('.specificFundInputAuto');
            const currentValue: HTMLInputElement | null = asset.querySelector('.getCurrentValue');
            const data: Asset = {
                assetClass: assetClass?.value,
                percentageAllocation: percentageAllocation?.value,
                specificFund: specificFund?.value,
                currentValue: currentValue?.value
            };

            assetData.push(data);
        })

        const investmentStyleCheckbox = document.querySelectorAll('input[name=investmentStyle]') as NodeListOf<HTMLInputElement>;
        const selectedinvestmentStyle: any[] = [];
        investmentStyleCheckbox.forEach((checkBox) => {
            if (checkBox.checked) {
                selectedinvestmentStyle.push(checkBox.value);
            }
        });

        const formData: PortfolioFormData = {
            id,
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

const submitValidation = () => {

    validatePart3AutomatedRebalancing()
    validatePart3AckCheckBox()

    // Submit
    let submit = validatePart3AutomatedRebalancing() && validatePart3AckCheckBox()

    return submit;

}

export const submitRecord = () => {

    if (submitValidation()) {
        const formData: PortfolioFormData | undefined = getFormData(null);
        let localStorageDataString: string | null = localStorage.getItem('portfolioFormData');

        let localStorageData: PortfolioFormData[] = localStorageDataString ? JSON.parse(localStorageDataString) : []
        const nextId = localStorageData.length === 0 ? 1 : localStorageData[localStorageData.length - 1]!.id! + 1;

        formData!.id = nextId;
        localStorageData.push(formData!)

        localStorageDataString = JSON.stringify(localStorageData);
        localStorage.setItem('portfolioFormData', localStorageDataString);

        showDataInTable();

        return true;
    }

    return false;
}

export const editRecord = () => {

    const formData: PortfolioFormData | undefined = getFormData(selectedRowId);

    let localStorageDataString: string | null = localStorage.getItem('portfolioFormData');

    if (localStorageDataString) {
        const localStorageData: any[] = JSON.parse(localStorageDataString);
        const index: number = localStorageData.findIndex(record => record.id === selectedRowId)

        if (index != -1) {
            localStorageData[index] = formData;
        }

        localStorageDataString = JSON.stringify(localStorageData);
        localStorage.setItem('portfolioFormData', localStorageDataString);

        showDataInTable();
        emptyFields();
        const riskAckCheckbox = document.getElementById('riskAck') as HTMLInputElement | null;
        const riskAcknowledgementLabel = document.getElementById('riskAckLabelText') as HTMLLabelElement | null;
        const submitButton = document.getElementById('submitButton') as HTMLButtonElement | null
        riskAckCheckbox!.checked = false;
        riskAckCheckbox!.disabled = false;
        riskAckCheckbox!.classList.remove('disable');
        riskAcknowledgementLabel!.classList.remove('disable');

        submitButton!.innerText = 'Submit'

        return true;
    }
    return false
}

// Remove a record (record is retrieved based on the Portfolio Name - Unique Field)
export const removeRecord = () => {

    if (!selectedRowId) {
        alert('Please select a row to delete!')
    }

    const localStorageDataString: string | null = localStorage.getItem('portfolioFormData')

    if (localStorageDataString) {

        const localStorageData: any[] = JSON.parse(localStorageDataString);

        const updatedLocalStorage: any[] = localStorageData.filter((record) => record.id !== selectedRowId);
        const updatedLocalStorageString: string = JSON.stringify(updatedLocalStorage);

        localStorage.setItem('portfolioFormData', updatedLocalStorageString);

        selectedRowId = null

        showDataInTable()
    }
    else {
        console.log('NO SUCH RECORD EXISRS');
    }


}

// Edit a record (record is retrieved based on the Portfolio Name - Unique Field)
export const popupateForm = () => {

    if (!selectedRowId) {
        alert('Please select a row to edit!');
    }

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
    const assetContainer: HTMLDivElement | null = document.querySelector('.assetContainer');
    while (assetContainer!.children.length > 1) {
        assetContainer!.removeChild(assetContainer!.lastElementChild!)
    }
    const firstAsset = assetContainer!.children[0];

    const assetClassDropdown: HTMLSelectElement | null = firstAsset!.querySelector('.assetClassDropdown')
    if (assetClassDropdown) {
        assetClassDropdown.value = ''
    }
    const percentageAllocationInput: HTMLSelectElement | null = firstAsset!.querySelector('.percentageAllocationInput')
    if (percentageAllocationInput) {
        percentageAllocationInput.value = ''
    }
    const specificFundInputAuto: HTMLSelectElement | null = firstAsset!.querySelector('.specificFundInputAuto')
    if (specificFundInputAuto) {
        specificFundInputAuto.value = ''
    }
    const getCurrentValue: HTMLSelectElement | null = firstAsset!.querySelector('.getCurrentValue')
    if (getCurrentValue) {
        getCurrentValue.value = ''
    }

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

        const localStorageData: PortfolioFormData[] = JSON.parse(localStorageDataString);

        const requiredRecordToEdit: PortfolioFormData[] = localStorageData.filter(record => record.id === selectedRowId);

        if (requiredRecordToEdit[0]) {
            // Fill the form to edit the record

            // Part-1
            portfolioNameInput.value = requiredRecordToEdit[0].portfolioName;

            portfolioTypeRadio.forEach(radio => {
                if (radio.value == requiredRecordToEdit[0]?.portfolioType) {
                    radio.checked = true;
                }
            })
            investmentGoalSelect.value = requiredRecordToEdit[0].investmentGoal;
            investmentHorizonSelect.value = requiredRecordToEdit[0].investmentHorizon;
            // Risk Tolerance
            riskToleranceRadio.forEach(radio => {
                if (radio.value == requiredRecordToEdit[0]?.riskTolerance) {
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
                const assetRow = document.getElementById(`asset-${i}`) as HTMLDivElement | null

                const assetClassSelect = assetRow!.querySelector('.assetClassDropdown') as HTMLSelectElement | null
                const percentageAllocationInput = assetRow!.querySelector('.percentageAllocationInput') as HTMLInputElement | null
                const specificFundInput = assetRow!.querySelector('.specificFundInputAuto') as HTMLInputElement | null
                const currentValueInput = assetRow!.querySelector('.getCurrentValue') as HTMLInputElement | null

                if (assetClassSelect && percentageAllocationInput && specificFundInput && currentValueInput) {
                    assetClassSelect.value = requiredRecordToEdit[0].assets[i]!.assetClass ?? ''
                    percentageAllocationInput.value = requiredRecordToEdit[0].assets[i]!.percentageAllocation ?? '';
                    specificFundInput.value = requiredRecordToEdit[0].assets[i]!.specificFund ?? ''
                    currentValueInput.value = requiredRecordToEdit[0].assets[i]!.currentValue ?? ''
                }

            }

            investmentStyleCheckbox.forEach(option => {
                if (requiredRecordToEdit[0]?.investmentStyle.includes(option.value)) {
                    option.checked = true;
                }
            })

            // Part-3
            automatedRebalancingRadio.forEach(radio => {
                if (radio.value == requiredRecordToEdit[0]?.automatedRebalancing) {
                    radio.checked = true;
                }
            })
            taxSavingPrefernceRadio.forEach(radio => {
                if (radio.value == requiredRecordToEdit[0]?.taxSavingPrefernce) {
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
            assetContainer.removeChild(assetContainer.lastElementChild!)
        }

        const firstAsset = assetContainer!.children[0];

        const assetClassDropdown: HTMLSelectElement | null = firstAsset!.querySelector('.assetClassDropdown')
        if (assetClassDropdown) {
            assetClassDropdown.value = ''
        }
        const percentageAllocationInput: HTMLSelectElement | null = firstAsset!.querySelector('.percentageAllocationInput')
        if (percentageAllocationInput) {
            percentageAllocationInput.value = ''
        }
        const specificFundInputAuto: HTMLSelectElement | null = firstAsset!.querySelector('.specificFundInputAuto')
        if (specificFundInputAuto) {
            specificFundInputAuto.value = ''
        }
        const getCurrentValue: HTMLSelectElement | null = firstAsset!.querySelector('.getCurrentValue')
        if (getCurrentValue) {
            getCurrentValue.value = ''
        }
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
    selectedRowId = id ? Number(id) : null;
}