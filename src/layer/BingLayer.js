import BaseLayer from "./BaseLayer";
/**
 * Bing地图图层
 * @extends BaseLayer
 */
class BingLayer extends BaseLayer{
    /**
     * 初始化
     * @param {object} options - 参数对象
     * @param {string} [options.id=uuid()] - 图层id标识
     * @param {string} [options.name] - 图层名称
     * @param {boolean} [options.show=true] - 图层是否显示
     * @param {Number} [options.zIndex] - zIndex
     * @param {alpha} [options.alpha=1] - alpha
     * @param {string} options.url - url https://dev.virtualearth.net
     * @param {string} options.mapStyle - Cesium.BingMapsStyle  例如AERIAL
     * @param {string} options.key  - bing key
     */
    constructor(options){
        super(options);
        this.url=options.url ? options.url : "";
        if(this.url === null || this.url === ""){
            console.log("bing地址不可为空!");
            return;
        }
        this.zIndex=options.zIndex;
        this.alpha=options.alpha ? options.alpha : 1;
        this.mapStyle=options.mapStyle;
        this.key=options.key;
        this.center=options.center;
        this.createLayer(options);
    }

    createLayer(options){

        this.provider= new Cesium.BingMapsImageryProvider({
            url: this.url,
            key : this.key,
            mapStyle : this.mapStyle
        })
        this.bing=new Cesium.ImageryLayer(this.provider,{show:this.show,alpha:this.alpha});
    }

    /**
     * 添加到地图上
     * @param {Globe} globe - 地图对象
     * @param {boolean} flyTo=false - 加载完成数据后是否自动飞行定位到数据所在的区域
     */
    addTo(globe,flyTo=false){
        super.addTo(globe);
        if(this.zIndex)
            this.globe.viewer.imageryLayers.add(this.bing,this.zIndex);
        else
            this.globe.viewer.imageryLayers.add(this.bing);
        if(flyTo&&this.center){
            this.globe.viewer.camera.flyTo({
                destination : Cesium.Cartesian3.fromDegrees(this.center.lng, this.center.lat, this.center.alt)
            });
        }
    }

    /**
     * 从地图上移除
     */
    remove(){
        if(this.globe) {
            this.globe.viewer.imageryLayers.remove(this.bing);
            super.remove(globe);
        }
    }

    /**
     * @param {boolean} flag - 设置是否显示
     */
    setVisible(flag){
        super.setVisible(flag);
        this.bing.show=flag;
    }
}
export default BingLayer;
