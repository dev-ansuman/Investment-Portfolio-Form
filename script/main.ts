import { validatePart1PortfolioName, validatePart1PortfolioType, validatePart1InvestmentGoal, validatePart1InvestmentHorizon, validatePart1RiskTolerance, validatePart2AnnualInvestmentCapacity, validatePart2AssetClass, validatePart2percentageAllocation, validatePart3AutomatedRebalancing, validatePart3AckCheckBox } from './validations.js'

import { showDataInTable } from './tableHandler.js'
import { submitRecord, editRecord, emptyFields, popupateForm, removeRecord, selectRow } from './formHandler.js'
import { nextPage, previousPage } from './navigation.js'
import { addAsset, removeAsset } from './assetManagement.js'

// Real Time Validation
// Part-1
const portfolioNameInput = document.getElementById('portfolioNameInput') as HTMLInputElement | null
portfolioNameInput?.addEventListener('input', () => {
    validatePart1PortfolioName();
})

const portfolioType = document.getElementsByName('portfolioType') as NodeListOf<HTMLInputElement>;
portfolioType.forEach(portfolio => {
    portfolio.addEventListener('change', () => {
        validatePart1PortfolioType();
    });
});

const riskTolerance = document.getElementsByName('riskTolerance') as NodeListOf<HTMLInputElement>;
riskTolerance.forEach(risk => {
    risk.addEventListener('change', () => {
        validatePart1RiskTolerance();
    });
});

const investmentGoal = document.getElementById('investmentGoal') as HTMLInputElement | null
investmentGoal?.addEventListener('change', () => {
    validatePart1InvestmentGoal()
})

const investmentHorizon = document.getElementById('investmentHorizon') as HTMLInputElement | null
investmentHorizon?.addEventListener('change', () => {
    validatePart1InvestmentHorizon()
})

// Part-2
const annualInvestmentCapacityInput = document.getElementById('annualInvestmentCapacityInput') as HTMLInputElement | null;
annualInvestmentCapacityInput?.addEventListener('input', () => {
    validatePart2AnnualInvestmentCapacity()
})

const assetContainer = document.querySelector('.assetContainer') as HTMLDivElement | null;

assetContainer?.addEventListener('change', (event) => {
    const target = event.target as HTMLElement | null;
    if (target!.classList.contains('assetClassDropdown')) {
        validatePart2AssetClass();
    }
})
assetContainer?.addEventListener('input', (event) => {
    const target = event.target as HTMLElement | null;
    if (target!.classList.contains('percentageAllocationInput')) {
        validatePart2percentageAllocation();
    }
})


// Part-3
const automatedRebalancing = document.getElementsByName('automatedRebalancing') as NodeListOf<HTMLInputElement>;
automatedRebalancing.forEach(option => {
    option.addEventListener('change', () => {
        validatePart3AutomatedRebalancing();
    })
})

const riskAcknowledgement = document.getElementsByName('riskAcknowledgement') as NodeListOf<HTMLInputElement>;
riskAcknowledgement.forEach(option => {
    option.addEventListener('change', () => {
        validatePart3AckCheckBox();
    })
})


// Navigation
const forward = document.getElementById('forward') as HTMLButtonElement | null
forward?.addEventListener('click', () => {
    nextPage();
})

const previousButton = document.getElementById('prevButton') as HTMLButtonElement | null
previousButton?.addEventListener('click', () => {
    previousPage();
})

// Asset Management
const addAssetButton = document.getElementById('addAssetButton') as HTMLButtonElement | null
addAssetButton?.addEventListener('click', () => {
    addAsset();
})

document.body.addEventListener('click', (event) => {
    const target = event.target as HTMLElement | null;
    if (target!.matches('.removeAssetButton')) {
        const assetId = target!.id
        removeAsset(`asset-${assetId}`);
    }
})

const portfolioForm = document.getElementById('portfolioForm') as HTMLFormElement | null;
portfolioForm?.addEventListener('submit', (event) => {
    event.preventDefault();

    const submitButton = document.getElementById('submitButton') as HTMLButtonElement | null
    let success: boolean = false

    if (submitButton!.innerText == 'Update') {
        success = editRecord();
    } else {
        success = submitRecord();
    }

    if (success) {
        emptyFields();
        previousPage();
        previousPage();
    }
});


showDataInTable();

// edit button
const editButton = document.getElementById('editRecordButton') as HTMLButtonElement | null;
const deleteButton = document.getElementById('deleteRecordButton') as HTMLButtonElement | null;

editButton?.addEventListener('click', () => {
    popupateForm();
})

deleteButton?.addEventListener('click', () => {
    removeRecord();
})

const formTable = document.getElementById('formTable') as HTMLTableElement | null
formTable?.addEventListener('click', (event) => {
    const target = event.target as HTMLElement | null;
    const row = target!.closest('tr')
    const tbody = document.getElementById('tableBody')

    // if(!row || !tableBody || row.parentElement !== tbody) return

    if(row!.classList.contains('selectedRecord')) {
        row!.classList.remove('selectedRecord');
        selectRow(null)
    }else {
        tbody?.querySelectorAll('tr.selectedRecord').forEach(record => record.classList.remove('selectedRecord'));
        row!.classList.add('selectedRecord');
        selectRow(Number(row!.dataset.id))
    }
})