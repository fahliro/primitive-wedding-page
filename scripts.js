const resetForm = () => {
    document.querySelector(".guest-name").value = ""
    document.querySelector('input[name="coa"]:checked').checked = false
    document.querySelector(".message").value = ""
}

let messageTimer

const handleMessage = (message) => {
    clearTimeout(messageTimer)
    const errorMessage = document.querySelector(".error-message")
    errorMessage.innerHTML = message
    messageTimer = setTimeout(() => errorMessage.innerHTML = "&nbsp;", 5000)
}

const handleButton = ({isSending}) => {
    if(isSending) {
        button.classList.add("disabled")
        button.innerText = "Sedang mengirim..."
    } else {
        button.classList.remove("disabled")
        button.innerText = "Kirim"
    }
}

const sendResponse = () => {
    const guestName = document.querySelector(".guest-name")?.value
    const coa = document.querySelector('input[name="coa"]:checked')
    const isComing = coa?.value === "1"
    const message = document.querySelector(".message")?.value

    if(!guestName && !coa) {
        handleMessage("<b>Nama</b> dan <b>Konfirmasi kehadiran</b> harus diisi")
    } else if(!guestName) {
        handleMessage("<b>Nama</b> harus diisi")
    } else if(!coa) {
        handleMessage("<b>Konfirmasi kehadiran</b> harus diisi")
    } else {
        handleButton({isSending: true})
        fetch(`https://docs.google.com/forms/d/e/1FAIpQLSdPI1LY5lHB_pKbqJQaAqxlII7t0CJiF9ZYXRCsv2Ry7BmFMA/formResponse?&submit=Submit?usp=pp_url&entry.1498135098=${guestName}&entry.877086558=${isComing ? "Hadir" : "Tidak Hadir"}&entry.1802854554=${message}`, {
            mode: "no-cors",
        }).then(() => {
            handleMessage("Berhasil terkirim. Terima kasih telah memberi respon kehadiran. Jazakumullah Khairan")
            resetForm()
            handleButton({isSending: false})
        }).catch((err) => {
            if(err) {
                handleMessage("Gagal mengirim")
                handleButton({isSending: false})
                console.log("error message: " + err)
            }
        })
    }
}

const button = document.querySelector('.submit:not(.disabled)')
button && button.addEventListener("click", sendResponse)

AOS.init({
    duration: 1000
})
