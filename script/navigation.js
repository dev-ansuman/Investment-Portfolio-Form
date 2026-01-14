import { validatePart1PortfolioName, validatePart1PortfolioType, validatePart1InvestmentGoal, validatePart1InvestmentHorizon, validatePart1RiskTolerance, validatePart2AnnualInvestmentCapacity, validatePart2AssetClass, autoSuggestSpecificFund, validatePart2percentageAllocation } from './validations.js'

export const previousPage = () => {
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

export const nextPage = () => {
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