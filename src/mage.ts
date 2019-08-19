import {CharController} from "CharController";
import * as common from "Common";

class Mage extends CharController 
{
    ClassName: string = "Mage";

    constructor() 
    {
        super()
        game_log(`Injected CharController: ${this.ClassName}`)
    }

    // LastCast_Energize: Date = new Date();
    // LastCast_ManaBurst: Date = new Date();

    // private castEnergize(target: Player): void {
    //     if ( target !== null && this.timeFromLastCast(this.LastCast_Energize) > Skills.Mage.Energize.Cooldown ) {
    //         if ( this.timeFromLastCast(this.LastCast_Energize) >= 60 || target.mp <= 330 ) {
    //             game_log(`Casting Energize on: ${target.name}`);
    //             this.LastCast_Energize = new Date()
    //             use_skill(Skills.Mage.Energize.SpellName, target)
    //         }
    //     }
    // }

    runClassLoop(): void 
    {
        if ( this.attack_mode )
        {
            //game_log("Mage loop attack");

            // FOCUS_TANK_TARGET ? this.targetTankEntity() : this.targetLocalEntity()
            // this.moveToTarget()
            // this.attackTarget()

            // if ( MyParty.getRanger() !== null ) {
            //     this.castEnergize( MyParty.getRanger() )
            //     move(MyParty.getRanger().real_x, MyParty.getRanger().real_y)
            // }
        }
    }
}

common.setCharInst(new Mage());