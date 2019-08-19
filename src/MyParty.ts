import { charInst } from "./Common";

export const MY_PARTY_NAMES: Array<string> = 
[
    "MageSnoopy", // DPS - Mage
    "RangerSnoopy", // DPS - Archer
    "PriestSnoopy", // Healer - Priest
]

export class MyParty 
{
    public static inviteMembers() 
    {
        if( this.isLeader() )
        {
            MY_PARTY_NAMES.forEach((player: string, key: string) => 
            {
                if( player !== character.name )
                {
                    game_log( "party " + parent.party[player] );
                    if( parent.party[player] === undefined ) 
                    { 
                        send_party_invite(player) 
                    }
                }
            });
        }
    }

    public static getLeaderName():string { return MY_PARTY_NAMES[1]; }
    public static getMage() { return get_player(MY_PARTY_NAMES[0]) }
    public static getRanger() { return get_player(MY_PARTY_NAMES[1]) }
    public static getHealer() { return get_player(MY_PARTY_NAMES[2]) }

    public static isLeader() : boolean 
    {
        return character.name == MyParty.getLeaderName();
    }

    public static handle_party_invite(from:string) 
    {
        if( from === MyParty.getLeaderName() )
        {
            accept_party_invite(from);
        }
    }
}
