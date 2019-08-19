import * as xptimer from "XPTimer";
import * as myparty from "MyParty";
import { MyParty } from "./MyParty";

interface MobLocation
{
    map: string
    x: number
    y: number
}

class Monsters 
{
    public AddMonster(name:string, data:MobLocation)
    {
        this[name] = data;
    }

    protected constructor() 
    {
        this.AddMonster("goo", {map: "main", x: -12, y: 772 });
        this.AddMonster("bee", {map: "main", x: 554, y: 1070 });

        // Squig
        // Armadillo
        // Spider
        // Squigtoad
        // Scorpion
        // Fairy
        // Dark Knight
        // Bat
        // Irritated Goo
        // Scorpion
        // Green Snake
        // Orange Snake
        // Pom Pom
        // Ghost
    }
}

export function distanceToCoords(x: number, y: number, character: Character): number 
{
    return Math.sqrt(Math.pow(character.real_x - x, 2) + Math.pow(character.real_y - y, 2));
}

export abstract class CharController 
{
    public Monsters: Monsters = new Monsters();
    public TargetName: string = "";
    public Target: Player | Monster | Character;
    public isMovingToLocation: boolean = false;
    public isResupplying: boolean = false;
    public character: Character = null;
    public myxp:xptimer.XPTimer = new xptimer.XPTimer();
    public myparty:MyParty = new MyParty();
    public attack_mode: boolean = true;

    abstract ClassName: string;
    abstract runClassLoop(): void;

    public toggle_attack_mode() : void
    {
        this.attack_mode = !this.attack_mode;
    }

    protected start_anti_stuck_check() :void
    {
        //Anti-Stuck Script
        this.last_x = character.real_x;
        this.last_y = character.real_y;
        setInterval(function(){
            if(
                this.last_x-10 < character.real_x && 
                this.last_x+10 > character.real_x && 
                this.last_y-10 < character.real_y && 
                this.last_y+10 > character.real_y)
            {
                game_log("Stuck.  Warping to town");
                parent.socket.emit('town');
                this.last_x = character.real_x;
                this.last_y = character.real_y;
            }
            else
            {
                this.last_x = character.real_x;
                this.last_y = character.real_y;
            }
        },5000);
    }

    public commonInit() : void
    {
        map_key("0", "snippet", "");
        map_key("1", "snippet", "parent.start_runner();");
        map_key("2", "snippet", "parent.stop_runner();");
        map_key("3", "snippet", 'load_code("' + character.ctype + '")');
        map_key("9", "snippet", 'send_cm("' + character.name + '","toggle_attack_mode");');
        map_key("M", "snippet", 'game_log("X=" + character.real_x + ", Y=" + character.real_y);');
        //map_key("4", "snippet", 'game_log(getCharInst().testIt())');
        game_log("Hello world 5. To reload your code, first press 2 to stop the current AI, and then press 3 to reload the code.");
        game_log("character.ctype: " + character.ctype);
    }
    
    protected constructor() 
    {
        this.commonInit();
        
        this.last_potion = 0;
        this.character = character;
        this.targetMob = "goo";
        MyParty.inviteMembers();
        
        //this.start_anti_stuck_check();
        setInterval(() => 
        {
            this.character = character;

            if(is_moving(this.character)) 
            {
                return;
            }

            if(this.character.rip) 
            {
                respawn();
                return;
            }

            this.use_potions();
            loot(true);

            // this.checkSupplies();

            if ( !this.isResupplying && !this.isMovingToLocation ) 
            {
                this.Target = get_targeted_monster();

                if ( this.Target !== null && this.Target.mtype !== this.TargetName )
                    this.TargetName = this.Target.mtype;

                this.moveToFarmLocation();
                this.runClassLoop();
            }

            this.myxp.update_xptimer();

        }, 1000 / 4)
    }

    private moveToFarmLocation(): void 
    {
        let target = this.Monsters[this.targetMob];
        //let dist = distanceToCoords(target.x, target.y, this.character);
        //game_log("dist " + dist);
        if (target !== null && 
            target !== undefined && 
            distanceToCoords(target.x, target.y, this.character) > 50 ) 
        {
            game_log("moving to " + this.targetMob + " at " + target.x + ", " + target.y);
            this.isMovingToLocation = true;
            smart_move({ map: target.map, x: target.x, y: target.y })
        }
        else 
        {
            this.isMovingToLocation = false
        }
    }

    public use_potions(): void 
    {
        if(new Date() - this.last_potion >= 2000)
        {
            if(character.hp < character.max_hp - this.missing_hp)
            {
                use('hp');
                this.last_potion = new Date();
            }
            else if(character.mp < character.max_mp - this.missing_mp)
            {
                use('mp');
                this.last_potion = new Date();
            }
        }
    }
}

