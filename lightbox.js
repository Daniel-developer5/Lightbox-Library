let images = document.querySelectorAll("img")
let imgInside = []
let imgIndex
let lightBlock = document.getElementById("light-block")
let imgCount = document.querySelector('.img-count')
let closeBox = document.querySelector('.close-lightbox')
let switchBox = document.querySelector('.switch-box')
let switches = document.querySelectorAll('.switch')

images.forEach((elem, index) => {
    elem.addEventListener('click', () => {
        if (elem.classList.contains('lightbox-img-close')) {
            hideBlock()
        } else {
            lightBlock.classList.add('lightbox-block-show')
            cloneCreate(index)
        }
    })
})

function cloneCreate(originalInd) {
    let img = images[originalInd].cloneNode(true)
    lightBlock.appendChild(img)
    img.setAttribute('class', 'lightbox-lib-img')
    img.width = Math.floor(window.innerWidth / 2)
    imgInside.push(img)

    imgIndex = originalInd
    imgCount.textContent = `Image ${imgIndex + 1} of ${images.length - 1}`

    img.addEventListener('mouseover', showSwitchBox)
    img.addEventListener('mouseout', hideSwitchBox)
    switchBox.style.width = `${img.width - 20}px`
}

function hideBlock() {
    lightBlock.classList.remove('lightbox-block-show')
    emptyBlock()
}

function emptyBlock() {
    imgInside.forEach(elem => {
        elem.remove()
    })
    imgInside = []
}

function showSwitchBox() {
    if (images.length != 2) {
        switchBox.classList.add('open-switch')
    }
}

function hideSwitchBox() {
    switchBox.classList.remove('open-switch')
}

function showHideSwitch(property, index) {
    switches[index].style.transform = property
}

function rightSwitch() {
    emptyBlock()
    if (imgIndex == images.length - 3) {
        cloneCreate(imgIndex + 1)
        showHideSwitch('scale(0)', 1)
    } else {
        cloneCreate(imgIndex + 1)
        showHideSwitch('scale(1)', 1)
        showHideSwitch('scale(1)', 0)
    }
}

function leftSwitch() {
    if (imgIndex == 1) {
        cloneCreate(imgIndex - 1)
        showHideSwitch('scale(0)', 0)
    } else {
        cloneCreate(imgIndex - 1)
        showHideSwitch('scale(1)', 0)
        showHideSwitch('scale(1)', 1)
    }
}

closeBox.addEventListener('click', hideBlock)
switchBox.addEventListener('mouseover', showSwitchBox)
window.addEventListener('load', showHideSwitch('scale(0)', 0))
document.addEventListener('keydown', (e) => {
    emptyBlock()
    switch (e.keyCode) {
        case 39:
            if (imgIndex == images.length - 2) {
                cloneCreate(imgIndex)
            } else {
                rightSwitch()
            }
            break
        case 37:
            if (imgIndex == 0) {
                cloneCreate(imgIndex)
            } else {
                leftSwitch()
            }
            break
        default:
            cloneCreate(imgIndex)
            break
    }
})

switches.forEach(elem => {
    elem.addEventListener('click', () => {
        emptyBlock()
        switch (elem.classList.contains('switch-right')) {
            case true:
                rightSwitch()
                break
            case false:
                leftSwitch()
                break
        }
    })
})