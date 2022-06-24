function autoCorrect(word){
	var word = word.toLowerCase();
	var word = word.replace(/gʻ|gʼ|g’|g'|g`|g‘/g,"ğ");
	var word = word.replace(/oʻ|oʼ|o’|o'|o`|o‘/g,"ŏ");
	var word = word.replace(/sh/g,"š");
	var word = word.replace(/ch/g,"č");
	var word = word.replace(/ng/g,"ñ");
	var word = word.replace(/ʻʼ'|`|‘|'/g,"’");
	return word;
};

function inverseCorrect(word){
	var word = word.replace(/ğ/g,"g‘");
	var word = word.replace(/ŏ/g,"o‘");
	var word = word.replace(/š/g,"sh");
	var word = word.replace(/č/g,"ch");
	var word = word.replace(/ñ/g,"ng");
	return word;
};

function createMap(word){
	var word = word.replace(/[aoueiŏ]/g,"V");//unli tovushlarni belgilab olamiz
	var word = word.replace(/[bdfghjklmnpqrstvxyzğščñ]/g,"C");//undosh tovushlarni belgilab olamiz
	var parts = word.split("’");
	var map = [];
	
	parts.forEach(function(v,k){
		var rem = v;
		if (k != 0){
			map.push("D");
		}
		
		l = v.length;
		for (i=0;i<l;i++){
			if (rem.length > 0) {

				if (rem[0] == "V" && rem[1] != "C"){
					map.push(1);
					rem = rem.slice(1);
				} else if (rem[0] == "V" && rem[1] == "C" && rem[2] == "V"){
					map.push(1);
					rem = rem.slice(1);
				} else if (rem[0] == "V" && rem[1] == "C" && rem[2] != "V" && rem[3] != "C"){
					map.push(2);
					rem = rem.slice(2);
				} else if (rem[0] == "V" && rem[1] == "C" && rem[2] == "C" && rem[3] != "V"){
					map.push(3);
					rem = rem.slice(3);
				} else if (rem[0] == "C" && rem[1] == "V" && rem[2] != "C"){
					map.push(2);
					rem = rem.slice(2);
				} else if (rem[0] == "C" && rem[1] == "V" && rem[2] == "C" && rem[3] == "V"){
					map.push(2);
					rem = rem.slice(2);
				} else if (rem[0] == "C" && rem[1] == "V" && rem[2] == "C" && rem[3] == "C" && rem[4] == "V" || rem[0] == "C" && rem[1] == "V" && rem[2] == "C" && rem[3] != "C" && rem[4] != "V"){
					map.push(3);
					rem = rem.slice(3);
				} else if (rem[0] == "C" && rem[1] == "V" && rem[2] == "C" && rem[3] == "C" && rem[4] == "C"){
					map.push(3);
					rem = rem.slice(3);
				} else if (rem[0] == "C" && rem[1] == "V" && rem[2] == "C" && rem[3] == "C" && rem[4] != "V"){
					map.push(4);
					rem = rem.slice(4);
				} else if (rem[0] == "C" && rem[1] == "C" && rem[2] == "V" && rem[3] != "C"){
					map.push(3);
					rem = rem.slice(3);
				} else if(rem[0] == "C" && rem[1] == "C" && rem[2] == "V" && rem[3] == "C" && rem[4] == "V"){
					map.push(3);
					rem = rem.slice(3);
				} else if ( rem[0] == "C" && rem[1] == "C" && rem[2] == "V" && rem[3] == "C" && rem[4] == "C"){
					map.push(5);
					rem = rem.slice(5);
				} else if (rem[0] == "C" && rem[1] == "C" && rem[2] == "V" && rem[3] == "C" && rem[4] != "V" && rem[5] != "C"){
					map.push(4);
					rem = rem.slice(4);
				} else if (rem[0] == "C" && rem[1] == "C" && rem[2] == "V" && rem[3] == "C" && rem[4] == "C" && rem[5] != "V"){
					map.push(5);
					rem = rem.slice(5);
				}
			} else {
				break;
			}
		}
	});
	
	return map;
}

function ajratish(field, text) {
	var rgx = /^[abdefghijklmnopqrstuvxyzŏğščñ’]+$/;
	var text = autoCorrect(text).trim();
	var map = createMap(text);
	var rem = text;
	
	var x = "";
	
 	map.forEach(function(v,k){
		if (v == "D") {
			x += "’";
			rem = rem.slice(1);
		} else {
			var sl = rem.slice(0,v);
			rem = rem.slice(v);
			if (k == 0) {
				x += sl;
			} else {
				x += "-"+sl;
			}
		}
	});
	
	if (!rgx.test(text)) {
		x = "Kiritilgan so'z noto'g'ri yoki so'z kiritilmagan.";
	}
	
	x = inverseCorrect(x);
	
	field.value = x;


}

