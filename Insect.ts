// https://github.com/araragoo/QTechCag

//% weight=5 color=#0fbc11 icon="\uf112" block="Insect"
namespace Insect {

    let initialized = false

    let prev_y = 0
    let prev_x = 0

    let aCount  = 0
    let bCount  = 0
    let abCount = 0
    let p0Count = 0
    let p1Count = 0
    let p2Count = 0

    radio.onReceivedString(
        function (receivedString) {
            if ("a".compare(receivedString.charAt(0)) == 0) {
                aCount += 1
            } else if ("b".compare(receivedString.charAt(0)) == 0) {
                bCount += 1
            } else if ("ab".compare(receivedString.substr(0, 2)) == 0) {
                abCount += 1
            } else if ("p0".compare(receivedString.substr(0, 2)) == 0) {
                p0Count += 1
            } else if ("p1".compare(receivedString.substr(0, 2)) == 0) {
                p1Count += 1
            } else if ("p2".compare(receivedString.substr(0, 2)) == 0) {
                p2Count += 1
            }

        }
    )

    function initBT(): void {
        radio.setGroup(1)
        initialized = true
    }

    function drive(x: number, y: number): void {
        if (!initialized) {
              initBT();
        }
        if (x != prev_x || y != prev_y) {
            led.unplot(prev_x, prev_y)
        }
        led.plot(x, y)
        prev_x = x
        prev_y = y
        radio.sendString("m" + x + y)
    }

    function drv(col: number, v: number): void {
        if (!initialized) {
              initBT();
        }
        if(col == 0)
            radio.sendString("r" + v)
        else if(col == 1)
            radio.sendString("y" + v)
        else if(col == 2)
            radio.sendString("g" + v)
        else
            radio.sendString("b" + v)
    }

    //% subcategory="Move"
    //% blockId=prgInsect block="prg x:0<=>4 %x|y:0<=>4 %y"
    //% weight=85
    //% x.min=0 x.max=4
    //% y.min=0 y.max=4
    export function prg(x: number,y: number): void {
        drive(x, y)
    }

    //% subcategory="Move"
    //% blockId=prgStop block="stop"
    //% weight=85
    export function stop(): void {
        prg(2, 2)
    }

    //% subcategory="Move"
    //% blockId=prgFwd block="fwd"
    //% weight=85
    export function fwd(): void {
        prg(2, 0)
    }

    //%  subcategory="Move"
    //% blockId=prgBwd block="bwd"
    //% weight=85
    export function bwd(): void {
        prg(2, 4)
    }

    //% subcategory="Move"
    //% blockId=prgRight block="right"
    //% weight=85
    export function right(): void {
        prg(4, 2)
    }

    //% subcategory="Move"
    //% blockId=prgLeft block="left"
    //% weight=85
    export function left(): void {
        prg(0, 2)
    }

    //% subcategory="Move"
    //% blockId=prgFwdR block="fwdR"
    //% weight=85
    export function fwdR(): void {
        prg(4, 0)
    }

    //% subcategory="Move"
    //% blockId=prgFwdL block="fwdL"
    //% weight=85
    export function fwdL(): void {
        prg(0, 0)
    }

    //% subcategory="Move"
    //% blockId=prgBwdR block="bwdR"
    //% weight=85
    export function bwdR(): void {
        prg(4, 4)
    }

    //% subcategory="Move"
    //% blockId=prgBwdL block="bwdL"
    //% weight=85
    export function bwdL(): void {
        prg(0, 4)
    }

    //% subcategory="LED"
    //% blockId=ledRedOn block="redON"
    //% weight=85
    export function redON(): void {
        drv(0, 1)
    }

    //% subcategory="LED"
    //% blockId=ledRedOff block="redOFF"
    //% weight=85
    export function redOFF(): void {
        drv(0, 0)
    }

    //% subcategory="LED"
    //% blockId=ledYellowOn block="yellowON"
    //% weight=85
    export function yellowON(): void {
        drv(1, 1)
    }

    //% subcategory="LED"
    //% blockId=ledYellowOff block="yellowOFF"
    //% weight=85
    export function yellowOFF(): void {
        drv(1, 0)
    }

    //% subcategory="LED"
    //% blockId=ledGreenOn block="greenON"
    //% weight=85
    export function greenON(): void {
        drv(2, 1)
    }

    //% subcategory="LED"
    //% blockId=ledGreenOff block="greenOFF"
    //% weight=85
    export function greenOFF(): void {
        drv(2, 0)
    }

    //% subcategory="LED"
    //% blockId=ledBlueOn block="blueON"
    //% weight=85
    export function blueON(): void {
        drv(3, 1)
    }

    //% subcategory="LED"
    //% blockId=ledBlueOff block="blueOFF"
    //% weight=85
    export function blueOFF(): void {
        drv(3, 0)
    }

    //% subcategory="Radio"
    //% blockId=swA block="A"
    //% weight=85
    export function A(): number {
        if (!initialized) {
              initBT();
        }
        return aCount
    }

    //% subcategory="Radio"
    //% blockId=swB block="B"
    //% weight=85
    export function B(): number {
        if (!initialized) {
              initBT();
        }
        return bCount
    }

    //% subcategory="Radio"
    //% blockId=swAB block="AB"
    //% weight=85
    export function AB(): number {
        if (!initialized) {
              initBT();
        }
        return abCount
    }

    //% subcategory="Radio"
    //% blockId=swP0 block="P0"
    //% weight=85
    export function P0(): number {
        if (!initialized) {
              initBT();
        }
        return p0Count
    }

    //% subcategory="Radio"
    //% blockId=swP1 block="P1"
    //% weight=85
    export function P1(): number {
        if (!initialized) {
              initBT();
        }
        return p1Count
    }

    //% subcategory="Radio"
    //% blockId=swP2 block="P2"
    //% weight=85
    export function P2(): number {
        if (!initialized) {
              initBT();
        }
        return p2Count
    }

    //% subcategory="Music"
    //% blockId=prgInsect block="music1 No.0<=>9 %n"
    //% weight=85
    //% n.min=0 n.max=9
    export function music1(n: number): void {
        radio.sendString("s" + n)
    }

    //% subcategory="Music"
    //% blockId=prgInsect block="music2 No.0<=>9 %n"
    //% weight=85
    //% n.min=0 n.max=9
    export function music2(n: number): void {
        radio.sendString("p" + n)
    }
} 
