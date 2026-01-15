import { validatePart1PortfolioName, validatePart1PortfolioType, validatePart1InvestmentGoal, validatePart1InvestmentHorizon, validatePart1RiskTolerance, validatePart2AnnualInvestmentCapacity, validatePart2AssetClass, validatePart2percentageAllocation, validatePart3AutomatedRebalancing, validatePart3AckCheckBox } from './validations.ts'

import { showDataInTable } from './tableHandler.ts'
import { submitRecord, editRecord, emptyFields } from './formHandler.ts'
import { nextPage, previousPage } from './navigation.js'
import { addAsset, removeAsset } from './assetManagement.ts'

// Real Time Validation
// Part-1
const portfolioNameInput = document.getElementById('portfolioNameInput')
portfolioNameInput.addEventListener('keypress', () => {
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
annualInvestmentCapacityInput.addEventListener('keypress', () => {
    validatePart2AnnualInvestmentCapacity()
})

const assetClassDropdown = document.querySelector('.assetClassDropdown');
assetClassDropdown.addEventListener('change', () => {
    validatePart2AssetClass()
})

const percentageAllocationInput = document.querySelector('.percentageAllocationInput');
console.log(percentageAllocationInput);
percentageAllocationInput.addEventListener('keypress', () => {
    validatePart2percentageAllocation();
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
    assets = document.querySelectorAll('.assets');
    const assetClassDropdown = document.querySelector('.assetClassDropdown');
    assetClassDropdown.addEventListener('change', () => {
        validatePart2AssetClass()
    })

    const percentageAllocationInput = document.querySelector('.percentageAllocationInput');
    console.log(percentageAllocationInput);
    percentageAllocationInput.addEventListener('keypress', () => {
        validatePart2percentageAllocation();
    })
})

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

    if (submitButton.innerText == 'Update') {
        editRecord();
    } else {
        submitRecord();
    }

    emptyFields();
    previousPage();
    previousPage();
});


showDataInTable();

const tbody = document.getElementById('tableBody');
// console.log(tbody);

tbody.addEventListener('click', (event) => {
    const row = event.target.closest('tr');
    if (!row || row.parentElement !== tbody)
        return

    tbody.querySelectorAll('tr.selectedRecord').forEach(record => record.classList.remove('selectedRecord'))

    row.classList.add('selectedRecord')

});