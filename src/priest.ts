import {CharController} from "CharController";
import * as common from "Common";
import { MyPartyNames } from "./MyParty";

class Priest extends CharController 
{
    ClassName: string = "Priest";

    constructor() 
    {
        super()
        game_log(`Injected CharController: ${this.ClassName}`)
        //map_key("s", "snippet", 'var target = get_targeted_monster(); if( target ) { use_skill("curse", target); }');
    }

    // readonly curseTargetMaxHealth = 1000
    // LastCast_Curse: Date = new Date();
    // HealTarget: Player = null;
    //HealWeight: number = null;

    readonly minHealPercentage = 0.8

    private healPartyMember(): boolean 
    {
        this.HealTarget = null;

        MyPartyNames.map( playerName => 
        {
            let player = get_player(playerName);

            if (player !== null && 
                can_heal(player) &&
                player.hp < player.max_hp * this.minHealPercentage &&
                this.HealTarget === null ) 
            {
                this.HealTarget = player
            }
        })

        if ( this.HealTarget !== null && can_heal(this.HealTarget) ) 
        {
            game_log(`Healing: ${this.HealTarget.name}`)
            heal(this.HealTarget);
            return true;
        }

        return false;
    }

    // // @ts-ignore
    // private curseTarget(): void {
    //     if ( this.Target !== null &&
    //         this.timeFromLastCast(this.LastCast_Curse) > Skills.Priest.Curse.Cooldown &&
    //         this.curseTargetMaxHealth <= this.Target.max_hp ) {
    //         game_log(`Cursing: ${this.Target.name}`)
    //         use_skill(Skills.Priest.Curse.SpellName, this.Target)
    //     }
    // }

    runClassLoop(target): void 
    {
        if ( this.healPartyMember() ) 
        {
            return;
        }

        if ( this.attack_mode )
        {
            //FOCUS_TANK_TARGET ? this.targetTankEntity() : this.targetLocalEntity();
            //this.moveToTarget();

            // this.curseTarget()
            //this.attackTarget();

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

common.setCharInst(new Priest());