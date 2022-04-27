/**
 * ExamplesforCesium 示例配置文件：包含示例的分类、名称、缩略图、文件路径
 */
var identification = {
    name: "TTmap"
};

var exampleConfig = {
    "3D": {
        name: "3D",
        content: {
            "地图": {
                name: "地图",
                content: [
                {
                    name: "百度地图",
                    thumbnail: "xingkong.gif",
                    fileName: "baidu"
                },{
                    name: "bing地图",
                    thumbnail: "xingkong.gif",
                    fileName: "bing"
                },{
                    name: "cesium地图",
                    thumbnail: "xingkong.gif",
                    fileName: "cesium"
                },{
                    name: "高德地图",
                    thumbnail: "xingkong.gif",
                    fileName: "gaode"
                },{
                    name: "mapbox地图",
                    thumbnail: "xingkong.gif",
                    fileName: "mapbox"
                },{
                    name: "天地图地图",
                    thumbnail: "xingkong.gif",
                    fileName: "tdt"
                },{
                    name: "wms地图",
                    thumbnail: "xingkong.gif",
                    fileName: "wms"
                },{
                    name: "wmts地图",
                    thumbnail: "xingkong.gif",
                    fileName: "wmts"
                },{
                    name: "xyz地图",
                    thumbnail: "xingkong.gif",
                    fileName: "xyz"
                }]},
            "矢量": {
                name: "矢量",
                content: [{
                    name: "wfs",
                    thumbnail: "xingkong.gif",
                    fileName: "wfs"
                },{
                    name: "geojson",
                    thumbnail: "xingkong.gif",
                    fileName: "geojson"
                }]},
            "三维场景": {
                name: "三维场景",
                content: [{
                    name: "天空盒",
                    thumbnail: "xingkong.gif",
                    fileName: "skybox"
                },{
                    name: "太阳月亮",
                    thumbnail: "xingkong.gif",
                    fileName: "sunmoon"
                },{
                    name: "大气",
                    thumbnail: "xingkong.gif",
                    fileName: "skyAtmosphere"
                }]}
    }},
    "2D": {
        name: "2D",
        content: {
            "地球": {
                name: "地球",
                content: [{
                    name: "星空背景",
                    thumbnail: "xingkong.gif",
                    fileName: "es6_t1"
                },{
                    name: "星空背景2",
                    thumbnail: "xingkong.gif",
                    fileName: "es6_t1"
                }]},
            "地球2": {
                name: "地球",
                content: [{
                    name: "星空背景",
                    thumbnail: "xingkong.gif",
                    fileName: "es6_t1"
                },{
                    name: "星空背景2",
                    thumbnail: "xingkong.gif",
                    fileName: "es6_t1"
                }]},
            "地球3": {
                name: "地球",
                content: [{
                    name: "星空背景",
                    thumbnail: "xingkong.gif",
                    fileName: "es6_t1"
                },{
                    name: "星空背景2",
                    thumbnail: "xingkong.gif",
                    fileName: "es6_t1"
                }]}
        }}
};
/**
 *key值：为exampleConfig配置的key值或者fileName值
 *      （为中间节点时是key值，叶结点是fileName值）
 *value值：fontawesome字体icon名
 *不分层
 */
var sideBarIconConfig = {
    "3D": "fa-globe",
    "2D": "fa fa-map",
    "二三维一体化": "fa-pie-chart",
};

/**
 *key值：为exampleConfig配置的key值
 *value值：fontawesome字体icon名
 *与sideBarIconConfig的区别：sideBarIconConfig包括侧边栏所有层级目录的图标，exampleIconConfig仅包括一级标题的图标
 */
var exampleIconConfig = {
    "3D": "fa-globe",
    "2D": "fa fa-map",
    "二三维一体化": "fa-pie-chart",
};