import Store from "../Components/Store"
const { ccclass, property } = cc._decorator;
 
@ccclass('PlatformApi')
export class PlatformApi extends cc.Component {
 
 
    private static _instance: PlatformApi | null = null;

    storeInstance:Store = null;
 
    public static get Instance() {
 
        if (!PlatformApi._instance) {
            window["PlatformApi"] = new PlatformApi();
            PlatformApi._instance = new PlatformApi()
        }
        // return PlatformApi._instance || (PlatformApi._instance = new PlatformApi());
        return PlatformApi._instance;
    }
 
    //内购请求（目前测试：1000000000）
    public BuyProduct(eventId: string) {
        console.log("BuyProduct " + eventId);
        if (cc.sys.platform == cc.sys.ANDROID) {
            
        } else if (cc.sys.platform == cc.sys.IPHONE || cc.sys.platform == cc.sys.IPAD) {
            jsb.reflection.callStaticMethod("IAPInterface", "BuyProduct:", eventId);
        }else{
            this.storeInstance.buySuccess(eventId);
        }
 
    }
 
    //内购商品信息请求
    public RequstProductInfo(eventId: string) {
        console.log("RequstProductInfo " + eventId);
        if (cc.sys.platform == cc.sys.ANDROID) {
 
        } else if (cc.sys.platform == cc.sys.IPHONE || cc.sys.platform == cc.sys.IPAD) {
            jsb.reflection.callStaticMethod("IAPInterface", "RequstProductInfo:", eventId);
        }
    }
 
    //app升级或者重装后，对已内购信息恢复请求
    public RestoreBuyProduct(eventId: string) {
        console.log("RestoreBuyProduct " + eventId);
        if (cc.sys.platform == cc.sys.ANDROID) {
 
        } else if (cc.sys.platform == cc.sys.IPHONE || cc.sys.platform == cc.sys.IPAD) {
            jsb.reflection.callStaticMethod("IAPInterface", "RestoreBuyProduct:", eventId);
        }
    }
 
    //内购成功xcode回掉
    public BuyProcuctSucessCallBack(eventId: string) {
        this.storeInstance.buySuccess(eventId);
        console.log("BuyProcuctSucessCallBack " + eventId);
       
    }
 
    //内购失败xcode回掉
    public BuyProcuctFailedCallBack(eventId: string) {
        console.log("BuyProcuctFailedCallBack " + eventId);
        
    }
 
    //商品信息xcode回掉
    public ShowProductList(eventId: string) {
        console.log("ShowProductList " + eventId);
 
    }
 
    //对已购买的商品进行恢复xcode回掉
    public RestoreBuyProductSucessCallBack(eventId: string) {
        console.log("RestoreBuyProductSucessCallBack " + eventId);
        if (eventId=="1000000000") {
            //恢复已购买的商品
        }
 
    }
 
}