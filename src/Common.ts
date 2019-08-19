import {CharController} from "CharController";
export var charInst : CharController;
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

on_cm = function(from:string, data:any) : void
{
    game_log("Got on_cm" + from + " data: " + data);
    if( data === "toggle_attack_mode")
    {
        getCharInst().toggle_attack_mode();
    }
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
