javascript:(
function(){

function t(e){
	var t='https://google.co.jp/maps/@';
	var n=e.split('; ');
	for(i=0;i<n.length;i++){
		if(n[i].match(/ingress\.intelmap\.(lat|lng)=(-?[0-9]+\.[0-9]+)/)){
			if(RegExp.$1=='lat'){
				var r = RegExp.$2;
			}else{
				var s = RegExp.$2;
			}
		}else if(n[i].match(/ingress\.intelmap\.zoom=([0-9]+)/)){
			var o = RegExp.$1;
		}
	}
	
	return t + r + ',' + s + ',' + o + 'z';
}

function n(e){
	var t = 'https://intel.ingress.com/?ll=';
	if(e.match(/@(-?[0-9]+\.[0-9]+),(-?[0-9]+\.[0-9]+),([0-9]+\.*[0-9]*)z/)){
		return t += RegExp.$1 + ',' + RegExp.$2 + '&z=' + Math.round(RegExp.$3);
	}
}

var e = document.location.href;
if(e.match(/google.*\/maps/)){
	location.href = n(e);
}else if(e.match('ingress.com/intel')){
	location.href = t(document.cookie);
}

}
)()
