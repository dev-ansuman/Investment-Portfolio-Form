export const showDataInTable = () => {
    const localStorageDataString: string | null = localStorage.getItem('portfolioFormData')


    if (localStorageDataString) {

        const localStorageData: any[] = JSON.parse(localStorageDataString);

        const table = document.getElementById('formTable') as HTMLTableElement | null
        if (table) {
            table.innerHTML = `
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
        }

        const tbody = document.getElementById('tableBody') as HTMLTableSectionElement

        localStorageData.forEach(record => {
            const row = document.createElement('tr')
            row.dataset.id = record.id;

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