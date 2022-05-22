const washCarBtn = document.getElementById("wash-car-btn")
const mowLawnBtn = document.getElementById("mow-lawn-btn")
const pullWeedsBtn = document.getElementById("pull-weeds-btn")
const mainInvoice = document.querySelector(".main-invoice")
const totalAmt = document.getElementById("total-amt")
const notes = document.getElementById("notes")
const removeEl = document.getElementById("remove-el")
const sendInvoice = document.getElementById("send-invoice")

let totalAmount = 0
let serviceArray = []

const availableService = [
    {
        id : "wash-car-btn",
        name : "Wash Car",
        price : 10
    },

    {
        id : "mow-lawn-btn",
        name : "Mow Lawn",
        price : 20
    },

    {
        id : "pull-weeds-btn",
        name : "Pull Weeds",
        price : 30
    }
]

washCarBtn.addEventListener("click" , addService)
pullWeedsBtn.addEventListener("click" , addService)
mowLawnBtn.addEventListener("click", addService)
sendInvoice.addEventListener("click", () => {
    location.reload()
})

function addService(e) {
    availableService.forEach(item => {
        if(e.target.id === item.id) {
            serviceArray.push(item)
            e.target.disabled = true
        }
        return serviceArray
    })
    renderServiceBill()
    calculateBill()
}

function remove(index){
    if(serviceArray[index].name === "Wash Car"){
        washCarBtn.disabled = false
    }else if(serviceArray[index].name === "Mow Lawn"){
        mowLawnBtn.disabled = false
    }else{
        pullWeedsBtn.disabled = false
    }
    serviceArray.splice(index , 1)
    renderServiceBill()
    calculateBill()
    
}

function renderServiceBill() {
    let serviceHolder = ""
    mainInvoice.innerHTML = `` //Reset the main-invoice DOM 
    for(let i = 0; i < serviceArray.length ; i++){
         serviceHolder+= `
        <div class="invoice-items">
            <div class="invoice-title">
                <h3 id="invoice-name">${serviceArray[i].name}</h3>
                <p id="remove-el" onclick="remove(${serviceArray.indexOf(serviceArray[i])})">Remove</p>
            </div>
            <div class="invoice-amount">
                <h3 id="invoice-price"><span>$</span>${serviceArray[i].price}</h3>
            </div>
        </div>
        `
    }
    mainInvoice.innerHTML = serviceHolder // Reset the service holder to empty
}

function calculateBill(){
    totalAmount = 0
    for(let items of serviceArray){
        totalAmount += items.price
    }
    totalAmt.innerHTML = `<h1 id="total-amt">$${totalAmount}</h1>`
    notes.innerHTML = `<p id="notes">We accept cash, credit card, or PayPal</p>`
}