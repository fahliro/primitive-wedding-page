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

const eventDate = new Date("2023-07-01T09:00:00.000+08:00").getTime();
const countDown = setInterval(() => {
    const currentDate = new Date().getTime();
    const timeLeft = eventDate - currentDate;
        
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    const contentDays = document.querySelector(".content-right > div:nth-child(5) > div:nth-child(2)")
    const contentHours = document.querySelector(".content-right > div:nth-child(5) > div:nth-child(3) > div:first-child")
    const contentMinutes = document.querySelector(".content-right > div:nth-child(5) > div:nth-child(3) > div:nth-child(2)")
    const contentSeconds = document.querySelector(".content-right > div:nth-child(5) > div:nth-child(3) > div:nth-child(3)")
    
    contentDays.innerHTML = `<b>${days}<br>Hari<b/>`
    contentHours.innerHTML = `${hours}<br>Jam` 
    contentMinutes.innerHTML = `${minutes}<br>Menit`
    contentSeconds.innerHTML = `${seconds}<br>Detik`

    if(seconds < 0 && seconds > -5) {
        document.querySelector(".content-right > div:nth-child(5) > div:nth-child(2)").innerHTML = "Acara sedang berlangsung" + seconds
        document.querySelector(".content-right > div:nth-child(5) > div:nth-child(3)").innerHTML = ""
    } else if(seconds === -5) {
        document.querySelector(".content-right > div:nth-child(5) > div:nth-child(2)").innerHTML = "Acara telah selesai"
        clearInterval(countDown);
    }

    if (timeLeft < 0) {
        // clearInterval(countDown);
        // contentDays.innerHTML = "<b>0<br>Hari<b/>"
        // contentHours.innerHTML = "0 <br>Jam" 
        // contentMinutes.innerHTML = "0 <br>Menit"
        // contentSeconds.innerHTML = "0 <br>Detik"
    }
}, 1000)