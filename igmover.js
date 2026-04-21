javascript:(function(){
    function meterToZoom(m){
        var z = Math.log2(156543.03392 / m) + 8;
        return Math.max(0, Math.min(21, Math.round(z)));
    }

    function toIntel() {
        var m = location.href.match(/@(-?\d+\.?\d*),(-?\d+\.?\d*),(?:(\d+\.?\d*)z|(\d+)m)/);
        if (m) {
            var lat = m[1];
            var lng = m[2];

            var zoom;
            if (m[3]) {
                zoom = Math.round(parseFloat(m[3]));
            } else if (m[4]) {
                zoom = meterToZoom(parseFloat(m[4]));
            }

            location.href = 'https://intel.ingress.com/?ll=' + lat + ',' + lng + '&z=' + zoom;
        } else {
            alert('位置情報を抽出できませんでした');
        }
    }

    function toGoogle() {
        var lat, lng, zoom;
        document.cookie.split('; ').forEach(function(c) {
            var p = c.match(/ingress\.intelmap\.(lat|lng)=(-?\d+\.\d+)/);
            if (p) {
                if (p[1] === 'lat') lat = p[2];
                else if (p[1] === 'lng') lng = p[2];
            }
            var z = c.match(/ingress\.intelmap\.zoom=(\d+)/);
            if (z) zoom = z[1];
        });

        if (lat && lng && zoom) {
            location.href = 'https://www.google.co.jp/maps/@' + lat + ',' + lng + ',' + zoom + 'z';
        } else {
            alert('Intel Mapの位置取得に失敗');
        }
    }

    var h = location.href;
    if (/google\.[^\/]+\/maps/.test(h)) {
        toIntel();
    } else if (/intel\.ingress\.com/.test(h)) {
        toGoogle();
    } else {
        alert('対象外ページ');
    }
})();
