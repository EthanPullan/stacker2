global def lightRow(size):
    position = []
    for i in range(size):
        position.append(i)

def lightOn(xCoords[],yCoords[]):
    for x in range(len(xCoords)-1):
        for y in range(len(yCoords)-1):
            led.plot(x, y)
lightRow(3)
lightOn(position,position)