let assetId: number = 0
export const addAsset = () => {
    assetId++
    const newRow: HTMLElement = document.createElement('div')
    newRow.className = 'assets'
    newRow.id = `asset-${assetId}`

    newRow.innerHTML = `
        <div class="assetClass subAssetDiv">
                                    <div class="assetLabel">
                                        <label class="assetSubheading">Asset Class <span class="required">*</span></label>
                                    </div>
                                    <div class="assetDropdown">
                                        <select name="assetClass" class="assetClassDropdown input assetSubheading" id="assetClass${assetId}" onchange="autoSuggestSpecificFund('assetClass${assetId}', 'specificFundAuto${assetId}')">
                                            <option value="">-- Select --</option>
                                            <option value="Equity">Stocks</option>
                                            <option value="Fixed Income">Bond</option>
                                            <option value="Cash Equivalent">Cash</option>
                                            <option value="REITs">Real Estate</option>
                                            <option value="Foreign Exchange">Forex</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="percentageAllocation subAssetDiv" id="percentageAllocation-${assetId}">
                                    <!-- Input for Percentage Allocation -->
                                    <div class="percentageAllocationLabel">
                                        <label class="assetSubheading">Percentage Allocation(%) <span class="required">*</span></label>
                                    </div>
                                    <div class="percentageAllocationContainer">
                                        <input name="percentage" type="number" class="percentageAllocationInput input assetSubheading" id="percentageAllocationInput-${assetId}" onkeypress="validatePart2percentageAllocation()" onchange="validatePart2percentageAllocation()">
                                    </div>
                                </div>

                                <div class="specificFund subAssetDiv">
                                    <!-- Input for specific fund -->
                                    <div class="specificFundLabel">
                                        <label class="assetSubheading">Specific Fund</label>
                                    </div>
                                    <div class="specificFundInput">
                                        <input name="specificFund" type="text" id="specificFundAuto${assetId}" class="specificFundInputAuto input assetSubheading">
                                    </div>
                                </div>

                                <div class="currentValue subAssetDiv">
                                    <!-- Input for current Value -->
                                    <div class="currentValueLabel">
                                        <label class="assetSubheading">Current Value</label>
                                    </div>
                                    <div class="deleteAssetDiv">
                                        <div class="currentValueInput">
                                            <input name="currentValue" type="number" placeholder="INR" class="getCurrentValue input assetSubheading">
                                        </div>
                                        <div class="removeAsset">
                                            <button type="button" class="removeAssetButton" id="${assetId}">🗑️</button>
                                        </div>
                                    </div>


                                </div>
    `

    const assetContainer: HTMLElement | null = document.querySelector('.assetContainer')
    assetContainer?.appendChild(newRow)
}

export const removeAsset = (id: string) => {
    const assets: NodeListOf<HTMLElement> | null = document.querySelectorAll('.assets')
    const rowToRemove: HTMLElement | null = document.getElementById(id)

    if (rowToRemove && assets?.length > 1) {
        rowToRemove.remove()
    }
}