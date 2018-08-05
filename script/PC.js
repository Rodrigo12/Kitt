// JavaScript source code

/*Global variables*/
var ledActualButton = 1;
var timeVariation = 1;
var actualTime = 3;
var partsOfDay;
var steeringWheel = 0;

var left = 30;
var top = 90;

/*Variaveis globais referentes aos problemas do carro*/
var analysingCar;
var depth = 0;
var numberOfProblems = 0;
var problem;
var velas = 0;
var motor = 0;
var pneus = 0;
var freios = 0;
var suspensao = 0;
var bateria = 0;

/*Variaveis globais referentes ao estado do condutor*/
var analysingDriver;
var superDrunk = 0;
var softDrunk = 0;
var drowsiness = 0;

/*Variaveis globais referentes à ajuda*/
var help = 0;
var timeToAppearHelp;
var actualScreen;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////Funcoes referentes ao ligar/desligar carro e as dos botoes do volante///////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function dayTime() {
    if (timeVariation == 1) {
        document.getElementById('background').src = 'images/background/bgpTarde.png';
        document.getElementById('loading').src = 'images/whiteLoading.gif';
        if (depth == 0) {
            document.getElementById('showDetails').src = 'images/moreDetailsGray.png';
        } else { document.getElementById('showDetails').src = 'images/lessDetailsGray.png'; }
        document.getElementById('carWhite').src = 'images/carProblemsGray.png';
        timeVariation = 2;
        actualTime = 1;
    } else if (timeVariation == 2) {
        document.getElementById('background').src = 'images/background/bgpNoite.png';
        document.getElementById('loading').src = 'images/lightBrownLoading.gif';
        if (depth == 0) {
            document.getElementById('showDetails').src = 'images/moreDetailsGray.png';
        } else { document.getElementById('showDetails').src = 'images/lessDetailsGray.png'; }
        document.getElementById('carWhite').src = 'images/carProblemsGray.png';
        timeVariation = 3;
        actualTime = 2;
    } else if (timeVariation == 3) {
        document.getElementById('background').src = 'images/background/bgpDia.png';
        document.getElementById('loading').src = 'images/blackLoading.gif';
        if (depth == 0) {document.getElementById('showDetails').src = 'images/moreDetails.png';
        } else { document.getElementById('showDetails').src = 'images/lessDetails.png'; }
        document.getElementById('carWhite').src = 'images/carProblemsGray.png';
        timeVariation = 1;
        actualTime = 3;
    }
    clearTimeout(partsOfDay);
    partsOfDay = setTimeout(function () { dayTime(); }, 30000);
}

function fingerPrintConfirmation() {
    document.getElementById('led').style.top = "11%";
    document.getElementById('led').style.left = "4%";
    ledActualButton = 1;

    document.getElementById('fingerPrint').style.visibility = "hidden";
    document.getElementById('loading').style.visibility = "visible";    
    document.getElementById('welcome').style.visibility = "visible";

    clearTimeout(partsOfDay);
    partsOfDay = setTimeout(function () { dayTime(); }, 30000);
    setTimeout(function () { mainMenu(); }, 11400/* 1000*/);
}

function mainMenu() {
    depth = 0;
    clearTimeout(analysingCar);
    clearTimeout(analysingDriver);
    clearTimeout(timeToAppearHelp);

    enableDisableSteeringWheel(1);


    document.getElementById('up').disabled = false;
    document.getElementById('down').disabled = false;
    document.getElementById('enter').disabled = false;
    document.getElementById('back').disabled = false;

    document.getElementById('car').style.opacity = 1;
    document.getElementById('person').style.opacity = 1;
    document.getElementById('help').style.opacity = 1;
    document.getElementById('loading').style.visibility = "hidden";
    document.getElementById('welcome').style.visibility = "hidden";
    document.getElementById('exit').style.visibility = "visible";

    document.getElementById('led').style.visibility = "visible";

    document.getElementById('car').style.visibility = "visible";
    document.getElementById('person').style.visibility = "visible";
    document.getElementById('help').style.visibility = "visible";

    document.getElementById('upViewAnalysis').style.visibility = "hidden";
    document.getElementById('sideViewAnalysis').style.visibility = "hidden";
    document.getElementById('upView').style.visibility = "hidden";
    document.getElementById('sideView').style.visibility = "hidden";
    document.getElementById('upViewTires').style.visibility = "hidden";
    document.getElementById('sideViewTires').style.visibility = "hidden";
    document.getElementById('warningVelas').style.visibility = "hidden";
    document.getElementById('warningFreios').style.visibility = "hidden";
    document.getElementById('warningPneus').style.visibility = "hidden";
    document.getElementById('warningSuspensao').style.visibility = "hidden";
    document.getElementById('warningBateria').style.visibility = "hidden";
    document.getElementById('warningMotor').style.visibility = "hidden";
    document.getElementById('ok').style.visibility = "hidden";
    document.getElementById('almostOk').style.visibility = "hidden";
    document.getElementById('showDetails').style.visibility = "hidden";
    document.getElementById('vela').style.visibility = "hidden";
    document.getElementById('brakes').style.visibility = "hidden";
    document.getElementById('motor').style.visibility = "hidden";
    document.getElementById('battery').style.visibility = "hidden";
    document.getElementById('suspension').style.visibility = "hidden";
    document.getElementById('tires').style.visibility = "hidden";

    document.getElementById('txtTires').style.visibility = "hidden";
    document.getElementById('txtSuspension').style.visibility = "hidden";
    document.getElementById('txtBattery').style.visibility = "hidden";
    document.getElementById('txtPlugs').style.visibility = "hidden";
    document.getElementById('txtEngine').style.visibility = "hidden";
    document.getElementById('txtBrakes').style.visibility = "hidden";

    document.getElementById('personAnalysis').style.visibility = "hidden";
    document.getElementById('personDrowsiness').style.visibility = "hidden";
    document.getElementById('warningDrowsiness').style.visibility = "hidden";
    document.getElementById('warningAlcohol').style.visibility = "hidden";
    document.getElementById('personDrunk').style.visibility = "hidden";
    document.getElementById('UnableDrive').style.visibility = "hidden";
    document.getElementById('personOk').style.visibility = "hidden";
    document.getElementById('noDriverProblems').style.visibility = "hidden";

    document.getElementById('carWhite').style.visibility = "hidden";
    document.getElementById('listOfProblems').style.visibility = "hidden";

    document.getElementById('help_carProblems').style.display = "none";
    document.getElementById('help_personProblems').style.display = "none";
    document.getElementById('help_help').style.display = "none";
    document.getElementById('keyboard').style.display = "none";

    cleanHelp();
}

//Funcao do botao da seta para a direita do volante
function enterFunction() {
    if (ledActualButton == 1) {
        chooseAction();
    } else if (ledActualButton == 2) {
        driverAnalysis();
    } else if (ledActualButton == 3) {
        if (help == 0) { help = 1; helpMainMenu(); }
    } else if (ledActualButton == 4 && depth == 0) {
        problemInfo();
    } else if (ledActualButton == 4 && depth == 1) {
        warningImages();
    } else if (ledActualButton == 5) {
        carAnalysis();
    } else if (ledActualButton == 6) {
        displayProblems();
    } else if (ledActualButton == 7) {
        warningImages();
    } else if (depth == 2) {
        if (getElement(1).style.left == "30%") { problem = 1; }
        if (getElement(2).style.left == "30%") { problem = 3; }
        if (getElement(3).style.left == "30%") { problem = 4; }
        if (getElement(4).style.left == "30%") { problem = 5; }
        if (getElement(5).style.left == "30%") { problem = 6; }
        if (getElement(6).style.left == "30%") { problem = 2; }

        warningImages();
    }
}

//Funcao do botao da seta para a esquerda do volante
function backFunction() {
    if (ledActualButton == 1) {
        document.getElementById('led').style.top = "11%";
        document.getElementById('led').style.left = "4%";
        ledActualButton = 1;
        mainMenu();
    } else if (ledActualButton == 2) {
        document.getElementById('led').style.top = "21%";
        document.getElementById('led').style.left = "6.5%";
        ledActualButton = 2;
        mainMenu();
    } else if (ledActualButton == 3) {
        if (help == 1) { help = 0; helpMainMenu(); }
    }else if (ledActualButton == 4) {
        if (numberOfProblems <= 1) {
            document.getElementById('led').style.top = "11%";
            document.getElementById('led').style.left = "4%";
            ledActualButton = 1;
            mainMenu();
        } else {
            chooseAction();
        }
    } else if (ledActualButton == 5 || ledActualButton == 6) {
        document.getElementById('led').style.top = "11%";
        document.getElementById('led').style.left = "4%";
        ledActualButton = 1;
        mainMenu();
    } else if (depth == 2) {
        mainMenu();
        depth = 1;
        chooseAction();
        document.getElementById('led').style.top = "33%";
        document.getElementById('led').style.left = "52%";
        ledActualButton = 6;
    }
}

//Funcao do botao da seta para cima do volante
function decreaseLed() {
    if (ledActualButton == 1) {
        document.getElementById('led').style.top = "31%";
        document.getElementById('led').style.left = "9%";
        ledActualButton = 3;
    } else if (ledActualButton == 2) {
        document.getElementById('led').style.top = "11%";
        document.getElementById('led').style.left = "4%";
        ledActualButton = 1;
    } else if (ledActualButton == 3) {
        document.getElementById('led').style.top = "21%";
        document.getElementById('led').style.left = "6.5%";
        ledActualButton = 2;
    } else if (ledActualButton == 5) {
        document.getElementById('led').style.top = "33%";
        document.getElementById('led').style.left = "52%";
        ledActualButton = 6;
    } else if (ledActualButton == 6) {
        document.getElementById('led').style.top = "33%";
        document.getElementById('led').style.left = "37%";
        ledActualButton = 5;
    } else if (depth = 2) {
        moveThroughList(0);
    }

}

//Funcao do botao da seta para baixo do volante
function increaseLed() {
    if (ledActualButton == 1) {
        document.getElementById('led').style.top = "21%";
        document.getElementById('led').style.left = "6.5%";
        ledActualButton = 2;
    } else if (ledActualButton == 2) {
        document.getElementById('led').style.top = "31%";
        document.getElementById('led').style.left = "9%";
        ledActualButton = 3;
    } else if (ledActualButton == 3) {
        document.getElementById('led').style.top = "11%";
        document.getElementById('led').style.left = "4%";
        ledActualButton = 1;
    } else if (ledActualButton == 5) {
        document.getElementById('led').style.top = "33%";
        document.getElementById('led').style.left = "52%";
        ledActualButton = 6;
    }
    else if (ledActualButton == 6) {
        document.getElementById('led').style.top = "33%";
        document.getElementById('led').style.left = "37%";
        ledActualButton = 5;
    } else if (depth = 2) {
        moveThroughList(1);
    }
}

function keyBoardLed() {
    if (window.event.keyCode == 70 && steeringWheel == 0 && help == 0 && document.getElementById('car').style.opacity != 0.4 && document.getElementById('person').style.opacity != 0.4) {
        fingerPrintConfirmation();
    }
    if (window.event.keyCode == 40 && steeringWheel == 1) {
        increaseLed();
    }
    if (window.event.keyCode == 38 && steeringWheel == 1) {
        decreaseLed();
    }
    if ((window.event.keyCode == 37 && steeringWheel == 1) || (window.event.keyCode == 37 && help == 1)) {
        backFunction();
    }
    if (window.event.keyCode == 39 && steeringWheel == 1) {
        enterFunction();
    }
    if (window.event.keyCode == 27) {
        exitFunction();
    }
    if (window.event.keyCode == 65) {
        timeVariation = 1;
        dayTime();
        clearTimeout(partsOfDay);
    }
    if (window.event.keyCode == 68) {
        timeVariation = 3;
        dayTime();
        clearTimeout(partsOfDay);
    }
    if (window.event.keyCode == 78) {
        timeVariation = 2;
        dayTime();
        clearTimeout(partsOfDay);
    }
    if (window.event.keyCode == 82) {
        dayTime();
    }
}

function enableDisableSteeringWheel(enable) {
    if (enable == 1) {
        steeringWheel = 1;
    } else if (enable == 0) {
        steeringWheel = 0;
    }

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////Funcoes referentes à funcionalidade "Problemas do Carro"////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function carAnalysis() {
    mainMenu();
    document.getElementById('car').style.opacity = 0.4;
    document.getElementById('upViewAnalysis').style.visibility = "visible";
    document.getElementById('sideViewAnalysis').style.visibility = "visible";
    document.getElementById('led').style.visibility = "hidden";
    analysingCar = setTimeout(function () { carProblems(); }, 5500/*1000*/);
    document.getElementById('personAnalysis').style.visibility = "hidden";
}

function chooseAction() {
    if (numberOfProblems == 0) {
        carAnalysis();
    } else if (numberOfProblems > 0) {
        mainMenu();
        ledActualButton = 5;

        clearTimeout(timeToAppearHelp);
        timeToAppearHelp = setTimeout(function () { secundaryHelpButtons(); }, 3000);

        document.getElementById('car').style.opacity = 0.4;
        document.getElementById('led').style.top = "33%";
        document.getElementById('led').style.left = "37%";
        document.getElementById('carWhite').style.visibility = "visible";
        document.getElementById('listOfProblems').style.visibility = "visible";
    }
}

/*Functionality function*/
function carProblems() {
    document.getElementById('led').style.visibility = "visible";
    document.getElementById('upViewAnalysis').style.visibility = "hidden";
    document.getElementById('sideViewAnalysis').style.visibility = "hidden";
    document.getElementById('led').style.top = "11%";
    document.getElementById('led').style.left = "4%";
    ledActualButton = 1;

    problem = 0;

    if (Math.floor((Math.random() * 100) + 1) < 10 && velas == 0) {
        problem = 1;
        warningImages();
        velas++;
        numberOfProblems++;
        carImageSelect();
    } else if (Math.floor((Math.random() * 100) + 1) < 10 && freios == 0) {
        problem = 2;
        warningImages();
        freios++;
        numberOfProblems++;
        carImageSelect();
    } else if (Math.floor((Math.random() * 100) + 1) < 10 && motor == 0) {
        problem = 3;
        warningImages();
        motor++;
        numberOfProblems++;
        carImageSelect();
    } else if (Math.floor((Math.random() * 100) + 1) < 10 && bateria == 0) {
        problem = 4;
        warningImages();
        bateria++;
        numberOfProblems++;
        carImageSelect();
    } else if (Math.floor((Math.random() * 100) + 1) < 10 && suspensao == 0) {
        problem = 5;
        warningImages();
        suspensao++;
        numberOfProblems++;
        carImageSelect();
    } else if (Math.floor((Math.random() * 100) + 1) < 15 && pneus == 0) {
        problem = 6;
        warningImages();
        pneus++;
        numberOfProblems++;
        carImageSelect();
    } else if (numberOfProblems == 0) {
        carImageSelect();
        document.getElementById('ok').style.visibility = "visible";
        document.getElementById('person').style.opacity = 1;

    }  else {
        document.getElementById('almostOk').style.visibility = "visible";
        document.getElementById('person').style.opacity = 1;
    }

    if (numberOfProblems == 6) {
        exitFunction();
        document.getElementById('fingerPrint').style.visibility = "hidden";
        document.getElementById('impossibleDrive').style.visibility = "visible";
    }
}

function displayProblems() {
    mainMenu();
    insertInList();
    ledActualButton = 7;
    document.getElementById('led').style.left = "29.5%";
    document.getElementById('led').style.top = "35%";
    if (velas == 2) {
        document.getElementById('vela').style.visibility = "visible";
    }
    if (motor == 2) {
        document.getElementById('motor').style.visibility = "visible";
    }
    if (pneus == 2) {
        document.getElementById('tires').style.visibility = "visible";
    }
    if (bateria == 2) {
        document.getElementById('battery').style.visibility = "visible";
    }
    if (suspensao == 2) {
        document.getElementById('suspension').style.visibility = "visible";
    }
    if (freios == 2) {
        document.getElementById('brakes').style.visibility = "visible";
    }
    actualProblemInList();

    document.getElementById('car').style.opacity = 0.4;
    
    clearTimeout(timeToAppearHelp);
    timeToAppearHelp = setTimeout(function () { secundaryHelpButtons(); }, 3000);
}


function actualProblemInList() {
    depth = 2;
    ledActualButton = 0;
    if (document.getElementById('vela').style.left == "30%") {
        miniImages();
        document.getElementById('vela').style.width = "2.5%";
        document.getElementById('vela').style.height = "16.5%";
        document.getElementById('vela').style.top = "29%";
    } else if (document.getElementById('brakes').style.left == "30%") {
        miniImages();
        document.getElementById('brakes').style.width = "8%";
        document.getElementById('brakes').style.height = "13%";
        document.getElementById('brakes').style.top = "30%";
    } else if (document.getElementById('motor').style.left == "30%") {
        miniImages();
        document.getElementById('motor').style.width = "8%";
        document.getElementById('motor').style.height = "10%";
        document.getElementById('motor').style.top = "30%";
    } else if (document.getElementById('battery').style.left == "30%") {
        miniImages();
        document.getElementById('battery').style.width = "8%";
        document.getElementById('battery').style.height = "15%";
        document.getElementById('battery').style.top = "30%";
    } else if (document.getElementById('suspension').style.left == "30%") {
        miniImages();
        document.getElementById('suspension').style.width = "10%";
        document.getElementById('suspension').style.height = "15%";
        document.getElementById('suspension').style.top = "30%";
    } else if (document.getElementById('tires').style.left == "30%") {
        miniImages();
        document.getElementById('tires').style.width = "7%";
        document.getElementById('tires').style.height = "15%";
        document.getElementById('tires').style.top = "30%";
    } else {
        miniImages();
    }
}  

function miniImages() {
    if (velas == 2) {
        document.getElementById('vela').style.width = "0.625%";
        document.getElementById('vela').style.height = "3.5%";
        document.getElementById('vela').style.top = "40%";
    }
    if (motor == 2) {
        document.getElementById('motor').style.width = "2%";
        document.getElementById('motor').style.height = "2.5%";
        document.getElementById('motor').style.top = "40%";
    }
    if (pneus == 2) {
        document.getElementById('tires').style.width = "1.75%";
        document.getElementById('tires').style.height = "3.75%";
        document.getElementById('tires').style.top = "40%";
    }
    if (bateria == 2) {
        document.getElementById('battery').style.width = "2%";
        document.getElementById('battery').style.height = "3.75%";
        document.getElementById('battery').style.top = "40%";
    }
    if (suspensao == 2) {
        document.getElementById('suspension').style.width = "2.5%";
        document.getElementById('suspension').style.height = "3.75%";
        document.getElementById('suspension').style.top = "40%";
    }
    if (freios == 2) {
        document.getElementById('brakes').style.width = "2%";
        document.getElementById('brakes').style.height = "3.25%";
        document.getElementById('brakes').style.top = "40%";
    }
}

function insertInList() {

    document.getElementById('upViewAnalysis').style.visibility = "hidden";
    document.getElementById('sideViewAnalysis').style.visibility = "hidden";

    if (velas == 1) {
        velas++;
        document.getElementById('vela').style.left = left + "%";
        document.getElementById('vela').style.top = "40%";
        document.getElementById('vela').style.width = "0.625%";
        document.getElementById('vela').style.height = "3.5%";
        left = left + 10;
    }
    if (motor == 1) {
        motor++;
        document.getElementById('motor').style.left = left + "%";
        document.getElementById('motor').style.top = "40%";
        document.getElementById('motor').style.width = "2%";
        document.getElementById('motor').style.height = "2.5%";
        left = left + 10;
    }
    if (bateria == 1) {
        bateria++;
        document.getElementById('battery').style.left = left + "%";
        document.getElementById('battery').style.top = "40%";
        document.getElementById('battery').style.width = "2%";
        document.getElementById('battery').style.height = "3.75%";
        left = left + 10;
        
    }
    if (suspensao == 1) {
        suspensao++;
        document.getElementById('suspension').style.left = left + "%";
        document.getElementById('suspension').style.top = "40%";
        document.getElementById('suspension').style.width = "2.5%";
        document.getElementById('suspension').style.height = "3.75%";
        left = left + 10;
    }
    if (pneus == 1) {
        pneus++;
        document.getElementById('tires').style.left = left + "%";
        document.getElementById('tires').style.top = "40%";
        document.getElementById('tires').style.width = "1.75%";
        document.getElementById('tires').style.height = "3.75%";
        left = left + 10;
    }
    if (freios == 1) {
        freios++;
        document.getElementById('brakes').style.left = left + "%";
        document.getElementById('brakes').style.top = "40%";
        document.getElementById('brakes').style.width = "2%";
        document.getElementById('brakes').style.height = "3.25%";
        left = left + 10;
        
    }
}

function getElement(localLeft) {
    if (localLeft == 1) {
        return document.getElementById('vela');
    } else if (localLeft == 2) {
        return document.getElementById('motor');
    } else if (localLeft == 3) {
        return document.getElementById('battery');
    } else if (localLeft == 4) {
        return document.getElementById('suspension');
    } else if (localLeft == 5) {
        return document.getElementById('tires');
    } else if (localLeft == 6) {
        return document.getElementById('brakes');
    }
}

function moveThroughList(input) {
    var localLeft;
    if (input == 0) {
        for (localLeft = 1; localLeft != 7; localLeft = localLeft+1) {
            if (getElement(localLeft).style.left == "30%") {
                if (numberOfProblems == 1)
                    getElement(localLeft).style.left = "30%";
                if (numberOfProblems == 2)
                    getElement(localLeft).style.left = "40%";
                if (numberOfProblems == 3)
                    getElement(localLeft).style.left = "50%";
                if (numberOfProblems == 4)
                    getElement(localLeft).style.left = "60%";
                if (numberOfProblems == 5)
                    getElement(localLeft).style.left = "70%";
            } else if (getElement(localLeft).style.left == "40%") {
                getElement(localLeft).style.left = "30%";
            } else if (getElement(localLeft).style.left == "50%") {
                getElement(localLeft).style.left = "40%";
            } else if (getElement(localLeft).style.left == "60%") {
                getElement(localLeft).style.left = "50%";
            } else if (getElement(localLeft).style.left == "70%") {
                getElement(localLeft).style.left = "60%";
            }
        }
    } else if (input == 1) {
        for (localLeft = 1; localLeft != 7; localLeft = localLeft + 1) {
            if (getElement(localLeft).style.left == "30%") {
                if (numberOfProblems == 1)
                    getElement(localLeft).style.left = "30%";
                if (numberOfProblems >= 2)
                    getElement(localLeft).style.left = "40%";
            } else if (getElement(localLeft).style.left == "40%") {
                if (numberOfProblems == 2)
                    getElement(localLeft).style.left = "30%";
                if (numberOfProblems >= 3)
                    getElement(localLeft).style.left = "50%";
            } else if (getElement(localLeft).style.left == "50%") {
                if (numberOfProblems == 3)
                    getElement(localLeft).style.left = "30%";
                if (numberOfProblems >= 4)
                    getElement(localLeft).style.left = "60%";
            } else if (getElement(localLeft).style.left == "60%") {
                if (numberOfProblems == 4)
                    getElement(localLeft).style.left = "30%";
                if (numberOfProblems >= 5)
                    getElement(localLeft).style.left = "70%";
            } else if (getElement(localLeft).style.left == "70%") {
                getElement(localLeft).style.left = "30%";
            }
        }
    }
    actualProblemInList();
}


function warningImages() {
    document.getElementById('led').style.top = "39%";
    document.getElementById('led').style.left = "64%";
    ledActualButton = 4;
    depth = 0;
    
    if (actualTime == 3) {
        document.getElementById('showDetails').src = 'images/moreDetails.png';
    } else {
        document.getElementById('showDetails').src = 'images/moreDetailsGray.png';
    }
    mainMenu();
    document.getElementById('car').style.opacity = 0.4;
    document.getElementById('showDetails').style.visibility = "visible";
    document.getElementById('upViewAnalysis').style.visibility = "hidden";
    document.getElementById('sideViewAnalysis').style.visibility = "hidden";

    clearTimeout(timeToAppearHelp);
    timeToAppearHelp = setTimeout(function () { secundaryHelpButtons(); }, 3000);

    if (problem == 1) {
        document.getElementById('upView').style.visibility = "visible";
        document.getElementById('sideView').style.visibility = "visible";
        document.getElementById('warningVelas').style.visibility = "visible";
    } else if (problem == 2) {
        document.getElementById('upView').style.visibility = "visible";
        document.getElementById('sideView').style.visibility = "visible";
        document.getElementById('warningFreios').style.visibility = "visible";
    } else if (problem == 3) {
        document.getElementById('upView').style.visibility = "visible";
        document.getElementById('sideView').style.visibility = "visible";
        document.getElementById('warningMotor').style.visibility = "visible";
    } else if (problem == 4) {
        document.getElementById('upView').style.visibility = "visible";
        document.getElementById('sideView').style.visibility = "visible";
        document.getElementById('warningBateria').style.visibility = "visible";
    } else if (problem == 5) {
        document.getElementById('upView').style.visibility = "visible";
        document.getElementById('sideView').style.visibility = "visible";
        document.getElementById('warningSuspensao').style.visibility = "visible";
    } else if (problem == 6) {
        document.getElementById('upViewTires').style.visibility = "visible";
        document.getElementById('sideViewTires').style.visibility = "visible";
        document.getElementById('warningPneus').style.visibility = "visible";
    }
}

function carImageSelect() {
    if (numberOfProblems == 0) {
        document.getElementById('car').src = 'images/carCheck.png';
    } else if (numberOfProblems == 1) {
        document.getElementById('car').src = 'images/car1.png';
    } else if (numberOfProblems == 2) {
        document.getElementById('car').src = 'images/car2.png';
    } else if (numberOfProblems == 3) {
        document.getElementById('car').src = 'images/car3.png';
    } else if (numberOfProblems == 4) {
        document.getElementById('car').src = 'images/car4.png';
    } else if (numberOfProblems == 5) {
        document.getElementById('car').src = 'images/car5.png';
    }
}

function problemInfo() {
    depth = 1;

    cleanHelp();

    clearTimeout(timeToAppearHelp);
    timeToAppearHelp = setTimeout(function () { secundaryHelpButtons(); }, 3000);

    if (actualTime == 3) {
        document.getElementById('showDetails').src = 'images/lessDetails.png';
    } else {
        document.getElementById('showDetails').src = 'images/lessDetailsGray.png';
    }
    
    document.getElementById('upView').style.visibility = "hidden";
    document.getElementById('sideView').style.visibility = "hidden";
    document.getElementById('upViewTires').style.visibility = "hidden";
    document.getElementById('sideViewTires').style.visibility = "hidden";
    if (problem == 1) {
        document.getElementById('vela').style.visibility = "visible";
        document.getElementById('txtPlugs').style.visibility = "visible";
    } else if (problem == 2) {
        document.getElementById('brakes').style.visibility = "visible";
        document.getElementById('txtBrakes').style.visibility = "visible";
    } else if (problem == 3) {
        document.getElementById('motor').style.visibility = "visible";
        document.getElementById('txtEngine').style.visibility = "visible";
    } else if (problem == 4) {
        document.getElementById('battery').style.visibility = "visible";
        document.getElementById('txtBattery').style.visibility = "visible";
    } else if (problem == 5) {
        document.getElementById('suspension').style.visibility = "visible";
        document.getElementById('txtSuspension').style.visibility = "visible";
    } else if (problem == 6) {
        document.getElementById('tires').style.visibility = "visible";
        document.getElementById('txtTires').style.visibility = "visible";
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////Funcoes referentes à funcionalidade "Estado do Condutor"////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function driverAnalysis() {
    mainMenu();
    document.getElementById('person').style.opacity = 0.4;
    document.getElementById('personAnalysis').style.visibility = "visible";
    analysingDriver = setTimeout(function () { driverCondition(); }, /*1000*/ 5000);
}

function driverCondition() {
    document.getElementById('personAnalysis').style.visibility = "hidden";

    if (Math.floor((Math.random() * 100) + 1) < 15 && drowsiness == 0) {
        drowsiness = 1;
        document.getElementById('personDrowsiness').style.visibility = "visible";
        document.getElementById('warningDrowsiness').style.visibility = "visible";
        personImageSelect();
    } else if (Math.floor((Math.random() * 100) + 1) < 10 && softDrunk == 0 && superDrunk == 0) {
        softDrunk = 1;
        document.getElementById('personDrunk').style.visibility = "visible";
        document.getElementById('warningAlcohol').style.visibility = "visible";
        personImageSelect();
    } else if (Math.floor((Math.random() * 100) + 1) < 5 && superDrunk == 0) {
        superDrunk = 1;
        exitFunction();
        document.getElementById('fingerPrint').style.visibility = "hidden";
        document.getElementById('personSuperDrunk').style.visibility = "visible";
        document.getElementById('UnableDrive').style.visibility = "visible";
        //analysingDriver = setTimeout(function () { exitFunction(); }, 7000);
    } else {
        personImageSelect();
        document.getElementById('personOk').style.visibility = "visible";
        document.getElementById('noDriverProblems').style.visibility = "visible";
    }
}

function personImageSelect() {
    if (drowsiness == 0 && softDrunk == 0) {
        document.getElementById('person').src = 'images/DriverStatus/personIconCheck.png';
    }else if ((drowsiness == 1 && softDrunk == 0) || (drowsiness == 0 && softDrunk == 1)) {
        document.getElementById('person').src = 'images/DriverStatus/personIconWarning.png';
    } else if (drowsiness == 1 && softDrunk == 1) {
        document.getElementById('person').src = 'images/DriverStatus/personIcon2Warning.png';
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////Funcoes referentes à "Ajuda"////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function helpMainMenu() {
    if (help == 1) {
        mainMenu();
        enableDisableSteeringWheel(0);
        document.getElementById('help').style.opacity = 0.4;
    } else if (help == 0) {
        enableDisableSteeringWheel(1);
        document.getElementById('help').style.opacity = 1;
    }
        helpMainMenuCar();
        helpMainMenuPerson();
        helpMainMenuHelp();
        helpImages();
}

function helpMainMenuCar() {
    $(document).ready(function () {
        $("#help_carProblems").animate({
            width: ["toggle", "swing"],
            //height: ["toggle", "swing"],
            opacity: "toggle"
        }, 1000, "linear");

    });
}
function helpMainMenuPerson() {
    $(document).ready(function () {
        $("#help_personProblems").animate({
            width: ["toggle", "swing"],
            //height: ["toggle", "swing"],
            opacity: "toggle"
        }, 1000);
    });
}
function helpMainMenuHelp() {
    $(document).ready(function () {
        $("#help_help").animate({
            width: ["toggle", "swing"],
            //height: ["toggle", "swing"],
            opacity: "toggle"
        }, 1000, "linear");
    });
}

function helpImages() {
    $(document).ready(function () {
        $("#keyboard").fadeToggle(1000);
    });
}

function cleanHelp() {
    document.getElementById('help_moreDetails').style.display = "none";
    document.getElementById('help_lessDetails').style.display = "none";
    document.getElementById('help_car').style.display = "none";
    document.getElementById('help_list').style.display = "none";
    document.getElementById('help_listProblem').style.display = "none";
}

function secundaryHelpButtons() {
    cleanHelp();
    if (document.getElementById('showDetails').style.visibility == "visible" && depth == 0) {
        $(document).ready(function () {
            $("#help_moreDetails").fadeToggle(1000);
        });
    }

    if (document.getElementById('showDetails').style.visibility == "visible" && depth == 1) {
        $(document).ready(function () {
            $("#help_lessDetails").fadeToggle(1000);
        });
    }

    if (document.getElementById('carWhite').style.visibility == "visible" && document.getElementById('listOfProblems').style.visibility == "visible") {
        $(document).ready(function () {
            $("#help_car").fadeToggle(1000);
        });
        $(document).ready(function () {
            $("#help_list").fadeToggle(1000);
        });
    }

    if (depth == 2) {
        $(document).ready(function () {
            $("#help_listProblem").fadeToggle(1000);
        });
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function exitFunction() {
    clearTimeout(analysingCar);
    clearTimeout(analysingDriver);
    clearTimeout(timeToAppearHelp);

    /*document.getElementById('up').style.visibility = "hidden";
    document.getElementById('down').style.visibility = "hidden";
    document.getElementById('enter').style.visibility = "hidden";
    document.getElementById('back').style.visibility = "hidden";*/

    document.getElementById('fingerPrint').style.visibility = "visible";
    document.getElementById('loading').style.visibility = "hidden";

    document.getElementById('car').style.opacity = 1;
    document.getElementById('person').style.opacity = 1;
    document.getElementById('help').style.opacity = 1;

    help = 0;
    enableDisableSteeringWheel(0);

    document.getElementById('welcome').style.visibility = "hidden";
    document.getElementById('exit').style.visibility = "hidden";

    document.getElementById('led').style.visibility = "hidden";

    document.getElementById('car').style.visibility = "hidden";
    document.getElementById('person').style.visibility = "hidden";
    document.getElementById('help').style.visibility = "hidden";

    document.getElementById('upViewAnalysis').style.visibility = "hidden";
    document.getElementById('sideViewAnalysis').style.visibility = "hidden";
    document.getElementById('upView').style.visibility = "hidden";
    document.getElementById('sideView').style.visibility = "hidden";
    document.getElementById('upViewTires').style.visibility = "hidden";
    document.getElementById('sideViewTires').style.visibility = "hidden";
    document.getElementById('warningVelas').style.visibility = "hidden";
    document.getElementById('warningFreios').style.visibility = "hidden";
    document.getElementById('warningPneus').style.visibility = "hidden";
    document.getElementById('warningSuspensao').style.visibility = "hidden";
    document.getElementById('warningBateria').style.visibility = "hidden";
    document.getElementById('warningMotor').style.visibility = "hidden";
    document.getElementById('ok').style.visibility = "hidden";
    document.getElementById('almostOk').style.visibility = "hidden";
    document.getElementById('showDetails').style.visibility = "hidden";
    document.getElementById('vela').style.visibility = "hidden";
    document.getElementById('brakes').style.visibility = "hidden";
    document.getElementById('motor').style.visibility = "hidden";
    document.getElementById('battery').style.visibility = "hidden";
    document.getElementById('suspension').style.visibility = "hidden";
    document.getElementById('tires').style.visibility = "hidden";

    document.getElementById('txtTires').style.visibility = "hidden";
    document.getElementById('txtSuspension').style.visibility = "hidden";
    document.getElementById('txtBattery').style.visibility = "hidden";
    document.getElementById('txtPlugs').style.visibility = "hidden";
    document.getElementById('txtEngine').style.visibility = "hidden";
    document.getElementById('txtBrakes').style.visibility = "hidden";

    document.getElementById('personAnalysis').style.visibility = "hidden";
    document.getElementById('personDrowsiness').style.visibility = "hidden";
    document.getElementById('warningDrowsiness').style.visibility = "hidden";
    document.getElementById('warningAlcohol').style.visibility = "hidden";
    document.getElementById('personDrunk').style.visibility = "hidden";
    document.getElementById('personSuperDrunk').style.visibility = "hidden";
    document.getElementById('UnableDrive').style.visibility = "hidden";
    document.getElementById('personOk').style.visibility = "hidden";
    document.getElementById('noDriverProblems').style.visibility = "hidden";

    document.getElementById('carWhite').style.visibility = "hidden";
    document.getElementById('listOfProblems').style.visibility = "hidden";

    document.getElementById('help_carProblems').style.display = "none";
    document.getElementById('help_personProblems').style.display = "none";
    document.getElementById('help_help').style.display = "none";
    document.getElementById('keyboard').style.display = "none";

    cleanHelp();

    drowsiness = 0;
    softDrunk = 0;
}