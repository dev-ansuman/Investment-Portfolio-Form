export const showError = (errorClass: string, parentClass: string, addAt: string, fontSize: string, ERROR_MESSAGE: string, extra: string) => {
    const parentElement: HTMLDivElement | null = document.querySelector(`.${parentClass}`)
    checkExistingError(errorClass)

    const errorMessage = document.createElement("div")
    errorMessage.className = errorClass
    errorMessage.innerText = ERROR_MESSAGE
    errorMessage.style.color = "red"
    errorMessage.style.fontSize = fontSize
    if (addAt === 'append') {

        parentElement?.appendChild(errorMessage)
    } else if (addAt === 'after') {
        parentElement?.after(errorMessage)
    }

    if (extra) {
        errorMessage.style.marginLeft = extra
    }
}


export const checkExistingError = (errorClass: string) => {
    let checkError: HTMLDivElement | null = document.querySelector(`.${errorClass}`)
    if (checkError) {
        checkError.remove();
    }
}