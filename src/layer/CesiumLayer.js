import BaseLayer from "./BaseLayer";
/**
 * Cesium在线地图图层
 * @extends BaseLayer
 */
class CesiumLayer extends BaseLayer{
    /**
     * 初始化
     * @param {object} options - 参数对象
     * @param {string} [options.id=uuid()] - 图层id标识
     * @param {string} [options.name] - 图层名称
     * @param {boolean} [options.show=true] - 图层是否显示
     * @param {Number} [options.zIndex] - zIndex
     * @param {alpha} [options.alpha=1] - alpha
     * @param {Number} [options.assetId=3845] - 图像资产ID 3845 深蓝地图 3812 夜间地图  3813 natural earth II 3954 sentinel-2
     */
    constructor(options){
        super(options);
        this.assetId=options.assetId ? options.assetId : 3845;
        this.zIndex=options.zIndex;
        this.alpha=options.alpha ? options.alpha : 1;
        this.center=options.center;
        this.createLayer(options);
    }

    createLayer(options){
        this.provider= new Cesium.IonImageryProvider ({
            assetId: this.assetId
        });
        this.cesium=new Cesium.ImageryLayer(this.provider,{show:this.show,alpha:this.alpha});
    }

    /**
     * 添加到地图上
     * @param {Globe} globe - 地图对象
     * @param {boolean} flyTo=false - 加载完成数据后是否自动飞行定位到数据所在的区域
     */
    addTo(globe,flyTo=false){
        super.addTo(globe);
        if(this.zIndex)
            this.globe.viewer.imageryLayers.add(this.cesium,this.zIndex);
        else
            this.globe.viewer.imageryLayers.add(this.cesium);
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
            this.globe.viewer.imageryLayers.remove(this.cesium);
            super.remove(globe);
        }
    }

    /**
     * @param {boolean} flag - 设置是否显示
     */
    setVisible(flag){
        super.setVisible(flag);
        this.cesium.show=flag;
    }
}
export default CesiumLayer;
