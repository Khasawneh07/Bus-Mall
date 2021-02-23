'use Strict'

let allItemsImages = [];
let productsName = [];  // add name of images to the chart
let shownArr = [];  // add number of shown to the chart
let clicksArr = []; // add number of clicks to the chart
let FirstImage = document.getElementById('First');
let SecondImage = document.getElementById('Second');
let ThirdImage = document.getElementById('Third');
let ItemsImagesDiv = document.getElementById('ItemsImagesDiv');

ItemsImagesDiv.addEventListener('click', handleUserClick);
// SecondImage.addEventListener('click', handleUserClick);
// ThirdImage.addEventListener('click', handleUserClick);

let DefaultRoundsNumber = 25;
let TotalClicks = 0;

let FirstImageIndex;
let SecondImageIndex;
let ThirdImageIndex;
let FirstImageIndexPrevious = -1;
let SecondImageIndexPrevious = -1;
let ThirdImageIndexPrevious = -1;

function ItemImages(name,source) {
    this.name = name;
    this.source = source;
    this.imagesClicks = 0;
    this.ImagesShown = 0;

    productsName.push(name);
    allItemsImages.push(this);
}

new ItemImages('bag', 'Images/bag.jpg');
new ItemImages('banana', 'Images/banana.jpg');
new ItemImages('bathroom', 'Images/bathroom.jpg');
new ItemImages('boots', 'Images/boots.jpg');
new ItemImages('breakfast', 'Images/breakfast.jpg');
new ItemImages('bubblegum', 'Images/bubblegum.jpg');
new ItemImages('chair', 'Images/chair.jpg');
new ItemImages('cthulhu', 'Images/cthulhu.jpg');
new ItemImages('dog-duck', 'Images/dog-duck.jpg');
new ItemImages('pen', 'Images/pen.jpg');
new ItemImages('pet-sweep', 'Images/pet-sweep.jpg');
new ItemImages('scissors', 'Images/scissors.jpg');
new ItemImages('shark', 'Images/shark.jpg');
new ItemImages('sweep', 'Images/sweep.png');
new ItemImages('tauntaun', 'Images/tauntaun.jpg');
new ItemImages('unicorn', 'Images/unicorn.jpg');
new ItemImages('usb', 'Images/usb.gif');
new ItemImages('water-can', 'Images/water-can.jpg');
new ItemImages('wine-glass', 'Images/wine-glass.jpg');

// renderThreeRandomImages();

function randomGenerator() {
    return Math.floor(Math.random() * (allItemsImages.length));

}

function renderThreeRandomImages() {
    let NonAllowed = [FirstImageIndexPrevious, SecondImageIndexPrevious, ThirdImageIndexPrevious];

    do{
    FirstImageIndex = randomGenerator();
    }
    while(NonAllowed.includes(FirstImageIndex));

    FirstImageIndexPrevious = FirstImageIndex;
    NonAllowed.push(FirstImageIndex);

    do{
    SecondImageIndex = randomGenerator();
    }
    while(NonAllowed.includes(SecondImageIndex))
    
    SecondImageIndexPrevious = SecondImageIndex;
    NonAllowed.push(SecondImageIndex);

    do{
    ThirdImageIndex = randomGenerator();
    } 
    while(NonAllowed.includes(ThirdImageIndex))
    ThirdImageIndexPrevious = ThirdImageIndex;

        allItemsImages[FirstImageIndex].ImagesShown++;
        FirstImage.src = allItemsImages[FirstImageIndex].source;
        allItemsImages[SecondImageIndex].ImagesShown++;
        SecondImage.src = allItemsImages[SecondImageIndex].source;
        allItemsImages[ThirdImageIndex].ImagesShown++;
        ThirdImage.src = allItemsImages[ThirdImageIndex].source;
    }

renderThreeRandomImages();


function handleUserClick(event) {
    
    if (TotalClicks < DefaultRoundsNumber) {
        if (event.target.id === 'First') {
            allItemsImages[FirstImageIndex].imagesClicks++;
            TotalClicks++;
        }
        else if (event.target.id === 'Second') {
            allItemsImages[FirstImageIndex].imagesClicks++;
            TotalClicks++;
        }
        else if (event.target.id === 'Third') {
            allItemsImages[FirstImageIndex].imagesClicks++;
            TotalClicks++;
        }

        renderThreeRandomImages();

    }
    else {
        ItemsImagesDiv.removeEventListener('click', handleUserClick);
        ResultButton.disabled = false;
        saveData();
    }
}

let ResultButton = document.getElementById('SubmitResult');
ResultButton.addEventListener('click', GoalResult);

function GoalResult() {
    let ResultItemsList = document.getElementById('ResultItemsList');
    let ul = document.createElement('ul');
    
    let goalResult;
    for (let i = 0; i < allItemsImages.length; i++) {

        goalResult = document.createElement('li');
        goalResult.textContent = allItemsImages[i].name + ' had ' + allItemsImages[i].imagesClicks + ' votes, and was seen ' + allItemsImages[i].ImagesShown;
        ul.appendChild(goalResult);
    }
    ResultItemsList.appendChild(ul);
    chartRender();
    FirstImage.removeEventListener('click', handleUserClick);
    SecondImage.removeEventListener('click', handleUserClick);
    ThirdImage.removeEventListener('click', handleUserClick);

    ResultButton.disabled = true;
}
getData();


// letshownArr = [];
// clicksArr = [];
 

function chartRender(){
    for (let i = 0; i < allItemsImages.length; i++) {

        productsName.push(allItemsImages[i].name);
        shownArr.push(allItemsImages[i].ImagesShown);
        clicksArr.push(allItemsImages[i].imagesClicks);
      }
      console.log(clicksArr);
console.log(shownArr);
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',
    
        // The data for our dataset
        data: {
            labels: productsName,
            datasets: [{
                label: 'Images Clicked',
                backgroundColor: '#e36bae',
                borderColor: 'rgb(255, 99, 132)',
                data: clicksArr,
            },{
                label: 'Images Shown',
                backgroundColor: '#f1d1d0',
                borderColor:'rgb(155,100,30)',
                data: shownArr,
    
            }]
        },
    
        // Configuration options go here
        options: {}
    });
    
    // console.log(chart);
    }
console.log(clicksArr);
console.log(shownArr);

function saveData(){
    let userInput = JSON.stringify(allItemsImages);
    localStorage.setItem('userClickes',userInput);
}
function getData(){
    let storeInput = localStorage.getItem('userClickes');
    userOutput = JSON.parse(storeInput);

    if (userOutput !== null){

    allItemsImages = userOutput;
        
  }
   
}