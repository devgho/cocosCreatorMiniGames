// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Package from "../Package";

const {ccclass, property} = cc._decorator;

const enemyName = ["九头妖蛟","六翼幻蟒","划天角龙","吞天莽","啸风神狮","天苍青蛰","幽冥火龙","幽冥玄虎","暗影魔蛟","洪荒蛮龙","烈狱妖凰","玄火妖鹏","瑶天火凤","紫血夔龙","赤水明蝎","赤血雷蟒","金翅焰雕"];

@ccclass
export default class WarMst extends cc.Component {

    hp:number = 100;
    atk:number = 10;
    serial:number = 0;
    maxHp:number = 100;

    mstName:string = "";

    @property(cc.SpriteFrame)
    hpFrm:cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    friendFrs:cc.SpriteFrame[] = [];

    @property(cc.SpriteFrame)
    enemyFrs:cc.SpriteFrame[] = [];

    @property(cc.Sprite)
    hpSp:cc.Sprite = null;

    @property(cc.Sprite)
    mstSp:cc.Sprite = null;

    is_enemy:Boolean = false;

    fightCtrl=null;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.maxHp = this.hp;
        if(this.is_enemy){
            let rand = Math.round(Math.random() * 16);
            this.hpSp.spriteFrame = this.hpFrm;
            this.mstSp.spriteFrame = this.enemyFrs[rand];
            this.mstName = enemyName[rand];
        }else{
            this.mstSp.spriteFrame = this.friendFrs[this.serial];
        }
    }

    beAtked(damage:number){
        this.hp -= damage;
        this.node.getChildByName("body").getChildByName("hpBar").getComponent(cc.ProgressBar).progress = this.hp / this.maxHp;
        if(this.hp <= 0){
            this.fightCtrl.dead(this.is_enemy);
            this.node.active = false;
        }
    }

    // update (dt) {}
}
