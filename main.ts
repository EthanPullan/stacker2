//Pullan's Game
function lightRow(size: number){
    let position = []
    for (let i = 0; i < size; i++){
        position.push(i+1)}
    return position
    }
function plotLights(xCoords: any[], yCoords: any[]){
    for (let x = 0; x < xCoords.length; x++) {
            led.plot(xCoords[x],yCoords[x])
        }
    }

function unPlotLights(xCoords: any[], yCoords: any[]){
    for (let x = 0; x < xCoords.length; x++) {
        led.unplot(xCoords[x], yCoords[x])
        }
    }

function plotLightsYZero(xCoords: any[]){
    for (let x = 0; x < xCoords.length; x++) {
        led.plot(xCoords[x],0)
    }}    
function moveIt(ar: any[],counter: number){
    for (let i = 0; i < ar.length; i++){
        led.unplot(ar[i],0)
        ar[i] = i + 5 - Math.abs(((counter+5)%16) - 8)
    }
    plotLightsYZero(ar)
    }

function lineMoveBeforeA(rip: any[]){
    let i = 0;
    while (!(input.buttonIsPressed(Button.A))) {
        moveIt(rip, i)
        basic.pause(delay)
        i++
    }
    }

function flashRow(row: any[], amount: number) {
    for (let j = 0; j < amount * 2; j++) {
        for (let i = 0; i < row.length; i++) {
            led.toggle(row[i], 0)
        }
        basic.pause(50)
    }}
function falling(fallNRows: number = 4) { //detects which LEDs are visible and lowers them N rows. Then returns the number of visible lights in the row
    let lightsOnTopRowFalling = []
    let blankY = []
    for (let x = 0; x < screenSize[0]; x++) {
        if (led.point(x, 0)) {
            blankY.push(0)
            lightsOnTopRowFalling.push(x)
        }
    }
    for (let x = 0; x < fallNRows; x++) {
        unPlotLights(lightsOnTopRowFalling, blankY)
        for (let y = 0; y < blankY.length; y++) { blankY[y]++ }
        plotLights(lightsOnTopRowFalling, blankY)
        basic.pause(50)
    }
    for (let x = 0; x < lightsOnTopRowFalling.length; x++) {
        if (fallNRows < screenSize[1]-1) {
            if (!led.point(lightsOnTopRowFalling[x], fallNRows + 1)) {
                led.toggle(lightsOnTopRowFalling[x], fallNRows)
            }
        }
    }
    let visibleLights = 0
    for (let x=0; x < screenSize[0]; x++){
        if (led.point(x,fallNRows)) {visibleLights++}}
    return visibleLights
    }

//Main Program
let screenSize = [5, 5]
basic.clearScreen()
let delay = 100
let lQ = 3 //light Quantity is the number of lights in play
let rip = lightRow(lQ)
plotLightsYZero(rip)
//lineMoveBeforeA(rip) //pass in a line array of starting points. Line moves untill A is pressed.

//flashRow(rip,10) //flashes a array at y=0 amount times.
//falling(4)
//rip = lightRow(3)
//lineMoveBeforeA(rip)
//flashRow(rip,10)
//falling(3)
for (let round=0; round < screenSize[1]; round++){
    rip = lightRow(lQ)
    lineMoveBeforeA(rip)
    delay = 0.85*delay
    flashRow(rip,10)
    lQ = falling(screenSize[1] - round -1)
    basic.pause(100)
    }