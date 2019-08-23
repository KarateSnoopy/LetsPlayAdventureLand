import {CharController} from "CharController";
import * as common from "Common";

class Mage extends CharController 
{
    ClassName: string = "Mage";

    constructor() 
    {
        super()
        game_log(`Injected CharController: ${this.ClassName}`)
        //map_key("s", "snippet", 'var target = get_targeted_monster(); if( target ) { use_skill("burst", target); }');
        //map_key("b", "snippet", 'use_skill("blink",[5,5])');
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

    runClassLoop(target): void 
    {
        if ( this.attack_mode )
        {
            // FOCUS_TANK_TARGET ? this.targetTankEntity() : this.targetLocalEntity()
            // this.moveToTarget()
            // this.attackTarget()

            // if ( MyParty.getRanger() !== null ) 
            // {
            //     this.castEnergize( MyParty.getRanger() )
            //     move(MyParty.getRanger().real_x, MyParty.getRanger().real_y)
            // }

            if(target)
            {
                // Attack the target if the target isn't empty and attackable
                if(!in_attack_range(target))
                {
                    // Walk half the distance
                    move(
                        character.real_x+(target.real_x-character.real_x)/2, 
                        character.real_y+(target.real_y-character.real_y)/2
                        );
                }

                if (can_attack(target))
                {
                    game_log("Main attacking " + target.name);
                    attack(target);
                }
            }
        }
    } 
}

common.setCharInst(new Mage());