export interface Asset {
    assetClass: string | undefined;
    percentageAllocation: string | undefined;
    specificFund: string | undefined;
    currentValue: string | undefined;
}
export interface PortfolioFormData {
    id: number | null;
    portfolioName: string;
    portfolioType: string;
    investmentGoal: string;
    investmentHorizon: string;
    riskTolerance: string;
    annualInvestmentCapacity: string;
    lumpSumAmount: string;
    monthlyContribution: string;
    assets: Asset[];
    investmentStyle: string[];
    automatedRebalancing: string;
    taxSavingPrefernce: string;
    financialGoals: string;
    riskAcknowledgement: string;
}
