// https://github.com/araragoo/QTechCag

//% weight=5 color=#0fbc11 icon="\uf112" block="Insect"
namespace Insect {

    let initialized = false

    let prev_x = 0
    let prev_y = 0

    let rotation_x = 0
    let rotation_y = 0

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
        // radio.setGroup(1)
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

    //% subcategory="LCD"
    //% blockId="show_lines"
    //% block="show lines %text"
    //% weight=80
    export function showLiens(text: string): void {
        if (!initialized) {
              initBT();
        }
        radio.sendString("l" + "0" + text)
    }

    //% subcategory="LCD"
    //% blockId="show_line_1"
    //% block="show line1 %text"
    //% weight=80
    export function showLine1(text: string): void {
        if (!initialized) {
              initBT();
        }
        radio.sendString("l" + "1" + text)
    }

    //% subcategory="LCD"
    //% blockId="show_line_2"
    //% block="show line2 %text"
    //% weight=80
    export function showLine2(text: string): void {
        if (!initialized) {
              initBT();
        }
        radio.sendString("l" + "2" + text)
    }

    //% subcategory="LCD"
    //% blockId=setRotX block="rotation X:0<=>5"
    //% weight=85
    export function rotX(): number {
        let x
        x = input.rotation(Rotation.Roll)
        x = x / 10
        x = x + 2
        if (x < 1) {
            x = 0
        } else {
            if (x < 2) {
                x = 1
            } else {
                if (x < 3) {
                    x = 2
                } else {
                    if (x < 4) {
                        x = 3
                    } else {
                        x = 4
                    }
                }
            }
        }
        rotation_x = x
        return rotation_x
    }

    //% subcategory="LCD"
    //% blockId=setRotY block="rotation Y:0<=>5"
    //% weight=85
    export function rotY(): number {
        let y
        y = input.rotation(Rotation.Pitch)
        y = y / 10
        y = y + 2
        if (y < 1) {
            y = 0
        } else {
            if (y < 2) {
                y = 1
            } else {
                if (y < 3) {
                    y = 2
                } else {
                    if (y < 4) {
                        y = 3
                    } else {
                        y = 4
                    }
                }
            }
        }
        rotation_y = y
        return rotation_y
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

    //% subcategory="Switch"
    //% blockId=setRadio block="radio Group:1<=>83 %n"
    //% weight=85
    //% n.min=1 n.max=83
    export function radioGroup(n: number): void {
        radio.setGroup(n)
    }

    //% subcategory="Switch"
    //% blockId=swA block="A"
    //% weight=85
    export function A(): number {
        return aCount
    }

    //% subcategory="Switch"
    //% blockId=swB block="B"
    //% weight=85
    export function B(): number {
        return bCount
    }

    //% subcategory="Switch"
    //% blockId=swAB block="AB"
    //% weight=85
    export function AB(): number {
        return abCount
    }

    //% subcategory="Switch"
    //% blockId=swP0 block="P0"
    //% weight=85
    export function P0(): number {
        return p0Count
    }

    //% subcategory="Switch"
    //% blockId=swP1 block="P1"
    //% weight=85
    export function P1(): number {
        return p1Count
    }

    //% subcategory="Switch"
    //% blockId=swP2 block="P2"
    //% weight=85
    export function P2(): number {
        return p2Count
    }

    //% subcategory="Music1"
    //% blockId=setMusicF block="musicF No.0<=>9 %n"
    //% weight=85
    //% n.min=0 n.max=9
    export function musicF(n: number): void {
        if (!initialized) {
              initBT();
        }
        radio.sendString("s" + n)
    }

    //% subcategory="Music1"
    //% blockId=setDadadum block="dadadum"
    //% weight=85
    export function dadadum(): number {
        return 0
    }

    //% subcategory="Music1"
    //% blockId=setEntertainer block="entertainer"
    //% weight=85
    export function entertainer(): number {
        return 1
    }

    //% subcategory="Music1"
    //% blockId=setPrelude block="prelude"
    //% weight=85
    export function prelude(): number {
        return 2
    }

    //% subcategory="Music1"
    //% blockId=setOde block="ode"
    //% weight=85
    export function ode(): number {
        return 3
    }

    //% subcategory="Music1"
    //% blockId=setNyan block="nyan"
    //% weight=85
    export function nyan(): number {
        return 4
    }

    //% subcategory="Music1"
    //% blockId=setRingtone block="ringtone"
    //% weight=85
    export function ringtone(): number {
        return 5
    }

    //% subcategory="Music1"
    //% blockId=setFunk block="funk"
    //% weight=85
    export function funk(): number {
        return 6
    }

    //% subcategory="Music1"
    //% blockId=setBlues block="blues"
    //% weight=85
    export function blues(): number {
        return 7
    }

    //% subcategory="Music1"
    //% blockId=setBirthday block="birthday"
    //% weight=85
    export function birthday(): number {
        return 8
    }

    //% subcategory="Music1"
    //% blockId=setWedding block="wedding"
    //% weight=85
    export function wedding(): number {
        return 9
    }

    //% subcategory="Music2"
    //% blockId=setMusicS block="musicS No.0<=>9 %n"
    //% weight=85
    //% n.min=0 n.max=9
    export function musicS(n: number): void {
        if (!initialized) {
              initBT();
        }
        radio.sendString("p" + n)
    }

    //% subcategory="Music2"
    //% blockId=setFunereal block="funereal"
    //% weight=85
    export function funereal(): number {
        return 0
    }

    //% subcategory="Music2"
    //% blockId=setPunchline block="punchline"
    //% weight=85
    export function punchline(): number {
        return 1
    }

    //% subcategory="Music2"
    //% blockId=setBadduy block="badduy"
    //% weight=85
    export function badduy(): number {
        return 2
    }

    //% subcategory="Music2"
    //% blockId=setChasel block="chase"
    //% weight=85
    export function chase(): number {
        return 3
    }

    //% subcategory="Music2"
    //% blockId=setBaDing block="ba ding"
    //% weight=85
    export function ba(): number {
        return 4
    }

    //% subcategory="Music2"
    //% blockId=setWawawaaa block="wawawaaa"
    //% weight=85
    export function wawawaaa(): number {
        return 5
    }

    //% subcategory="Music2"
    //% blockId=setJumpUp block="jumpUp"
    //% weight=85
    export function jumpUp(): number {
        return 6
    }

    //% subcategory="Music2"
    //% blockId=setJumpDown block="jumpDown"
    //% weight=85
    export function jumpDown(): number {
        return 7
    }

    //% subcategory="Music2"
    //% blockId=setPowerUp block="powerUp"
    //% weight=85
    export function powerUp(): number {
        return 8
    }

    //% subcategory="Music2"
    //% blockId=setPowerDown block="powerDown"
    //% weight=85
    export function powerDown(): number {
        return 9
    }

} 
