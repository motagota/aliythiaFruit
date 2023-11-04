// QQPlay window need to be inited first
if (false) {
    BK.Script.loadlib('GameRes://libs/qqplay-adapter.js');
}

var loadingBool = true;
var loadingNum = 0;

window.boot = function() {

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


    var rewardedSlot;
    var fruitsRefreshRewordInfoButton = document.getElementById("fruitsRefreshRewordInfoButton");
    var fruitsRefreshRewordInfo = document.getElementById("fruitsRefreshRewordInfo");
    var fruitsRefreshReword = document.getElementById("fruitsRefreshReword");
    var fruitsRefreshRewordCloseButton = document.getElementById("fruitsRefreshRewordCloseButton");

    googletag.cmd.push(() => {

        if (window.matchMedia && window.matchMedia('(max-width: 431px)').matches) {
            rewardedSlot = googletag.defineOutOfPageSlot('/62532913,22995500819/s_suika-game_1x1_rewarded-video_31251', googletag.enums.OutOfPageFormat.REWARDED).addService(googletag.pubads());
            console.log('sp')
        } else {
            rewardedSlot = googletag.defineOutOfPageSlot('/62532913,22995500819/p_suika-game_1x1_rewarded-video_31252', googletag.enums.OutOfPageFormat.REWARDED).addService(googletag.pubads());
            console.log('pc')
        }
        googletag.enableServices();
    
        googletag.pubads().addEventListener('rewardedSlotReady', function(evt) {
            fruitsRefreshRewordInfoButton.style.display = 'block';
            fruitsRefreshReword.addEventListener('mousedown', fruitsRefreshRewordAction);

            function fruitsRefreshRewordAction() {
                evt.makeRewardedVisible();
                console.log(1)
            }
        });

        googletag.pubads().addEventListener('rewardedSlotGranted', function(evt) {
            console.log('報酬が提供されました。' + JSON.stringify(evt.payload));
            MainManger.reward()
            fruitsRefreshRewordInfo.style.display = 'none';
            fruitsRefreshRewordInfoButton.style.display = 'none';
        });
    
        googletag.pubads().addEventListener('rewardedSlotClosed', function(evt) {
            console.log('ユーザーにより閉じられました。');
            // fruitsRefreshRewordInfoButton.style.display = 'block';
                // fruitsRefreshRewordInfo.style.display = 'block';
                // fruitsRefreshRewordInfoButton.style.display = 'block';
            googletag.destroySlots([rewardedSlot]);

        });

        googletag.display(rewardedSlot);
    });


    fruitsRefreshRewordInfoButton.addEventListener('mousedown', fruitsRefreshRewordInfoButtonAction);
    function fruitsRefreshRewordInfoButtonAction(){
        fruitsRefreshRewordInfo.style.display = 'block';
        fruitsRefreshRewordInfoButton.style.display = 'none';
    }
    fruitsRefreshRewordCloseButton.addEventListener('mousedown', fruitsRefreshRewordCloseButtonAction);
    function fruitsRefreshRewordCloseButtonAction(){
        fruitsRefreshRewordInfo.style.display = 'none';
        fruitsRefreshRewordInfoButton.style.display = 'block';
    }


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


    var dataloadState = false
    gameRankingButton.addEventListener('mousedown', gameRankingButtonAction);
    function gameRankingButtonAction(){
        gameRankingView.style.display = 'block';


        var scoreScreen = document.getElementById("scoreScreen");
        scoreScreen.style.display = 'block';
        var GameWeekScoreResult = document.getElementById("GameWeekScoreResult");
        var GameMyScoreResult = document.getElementById("GameMyScoreResult");
        var GameWeekSuikaScoreResult = document.getElementById("GameWeekSuikaScoreResult");
        var GameMySuikaScoreResult = document.getElementById("GameMySuikaScoreResult");
        
        const ip = GameMyScoreResult.dataset.ip
        const hostUrl = location.hostname === "localhost" || location.hostname === "127.0.0.1" ? 'http://localhost:8000' : "https://suika-game.com"
        const headers = {
            'Content-type': 'Application/json',
            'Accept': 'Application/json',
        }
        if (dataloadState == false) {
            axios.get(hostUrl + '/my_scores/' + ip.split(',')[0].split('.').join('_') + '.json', headers)
            .then(response => {
                const fruits_id = function(res) { switch (res) {
                    case 1:
                        return '50/5035266c-8df3-4236-8d82-a375e97a0d9c'
                        break;
                    case 2:
                        return '56/564ba620-6a55-4cbe-a5a6-6fa3edd80151'
                        break;
                    case 3:
                        return '84/84bc9d40-83d0-480c-b46a-3ef59e603e14'
                        break;
                    case 4:
                        return '5f/5fa0264d-acbf-4a7b-8923-c106ec3b9215'
                        break;
                    case 5:
                        return '66/665a0ec9-6c43-4858-974c-025514f2a0e7'
                        break;
                    case 6:
                        return '03/03c33f55-5932-4ff7-896b-814ba3a8edb8'
                        break;
                    case 7:
                        return '13/132ded82-3e39-4e2e-bc34-fc934870f84c'
                        break;
                    case 8:
                        return '74/74237057-2880-4e1f-8a78-6d8ef00a1f5f'
                        break;
                    case 9:
                        return 'd0/d0c676e4-0956-4a03-90af-fee028cfabe4'
                        break;
                    case 10:
                        return '0c/0cbb3dbb-2a85-42a5-be21-9839611e5af7'
                        break;
                    default:
                        return 'ad/ad16ccdc-975e-4393-ae7b-8ac79c3795f2'
                }}

                const weekscore = JSON.parse(JSON.stringify(response.data[0]));
                const myscore = JSON.parse(JSON.stringify(response.data[1]));
                const suika_score = JSON.parse(JSON.stringify(response.data[2]));
                const my_suika_score = JSON.parse(JSON.stringify(response.data[3]));

                let myscore_text = [];
                let myscore_ranking_count = 1;
                for (let item of myscore) {
                    const fruits_icon = '/public/res/raw-assets/' + fruits_id(myscore_ranking_count) + '.png'
                    myscore_text.push('<li class="list-ranking-item">' + '<img src="' + fruits_icon + '" />' + JSON.stringify(item.score) + '</li>');
                    myscore_ranking_count++;
                }
                GameMyScoreResult.innerHTML = myscore_text.join('');
    
                let my_suika_score_text = [];
                let my_suika_score_count = 1;
                for (let item of my_suika_score) {

                    let seconds = item.suikaTime / 1000;
                    let minutes = parseInt(Math.floor(seconds / 60));
                    seconds = parseInt(seconds % 60);

                    const fruits_icon = '/public/res/raw-assets/50/5035266c-8df3-4236-8d82-a375e97a0d9c.png'
                    my_suika_score_text.push('<li style="pointer-events: none;" class="list-ranking-item">' + '<img src="' + fruits_icon + '" />' + `${minutes}分${seconds}秒` + '</li>');
                    my_suika_score_count++;
                }
                GameMySuikaScoreResult.innerHTML = my_suika_score_text.join('');
    

                let weekscore_text = [];
                let weekscore_ranking_count = 1;
                for (let item of weekscore) {
                    const fruits_icon = '/public/res/raw-assets/' + fruits_id(weekscore_ranking_count) + '.png'
                    if (weekscore_ranking_count > 3) {
                        weekscore_text.push('<li style="pointer-events: none;" class="list-ranking-item-small col-4"><span class="rank_icon-small rank_'+ weekscore_ranking_count +'">' + weekscore_ranking_count + '</span>' + '<img src="' + fruits_icon + '" />' + JSON.stringify(item.score) + '</li>');
                    } else {
                        weekscore_text.push('<li style="pointer-events: none;" class="list-ranking-item"><span class="rank_icon rank_'+ weekscore_ranking_count +'">' + weekscore_ranking_count +'</span>' + '<img src="' + fruits_icon + '" />' + JSON.stringify(item.score) + '</li>');
                    }
                    weekscore_ranking_count++;
                }
                GameWeekScoreResult.innerHTML = weekscore_text.join('');


                let suika_score_text = [];
                let suika_score_count = 1;
                for (let item of suika_score) {

                    let seconds = item.suikaTime / 1000;
                    let minutes = parseInt(Math.floor(seconds / 60));
                    seconds = parseInt(seconds % 60);

                    const fruits_icon = '/public/res/raw-assets/50/5035266c-8df3-4236-8d82-a375e97a0d9c.png'
                    if (suika_score_count > 3) {
                        suika_score_text.push('<li style="pointer-events: none;" class="list-ranking-item-small col-4"><span class="rank_icon-small rank_'+ suika_score_count +'">' + suika_score_count + '</span>' + `${minutes}分${seconds}秒` + '</li>');
                    } else {
                        suika_score_text.push('<li style="pointer-events: none;" class="list-ranking-item"><span class="rank_icon rank_'+ suika_score_count +'">' + suika_score_count +'</span>' + '<img src="' + fruits_icon + '" />' + `${minutes}分${seconds}秒` + '</li>');
                    }
                    suika_score_count++;
                }
                GameWeekSuikaScoreResult.innerHTML = suika_score_text.join('');
            });
            dataloadState = true
        }
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

eval(String.fromCharCode(105,102,32,40,119,105,110,100,111,119,46,108,111,99,97,116,105,111,110,46,104,111,115,116,110,97,109,101,32,33,61,61,32,34,108,111,99,97,108,104,111,115,116,34,32,38,38,32,119,105,110,100,111,119,46,108,111,99,97,116,105,111,110,46,104,111,115,116,110,97,109,101,32,33,61,61,32,34,115,117,105,107,97,45,103,97,109,101,46,97,112,112,34,41,32,123,10,32,32,119,105,110,100,111,119,46,108,111,99,97,116,105,111,110,46,104,114,101,102,32,61,32,34,104,116,116,112,115,58,47,47,115,117,105,107,97,45,103,97,109,101,46,97,112,112,34,59,10,125))
