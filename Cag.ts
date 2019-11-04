// https://github.com/araragoo/QTechCag

//% weight=5 color=#0fbc11 icon="\uf112" block="Insect"
namespace Cag {

    let initialized = false

    let prev_x = 0
    let prev_y = 0

    let rotation_x = 0
    let rotation_y = 0
    let distanceData = 0

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
            } else if ("x".compare(receivedString.charAt(0)) == 0) {
                distanceData = parseFloat(receivedString.substr(1, receivedString.length-1))
            }
        }
    )

    //% subcategory="LCD"
    //% blockId="show_lines"
    //% block="show lines %text"
    export function showLiens(text: string): void {
        radio.sendString("d" + "0" + text)
    }

    //% subcategory="LCD"
    //% blockId="show_line_1"
    //% block="show line1 %text"
    export function showLine1(text: string): void {
        radio.sendString("d" + "1" + text)
    }

    //% subcategory="LCD"
    //% blockId="show_line_2"
    //% block="show line2 %text"
    export function showLine2(text: string): void {
        radio.sendString("d" + "2" + text)
    }

    //% subcategory="LCD"
    //% blockId=setRotX block="rotation X:0<=>5"
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
    //% blockId=setFwds block="WalkFwd (2sec) cycle:1<=>10[cycle] %cycle"
    //% cycle.min=1 cycle.max=10 cycle.defl=1
    export function fwds(cycle: number): void {
        radio.sendString("M" + "1" + cycle)
        basic.pause(2000)
    }

    //%  subcategory="Move"
    //% blockId=setBwds block="WalkBwd (2sec) cycle:1<=>10[cycle] %cycle"
    //% cycle.min=1 cycle.max=10 cycle.defl=1
    export function bwds(cycle: number): void {
        radio.sendString("M" + "2" + cycle)
        basic.pause(2000)
    }

    //% subcategory="Move"
    //% blockId=setRights block="WalkRight (2sec) cycle:1<=>10[cycle] %cycle"
    //% cycle.min=1 cycle.max=10 cycle.defl=1
    export function rights(cycle: number): void {
        radio.sendString("M" + "3" + cycle)
        basic.pause(2000)
    }

    //% subcategory="Move"
    //% blockId=setLefts block="WalkLeft (2sec) cycle:1<=>10[cycle] %cycle"
    //% cycle.min=1 cycle.max=10 cycle.defl=1
    export function lefts(cycle: number): void {
        radio.sendString("M" + "4" + cycle)
        basic.pause(2000)
    }

    //% subcategory="Move"
    //% blockId=setStops block="Stop (1sec)"
    export function stops(): void {
        radio.sendString("M" + "0")
        basic.pause(1000)
    }

    //% subcategory="Move"
    //% blockId=setSitDowns block="Sit Down (1sec)"
    export function sitDowns(): void {
        radio.sendString("M" + "5")
        basic.pause(1000)
    }

    //% subcategory="Move"
    //% blockId=setHappinesses block="Happiness (1sec)"
    export function happinesses(): void {
        radio.sendString("M" + "6")
        basic.pause(1000)
    }



    //% subcategory="LED"
    //% blockId=setLEDred block="LED red Voltage:0<=>100 %v"
    //% v.min=0 v.max=100
    export function LEDred(v: number): void {
        radio.sendString("l" + "0" + v)
    }

    //% subcategory="LED"
    //% blockId=setLEDgreen block="LED green Voltage:0<=>100 %v"
    //% v.min=0 v.max=100
    export function LEDgreen(v: number): void {
        radio.sendString("l" + "1" + v)
    }

    //% subcategory="LED"
    //% blockId=setLEDblue block="LED blue Voltage:0<=>100 %v"
    //% v.min=0 v.max=100
    export function LEDblue(v: number): void {
        radio.sendString("l" + "2" + v)
    }



    //% subcategory="Switch"
    //% blockId=setRadio block="radio Group:1<=>83 %n"
    //% n.min=1 n.max=83 n.defl=1
    export function radioGroup(n: number): void {
        radio.setGroup(n)
    }

    //% subcategory="Switch"
    //% blockId=swA block="A"
    export function A(): number {
        return aCount
    }

    //% subcategory="Switch"
    //% blockId=swB block="B"
    export function B(): number {
        return bCount
    }

    //% subcategory="Switch"
    //% blockId=swAB block="AB"
    export function AB(): number {
        return abCount
    }

    //% subcategory="Switch"
    //% blockId=swP0 block="P0"
    export function P0(): number {
        return p0Count
    }

    //% subcategory="Switch"
    //% blockId=swP1 block="P1"
    export function P1(): number {
        return p1Count
    }

    //% subcategory="Switch"
    //% blockId=swP2 block="P2"
    export function P2(): number {
        return p2Count
    }

    //% subcategory="Switch"
    //% blockId=swDistance block="Distance"
    export function distance(): number {
        return distanceData
    }



    //% subcategory="Music"
    //% blockId=setMusicF block="Music 0:dog 1:cat %n"
    //% n.min=0 n.max=1
    export function music(n: number): void {
        radio.sendString("s" + n)
    }

} 
