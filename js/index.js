const img = document.querySelector('img')
const canvas = document.querySelector('canvas')


document.addEventListener('keydown', event => {
    if (event.code === "Enter") {
        img.classList.add('d-none')
        canvas.classList.remove('d-none')
        controlerApp.init()
    }
})


