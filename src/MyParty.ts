import { charInst } from "./Common";

export const MyPartyNames: Array<string> = 
[
    "RangerSnoopy", // DPS - Archer
    "MageSnoopy", // DPS - Mage
    "PriestSnoopy", // Healer - Priest
]

export class MyParty 
{
    public static inviteMembers() 
    {
        if( this.amItheLeader() )
        {
            MyPartyNames.forEach((player: string, key: string) => 
            {
                if( player !== character.name )
                {
                    //game_log( "party " + parent.party[player] );
                    if( parent.party[player] === undefined ) 
                    { 
                        send_party_invite(player) 
                    }
                }
            });
        }
    }

    public static getLeaderName():string { return MyPartyNames[0]; }
    public static getMage() { return get_player(MyPartyNames[1]); }
    public static getRanger() { return get_player(MyPartyNames[0]); }
    public static getHealer() { return get_player(MyPartyNames[2]); }

    public static amItheLeader() : boolean 
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
