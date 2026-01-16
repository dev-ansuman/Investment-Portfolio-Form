import { validatePart1PortfolioName, validatePart1PortfolioType, validatePart1InvestmentGoal, validatePart1InvestmentHorizon, validatePart1RiskTolerance, validatePart2AnnualInvestmentCapacity, validatePart2AssetClass, validatePart2percentageAllocation, nameTaken } from './validations.js'

const part1 = document.getElementById('part1') as HTMLElement
const part2 = document.getElementById('part2') as HTMLElement
const part3 = document.getElementById('part3') as HTMLElement

const investmentDetailLogo = document.getElementById('investmentDetailLogo') as HTMLImageElement
const progressBar1 = document.getElementById('progressBar1') as HTMLElement
const assetAllocationLogo = document.getElementById('assetAllocationLogo') as HTMLImageElement
const assetAllocationProgresstext = document.getElementById('assetAllocationProgresstext') as HTMLDivElement
const progressBar2 = document.getElementById('progressBar2') as HTMLElement
const preferenceLogo = document.getElementById('preferencesLogo') as HTMLImageElement
const preferenceProgressText = document.getElementById('preferenceProgressText') as HTMLDivElement

const button = document.getElementById('forward') as HTMLButtonElement
const submitButton = document.getElementById('submitButton') as HTMLButtonElement
const previousButton = document.getElementById('prevButton') as HTMLButtonElement

export const previousPage = () => {

    if (part1.style.display === 'none' && part2.style.display === 'none' && part3.style.display === '') {
        
        part2.style.display = ''
        part3.style.display = 'none';

        assetAllocationLogo.src = './images/asset.svg'
        preferenceLogo.style.backgroundColor = ''
        progressBar2.style.backgroundColor = 'black'
        button.style.display = ''
        submitButton.style.display = 'none'

    }

    else if (part1.style.display === 'none' && part2.style.display === '' && part3.style.display === 'none') {

        previousButton.disabled = true

        part1.style.display = '';
        part2.style.display = 'none';

        investmentDetailLogo.src = './images/details.svg'
        assetAllocationLogo.style.backgroundColor = ''
        progressBar1.style.backgroundColor = 'black'

    }
}

export const nextPage = () => {


    if (part1.style.display === '' && part2.style.display === 'none' && part3.style.display === 'none') {

        validatePart1PortfolioName()
        validatePart1PortfolioType()
        validatePart1InvestmentGoal()
        validatePart1InvestmentHorizon()
        validatePart1RiskTolerance()

        let moveToNextPage = validatePart1PortfolioName() && 
            nameTaken() && 
            validatePart1PortfolioType() &&
            validatePart1InvestmentGoal() &&
            validatePart1InvestmentHorizon() &&
            validatePart1RiskTolerance()

        if (moveToNextPage) {

            part1.style.display = 'none';
            part2.style.display = ''
            part3.style.display === 'none';

            investmentDetailLogo.src = './images/tick.svg'
            progressBar1.style.backgroundColor = '#42e0ae'
            assetAllocationLogo.style.backgroundColor = '#42e0ae'
            assetAllocationProgresstext.style.color = '#127656'
            assetAllocationLogo.style.border = 'none'
            previousButton.disabled = false

        }
    }

    else if (part1.style.display === 'none' && part2.style.display === '' && part3.style.display === 'none') {

        validatePart2AnnualInvestmentCapacity()
        validatePart2AssetClass()
        validatePart2percentageAllocation()

        let moveToNextPage = validatePart2AnnualInvestmentCapacity() &&
            validatePart2AssetClass() &&
            validatePart2percentageAllocation()

        console.log('validatePart2AnnualInvestmentCapacity', validatePart2AnnualInvestmentCapacity())
        console.log('validatePart2AssetClass', validatePart2AssetClass())
        console.log('validatePart2percentageAllocation', validatePart2percentageAllocation())
        console.log('page 2 to 3', moveToNextPage)

        if (moveToNextPage) {
            part1.style.display === 'none';
            part2.style.display = 'none';
            part3.style.display = '';

            assetAllocationLogo.src = './images/tick.svg'
            progressBar2.style.backgroundColor = '#42e0ae'
            preferenceLogo.style.backgroundColor = '#42e0ae'
            preferenceProgressText.style.color = ''
            
            button.style.display = 'none'
            
            submitButton.style.backgroundColor = '#42e0ae'
            submitButton.style.border = 'none'
            submitButton.style.display = ''
        }
    }
}