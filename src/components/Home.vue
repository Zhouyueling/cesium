<template>
          <el-container class="home-container">
            <!-- 头部区域 -->
            <el-header height="100px">
                <!-- 左边的图片与平台名称 -->
                <div>
                    <img src="../assets/ahpu.png" alt=""  height="100px">
                    <span>三维数据可视化平台</span>                    
               </div>
            </el-header>
            <!-- 主体区域 -->
            <el-container>
                <!-- 侧边栏 -->
                <el-aside :width="isCollapse? '65px' :'200px'">
                    <div class="toggle-button" @click="toggleCollapse">|||</div>
                    <!-- 一级标签 -->
                    <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#545c64" 
                             text-color="#fff" active-text-color="#ffd04b" unique-opened :collapse="isCollapse"
                             :collapse-transition="false">
                        <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-s-promotion"></i>
                                <span>专题信息</span>
                            </template>
                            <!-- 二级菜单 -->
                            <el-menu-item-group>
                                <template slot="title">
                                    <el-menu-item index="1-1" class="thematicInformation" @click="dialogExcavateFormVisible= true">地下开挖</el-menu-item>
                                    <el-menu-item index="1-2" class="thematicInformation" @click="subwayRoad">加载地铁线路</el-menu-item>
                                    <el-menu-item index="1-3" class="thematicInformation" @click="showPeopleNumbers">展示地铁人流</el-menu-item>
                                </template>
                            </el-menu-item-group>   
                        </el-submenu>

                        <el-submenu index="2">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>三维场景</span>
                            </template>
                            <!-- 二级菜单 -->
                            <el-menu-item-group>
                                <template slot="title">
                                    <el-menu-item index="2-1" @click="loadUnderground3Dtiles"  class="threeDScene">
                                        地下加载站台
                                    </el-menu-item>
                                     <el-menu-item index="2-1" @click="loadGround3Dtiles"  class="threeDScene">
                                        地上加载站台
                                    </el-menu-item>
                                    <el-menu-item index="2-2" @click="dialogFlyFormVisible=true" class="threeDScene">
                                        快速跳转
                                    </el-menu-item>
                                </template>
                            </el-menu-item-group>   
                        </el-submenu>

                        <el-submenu index="3">
                            <template slot="title">
                                <i class="el-icon-s-marketing"></i>
                                <span>时空数据</span>
                            </template>
                            <!-- 二级菜单 -->
                            <el-menu-item-group>
                                <template slot="title">
                                    <el-menu-item index="3-1" class="timeSpace" @click="dialogGeojsonFormVisible=true">
                                        合肥市地域划分
                                    </el-menu-item>
                                    <el-menu-item index="3-2" class="timeSpace" @click="dialogCityFormVisible=true">
                                        合肥市3D模型
                                    </el-menu-item>
                                    <el-menu-item index="3-2" class="timeSpace" @click="dialogSubStationFormVisible=true">
                                        地铁三号线站台
                                    </el-menu-item>
                                    
                                    
                                </template>
                            </el-menu-item-group>   
                        </el-submenu>

                        <el-submenu index="4">
                            <template slot="title">
                                <i class="el-icon-s-tools"></i>
                                <span>功能管理</span>
                            </template>
                            <!-- 二级菜单 -->
                            <el-menu-item-group>
                                <template slot="title">
                                    <el-menu-item index="4-1" class="functionsManagement" @click="dialogDrawFormVisible= true">绘制</el-menu-item>
                                    <el-menu-item index="4-2" class="functionsManagement" @click="dialogMeasureFormVisible= true" >量算</el-menu-item>
                                </template>
                            </el-menu-item-group>   
                        </el-submenu>

                        <el-menu-item index="5"  @click="dialogShowFormVisible= true">
                            <i class="el-icon-s-platform"></i>
                            <span slot="title">显示设置</span>
                        </el-menu-item> 

                        <el-menu-item index="6" @click="dialogMapFormVisible= true">
                            <i class="el-icon-picture-outline-round"></i>
                            <span slot="title">地图设置</span>
                        </el-menu-item>
                        <el-menu-item index="7" @click="dialogControlFormVisible= true">
                            <i class="el-icon-s-grid"></i>
                            <span slot="title">控制方式</span>
                        </el-menu-item>                     
                    </el-menu>
                        
                        <!-- 显示设置的dialog -->
                        <el-dialog title="显示选项" :visible.sync="dialogShowFormVisible" class="showSettingDialog">
                            <el-form :inline="true" label-width="100px">
                                <el-form-item label="动画部件">
                                    <el-switch v-model="animation"></el-switch>
                                </el-form-item>
                                <el-form-item label="时间轴部件">
                                    <el-switch v-model="timeline"></el-switch>
                                </el-form-item>
                                <el-form-item label="基础图层">
                                    <el-switch v-model="baseLayerPicker"></el-switch>
                                </el-form-item>
                                <el-form-item label="全屏显示按钮">
                                    <el-switch v-model="fullscreenButton"></el-switch>
                                </el-form-item>
                                <el-form-item label="信息提示框">
                                    <el-switch v-model="infoBox"></el-switch>
                                </el-form-item>
                                 <el-form-item label="2D-3D切换">
                                    <el-switch v-model=" sceneModePicker"></el-switch>
                                </el-form-item>
                                <el-form-item label="地下显示">
                                    <el-switch v-model="depthTestAgainstTerrain"></el-switch>
                                </el-form-item>
                            </el-form>
                        </el-dialog>

                        <!-- 地图设置的dialog -->
                        <el-dialog title="地图选项" :visible.sync="dialogMapFormVisible" class="MapSeetingDialog">
                            <el-form>
                                <el-form-item>
                                    <span class="demonstration">透明度</span>
                                    <el-slider v-model="alpha" :min="0" :max="1" :step="0.01"></el-slider>                           
                                </el-form-item>

                                <el-form-item>
                                    <span class="demonstration">亮度</span>
                                    <el-slider v-model="brightness" :min="0" :max="3" :step="0.01"></el-slider>                           
                                </el-form-item>

                                <el-form-item>
                                    <span class="demonstration">对比度</span>
                                    <el-slider v-model="contrast" :min="0" :max="3" :step="0.01"></el-slider>                           
                                </el-form-item>

                                <el-form-item>
                                    <el-button type="primary" @click="openTerrain">开启地形</el-button>
                                    <el-button type="primary" @click="closeTerrain">关闭地形</el-button>
                                </el-form-item>

                                <el-form-item>
                                    <el-button type="primary" @click="openPyramid">打开金字塔网格</el-button>
                                    <el-button type="primary" @click="closePyramid">关闭金字塔网格</el-button>
                                </el-form-item>
                               
                                <el-form-item>
                                    <el-button type="primary" @click="timeControl">时间重置</el-button>
                                    <el-button type="primary" @click="flyToAnHui">跳转目标点</el-button>
                                </el-form-item>

                                 <el-form-item>
                                    <span class="demonstration">切换地图服务</span>
                                    <el-select v-model="mapStyle" placeholder="请选择">
                                       <el-option v-for="item in options" :key="item.value" :value="item.value">{{item.label}}</el-option>
                                    </el-select>                     
                                </el-form-item>
                            </el-form>
                        </el-dialog>

                        <!-- 控制方式设置的dialog -->
                        <el-dialog title="控制方式" :visible.sync="dialogControlFormVisible" class="controlDialog">
                            <el-form>
                                <el-form-item>
                                    <el-button type="primary" @click="cameraControl">相机控制</el-button>
                                    <el-button type="primary" @click="keyboardControl">键盘控制</el-button>               
                                </el-form-item>      
                                <h3>
                                   <p> w/s向前移动/向后移动 </p>
                                   <p> a/d向左移动 </p>
                                   <p> q/e——向上/向下移动 </p>
                                   <p> 鼠标左键按下加鼠标移动改变视角方向 </p>                                                   
                                </h3>
                                                    
                            </el-form>
                        </el-dialog>

                        <!-- 三维场景的快速跳转的dialog -->
                        <el-dialog title="快速跳转" :visible.sync=" dialogFlyFormVisible"  class="threeDSceneFlytoDialog">
                            <el-form>
                                <el-form-item>
                                    <el-input placeholder="117.21785 31.74555 1000" v-model="location" clearable></el-input> 
                                </el-form-item>    
                                <el-form-item>
                                    <el-button type="primary" @click="submitFlyto">确认跳转</el-button>            
                                </el-form-item>                                  
                            </el-form>
                        </el-dialog>

                        <!-- 时空数据加载geojson的dialog -->
                        <el-dialog title="加载地域划分" :visible.sync="dialogGeojsonFormVisible" class="GeojsonDialog">
                            <el-form>     
                                <el-form-item>
                                    <el-button type="primary" @click="geojsonBtnClick1" class="GeojsonBtnClick">默认样式</el-button>                  
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="geojsonBtnClick2" class="GeojsonBtnClick">基础样式</el-button>                  
                                </el-form-item> 
                                <el-form-item>
                                    <el-button type="primary" @click="geojsonBtnClick3" class="GeojsonBtnClick">添加标签</el-button>                  
                                </el-form-item> 
                                <el-form-item>
                                    <el-button type="primary" @click="geojsonBtnClick4" class="GeojsonBtnClick">分色渲染</el-button>                  
                                </el-form-item> 
                                 <el-form-item>
                                    <el-button type="primary" @click="geojsonBtnClick5" class="GeojsonBtnClick">渐变样式</el-button>                  
                                </el-form-item> 
                                <el-form-item>
                                    <el-button type="primary" @click="geojsonBtnClick6" class="GeojsonBtnClick">高度可视化</el-button>                  
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="geojsonBtnClick7" class="GeojsonBtnClick">清除模型</el-button>                  
                                </el-form-item>        
                            </el-form>
                        </el-dialog>

                        <!-- 时空数据加载合肥建筑的dialog -->
                        <el-dialog title="加载合肥建筑" :visible.sync="dialogCityFormVisible" class="CityDialog">
                            <el-form>     
                                <el-form-item>
                                    <el-button type="primary" @click="cityBtnClick1" class="GeojsonBtnClick">白模样式</el-button>             
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="cityBtnClick2" class="GeojsonBtnClick">半透明度</el-button>                  
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="cityBtnClick3" class="GeojsonBtnClick">建筑高度</el-button>                  
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="cityBtnClick4" class="GeojsonBtnClick">清除模型</el-button>                  
                                </el-form-item>
                                
                            </el-form>
                        </el-dialog>

                         <!-- 时空数据加载地铁站台的dialog -->
                        <el-dialog title="加载地铁站台" :visible.sync="dialogSubStationFormVisible" class="StopDialog">
                            <el-form>     
                                <el-form-item>
                                    <el-button type="primary" @click="subStationBtnClick1" class="GeojsonBtnClick">显示站台</el-button>             
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="subStationBtnClick2" class="GeojsonBtnClick">清除模型</el-button>                  
                                </el-form-item>
                                
                            </el-form>
                        </el-dialog>


                         <!-- 量算的dialog -->
                        <el-dialog title="量算" :visible.sync="dialogMeasureFormVisible" class="MeasureDialog">
                            <el-form>     
                                <el-form-item>
                                    <el-button type="primary" @click="toggle1('measureDistance')" class="measureButton">{{ distanceMeasuring ? '停止' : '距离' }}</el-button>             
                                </el-form-item> 
                                 <el-form-item>
                                    <el-button type="primary" @click="toggle1('measureArea')" class="measureButton">{{ distanceMeasuring ? '停止' : '面积' }}</el-button>             
                                </el-form-item>     
                                 <el-form-item>
                                    <el-button type="primary" @click="toggle1('measureHeight')" class="measureButton">{{ distanceMeasuring ? '停止' : '高度' }}</el-button>             
                                </el-form-item>     
                                 <el-form-item>
                                    <el-button type="primary" @click="clampToGround1=!clampToGround1" class="measureButton">贴地</el-button>             
                                </el-form-item>     
                                 <el-form-item>
                                    <el-button type="primary" @click="clear1" class="measureButton">清除</el-button>             
                                </el-form-item>                                   
                            </el-form>
                        </el-dialog>

                        <!-- 绘制的dialog -->
                         <el-dialog title="绘制" :visible.sync="dialogDrawFormVisible" class="DrawDialog">
                            <el-form>     
                                <el-form-item>
                                    <el-button type="primary" @click="toggle('handlerPoint')" class="drawButton">{{ pointDrawing ? '停止' : '点' }}</el-button>             
                                </el-form-item> 
                                 <el-form-item>
                                    <el-button type="primary" @click="toggle('handlerLine')" class="drawButton">{{ polylineDrawing ? '停止' : '线' }}</el-button>             
                                </el-form-item>     
                                 <el-form-item>
                                    <el-button type="primary" @click="toggle('handlerPolygon')" class="drawButton">{{ polygonDrawing ? '停止' : '面' }}</el-button>             
                                </el-form-item>     
                                 <el-form-item>
                                    <el-button type="primary" @click="clampToGround=!clampToGround" class="drawButton">贴地</el-button>             
                                </el-form-item>     
                                 <el-form-item>
                                    <el-button type="primary" @click="clear" class="drawButton">清除</el-button>             
                                </el-form-item>                                   
                            </el-form>
                        </el-dialog>

                        
                        <!-- 导航的dialog -->
                         <el-dialog title="地下挖掘" :visible.sync="dialogExcavateFormVisible" class="excavateDialog">
                            <el-form>     
                                <el-form-item>
                                    <el-button type="primary" @click="DrawMiningArea" class="excavateButton">绘制挖掘区域</el-button>             
                                </el-form-item> 
                                <el-form-item>
                                    <el-button type="primary" @click="ClearMiningArea" class="excavateButton">清除挖掘区域</el-button>             
                                </el-form-item> 
                                <el-form-item>
                                    <el-button type="primary" @click="VisibleMiningArea" class="excavateButton">打开深度测试</el-button>             
                                </el-form-item> 
                                                                 
                            </el-form>
                        </el-dialog>








                </el-aside>
             
                <el-main>
                    <div class="viewer">
                        <vc-viewer :animation="animation" :baseLayerPicker="baseLayerPicker" :timeline="timeline" :fullscreenButton="fullscreenButton"
                                   :infoBox="infoBox" :homeButton="homeButton" :sceneModePicker="sceneModePicker" @ready="ready">
                            <vc-navigation></vc-navigation>
                            <vc-map-overview></vc-map-overview>
                            <vc-layer-imagery :alpha="alpha" :brightness="brightness" :contrast="contrast">             
                                <vc-provider-imagery-bingmaps :url="url" :bmKey="bmKey" :mapStyle="mapStyle"></vc-provider-imagery-bingmaps>
                            </vc-layer-imagery>
                            <!-- 地图网格线 -->
                            <!-- <vc-layer-imagery alpha="0.2">
                                <vc-provider-imagery-grid></vc-provider-imagery-grid>
                            </vc-layer-imagery> -->
                            <!-- 量算模块 -->
                            <vc-measure-distance
                                :clampToGround="clampToGround1"
                                ref="measureDistance"
                                @activeEvt="activeEvt1"
                                @measureEvt="measureEvt1"
                                @movingEvt="movingEvt1"
                            ></vc-measure-distance>
                            <vc-measure-area
                                ref="measureArea"
                                @activeEvt="activeEvt1"
                                @measureEvt="measureEvt1"
                                @movingEvt="movingEvt1"
                                :clampToGround="clampToGround1"
                            ></vc-measure-area>
                            <vc-measure-height
                                ref="measureHeight"
                                @activeEvt="activeEvt1"
                                @measureEvt="measureEvt1"
                                @movingEvt="movingEvt1"
                            ></vc-measure-height>

                            <!-- 绘制模块 -->
                            <vc-handler-draw-point
                                ref="handlerPoint"
                                @activeEvt="activeEvt"
                                @movingEvt="movingEvt"
                                @drawEvt="drawEvt"
                            ></vc-handler-draw-point>
                            <vc-handler-draw-polyline
                                :clampToGround="clampToGround"
                                ref="handlerLine"
                                @activeEvt="activeEvt"
                                @movingEvt="movingEvt"
                                @drawEvt="drawEvt"
                            ></vc-handler-draw-polyline>
                            <vc-handler-draw-polygon
                                :clampToGround="clampToGround"
                                ref="handlerPolygon"
                                @activeEvt="activeEvt"
                                @movingEvt="movingEvt"
                                @drawEvt="drawEvt"
                            ></vc-handler-draw-polygon>
                        </vc-viewer>                       
                     </div>
                </el-main>

            </el-container>

        </el-container>
        
</template>

<script>
import {mapState} from 'vuex'
import { loadTileset,attachTileset,attachTilesetX} from '../../static/model/地铁站模型3dtiles正常/bimangle-latest' //注意路径

export default {
    
    data() {
        return {
            //控制方式
            dialogControlFormVisible:false,
            //地图设置的参数
            dialogMapFormVisible:false,
            //显示设置的参数
            dialogShowFormVisible:false,
            //快速跳转设置的参数
            dialogFlyFormVisible:false,
            //添加Geojson的设置参数
            dialogGeojsonFormVisible:false,
            //添加合肥市的三维建筑
            dialogCityFormVisible:false,
            //地铁站台的显示
            dialogSubStationFormVisible:false,
            //量算的显示
            dialogMeasureFormVisible:false,
            //绘制的显示
            dialogDrawFormVisible:false,
            //地下挖掘的显示
            dialogExcavateFormVisible:false,
            //深度测试
           depthTestAgainstTerrain:true,
           //量算参数
           distanceMeasuring: false,
           //量算参数
           areaMeasuring: false,
           //量算参数
           heightMeasuring: false,
           //量算参数
           clampToGround1: false,
           //绘制参数
           pointDrawing: false,
           //绘制参数
           polylineDrawing: false,
           //绘制参数
           polygonDrawing: false,
           //绘制参数
           clampToGround: false,
      
            //菜单栏折叠
            isCollapse:false,
            //cesium显示选项
            animation: true,
            timeline: true,
            baseLayerPicker: true,
            fullscreenButton: true,
            infoBox: true,
            sceneModePicker:true,
            homeButton:true,
            location: '',
            //必应地图设置
            url: 'https://dev.virtualearth.net',
            bmKey: 'AgcbDCAOb9zMfquaT4Z-MdHX4AsHUNvs7xgdHefEA5myMHxZk87NTNgdLbG90IE-',
            mapStyle: 'Aerial',
            options: [{
                value: 'Aerial',
                label: 'Aerial'
            },{
                value: 'AerialWithLabels',
                label: 'AerialWithLabels'
            },{
                value: 'Road',
                label: 'Road'
            },{
                value: 'CanvasDark',
                label: 'CanvasDark'
            }],
            alpha: 1,
            brightness: 1,
            contrast: 1,
            terrainProvider: null
        }
    },

    computed: {
        ...mapState(['myMap']),
    },

    methods: {
        /**viewer 组件渲染完毕时触发，返回一个 Cesium 的核心类和 viewer 实例。该项目组件是异步加载，
        请不要尝试在组件的生命周期中访问 Cesium 核心类和 viewer 实例，如有需要，请在所需组件的 ready
        事件回调函数的参数中获取。*/
        ready(cesiumInstance){
            const{Cesium,viewer}=cesiumInstance;
            this.$store.state.myMap.viewer = viewer;
            this.$store.state.myMap.Cesium = Cesium;
            viewer.extend(Cesium.viewerCesiumInspectorMixin)
            var scene = viewer.scene
            scene.debugShowFramesPerSecond = true
            this.cesiumInstance = cesiumInstance
            viewer.scene.globe.depthTestAgainstTerrain = true
            viewer.camera.flyTo({
                destination : Cesium.Cartesian3.fromDegrees(117.22255, 31.74381, 1000),
                orientation: {
                heading : Cesium.Math.toRadians(360), // east, default value is 0.0 (north)
                pitch : Cesium.Math.toRadians(-90),    // default value (looking down)
                roll : 0.0,                         // default value
                duration:20//5秒到达战场
                }
            });
            const lat = 31.74381;
            const lon = 117.22255;
            Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(lon - 1, lat - 1, lon + 1, lat + 1);//Rectangle(west, south, east, north)
            
        },
        flyToAnHui(){
            var viewer = this.myMap.viewer;
            viewer.camera.flyTo({
                destination : Cesium.Cartesian3.fromDegrees(117.21455, 31.74381, 1000),
                orientation: {
                heading : Cesium.Math.toRadians(360), // east, default value is 0.0 (north)
                pitch : Cesium.Math.toRadians(-90),    // default value (looking down)
                roll : 0.0,                         // default value
                duration:20//5秒到达战场
                }
            });
        },

        //打开地形
        openTerrain(){
            var viewer = this.myMap.viewer;
            var Cesium = this.myMap.Cesium;
            viewer.camera.flyTo({
                destination : Cesium.Cartesian3.fromDegrees(75.68872, 35.57738, 8000),
                orientation: {
                heading : Cesium.Math.toRadians(360), // east, default value is 0.0 (north)
                pitch : Cesium.Math.toRadians(-30),    // default value (looking down)
                roll : 0.0,                         // default value
                duration:20//5秒到达战场
                }
            });
            var worldTerrain = Cesium.createWorldTerrain({
            requestWaterMask: true,
            requestVertexNormals: true
            });
            viewer.terrainProvider = worldTerrain;    
        },
        closeTerrain(){
            var viewer = this.myMap.viewer;
            var Cesium = this.myMap.Cesium;
            var ellipsoidTerrainProvider = new Cesium.EllipsoidTerrainProvider();
            viewer.scene.terrainProvider = ellipsoidTerrainProvider;
        },
        //鼠标控制 还未能完全实现取消？？？？？？？？？？？？
        cameraControl(){
            var viewer = this.myMap.viewer;
            var Cesium = this.myMap.Cesium;
            var scene = viewer.scene;
            // 取消默认事件
            scene.screenSpaceCameraController.enableRotate = true;
            scene.screenSpaceCameraController.enableTranslate = true;
            scene.screenSpaceCameraController.enableZoom = true;
            scene.screenSpaceCameraController.enableTilt = true;
            scene.screenSpaceCameraController.enableLook = true;   
        },

        //键盘控制
        keyboardControl(){

            var viewer = this.myMap.viewer;
            var Cesium = this.myMap.Cesium;

            var scene = viewer.scene;
            var canvas = viewer.canvas;
            canvas.setAttribute('tabindex', '0'); // needed to put focus on the canvas
            canvas.onclick = function () {
                canvas.focus();
            };
            var ellipsoid = scene.globe.ellipsoid;

            // 取消默认事件
            scene.screenSpaceCameraController.enableRotate = false;
            scene.screenSpaceCameraController.enableTranslate = false;
            scene.screenSpaceCameraController.enableZoom = false;
            scene.screenSpaceCameraController.enableTilt = false;
            scene.screenSpaceCameraController.enableLook = false;

            var startMousePosition;
            var mousePosition;
            var flags = {
                looking: false,
                moveForward: false,
                moveBackward: false,
                moveUp: false,
                moveDown: false,
                moveLeft: false,
                moveRight: false
            };

            var handler = new Cesium.ScreenSpaceEventHandler(canvas);

            handler.setInputAction(function (movement) {
                flags.looking = true;
                mousePosition = startMousePosition = Cesium.Cartesian3.clone(movement.position);
            }, Cesium.ScreenSpaceEventType.LEFT_DOWN);

            handler.setInputAction(function (movement) {
                mousePosition = movement.endPosition;
            }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

            handler.setInputAction(function (position) {
                flags.looking = false;
            }, Cesium.ScreenSpaceEventType.LEFT_UP);

            function getFlagForKeyCode(keyCode) {
                switch (keyCode) {
                    case 'W'.charCodeAt(0):
                        return 'moveForward';
                    case 'S'.charCodeAt(0):
                        return 'moveBackward';
                    case 'Q'.charCodeAt(0):
                        return 'moveUp';
                    case 'E'.charCodeAt(0):
                        return 'moveDown';
                    case 'D'.charCodeAt(0):
                        return 'moveRight';
                    case 'A'.charCodeAt(0):
                        return 'moveLeft';
                    default:
                        return undefined;
                }
            }

            document.addEventListener('keydown', function (e) {
                var flagName = getFlagForKeyCode(e.keyCode);
                if (typeof flagName !== 'undefined') {
                    flags[flagName] = true;
                }
            }, false);

            document.addEventListener('keyup', function (e) {
                var flagName = getFlagForKeyCode(e.keyCode);
                if (typeof flagName !== 'undefined') {
                    flags[flagName] = false;
                }
            }, false);


            viewer.clock.onTick.addEventListener(function (clock) {
                var camera = viewer.camera;

                if (flags.looking) {
                    var width = canvas.clientWidth;
                    var height = canvas.clientHeight;

                    // Coordinate (0.0, 0.0) will be where the mouse was clicked.
                    var x = (mousePosition.x - startMousePosition.x) / width;
                    var y = -(mousePosition.y - startMousePosition.y) / height;

                    var lookFactor = 0.05;
                    camera.lookRight(x * lookFactor);
                    camera.lookUp(y * lookFactor);
            }

                // Change movement speed based on the distance of the camera to the surface of the ellipsoid.
                var cameraHeight = ellipsoid.cartesianToCartographic(camera.position).height;
                var moveRate = cameraHeight / 100.0;

                if (flags.moveForward) {
                    camera.moveForward(moveRate);
                }
                if (flags.moveBackward) {
                    camera.moveBackward(moveRate);
                }
                if (flags.moveUp) {
                    camera.moveUp(moveRate);
                }
                if (flags.moveDown) {
                    camera.moveDown(moveRate);
                }
                if (flags.moveLeft) {
                    camera.moveLeft(moveRate);
                }
                if (flags.moveRight) {
                    camera.moveRight(moveRate);
                }
                });

        },
        timeControl(){
            var viewer = this.myMap.viewer;
            var Cesium = this.myMap.Cesium;

            var clock = new Cesium.Clock({

            startTime : Cesium.JulianDate.fromIso8601("2013-12-25"),
            currentTime : Cesium.JulianDate.fromIso8601("2013-12-25"),
            stopTime : Cesium.JulianDate.fromIso8601("2013-12-26"),
            // 时间循环
            clockRange : Cesium.ClockRange.LOOP_STOP, //当时间循环结束时候继续循环
            clockStep : Cesium.ClockStep.SYSTEM_CLOCK_MULTIPLIER,
            // 加速
            multiplier : 4000
            });

            var resetTime = Cesium.JulianDate.fromIso8601("2013-12-25");
            viewer.clockViewModel.currentTime = resetTime;
            viewer.timeline.updateFromClock();
            viewer.scene.globe.enableLighting = true;
        },
        openPyramid(){
            var viewer = this.myMap.viewer;
            var Cesium = this.myMap.Cesium;
            var imageryLayers = viewer.imageryLayers;
            this.imageryLayer = viewer.imageryLayers.addImageryProvider(new Cesium.TileCoordinatesImageryProvider()); 
        },
        closePyramid(){
            var viewer = this.myMap.viewer;
            viewer.imageryLayers.remove(this.imageryLayer)
        },

        loadUnderground3Dtiles(){
            var viewer = this.myMap.viewer;
            var Cesium = this.myMap.Cesium;
            

            const ALLOW_3D_TILES_INSPECTOR = false;
            const ALLOW_NODE_PROPS = true;

            viewer.scene.globe.depthTestAgainstTerrain = this.depthTestAgainstTerrain;
            //hide copyright info
            viewer._cesiumWidget._creditContainer.style.display = "none";
            //3D Tiles Inspector
            if (ALLOW_3D_TILES_INSPECTOR) {
                viewer.extend(Cesium.viewerCesium3DTilesInspectorMixin);
                var inspectorViewModel = viewer.cesium3DTilesInspector.viewModel;
            }

            //Load Model:
            var tileset = (function(viewer, zoomTo){
            var url = "../../static/model/地铁站模型3dtiles正常/tileset.json";
            var tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
                url: url,
                luminanceAtZenith: 0.2,
                lightColor: new Cesium.Cartesian3(0.3, 0.3, 0.3)
            }));

            if (ALLOW_NODE_PROPS) {
                //允许可选中构件
                attachTileset(viewer, tileset);
            } else {
                //模型融合为一体
                attachTilesetX(viewer, tileset, "Model", "Model description.");   
            }
		
            if(zoomTo){
                viewer.zoomTo(tileset, new Cesium.HeadingPitchRange(0, -0.5, 0));
            }

            return tileset;
        })(viewer, true);

        },

        loadGround3Dtiles(){
            var viewer = this.myMap.viewer;
            var Cesium = this.myMap.Cesium;
            

            const ALLOW_3D_TILES_INSPECTOR = false;
            const ALLOW_NODE_PROPS = true;

            viewer.scene.globe.depthTestAgainstTerrain = this.depthTestAgainstTerrain;
            //hide copyright info
            viewer._cesiumWidget._creditContainer.style.display = "none";
            //3D Tiles Inspector
            if (ALLOW_3D_TILES_INSPECTOR) {
                viewer.extend(Cesium.viewerCesium3DTilesInspectorMixin);
                var inspectorViewModel = viewer.cesium3DTilesInspector.viewModel;
            }

            //Load Model:
            var tileset = (function(viewer, zoomTo){
            var url = "../../static/model/地铁站模型3dtiles地面/tileset.json";
            var tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
                url: url,
                luminanceAtZenith: 0.2,
                lightColor: new Cesium.Cartesian3(0.3, 0.3, 0.3)
            }));

            if (ALLOW_NODE_PROPS) {
                //允许可选中构件
                attachTileset(viewer, tileset);
            } else {
                //模型融合为一体
                attachTilesetX(viewer, tileset, "Model", "Model description.");   
            }
		
            if(zoomTo){
                viewer.zoomTo(tileset, new Cesium.HeadingPitchRange(0, -0.5, 0));
            }

            return tileset;
        })(viewer, true);

        },

        submitFlyto(){
            let lat = 0;
                let lon = 0;
                let height = 0;

                var result = this.location.trim().split(/\s+/);
                if(result.length === 3){
                    lon = parseFloat(result[0]);
                    lat = parseFloat(result[1]);
                    height = parseFloat(result[2])
                }else if(result.length === 2){
                    lon = parseFloat(result[0]);
                    lat = parseFloat(result[1]);
                    height = 150000
                }else{
                    this.$Message.error("输入有误")
                }

                this.$store.state.myMap.viewer.camera.flyTo({
                    destination : Cesium.Cartesian3.fromDegrees(lon, lat, height)
                });

        },

        geojsonBtnClick1(){
            var viewer = this.myMap.viewer;
            var Cesium = this.myMap.Cesium;
            viewer.dataSources.add(Cesium.GeoJsonDataSource.load("../../static/model/合肥市.geojson"));
        },

        geojsonBtnClick2(){
            var viewer = this.myMap.viewer;
            var Cesium = this.myMap.Cesium;
            viewer.dataSources.removeAll();
            viewer.entities.removeAll();
            viewer.dataSources.add(Cesium.GeoJsonDataSource.load("../../static/model/合肥市.geojson",{
                stroke: Cesium.Color.WHITE,
                fill: Cesium.Color.RED.withAlpha(0.5),
                strokeWidth: 5
            }));
        },

        geojsonBtnClick3(){
            var viewer = this.myMap.viewer;
            var Cesium = this.myMap.Cesium;
            viewer.dataSources.removeAll();
            viewer.entities.removeAll();
            Cesium.GeoJsonDataSource.load("../../static/model/合肥市.geojson",{ 
              stroke: Cesium.Color.WHITE,
              fill: Cesium.Color.RED.withAlpha(0.5),
              strokeWidth: 5
            }).then(function (dataSource) {
                viewer.dataSources.add(dataSource);
                var entities = dataSource.entities.values;
                for (var i = 0; i < entities.length; i++) {
                    var entity = entities[i];
                    // 得到每块多边形的坐标集合
                    var polyPositions = entity.polygon.hierarchy.getValue(Cesium.JulianDate.now()).positions;
                    // 根据坐标集合构造BoundingSphere获取中心点坐标
                    var polyCenter = Cesium.BoundingSphere.fromPoints(polyPositions).center;
                    // 将中心点拉回到地球表面
                    polyCenter = Cesium.Ellipsoid.WGS84.scaleToGeodeticSurface(polyCenter);
                    viewer.entities.add({
                        position: polyCenter,
                            label: {
                                font: "24px sans-serif",
                                text: entity.properties.name,
                                showBackground: true,
                                scale: 0.6,
                                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM
                            }
                    });
                }
            });
        },

        geojsonBtnClick4(){
            var viewer = this.myMap.viewer;
            var Cesium = this.myMap.Cesium;
            viewer.dataSources.removeAll();
            viewer.entities.removeAll();
            Cesium.GeoJsonDataSource.load("../../static/model/合肥市.geojson").then(function (dataSource) {
                viewer.dataSources.add(dataSource);
                var entities = dataSource.entities.values;
                for (var i = 0; i < entities.length; i++) {
                    var entity = entities[i];
                    var color = Cesium.Color.fromRandom({alpha: 0.6});
                    entity.polygon.material = color;
                    entity.polygon.outline = false;
                    var polyPositions = entity.polygon.hierarchy.getValue(
                        Cesium.JulianDate.now()
                    ).positions;
                    var polyCenter = Cesium.BoundingSphere.fromPoints(polyPositions).center;
                    polyCenter = Cesium.Ellipsoid.WGS84.scaleToGeodeticSurface(polyCenter);
                    viewer.entities.add({
                        position: polyCenter,
                        label: {
                            font: "24px sans-serif",
                            text: entity.properties.name,
                            showBackground: true,
                            scale: 0.6,
                            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                            verticalOrigin: Cesium.VerticalOrigin.BOTTOM
                        }
                    });
                }
            });            
        },

        geojsonBtnClick5(){
            var viewer = this.myMap.viewer;
            var Cesium = this.myMap.Cesium;
            viewer.dataSources.removeAll();
            viewer.entities.removeAll();
            Cesium.GeoJsonDataSource.load("../../static/model/合肥市.geojson").then(function (dataSource) {
                viewer.dataSources.add(dataSource);
                var entities = dataSource.entities.values;
                for (var i = 0; i < entities.length; i++) {
                    var entity = entities[i];
                    var person = entity.properties.person;
                    var color = null;
                    if (person <= 700000) {
                        color = Cesium.Color.fromCssColorString("#fff2d3").withAlpha(0.6);
                    } else if (person <= 800000) {
                        color = Cesium.Color.fromCssColorString("#fed976").withAlpha(0.6);
                    } else if (person <= 900000) {
                        color = Cesium.Color.fromCssColorString("#feb337").withAlpha(0.6);
                    } else if (person <= 950000) {
                        color = Cesium.Color.fromCssColorString("#fe9914").withAlpha(0.6);
                    } else if (person <= 100000) {
                        color = Cesium.Color.fromCssColorString("#e56213").withAlpha(0.6);
                    } else {
                        color = Cesium.Color.fromCssColorString("#cb2f11").withAlpha(0.6);
                    }
                    entity.polygon.material = color;
                    entity.polygon.outline = true;
                    var polyPositions = entity.polygon.hierarchy.getValue(Cesium.JulianDate.now()).positions;
                    var polyCenter = Cesium.BoundingSphere.fromPoints(polyPositions).center;
                    polyCenter = Cesium.Ellipsoid.WGS84.scaleToGeodeticSurface(polyCenter);
                    viewer.entities.add({
                        position: polyCenter,
                        label: {
                            font: "24px sans-serif",
                            text: entity.properties.name + "人口（" + person + "）",
                            showBackground: true,
                            scale: 0.6,
                            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                            verticalOrigin: Cesium.VerticalOrigin.BOTTOM
                        }
                    });
                }
            });     
             
        },

        geojsonBtnClick6(){
            var viewer = this.myMap.viewer;
            var Cesium = this.myMap.Cesium;
            viewer.dataSources.removeAll();
            viewer.entities.removeAll();
            Cesium.GeoJsonDataSource.load("../../static/model/合肥市.geojson").then(function (dataSource) {
                viewer.dataSources.add(dataSource);
                var entities = dataSource.entities.values;
                for (var i = 0; i < entities.length; i++) {
                    var entity = entities[i];
                    var person = entity.properties.person;
                    var color = null;
                    if (person <= 700000) {
                        color = Cesium.Color.fromCssColorString("#fff2d3").withAlpha(0.6);
                    } else if (person <= 800000) {
                        color = Cesium.Color.fromCssColorString("#fed976").withAlpha(0.6);
                    } else if (person <= 900000) {
                        color = Cesium.Color.fromCssColorString("#feb337").withAlpha(0.6);
                    } else if (person <= 950000) {
                        color = Cesium.Color.fromCssColorString("#fe9914").withAlpha(0.6);
                    } else if (person <= 1000000) {
                        color = Cesium.Color.fromCssColorString("#e56213").withAlpha(0.6);
                    } else {
                        color = Cesium.Color.fromCssColorString("#cb2f11").withAlpha(0.6);
                    }
                    entity.polygon.material = color;
                    entity.polygon.outline = false;
                    entity.polygon.extrudedHeight = entity.properties.person/100;
                    var polyPositions = entity.polygon.hierarchy.getValue(Cesium.JulianDate.now()).positions;
                    var polyCenter = Cesium.BoundingSphere.fromPoints(polyPositions).center;
                    polyCenter = Cesium.Ellipsoid.WGS84.scaleToGeodeticSurface(polyCenter);
                    polyCenter = Cesium.Cartographic.fromCartesian(polyCenter);
                    polyCenter.height = entity.properties.person/100+ 20;
                    polyCenter = Cesium.Cartographic.toCartesian(polyCenter);
                    viewer.entities.add({
                        position: polyCenter,
                        label: {
                          font: "24px sans-serif",
                          text: entity.properties.name + " 人口（" + person + "）",
                          showBackground: true,
                          scale: 0.6,
                          horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                          verticalOrigin: Cesium.VerticalOrigin.BOTTOM
                        }
                    });
                }
            });          
        },

        geojsonBtnClick7(){
            var viewer = this.myMap.viewer;
            var Cesium = this.myMap.Cesium;
            viewer.dataSources.removeAll();
            viewer.entities.removeAll();   
            viewer.scene.primitives.removeAll();      
        },

        cityBtnClick1(){
            var viewer = this.myMap.viewer;
            var Cesium = this.myMap.Cesium;
            var tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
              url: "../../static/model/合肥tiles/tileset.json"
            }));
            var style = {};
            tileset.style = new Cesium.Cesium3DTileStyle(style);
        },

        cityBtnClick2(){
            var viewer = this.myMap.viewer;
            var Cesium = this.myMap.Cesium;
            viewer.dataSources.removeAll();
            viewer.entities.removeAll();
            viewer.scene.primitives.removeAll();
            var tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
              url: "../../static/model/合肥tiles/tileset.json"
            }));
            var style = {
                color: "rgba(0,0,255,0.2)"
            };
            tileset.style = new Cesium.Cesium3DTileStyle(style);
        },

        cityBtnClick3(){
            var viewer = this.myMap.viewer;
            var Cesium = this.myMap.Cesium;
            viewer.dataSources.removeAll();
            viewer.entities.removeAll();
            viewer.scene.primitives.removeAll();
            var tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
              url: "../../static/model/合肥tiles/tileset.json"
            }));
            var style = {
                color: {
                    conditions: [
                        ["${height} >= 90", "rgba(45, 0, 75, 0.7)"],
                        ["${height} >= 60", "rgba(102, 71, 151,0.7)"],
                        ["${height} >= 30", "rgba(170, 162, 204,0.7)"],
                        ["${height} >= 21", "rgba(224, 226, 238,0.7)"],
                        ["${height} >= 15", "rgba(252, 230, 200,0.7)"],
                        ["${height} >= 9", "rgba(248, 176, 87,0.7)"],
                        ["${height} >= 3", "rgba(198, 106, 11,0.7)"],
                        ["true", "rgba(127, 59, 8,0.5)"]
                    ]
                }
            };
            tileset.style = new Cesium.Cesium3DTileStyle(style);
        },

        cityBtnClick4(){
            var viewer = this.myMap.viewer;
            var Cesium = this.myMap.Cesium;
            viewer.dataSources.removeAll();
            viewer.entities.removeAll();
            viewer.scene.primitives.removeAll();
        },

        subStationBtnClick1(){
            var viewer = this.myMap.viewer;
            var Cesium = this.myMap.Cesium;
            var poiDataSource = {
            // 数据类别：{对应的加载地址，icon显示的图片，icon的大小(相对于原始图片大小)}
            "station": {url: "../../static/model/三号线站台新.geojson", pic: "../../static/model/station.png", size: 0.5},
            };
            for (let key in poiDataSource) {
                // 遍历每一种poi分类
                let data = poiDataSource[key];
                // 使用GeoJsonDataSource接口进行加载
                Cesium.GeoJsonDataSource.load(data.url).then((dataSource) => {
                // 获取dataSource并绑定到数据对象中,用于poi图层控制显示/隐藏用
                data.dataSource = dataSource;
                // 根据页面上的控制状态设置（这里默认都不显示）
                dataSource.show = true;
                // 加载数据源到viewer中
                viewer.dataSources.add(dataSource).then(() => {
                  var entities = dataSource.entities.values;
                  for (var i = 0; i < entities.length; i++) {
                    // 处理每个加载的entity,并设置billboard的image属性和scale属性
                    var entity = entities[i];
                    entity.billboard.image = data.pic;
                    entity.billboard.scale = data.size;
                  }
                });
              });
            } 
        },

        subStationBtnClick2(){
            var viewer = this.myMap.viewer;
            var Cesium = this.myMap.Cesium;
            viewer.dataSources.removeAll();
            viewer.entities.removeAll();
            viewer.scene.primitives.removeAll();


        },
        
        // 量算的方法
        toggle1(type) {
            this.$refs[type].measuring = !this.$refs[type].measuring
        },
        
        //量算清除的方法
        clear1() {
            this.$refs.measureDistance.clear()
            this.$refs.measureArea.clear()
            this.$refs.measureHeight.clear()
        },
        // 量算的方法
        activeEvt1(_) {
            this[_.type] = _.isActive
        },
        // 量算的方法
        measureEvt1(result) {
            console.log(result)
        },
        // 量算的方法
        movingEvt1(position) {
            console.log(position)
        },

        //绘制的方法
        toggle(type) {
        console.log(type)
        this.$refs[type].drawing = !this.$refs[type].drawing
        },
        //绘制的方法
        clear() {
            this.$refs.handlerPoint.clear()
            this.$refs.handlerLine.clear()
            this.$refs.handlerPolygon.clear()
        },
        //绘制的方法
        activeEvt(_) {
            this[_.type] = _.isActive
        },
        //绘制的方法
        movingEvt(windowPosition) {
            console.log(windowPosition)
        },
        //绘制的方法
        drawEvt(result) {
            console.log(result)
        },
        

        //设置挖掘区域
        DrawMiningArea(){
            var viewer = this.myMap.viewer;
            var Cesium = this.myMap.Cesium;
            var positions = [];
            var viewModel = {
                cullDept: 25
            };

            var screenSpaceEventHandler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);

            screenSpaceEventHandler.setInputAction(function(clickEvent) {
                var point = getLngLat(clickEvent.position);
                positions.push(point);
                addPoint(point);
                if (positions.length == 2) {
                    addLine(positions);
                } else if (positions.length == 3) {
                    addPolyGon(positions);
                }
            }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

            screenSpaceEventHandler.setInputAction(function(clickEvent) {
                screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
                screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
                cull(positions);
            }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);



            function addPoint(position) {
                viewer.entities.add({
                    position: position,
                    point: {
                        color: Cesium.Color.GREEN,
                        pixelSize: 10,
                        scaleByDistance: new Cesium.NearFarScalar(500, 1.0, 2000, 0.0),
                        translucencyByDistance: new Cesium.NearFarScalar(500, 1.0, 2000, 0.0)
                    }
                });
            };

            function addLine(positions) {

                var dynamicPositions = new Cesium.CallbackProperty(function() {
                    return positions;
                }, false);
                viewer.entities.add({
                    polyline: {
                        positions: dynamicPositions,
                        width: 4,
                        material: Cesium.Color.RED,
                        depthFailMaterial: Cesium.Color.RED
                    }
                });
            };

            function addPolyGon(positions) {
                var dynamicPositions = new Cesium.CallbackProperty(function() {
                    return new Cesium.PolygonHierarchy(positions);
                }, false);
                viewer.entities.add({
                    polygon: {
                        hierarchy: dynamicPositions,
                        material: Cesium.Color.RED.withAlpha(0.1),
                    }
                });
            };

            function getLngLat(position) {
                var cartesian = viewer.scene.globe.pick(viewer.camera.getPickRay(position), viewer.scene);
                var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
                var lat = Cesium.Math.toDegrees(cartographic.latitude);
                var lon = Cesium.Math.toDegrees(cartographic.longitude);
                return Cesium.Cartesian3.fromDegrees(lon, lat);
            }

            function cull() {
                if (positions.length < 3) {
                    window.alert("多边形至少需要3个点");
                    return false;
                }
                var points = [];
                Object.assign(points, positions);
                if (judgeClockWise(points)) {
                    points = points.reverse();
                }

                if (convex(points, points.length) != 1) {
                    window.alert("多边形需要绘制凸多边形");
                    return false;
                }

                var pointsLength = points.length;
                var clippingPlanes = [];
                for (var i = 0; i < pointsLength; ++i) {
                    var nextIndex = (i + 1) % pointsLength;
                    var midpoint = Cesium.Cartesian3.add(points[i], points[nextIndex], new Cesium.Cartesian3());
                    midpoint = Cesium.Cartesian3.multiplyByScalar(midpoint, 0.5, midpoint);
                    var up = Cesium.Cartesian3.normalize(midpoint, new Cesium.Cartesian3());
                    var right = Cesium.Cartesian3.subtract(points[nextIndex], midpoint, new Cesium.Cartesian3());
                    right = Cesium.Cartesian3.normalize(right, right);
                    var normal = Cesium.Cartesian3.cross(right, up, new Cesium.Cartesian3());
                    normal = Cesium.Cartesian3.normalize(normal, normal);
                    var originCenteredPlane = new Cesium.Plane(normal, 0.0);
                    var distance = Cesium.Plane.getPointDistance(originCenteredPlane, midpoint);
                    clippingPlanes.push(new Cesium.ClippingPlane(normal, distance));
                }
                viewer.scene.globe.clippingPlanes = new Cesium.ClippingPlaneCollection({
                    planes: clippingPlanes,
                    edgeWidth: 1.0,
                    edgeColor: Cesium.Color.WHITE
                });

                points.push(points[0]);

                var maximumHeights = [];
                for (var i = 0; i < points.length; i++) {
                    maximumHeights.push(0.01);
                }
                viewer.entities.add({
                    wall: {
                        positions: points,
                        material: new Cesium.ImageMaterialProperty({
                            image: "../../static/model/ce.jpg",
                            repeat: new Cesium.Cartesian2(points.length, 1.0)
                        }),
                        maximumHeights: maximumHeights,
                        minimumHeights: new Cesium.CallbackProperty(function() {
                            var minimumHeights = [];
                            for (var i = 0; i < points.length; i++) {
                                minimumHeights.push(-viewModel.cullDept);
                            }
                            return minimumHeights;
                        }, false),
                    }
                });

                viewer.entities.add({
                    polygon: {
                        hierarchy: new Cesium.PolygonHierarchy(points),
                        material: new Cesium.ImageMaterialProperty({
                            image: "../../static/model/di.jpg",
                            repeat: new Cesium.Cartesian2(points.length / 2, points.length / 2)
                        }),
                        closeTop: false,
                        height: new Cesium.CallbackProperty(function() {
                            return -viewModel.cullDept;
                        }, false)
                    }
                })
            }

            function judgeClockWise() {
                var pointsC = [];
                Object.assign(pointsC, positions);
                pointsC.push(pointsC[0]);
                var s = 0;
                for (var i = 0; i < pointsC.length - 1; i++) {
                    s += pointsC[i].x * pointsC[i + 1].y - pointsC[i + 1].x * pointsC[i].y;
                }
                return s < 0;
            }

            function convex(p, n) {
                var j, k, z;
                var flag = 0;
                if (n < 3) {
                    return 0;
                }
                for (var i = 0; i < n; i++) {
                    j = (i + 1) % n;
                    k = (i + 2) % n;
                    z = (p[j].x - p[i].x) * (p[k].y - p[j].y);
                    z -= (p[j].y - p[i].y) * (p[k].x - p[j].x);
                    if (z < 0) {
                        flag |= 1;
                    } else if (z > 0) {
                        flag |= 2;
                    }
                    if (flag == 3) {
                        return -1;
                    }
                }
                if (flag != 0) {
                    return 1;
                } else {
                    return 0;
                }
            }        
        },

        // 清除挖掘区域
        ClearMiningArea(){
            var viewer = this.myMap.viewer;
            var Cesium = this.myMap.Cesium;
            viewer.scene.globe.clippingPlanes = undefined;
            viewer.entities.removeAll();
        },

        // 打开深度测试
        VisibleMiningArea(){
            var viewer = this.myMap.viewer;
            var Cesium = this.myMap.Cesium;
            viewer.scene.globe.depthTestAgainstTerrain = !viewer.scene.globe.depthTestAgainstTerrain
        },

        subwayRoad(){
            var viewer = this.myMap.viewer;
            var Cesium = this.myMap.Cesium;
            var image = new Cesium.WebMapTileServiceImageryProvider({
                url: 'http://localhost:8089/geoserver/gwc/service/wmts/rest/zp:snahaoxianlu/{style}/{TileMatrixSet}/{TileMatrixSet}:{TileMatrix}/{TileRow}/{TileCol}?format=image/png',
                layer: 'zp:snahaoxianlu',
                style: '',
                format: 'image/png',
                tileMatrixSetID: 'EPSG:900913',
                maximumLevel: 20
            })
            viewer.imageryLayers.addImageryProvider(image); //加载geoserver 发布的wmts服务

        },

        showPeopleNumbers(){
            
            
        },
  
        //侧边栏收缩
        toggleCollapse(){
            this.isCollapse=!this.isCollapse
        },   
     

    },
    
}
</script>

<style lang="" scoped>
.home-container{
    height: 100%;
}

.el-header{
    background-color: #545c64;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #fff;
    font-size: 20px;
}

.el-header>div{
    display: flex;
    align-items: center;   
}

.el-header>div>span{
     margin-left: 12px;
}

.el-aside{
    background-color: #545c64;

}

.el-menu{
    border-right: none;
}

.el-main{
    padding: 0;
    background-color:#545c64;
}


.iconfont{
    margin-right: 20px;
}


.toggle-button{
    background-color: #4a5064;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
}

.viewer {
    width: 100%;
    height: 650px;
}


.el-dialog__wrapper{
    margin-top: -19px;
    margin-left: -690px;
    display: flex;
    height: 800px;
}

/* 三维场景下拉菜单字对齐 */
.threeDScene{
    margin-left:-26px;
}

/* 时空数据下拉菜单字对齐 */
.timeSpace{
    margin-left:-26px;
}

/* 功能管理下拉菜单字对齐 */
.functionsManagement{
     margin-left:-26px;
}
/* 专题信息下拉菜单字对齐 */
.thematicInformation{
   margin-left:-26px; 
}

/* 合肥市地域划分弹出框内部按钮 */
.GeojsonBtnClick{
margin-left:15px;
}

/* 合肥市地域划分弹出框 */
.GeojsonDialog{
    width: 350px;
    height: 690px;
    margin-left: 110px;
}

/* 快速跳转弹出框 */
.threeDSceneFlytoDialog{
    margin-left: 100px;
    width: 400px;
    height: 380px;
}

/* 控制方式的弹出框 */
.controlDialog{
    width: 550px;
    height: 480px;
    margin-left: 60px;

}

/* 地图设置的弹出框 */
.MapSeetingDialog{
    width: 700px;
    height: 820px;
    margin-left: 25px;
    margin-top: -30px;

}

/* 显示设置的弹出框 */
.showSettingDialog{
    margin-left: 100px;
    width: 400px;
    height: 680px;
}

/* 合肥市3d模型弹出框 */
.CityDialog{
    width: 350px;
    height: 500px;
    margin-left: 110px;
}

/* 地铁三号线站台弹出框 */
.StopDialog{
    width: 350px;
    height: 400px;
    margin-left: 110px;
}

/* 量算弹出框 */
.MeasureDialog{
    width: 350px;
    height: 570px;
    margin-left: 110px;
}

/* 量算弹出框的按钮 */
.measureButton{
    margin-left:26px;
}

/* 绘制弹出框 */
.DrawDialog{
     width: 350px;
    height: 570px;
    margin-left: 110px;
}

/* 绘制弹出框的按钮 */
.drawButton{
    margin-left:26px;
}

/* 地下挖掘弹出框 */
.excavateDialog{
     width: 350px;
    height: 450px;
    margin-left: 110px;
}

/* 地下挖掘弹出框的按钮 */
.excavateButton{
    margin-left:6px;
}





</style>