
var loadingBool = true;
var loadingNum = 0;

window.boot = function() {
    debugger;
    var settings = window._CCSettings;
    window._CCSettings = undefined;

    if (!settings.debug) {
        var uuids = settings.uuids;

        var rawAssets = settings.rawAssets;
        var assetTypes = settings.assetTypes;
        var realRawAssets = settings.rawAssets = {};
        for (var mount in rawAssets) {
            var entries = rawAssets[mount];
            var realEntries = realRawAssets[mount] = {};
            for (var id in entries) {
                var entry = entries[id];
                var type = entry[1];
                // retrieve minified raw asset
                if (typeof type === 'number') {
                    entry[1] = assetTypes[type];
                }
                // retrieve uuid
                realEntries[uuids[id] || id] = entry;
            }
        }

        var scenes = settings.scenes;
        for (var i = 0; i < scenes.length; ++i) {
            var scene = scenes[i];
            if (typeof scene.uuid === 'number') {
                scene.uuid = uuids[scene.uuid];
            }
        }

        var packedAssets = settings.packedAssets;
        for (var packId in packedAssets) {
            var packedIds = packedAssets[packId];
            for (var j = 0; j < packedIds.length; ++j) {
                if (typeof packedIds[j] === 'number') {
                    packedIds[j] = uuids[packedIds[j]];
                }
            }
        }

        var subpackages = settings.subpackages;
        for (var subId in subpackages) {
            var uuidArray = subpackages[subId].uuids;
            if (uuidArray) {
                for (var k = 0, l = uuidArray.length; k < l; k++) {
                    if (typeof uuidArray[k] === 'number') {
                        uuidArray[k] = uuids[uuidArray[k]];
                    }
                }
            }
        }
    }

    function setLoadingDisplay() {
        // Loading splash scene
        var splash = document.getElementById('splash');
        // var progressBar = splash.querySelector('.progress-bar span');



        cc.loader.onProgress = function(completedCount, totalCount, item) {

            loadData.completedCount = completedCount;
            loadData.totalCount = totalCount;

            if (loadingBool) {
                var loadintT = document.getElementById("loadingText")
            }
            var percent = 100 * completedCount / totalCount;
            if (loadingBool && loadingNum >= 1 && totalCount > 1) {
                if (percent.toFixed(0) >= 100) {
                    loadintT.innerHTML = '100' + '%';
                    setTimeout(function() {
                        loadingBool = false;
                        loadintT.remove();
                    }, 0.1 * 1000);
                    clearInterval(timer);
                }
            }
            loadingNum++;
            // if(loadingBool){
            // 	var loadintT = document.getElementById("loadingText")
            // }
            // var percent = 100 * completedCount / totalCount;
            // if(loadingBool && loadingNum >= 1){
            // 	   console.log("dskpi",loadingNum);
            // 	   loadintT.innerHTML = 'loading......' + parseInt(percent)  + '%';
            // 	   if(percent.toFixed(0) >= 100){

            // 		   loadingBool = false;
            // 		   loadintT.remove();
            // 	   }
            // }
            // loadingNum ++;

            // var percent = 100 * completedCount / totalCount;
            // if (progressBar) {
            // progressBar.style.width = percent.toFixed(2) + '%';
            // }


        };
        splash.style.display = 'block';
        // progressBar.style.width = '0%';

        cc.director.once(cc.Director.EVENT_AFTER_SCENE_LAUNCH, function() {
            splash.style.display = 'none';
        });
    }

    var onStart = function() {

        cc.loader.downloader._subpackages = settings.subpackages;

        cc.view.enableRetina(true);
        cc.view.resizeWithBrowserSize(true);

        if (!false && !false) {

            if (cc.sys.isBrowser) {
                setLoadingDisplay();
            }

            if (cc.sys.isMobile) {
                if (settings.orientation === 'landscape') {
                    cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
                } else if (settings.orientation === 'portrait') {
                    cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT);
                }
                // cc.view.enableAutoFullScreen([
                //     cc.sys.BROWSER_TYPE_BAIDU,
                //     cc.sys.BROWSER_TYPE_WECHAT,
                //     cc.sys.BROWSER_TYPE_MOBILE_QQ,
                //     cc.sys.BROWSER_TYPE_MIUI,
                // ].indexOf(cc.sys.browserType) < 0);
                cc.view.enableAutoFullScreen(false);
            }

            // Limit downloading max concurrent task to 2,
            // more tasks simultaneously may cause performance draw back on some android system / browsers.
            // You can adjust the number based on your own test result, you have to set it before any loading process to take effect.
            if (cc.sys.isBrowser && cc.sys.os === cc.sys.OS_ANDROID) {
                cc.macro.DOWNLOAD_MAX_CONCURRENT = 2;
            }
        }

        // function loadScene(launchScene) {
        // cc.director.loadScene(launchScene, null,
        // function () {
        // if (cc.sys.isBrowser) {
        // // show canvas
        // var canvas = document.getElementById('GameCanvas');
        // canvas.style.visibility = '';
        // var div = document.getElementById('GameDiv');
        // if (div) {
        // div.style.backgroundImage = '';
        // }
        // }
        // cc.loader.onProgress = null;
        // console.log('Success to load scene: ' + launchScene);
        // }
        // );

        // }

        var launchScene = settings.launchScene;

        // load scene
        // loadScene(launchScene);

        var canvas;

        if (cc.sys.isBrowser) {
            canvas = document.getElementById('GameCanvas');
        }
        var launchScene = settings.launchScene;
        
        // console.log("landscape,", launchScene);
        var MainManger = __require("MainManage");
        var o = MainManger.init(launchScene, cc.sys.isBrowser, canvas.style.visibility);
        
        var scoreScreen = document.getElementById("scoreScreen");
        var scoreCloseButton = document.getElementById("scoreCloseButton");

        scoreCloseButton.addEventListener('mousedown', scoreScreenCloseAction);
        function scoreScreenCloseAction(){
            scoreScreen.style.display = 'none';
        }
        
        var restartButton = document.getElementById("restartButton");
        restartButton.addEventListener('mousedown', restartButtonAction);
        function restartButtonAction(){
            location.reload();
        }


        var tinderContainer = document.querySelector('.tinder');
        var allCards = document.querySelectorAll('.tinder--card');

        function initCards(card, index) {
        var newCards = document.querySelectorAll('.tinder--card:not(.removed)');

        newCards.forEach(function (card, index) {
            card.style.zIndex = allCards.length - index;
            card.style.transform = 'scale(' + (20 - index) / 20 + ') translateY(-' + 30 * index + 'px)';
            card.style.opacity = (10 - index) / 10;
        });
        
        tinderContainer.classList.add('loaded');
        }

initCards();

allCards.forEach(function (el) {
  var hammertime = new Hammer(el);

  hammertime.on('pan', function (event) {
    el.classList.add('moving');
  });

  hammertime.on('pan', function (event) {
    if (event.deltaX === 0) return;
    if (event.center.x === 0 && event.center.y === 0) return;
    var xMulti = event.deltaX * 0.03;
    var yMulti = event.deltaY / 80;
    var rotate = xMulti * yMulti;
    console.log(111)
    event.target.style.transform = 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)';
  });

  hammertime.on('panend', function (event) {
    el.classList.remove('moving');
    var moveOutWidth = document.body.clientWidth;
    var keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;

    event.target.classList.toggle('removed', !keep);
    scoreScreen.style.display = 'none';
    event.target.style.transform = '';
  });
});


    try{
    // var spinner = document.getElementById("spinner");

    var gameRuleButton = document.getElementById("gameRuleButton");
    var gameRuleView = document.getElementById("gameRuleModal");
    var ruleCloseButton = document.getElementById("ruleCloseButton");

    var gameRankingButton = document.getElementById("gameRankingButton");
    var gameRankingView = document.getElementById("scoreScreen");

    gameRuleButton.addEventListener('mousedown', gameRuleButtonAction);
    function gameRuleButtonAction(){
        gameRuleView.style.display = 'block';
    }
    ruleCloseButton.addEventListener('mousedown', ruleCloseButtonAction);
    function ruleCloseButtonAction(){
        gameRuleView.style.display = 'none';
    }


   
   
}catch(e){
}

var canvasDiv = document.getElementById("canvasDiv");
        // cc.find("Canvas").getComponent("MainGameJS").sceneScore.node.y = -30
        // setTimeout(function() {
        //     cc.find("Canvas").getComponent("MainGameJS").gameEnd1()
        // }, 2000);
        //    MainManger.GAME_OVER_BOOL = 1
    //    console.log(1111)
    //     o.GAME_OVER_BOOL = !1, a.gameOverShowText(o.gameScore, 1), this.node.runAction(cc.sequence(cc.delayTime(.5), cc.callFunc(this.gameEnd1.bind(this))))
 





    };

    // jsList
    var jsList = settings.jsList;

    if (false) {
        BK.Script.loadlib();
    } else {
        var bundledScript = settings.debug ? 'src/project.dev.js' : '/public/src/project.js';
        if (jsList) {
            jsList = jsList.map(function(x) {
                return 'src/' + x;
            });
            jsList.push(bundledScript);
        } else {
            jsList = [bundledScript];
        }
    }

    var option = {
        id: 'GameCanvas',
        scenes: settings.scenes,
        showFPS: !false && settings.debug,
        frameRate: 60,
        jsList: jsList,
        groupList: settings.groupList,
        collisionMatrix: settings.collisionMatrix,
    }

    // init assets
    cc.AssetLibrary.init({
        libraryPath: '/public/res/import',
        rawAssetsBase: '/public/res/raw-',
        rawAssets: settings.rawAssets,
        packedAssets: settings.packedAssets,
        md5AssetsMap: settings.md5AssetsMap,
        subpackages: settings.subpackages
    });

    cc.game.run(option, onStart);
};

// main.js is qqplay and jsb platform entry file, so we must leave platform init code here
if (false) {
    BK.Script.loadlib('GameRes://src/settings.js');
    BK.Script.loadlib();
    BK.Script.loadlib('GameRes://libs/qqplay-downloader.js');

    var ORIENTATIONS = {
        'portrait': 1,
        'landscape left': 2,
        'landscape right': 3
    };
    BK.Director.screenMode = ORIENTATIONS[window._CCSettings.orientation];
    initAdapter();
    cc.game.once(cc.game.EVENT_ENGINE_INITED, function() {
        initRendererAdapter();
    });

    qqPlayDownloader.REMOTE_SERVER_ROOT = "";
    var prevPipe = cc.loader.md5Pipe || cc.loader.assetLoader;
    cc.loader.insertPipeAfter(prevPipe, qqPlayDownloader);

    window.boot();
} else if (window.jsb) {

    var isRuntime = (typeof loadRuntime === 'function');
    if (isRuntime) {
        require('src/settings.js');
        require('src/cocos2d-runtime.js');
        require('jsb-adapter/engine/index.js');
    } else {
        require('src/settings.js');
        require('src/cocos2d-jsb.js');
        require('jsb-adapter/jsb-engine.js');
    }

    cc.macro.CLEANUP_IMAGE_CACHE = true;
    window.boot();
}


