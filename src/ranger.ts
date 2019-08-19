import {CharController} from "CharController";
import * as common from "Common";

class Ranger extends CharController 
{
    ClassName: string = "Ranger";

    LastCast_Supershot: Date = new Date();

    constructor() {
        super()
        game_log(`Injected CharController: ${this.ClassName}`)
        common.commonInit();
    }

    // private castSupershot(): void {
    //     if ( this.Target !== null && this.Target.hp > this.character.attack * 1.5 &&
    //         this.timeFromLastCast(this.LastCast_Supershot) > Skills.Ranger.Supershot.Cooldown ) {
    //         game_log(`Casting Supershot`);
    //         this.LastCast_Supershot = new Date()
    //         use_skill(Skills.Ranger.Supershot.SpellName, this.Target)
    //     }
    // }

    // private castThreeShot(): void {
    //     if (this.character.mp > Skills.Ranger.ThreeShot.ManaCost ) {
    //         use_skill(Skills.Ranger.ThreeShot.SpellName)
    //     }
    // }

    runClassLoop(): void 
    {
        if ( common.attack_mode ) 
        {
            game_log("loop attack");
            // FOCUS_TANK_TARGET ? this.targetTankEntity() : this.targetLocalEntity();
            // this.moveToTarget();
            // this.castThreeShot();
            // this.castSupershot(); /* Disabled for now */
            // this.attackTarget();
        }
    }
}

common.setCharInst(new Ranger());