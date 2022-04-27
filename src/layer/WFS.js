import BaseLayer from "./BaseLayer";
/**
 * WFS地图图层
 * @extends BaseLayer
 */
class WFS extends BaseLayer{
    /**
     * 初始化
     * @param {object} options - 参数对象
     * @param {string} [options.id=uuid()] - 图层id标识
     * @param {string} [options.name] - 图层名称
     * @param {boolean} [options.show=true] - 图层是否显示
     * @param {string} options.url - wfs服务url地址  http://localhost:8088/geoserver/tiger/ows
     * @param {string} [options.version=1.0.0] - 1.0.0
     * @param {string} options.typeName - 图层 tiger:poly_landmarks
     * @param {string} [options.maxFeatures=50] - 返回的最大记录数
     * @param {object} [options.symbol] - 矢量数据的style样式
     * @param {Number} [options.symbol.markerSize] - 为每个点创建的地图默认大小（以像素为单位）。
     * @param {String} [options.symbol.markerSymbol] - 为每个点创建的地图默认符号。 https://labs.mapbox.com/maki-icons/
     * @param {Cesium.Color} [options.symbol.markerColor] - 为每个点创建的地图颜色。
     * @param {Cesium.Color} [options.symbol.stroke] - 折线和多边形轮廓的默认颜色。
     * @param {Cesium.Number} [options.symbol.strokeWidth] - 折线和多边形轮廓的默认宽度
     * @param {Cesium.Color} [options.symbol.fill] - 多边形内部的默认颜色
     * @param {boolean} [options.symbol.clampToGround=false] - 如果我们希望将要素固定在地面上，则为true
     */
    constructor(options){
        super(options);
        this.url=options.url ? options.url : "";
        this.typeName=options.typeName ? options.typeName : "";
        this.version=options.version ? options.version : "1.0.0";
        this.maxFeatures=options.maxFeatures ? options.maxFeatures : 50;

        this.symbol=options.symbol ? options.symbol : {};
        this.symbol.markerSize=this.symbol.markerSize ? this.symbol.markerSize : 48;
        this.symbol.markerSymbol=this.symbol.markerSymbol ? this.symbol.markerSymbol : "marker";
        this.symbol.markerColor=this.symbol.markerColor ? this.symbol.markerColor : Cesium.Color.ROYALBLUE;
        this.symbol.stroke=this.symbol.stroke ? this.symbol.stroke : Cesium.Color.BLACK;
        this.symbol.strokeWidth=this.symbol.strokeWidth ? this.symbol.strokeWidth : 2;
        this.symbol.fill=this.symbol.fill ? this.symbol.fill : Cesium.Color.YELLOW;
        this.symbol.clampToGround=this.symbol.clampToGround ? symbol.clampToGround : false;
        if(this.url === ""||this.typeName === ""){
            console.log("wfs地址和图层名不可为空!");
            return;
        }
        this.center=options.center;
        this.createLayer(options);
    }

    createLayer(options){

        this.addr=this.url+"?"+"service=WFS"+"&version="+this.version+"&request=GetFeature"+"&typeName="
        +this.typeName+"&maxFeatures="+this.maxFeatures+"&outputFormat=application/json";

        this.dataSource = Cesium.GeoJsonDataSource.load(this.addr, this.symbol);
        this.dataSource.show=this.show;
    }

    /**
     * 添加到地图上
     * @param {Globe} globe - 地图对象
     * @param {boolean} flyTo=false - 加载完成数据后是否自动飞行定位到数据所在的区域
     */
    addTo(globe,flyTo=false){
        super.addTo(globe);
        this.globe.viewer.dataSources.add(this.dataSource);

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
            this.globe.viewer.imageryLayers.remove(this.dataSource);
            super.remove(globe);
        }
    }

    /**
     * @param {boolean} flag - 设置是否显示
     */
    setVisible(flag){
        super.setVisible(flag);
        this.dataSource.show=flag;
    }
}
export default WFS;
