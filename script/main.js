import { validatePart1PortfolioName, validatePart1PortfolioType, validatePart1InvestmentGoal, validatePart1InvestmentHorizon, validatePart1RiskTolerance, validatePart2AnnualInvestmentCapacity, validatePart2AssetClass, autoSuggestSpecificFund, validatePart2percentageAllocation, validatePart3AutomatedRebalancing, validatePart3AckCheckBox } from './validations.js'

import { showDataInTable } from './tableHandler.js'
import { submitRecord, editRecord, emptyFields, selectRow, populateForm, removeRecord } from './formHandler.js'
import { nextPage, previousPage } from './navigation.js'
import { addAsset, removeAsset } from './assetManagement.js'

// Real Time Validation
// Part-1
const portfolioNameInput = document.getElementById('portfolioNameInput')
portfolioNameInput.addEventListener('input', () => {
    validatePart1PortfolioName();
})

const portfolioType = document.getElementsByName('portfolioType');
portfolioType.forEach(portfolio => {
    portfolio.addEventListener('change', () => {
        validatePart1PortfolioType();
    });
});

const riskTolerance = document.getElementsByName('riskTolerance');
riskTolerance.forEach(risk => {
    risk.addEventListener('change', () => {
        validatePart1RiskTolerance();
    });
});

const investmentGoal = document.getElementById('investmentGoal')
investmentGoal.addEventListener('change', () => {
    validatePart1InvestmentGoal()
})

const investmentHorizon = document.getElementById('investmentHorizon')
investmentHorizon.addEventListener('change', () => {
    validatePart1InvestmentHorizon()
})

// Part-2
const annualInvestmentCapacityInput = document.getElementById('annualInvestmentCapacityInput');
annualInvestmentCapacityInput.addEventListener('input', () => {
    validatePart2AnnualInvestmentCapacity()
})

const assetContainer = document.querySelector('.assetContainer');
assetContainer.addEventListener('change', (event) => {
    if (event.target.classList.contains('assetClassDropdown')) {
        validatePart2AssetClass();
    }
})
assetContainer.addEventListener('input', (event) => {
    if (event.target.classList.contains('precentageAllocationInput')) {
        validatePart2percentageAllocation();
    }
})

// Part-3
const automatedRebalancing = document.getElementsByName('automatedRebalancing');
automatedRebalancing.forEach(option => {
    option.addEventListener('change', () => {
        validatePart3AutomatedRebalancing();
    })
})

const riskAcknowledgement = document.getElementsByName('riskAcknowledgement');
riskAcknowledgement.forEach(option => {
    option.addEventListener('change', () => {
        validatePart3AckCheckBox();
    })
})


// Navigation
const forward = document.getElementById('forward')
forward.addEventListener('click', () => {
    nextPage();
})

const previousButton = document.getElementById('prevButton');
previousButton.addEventListener('click', () => {
    previousPage();
})

// Asset Management
const addAssetButton = document.getElementById('addAssetButton');
addAssetButton.addEventListener('click', () => {
    addAsset();
})


// remove asset
document.body.addEventListener('click', (event) => {

    if (event.target && event.target.matches('.removeAssetButton')) {
        const assetId = event.target.id
        console.log(`asset-${assetId}`)
        removeAsset(`asset-${assetId}`);
    }
})

const portfolioForm = document.getElementById('portfolioForm');

portfolioForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const submitButton = document.getElementById('submitButton');
    let success = false

    if (submitButton.innerText == 'Update') {
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

// console.log(tbody);
const formTable = document.getElementById('formTable')

formTable.addEventListener('click', (event) => {
    const row = event.target.closest('tr');
    const tbody = document.getElementById('tableBody')
    if (!row || !tbody || row.parentElement !== tbody)
        return

    if (row.classList.contains('selectedRecord')) {
        row.classList.remove('selectedRecord');
        selectRow(null);
    } else {
        tbody.querySelectorAll('tr.selectedRecord').forEach(record => record.classList.remove('selectedRecord'))
        row.classList.add('selectedRecord')
        selectRow(row.dataset.id);
    }

});

const editButton = document.getElementById('editRecordButton');
editButton.addEventListener('click', () => {
    populateForm()
})

const deleteButton = document.getElementById('deleteRecordButton');
deleteButton.addEventListener('click', () => {
    removeRecord()
})