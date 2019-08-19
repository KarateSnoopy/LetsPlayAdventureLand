import {CharController} from "CharController";
export var charInst : CharController;
export var attack_mode : boolean;
import { MyParty } from "./MyParty";

export function setCharInst(c: CharController)
{
    charInst = c;
    game_log("setCharInst")
}

export function getCharInst() : CharController
{
    return charInst;
}

export function commonInit() 
{
    map_key("0", "snippet", "");
    map_key("1", "snippet", "parent.start_runner();");
    map_key("2", "snippet", "parent.stop_runner();");
    map_key("3", "snippet", 'load_code("' + character.ctype + '")');
    map_key("9", "snippet", 'send_cm("RangerSnoopy","toggle_attack_mode");');
    map_key("M", "snippet", 'game_log("X=" + character.real_x + ", Y=" + character.real_y);');
    //map_key("4", "snippet", 'game_log(getCharInst().testIt())');
    //map_key("9", "snippet", 'if( typeof attack_mode == "undefined" ) { attack_mode = true; } else { attack_mode = !attack_mode;} game_log("attack_mode = " + attack_mode);'); 
    game_log("Hello world 5. To reload your code, first press 2 to stop the current AI, and then press 3 to reload the code.");
    game_log("character.ctype: " + character.ctype);
}

on_cm = function(from:string, data:any) : void
{
    game_log("Got on_cm");
}

handle_command = function(command: string, args: string) : void
{
    game_log("Got handle_command");
}

on_party_invite = function(from: string)
{
    game_log("Got on_party_invite");
    MyParty.handle_party_invite(from);
}

on_party_request = function(from: string)
{
    game_log("Got on_party_request");
}
