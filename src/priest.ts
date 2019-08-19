import {CharController} from "CharController";
import * as common from "Common";

class Priest extends CharController 
{
    ClassName: string = "Priest";

    constructor() 
    {
        super()
        game_log(`Injected CharController: ${this.ClassName}`)
    }

    // readonly minHealPercentage = 0.80
    // readonly curseTargetMaxHealth = 1000
    // HealTarget: Player = null;
    // HealWeight: number = null;
    // LastCast_Curse: Date = new Date();

    // private healPartyMember(): boolean 
    //{

    //     this.HealTarget = null
    //     this.HealWeight = null

    //     MY_PARTY_NAMES.map( playerName => {
    //         let player = get_player(playerName);

    //         if (player !== null && can_heal(player) &&
    //             player.hp < player.max_hp * this.minHealPercentage &&
    //             this.HealTarget === null ) {
    //             this.HealTarget = player
    //         }
    //     })

    //     if ( this.HealTarget !== null && can_heal(this.HealTarget) ) {
    //         game_log(`Healing: ${this.HealTarget.name}`)
    //         heal(this.HealTarget);
    //         return true
    //     }

    //     return false
    // }

    // // @ts-ignore
    // private curseTarget(): void {
    //     if ( this.Target !== null &&
    //         this.timeFromLastCast(this.LastCast_Curse) > Skills.Priest.Curse.Cooldown &&
    //         this.curseTargetMaxHealth <= this.Target.max_hp ) {
    //         game_log(`Cursing: ${this.Target.name}`)
    //         use_skill(Skills.Priest.Curse.SpellName, this.Target)
    //     }
    // }

    runClassLoop(): void 
    {
        //if ( this.healPartyMember() ) return

        if ( this.attack_mode )
        {
            //game_log("Priest loop attack");

            //FOCUS_TANK_TARGET ? this.targetTankEntity() : this.targetLocalEntity();
            //this.moveToTarget();

            // this.curseTarget()
            //this.attackTarget();
        }
    }
}

common.setCharInst(new Priest());