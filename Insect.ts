// https://github.com/araragoo/QTechCag

//% weight=5 color=#0fbc11 icon="\uf112" block="Insect"
namespace Insect {
    let prev_y = 0
    let prev_x = 0


    //  subcategory="Insect"
    //% blockId=prgInsect block="prg x:0<=>4 %x|y:0<=>4 %y"
    //% weight=85
    //% x.min=0 x.max=4
    //% y.min=0 y.max=4
    export function prg(x: number,y: number): void {
        if (x != prev_x || y != prev_y) {
            led.unplot(prev_x, prev_y)
        }
        led.plot(x, y)
        prev_x = x
        prev_y = y
        radio.sendString("m" + x + y)
    }
} 
