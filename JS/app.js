'use Strict'

let allItemsImages = [];
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

function ItemImages(name,source) {
    this.name = name;
    this.source = source;
    this.imagesClicks = 0;
    this.ImagesShown = 0;

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
    do {
        FirstImageIndex = randomGenerator();
        SecondImageIndex = randomGenerator();
        ThirdImageIndex = randomGenerator();
    }

    while (FirstImageIndex === SecondImageIndex || FirstImageIndex === ThirdImageIndex || SecondImageIndex === ThirdImageIndex)
    {
        allItemsImages[FirstImageIndex].ImagesShown++;
        FirstImage.src = allItemsImages[FirstImageIndex].source;
        allItemsImages[SecondImageIndex].ImagesShown++;
        SecondImage.src = allItemsImages[SecondImageIndex].source;
        allItemsImages[ThirdImageIndex].ImagesShown++;
        ThirdImage.src = allItemsImages[ThirdImageIndex].source;
    }
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

    FirstImage.removeEventListener('click', handleUserClick);
    SecondImage.removeEventListener('click', handleUserClick);
    ThirdImage.removeEventListener('click', handleUserClick);

    ResultButton.disabled = true;
}
