import BaseLayer from "./BaseLayer";
/**
 * ogc wms图层
 * @extends BaseLayer
 */
class WMS extends BaseLayer{
    /**
     * 初始化
     * @param {object} options - 参数对象
     * @param {string} [options.id=uuid()[ - 图层id标识
     * @param {string} [options.name] - 图层名称
     * @param {boolean} [options.show=true] - 图层是否显示
     * @param {Number} [options.zIndex] - zIndex
     * @param {alpha} [options.alpha=1] - alpha
     * @param {string} options.url - url
     * @param {string} options.layers - layers
     * @param {object} options.parameters - parameters
     * @param {string} [options.parameters.format='image/png'] - 瓦片格式
     * @param {boolean} [options.parameters.transparent=true] - 是否透明
     * @param {string} [options.parameters.service='WMS'] - 服务类型
     * @param {string} [options.parameters.version='1.1.1'] - 服务版本
     * @param {string} [options.parameters.request='GetMap'] - 请求方法
     * @param {string} [options.parameters.styles=''] - 样式
     * @param {string} [options.parameters.SRS='EPSG:4326'] - SRS: EPSG:4326
     * @param {object} [options.center] - 图层自定义定位视角
     * @param {Number} options.center.lng - 经度值, 180 - 180
     * @param {Number} options.center.lat - 纬度值, -90 - 90
     * @param {Number} options.center.alt - 高度值
     */
    constructor(options){
        super(options);
        this.url=options.url ? options.url : "";
        this.zIndex=options.zIndex;
        this.alpha=options.alpha ? options.alpha : 1;
        this.layers=options.layers;
        this.parameters=options.parameters?options.parameters:{};
        this.center=options.center;
        if(this.url === null || this.url === ""){
            console.log("wms地址不可为空!");
            return;
        }
        this.createLayer(options);
    }

    createLayer(options){
        this.provider=new Cesium.WebMapServiceImageryProvider({
            url : this.url,
            layers : this.layers,
            parameters: {
                service : this.parameters.service?this.parameters.service:'WMS',
                format: this.parameters.format?this.parameters.format:'image/png',
                transparent: this.parameters.transparent?this.parameters.transparent:true,
                version:this.parameters.version?this.parameters.version:'1.1.1',
                request:this.parameters.request?this.parameters.request:'GetMap',
                style:this.parameters.styles?this.parameters.styles:'',
                SRS:this.parameters.SRS?this.parameters.SRS:'EPSG:4326'
            }
        });

        this.wms=new Cesium.ImageryLayer(this.provider,{show:this.show,alpha:this.alpha});
    }

    /**
     * 添加到地图上
     * @param {Globe} globe - 地图对象
     * @param {boolean} flyTo=false - 加载完成数据后是否自动飞行定位到数据所在的区域
     */
    addTo(globe,flyTo=false){
        super.addTo(globe);
        if(this.zIndex)
            this.globe.viewer.imageryLayers.add(this.wms,this.zIndex);
        else
            this.globe.viewer.imageryLayers.add(this.wms);
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
            this.globe.viewer.imageryLayers.remove(this.wms);
            super.remove(globe);
        }
    }

    /**
     * @param {boolean} flag - 设置是否显示
     */
    setVisible(flag){
        super.setVisible(flag);
        this.wms.show=flag;
    }
}
export default WMS;
