// https://github.com/araragoo/QTechCag

//% weight=5 color=#0fbc11 icon="\uf112" block="Insect"
namespace Cag {

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

    // subcategory="LCD"
    // blockId=setRotX block="rotation X:0<=>5"
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

    // subcategory="LCD"
    // blockId=setRotY block="rotation Y:0<=>5"
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
    //% blockId=setStops block="Stop (1sec)"
    export function stops(): void {
        radio.sendString("M" + 0)
    }

    //% subcategory="Move"
    //% blockId=setFwds block="WalkFwd (2sec) times[s]:1<=>10 %times"
    export function fwds(times: number): void {
        radio.sendString("M" + 1 + times)
    }

    //%  subcategory="Move"
    //% blockId=setBwds block="WalkBwd (2sec) times[s]:1<=>10 %times"
    export function bwds(): void {
        radio.sendString("M" + 2 + times)
    }

    //% subcategory="Move"
    //% blockId=setRights block="WalkRight (2sec) times[s]:1<=>10 %times"
    export function rights(): void {
        radio.sendString("M" + 3 + times)
    }

    //% subcategory="Move"
    //% blockId=setLefts block="WalkLeft (2sec) times[s]:1<=>10 %times"
    export function lefts(): void {
        radio.sendString("M" + 4 + times)
    }

    //% subcategory="Move"
    //% blockId=setSitDowns block="Sit Down (1sec)"
    export function sitDowns(): void {
        radio.sendString("M" + 5 + times)
    }

    //% subcategory="Move"
    //% blockId=setHappinesses block="Happiness (1sec)"
    export function happinesses(): void {
        radio.sendString("M" + 6 + times)
    }



    //% subcategory="LED"
    //% blockId=setLEDred block="LED voltage:0<=>100 %voltage"
    //% voltage.min=0 voltage.max=100
    export function LEDred(): void {
        radio.sendString("l" 0 + v)
    }

    //% subcategory="LED"
    //% blockId=setLEDgreen block="LED voltage:0<=>100 %voltage"
    //% voltage.min=0 voltage.max=100
    export function LEDgreen(): void {
        radio.sendString("l" 1 + v)
    }

    //% subcategory="LED"
    //% blockId=setLEDblue block="LED voltage:0<=>100 %voltage"
    //% voltage.min=0 voltage.max=100
    export function LEDblue(): void {
        radio.sendString("l" 2 + v)
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

    //% subcategory="Music1"
    //% blockId=setMusicF block="musicF No.0<=>9 %n"
    //% n.min=0 n.max=9
    export function musicF(n: number): void {
        radio.sendString("s" + n)
    }

    //% subcategory="Music1"
    //% blockId=setDadadum block="dadadum"
    export function dadadum(): number {
        return 0
    }

    //% subcategory="Music1"
    //% blockId=setEntertainer block="entertainer"
    export function entertainer(): number {
        return 1
    }

    //% subcategory="Music1"
    //% blockId=setPrelude block="prelude"
    export function prelude(): number {
        return 2
    }

    //% subcategory="Music1"
    //% blockId=setOde block="ode"
    export function ode(): number {
        return 3
    }

    //% subcategory="Music1"
    //% blockId=setNyan block="nyan"
    export function nyan(): number {
        return 4
    }

    //% subcategory="Music1"
    //% blockId=setRingtone block="ringtone"
    export function ringtone(): number {
        return 5
    }

    //% subcategory="Music1"
    //% blockId=setFunk block="funk"
    export function funk(): number {
        return 6
    }

    //% subcategory="Music1"
    //% blockId=setBlues block="blues"
    export function blues(): number {
        return 7
    }

    //% subcategory="Music1"
    //% blockId=setBirthday block="birthday"
    export function birthday(): number {
        return 8
    }

    //% subcategory="Music1"
    //% blockId=setWedding block="wedding"
    export function wedding(): number {
        return 9
    }

    //% subcategory="Music2"
    //% blockId=setMusicS block="musicS No.0<=>9 %n"
    //% n.min=0 n.max=9
    export function musicS(n: number): void {
        radio.sendString("p" + n)
    }

    //% subcategory="Music2"
    //% blockId=setFunereal block="funereal"
    export function funereal(): number {
        return 0
    }

    //% subcategory="Music2"
    //% blockId=setPunchline block="punchline"
    export function punchline(): number {
        return 1
    }

    //% subcategory="Music2"
    //% blockId=setBadduy block="badduy"
    export function badduy(): number {
        return 2
    }

    //% subcategory="Music2"
    //% blockId=setChasel block="chase"
    export function chase(): number {
        return 3
    }

    //% subcategory="Music2"
    //% blockId=setBaDing block="ba ding"
    export function ba(): number {
        return 4
    }

    //% subcategory="Music2"
    //% blockId=setWawawaaa block="wawawaaa"
    export function wawawaaa(): number {
        return 5
    }

    //% subcategory="Music2"
    //% blockId=setJumpUp block="jumpUp"
    export function jumpUp(): number {
        return 6
    }

    //% subcategory="Music2"
    //% blockId=setJumpDown block="jumpDown"
    export function jumpDown(): number {
        return 7
    }

    //% subcategory="Music2"
    //% blockId=setPowerUp block="powerUp"
    export function powerUp(): number {
        return 8
    }

    //% subcategory="Music2"
    //% blockId=setPowerDown block="powerDown"
    export function powerDown(): number {
        return 9
    }
} 
