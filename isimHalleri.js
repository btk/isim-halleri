function hal(isim, hal) {
	let iyelik = 'iyelik',
		yalinHali = "",
		iHali = 'i',
		eHali = 'e',
		deHali = 'de',
		denHali = 'den',
		iEkleri = 'ııiiuuüü',
		sonHarf = isim[isim.length - 1],
		istisna = ~~/[ei][^ıüoö]*[au]l$|alp$/.test(isim) * 2, // Sapkali harf istisnasi var mı kontrol eder Orn: Alp, Resul, Cemal... 0 veya 2 degeri doner
		sonSesli = isim.match(/[aıeiouöü]/g).pop(), // seslilerden sonuncusunu alır

		// Ek in sesli harfine karar verir
		ek = (hal == iyelik || hal == iHali) ? // iyelik veya i hali ise
		// Son sesli harf aıeiouöü harflerinin hangisine denk geliyorsa o index numarasıyla iEkleri nin n'inci elemanı seçilir
		iEkleri['aıeiouöü'.indexOf(sonSesli) + istisna] : // e, de veya den hali ise
		// Son sesli harf a, ı, o veya u ise ek a (istisna var ise e ), e, i, ö veya ü ise ek e harfi
		(/[aıou]/.test(sonSesli)) ? istisna ? 'e' : 'a' : 'e';
	var iyelikVarmi = false,
		sondanIkinciHarf = isim.substr(isim.length - 2, 1);
	if (sonHarf == "i" || sonHarf == "ı" || sonHarf == "ü" || sonHarf == "u") {
		if (sondanIkinciHarf == "n" || sondanIkinciHarf == "s") {
			iyelikVarmi = true;
		}
	}
	if (hal == yalinHali) {
		return isim;
	}
	// Kaynastirma harflerini ekler
	if (sonHarf == sonSesli) {

		if (hal == iHali || hal == eHali) {
			ek = (iyelikVarmi) ? 'n' + ek : 'y' + ek;
		}

	}
	// Kok degisimlerini kontrol eder
	if (hal == iHali || hal == eHali) {
		if ((/[tçkp]/.test(sonHarf))) {
			isim = isim.substr(0, isim.length - 1);
			var yumusamisHarfMap = {
				"t": "d",
				"ç": "c",
				"k": "ğ",
				"p": "b"
			};
			isim = isim + yumusamisHarfMap[sonHarf];
		}
	}
	// Harf yumusamalarini kontrol eder
	if (hal == deHali || hal == denHali) {
		if (iyelikVarmi) {
			isim = isim + "n";
		}
		ek = (/[fstkçşhp]/.test(sonHarf) ? 't' : 'd') + ek
	}

	// Iyelik veya den hali icin ek in sonuna n harfi ekler
	if (hal == iyelik || hal == denHali) {
		ek += 'n'
	}

	return isim + ek;
}
