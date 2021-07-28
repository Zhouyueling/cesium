function SetView(viewer) {
    viewer.camera.setView({
        destination: new Cesium.Cartesian3(-548184.7982559408, 5512367.059463563, 3173625.2210259973),
        orientation: {
            heading: 5.683499859605618,
            pitch: -0.3430291183891061,
            roll: 6.281444671468591
        }
    });

}


export {
    SetView
}