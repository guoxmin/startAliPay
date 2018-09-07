;
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS-like
        module.exports = factory();
    } else {
        root.startAliPay = factory();
    }
})(this, function() {
    var success = function() {};
    var fail = function() {};
    // 当本地app被唤起，则页面会隐藏掉，就会触发pagehide与visibilitychange事件
    // 在部分浏览器中可行，网上提供方案，作hack处理
    var visibilitychange = function() {
        var tag = document.hidden || document.webkitHidden;
        tag && clearTimeout(window.startAliPayTimer);
        success();
    };
    document.addEventListener('visibilitychange', visibilitychange, false);
    document.addEventListener('webkitvisibilitychange', visibilitychange, false);
    // pagehide 必须绑定到window
    window.addEventListener('pagehide', function() {
        clearTimeout(window.startAliPayTimer);
        success();
    }, false);

    function startAliPay(options) {
        var options = options || {};

        var url = options.url;

        if (!url) return;

        // 启动app的等待时间
        var timeout = options.timeout || 3000;

        success = options.success || function() {};
        fail = options.fail || function() {};


        window.startAliPayTimer = setTimeout(function() {
            if (document.hidden || document.webkitHidden) return;
            fail();
        }, timeout)


        window.location = url;

    }

    return startAliPay;
})