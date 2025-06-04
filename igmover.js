javascript:(function(){
    // Google Maps → Ingress Intel Map
    function toIntel() {
        // 緯度・経度・ズーム(メートル単位もしくは z 単位)を抽出
        var m = location.href.match(/@(-?\d+\.?\d*),(-?\d+\.?\d*),(?:(\d+\.?\d*)z|(\d+)m)/);
        if (m) {
            var lat = m[1];
            var lng = m[2];
            // m[3] にズーム値(z 単位)が入る場合は丸め、なければメートル表記なのでデフォルト 16 とする
            var zoom = m[3] ? Math.round(parseFloat(m[3])) : 16;
            location.href = 'https://intel.ingress.com/?ll=' + lat + ',' + lng + '&z=' + zoom;
        } else {
            alert('緯度・経度をURLから抽出できませんでした。GPS対応の形式(@lat,lng,zoomz もしくは @lat,lng,metersm)で開いてください。');
        }
    }

    // Ingress Intel Map → Google Maps
    function toGoogle() {
        var lat, lng, zoom;
        document.cookie.split('; ').forEach(function(c) {
            // ingress.intelmap.lat または ingress.intelmap.lng を抽出
            var p = c.match(/ingress\.intelmap\.(lat|lng)=(-?\d+\.\d+)/);
            if (p) {
                if (p[1] === 'lat') lat = p[2];
                else if (p[1] === 'lng') lng = p[2];
            }
            // ingress.intelmap.zoom を抽出
            var z = c.match(/ingress\.intelmap\.zoom=(\d+)/);
            if (z) zoom = z[1];
        });
        if (lat && lng && zoom) {
            location.href = 'https://www.google.co.jp/maps/@' + lat + ',' + lng + ',' + zoom + 'z';
        } else {
            alert('Cookie から Ingress Intel Map の位置情報を取得できませんでした。');
        }
    }

    var h = location.href;
    if (/google\.[^\/]+\/maps/.test(h)) {
        toIntel();
    } else if (/intel\.ingress\.com/.test(h)) {
        toGoogle();
    } else {
        alert('Google Maps または Ingress Intel Map で実行してください。');
    }
})();
