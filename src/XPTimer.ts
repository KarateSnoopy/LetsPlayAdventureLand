export class XPTimer 
{
    private minute_refresh: any;
    private last_minutes_checked: Date = new Date();
    private last_xp_checked_minutes: number = character.xp;
    private last_xp_checked_kill: number = character.xp;

    public constructor() 
    {
        this.init_xptimer(1);
    }

    public init_xptimer(minref): void 
    {
        this.minute_refresh = minref || 1;
        // @ts-ignore
        parent.add_log(this.minute_refresh.toString() + ' min until refresh!', 0x00FFFF);

        // @ts-ignore
        let $ = parent.$;
        let brc = $('#bottomrightcorner');

        brc.find('#xptimer').remove();

        let xpt_container = $('<div id="xptimer"></div>').css({
            background: 'black',
            border: 'solid gray',
            borderWidth: '5px 5px',
            width: '320px',
            height: '96px',
            fontSize: '28px',
            color: '#77EE77',
            textAlign: 'center',
            display: 'table',
            overflow: 'hidden',
            marginBottom: '16px'
        });

        //vertical centering in css is fun
        // @ts-ignore
        let xptimer = $('<div id="xptimercontent"></div>')
            .css({
                display: 'table-cell',
                verticalAlign: 'middle'
            })
            .html('Estimated time until level up:<br><span id="xpcounter" style="font-size: 40px !important; line-height: 28px">Loading...</span><br><span id="xprate">(Kill something!)</span>')
            .appendTo(xpt_container);

        brc.prepend(xpt_container);
    }

    public update_xptimer(): void 
    {
        if (character.xp == this.last_xp_checked_kill) return;

        let $ = parent.$;
        let now = new Date();

        let time = Math.round((now.getTime() - this.last_minutes_checked.getTime()) / 1000);
        if (time < 1) return; // 1s safe delay
        let xp_rate = Math.round((character.xp - this.last_xp_checked_minutes) / time);
        if (time > 60 * this.minute_refresh) 
        {
            this.last_minutes_checked = new Date();
            this.last_xp_checked_minutes = character.xp;
        }
        this.last_xp_checked_kill = character.xp;

        let xp_missing = parent.G.levels[character.level] - character.xp;
        let seconds = Math.round(xp_missing / xp_rate);
        let minutes = Math.round(seconds / 60);
        let hours = Math.round(minutes / 60);
        let counter = `${hours}h ${minutes % 60}min`;

        $('#xpcounter').text(counter);
        $('#xprate').text(`${xp_rate} XP/s`);
    }

}
