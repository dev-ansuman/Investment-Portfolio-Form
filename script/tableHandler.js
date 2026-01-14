import { removeRecord, selectRow } from './formHandler.js'
import { popupateForm } from './formHandler.js'

export const showDataInTable = () => {
    const localStorageDataString = localStorage.getItem('portfolioFormData')


    if (localStorageDataString) {

        const localStorageData = JSON.parse(localStorageDataString);
        console.log(localStorageData);

        const table = document.getElementById('formTable')
        table.innerHTML = ''
        // <colGroup>
        //     <col style="width: 16%">
        //     <col style="width: 10%">
        //     <col style="width: 18%">
        //     <col style="width: 18%">
        //     <col style="width: 10%">
        //     <col style="width: 10%">
        //     <col style="width: 6%">
        //     <col style="width: 12%">
        // </colGroup>
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
        const tbody = document.getElementById('tableBody');

        localStorageData.forEach(record => {
            const row = document.createElement('tr')
            row.dataset.id = record.id;
            row.addEventListener('click', () => {
                selectRow(record.id);

                const activeClass = 'selectedRecord';
                tbody.addEventListener('click', (event) => {
                    if (event.target && event.target.classList.contains(activeClass)) {
                        const currentActive = document.querySelector('.' + activeClass);
                        if (currentActive) {
                            currentActive.classList.remove(activeClass);
                        }
                        
                        event.target.classList.add(activeClass);
                    }
                });


                row.classList.add('selectedRecord')
                const editButton = document.getElementById('editRecordButton');
                editButton.addEventListener('click', () => {
                    popupateForm()
                })
            })

            row.addEventListener('click', () => {
                selectRow(record.id);
                row.style.background = 'red'
                const deleteButton = document.getElementById('deleteRecordButton');
                deleteButton.addEventListener('click', () => {
                    removeRecord();
                })
            })

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