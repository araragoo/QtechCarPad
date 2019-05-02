namespace Motor {

    // I2Cアドレス
    const DRV_ADR1   0x64  // DRV8830のI2Cアドレス A1 = open,  A0 = open
    const DRV_ADR2   0x65  // DRV8830のI2Cアドレス A1 = open,  A0 = 1
    const CTR_ADR   0x00  // CONTROLレジスタのサブアドレス
    const FLT_ADR   0x01  // FAULTレジスタのアドレス

    // ブリッジ制御
    const M_STANBY  B00   // スタンバイ   
    const M_REVERSE B01   // 逆転
    const M_NORMAL  B10   // 正転
    const M_BRAKE   B11   // ブレーキ

    const DRV_MIN     0 //  0V
    const DRV_MAX   100 //  3Vmax
    const DRV_MIN_B   0 //  0lsb
    const DRV_MAX_B  37 //  6-37lsb : 0.48-5.06V   3Vmax -> (3.0-0.48)/(5.06-0.48)*(63-6)+6 = 37lsb
    const DRV_MAXMAX_B      0x3F


    function i2cwrite(addr: number, reg: number, value: number) {
        let buf = pins.createBuffer(2)
        buf[0] = reg
        buf[1] = value
        pins.i2cWriteBuffer(addr, buf)
    }

    function i2cread(addr: number, reg: number) {
        pins.i2cWriteNumber(addr, reg, NumberFormat.UInt8BE);
        let val = pins.i2cReadNumber(addr, NumberFormat.UInt8BE);
        return val;
    }

    function driveMotor(channel: number, voltage: number) {
        let adr;
        switch (channel) {
            case 1: adr  = DRV_ADR1; break;
            case 2: adr  = DRV_ADR2; break;
            default : return;
        }

        let ctr;
        let value;
        if (voltage == 0) {
            ctr = M_STANBY;
        } else if (voltage > 0) {
            ctr = M_NORMAL;
        } else {
            ctr = M_REVERSE;
            voltage = -voltage;
        }

        if(voltage > DRV_MAX) value = DRV_MAX;
        if(voltage < DRV_MIN) value = DRV_MIN;
        value = (DRV_MAX_B - DRV_MIN_B)*(value - DRV_MIN) / (DRV_MAX - DRV_MIN) + DRV_MIN_B;
        value = ctr + (value << 2);

        i2cwrite(channel,CTR_ADR, value);
    }

    export function Motor(channel: number,voltage: number): void {
        driveMotor(channel, voltage) {
    }
} 
