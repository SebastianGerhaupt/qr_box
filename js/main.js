/**
 * @description A variable to set the debugging mode.
 * @constant
 * @type {boolean}
 */
const DEBUG=true;

/**
 * @description Alpha is used for alpha notation of powers of the number 2.
 * @constant
 * @type {number}
 */
const ALPHA=2;

/**
 * @description An array representing a Galois field 256.
 * @constant
 * @type {number[]}
 */
const GF_256_LOG=generateGf256Log();

/**
 * @description An array representing the antilog of a Galois field 256.
 * @constant
 * @type {number[]}
 */
const GF_256_ANTILOG=generateGf256Antilog();

/**
 * @description An object that represents the two bit indicator for the error correction level for the different error correction levels.
 * @constant
 * @type {Object}
 * @property {string} l The two bit indicator for the error correction level "L".
 * @property {string} m The two bit indicator for the error correction level "M". This is the most common error correction level.
 * @property {string} q The two bit indicator for the error correction level "Q".
 * @property {string} h The two bit indicator for the error correction level "H".
 */
const ERROR_CORRECTION_LEVELS={
	l: "01",
	m: "00",
	q: "11",
	h: "10"
}

/**
 * @description An object that represents the four bit indicator for the different modes.
 * @constant
 * @type {Object}
 * @property {string} numericMode The four bit indicator for the "numeric mode".
 * @property {string} alphanumericMode The four bit indicator for the "alphanumeric mode".
 * @property {string} byteMode The four bit indicator for the "byte mode".
 */
const MODES={
	numericMode: "0001",
	alphanumericMode: "0010",
	byteMode: "0100"
}

/**
 * @description An object that represents the character capacity table of QR codes for the error correction level "L". The index of an array plus one represents the version of the QR code (i=0 -> version 1). The value represents the character capacity for that version.
 * @constant
 * @type {Object}
 * @property {number[]} numericMode The character capacities for the "numeric mode".
 * @property {number[]} alphanumericMode The character capacities for the "alphanumeric mode".
 * @property {number[]} byteMode The character capacities for the "byte mode".
 */
const CAPACITIES_L={
	numericMode: [41, 77, 127, 187, 255, 322, 370, 461, 552, 652, 772, 883, 1022, 1101, 1250, 1408, 1548, 1725, 1903, 2061, 2232, 2409, 2620, 2812, 3057, 3283, 3517, 3669, 3909, 4158, 4417, 4686, 4965, 5253, 5529, 5836, 6153, 6479, 6743, 7089],
	alphanumericMode: [25, 47, 77, 114, 154, 195, 224, 279, 335, 395, 468, 535, 619, 667, 758, 854, 938, 1046, 1153, 1249, 1352, 1460, 1588, 1704, 1853, 1990, 2132, 2223, 2369, 2520, 2677, 2840, 3009, 3183, 3351, 3537, 3729, 3927, 4087, 4296],
	byteMode: [17, 32, 53, 78, 106, 134, 154, 192, 230, 271, 321, 367, 425, 458, 520, 586, 644, 718, 792, 858, 929, 1003, 1091, 1171, 1273, 1367, 1465, 1528, 1628, 1732, 1840, 1952, 2068, 2188, 2303, 2431, 2563, 2699, 2809, 2953]
};

/**
 * @description An object that represents the character capacity table of QR codes for the error correction level "M". The index of an array plus one represents the version of the QR code (i=0 -> version 1). The value represents the character capacity for that version.
 * @constant
 * @type {Object}
 * @property {number[]} numericMode The character capacities for the "numeric mode".
 * @property {number[]} alphanumericMode The character capacities for the "alphanumeric mode".
 * @property {number[]} byteMode The character capacities for the "byte mode".
 */
const CAPACITIES_M={
	numericMode: [34, 63, 101, 149, 202, 255, 293, 365, 432, 513, 604, 691, 796, 871, 991, 1082, 1212, 1346, 1500, 1600, 1708, 1872, 2059, 2188, 2395, 2544, 2701, 2857, 3035, 3289, 3486, 3693, 3909, 4134, 4343, 4588, 4775, 5039, 5313, 5596],
	alphanumericMode: [20, 38, 61, 90, 122, 154, 178, 221, 262, 311, 366, 419, 483, 528, 600, 656, 734, 816, 909, 970, 1035, 1134, 1248, 1326, 1451, 1542, 1637, 1732, 1839, 1994, 2113, 2238, 2369, 2506, 2632, 2780, 2894, 3054, 3220, 3391],
	byteMode: [14, 26, 42, 62, 84, 106, 122, 152, 180, 213, 251, 287, 331, 362, 412, 450, 504, 560, 624, 666, 711, 779, 857, 911, 997, 1059, 1125, 1190, 1264, 1370, 1452, 1538, 1628, 1722, 1809, 1911, 1989, 2099, 2213, 2331]
};

/**
 * @description An object that represents the character capacity table of QR codes for the error correction level "Q". The index of an array plus one represents the version of the QR code (i=0 -> version 1). The value represents the character capacity for that version.
 * @constant
 * @type {Object}
 * @property {number[]} numericMode The character capacities for the "numeric mode".
 * @property {number[]} alphanumericMode The character capacities for the "alphanumeric mode".
 * @property {number[]} byteMode The character capacities for the "byte mode".
 */
const CAPACITIES_Q={
	numericMode: [27, 48, 77, 111, 144, 178, 207, 259, 312, 364, 427, 489, 580, 621, 703, 775, 876, 948, 1063, 1159, 1224, 1358, 1468, 1588, 1718, 1804, 1933, 2085, 2181, 2358, 2473, 2670, 2805, 2949, 3081, 3244, 3417, 3599, 3791, 3993],
	alphanumericMode: [16, 29, 47, 67, 87, 108, 125, 157, 189, 221, 259, 296, 352, 376, 426, 470, 531, 574, 644, 702, 742, 823, 890, 963, 1041, 1094, 1172, 1263, 1322, 1429, 1499, 1618, 1700, 1787, 1867, 1966, 2071, 2181, 2298, 2420],
	byteMode: [11, 20, 32, 46, 60, 74, 86, 108, 130, 151, 177, 203, 241, 258, 292, 322, 364, 394, 442, 482, 509, 565, 611, 661, 715, 751, 805, 868, 908, 982, 1030, 1112, 1168, 1228, 1283, 1351, 1423, 1499, 1579, 1663]
};

/**
 * @description An object that represents the character capacity table of QR codes for the error correction level "H". The index of an array plus one represents the version of the QR code (i=0 -> version 1). The value represents the character capacity for that version.
 * @constant
 * @type {Object}
 * @property {number[]} numericMode The character capacities for the "numeric mode".
 * @property {number[]} alphanumericMode The character capacities for the "alphanumeric mode".
 * @property {number[]} byteMode The character capacities for the "byte mode".
 */
const CAPACITIES_H={
	numericMode: [17, 34, 58, 82, 106, 139, 154, 202, 235, 288, 331, 374, 427, 468, 530, 602, 674, 746, 813, 919, 969, 1056, 1108, 1228, 1286, 1425, 1501, 1581, 1677, 1782, 1897, 2022, 2157, 2301, 2361, 2524, 2625, 2735, 2927, 3057],
	alphanumericMode: [10, 20, 35, 50, 64, 84, 93, 122, 143, 174, 200, 227, 259, 283, 321, 365, 408, 452, 493, 557, 587, 640, 672, 744, 779, 864, 910, 958, 1016, 1080, 1150, 1226, 1307, 1394, 1431, 1530, 1591, 1658, 1774, 1852],
	byteMode: [7, 14, 24, 34, 44, 58, 64, 84, 98, 119, 137, 155, 177, 194, 220, 250, 280, 310, 338, 382, 403, 439, 461, 511, 535, 593, 625, 658, 698, 742, 790, 842, 898, 958, 983, 1051, 1093, 1139, 1219, 1273]
};

/**
 * @description An array that relates every possible alphanumeric symbol to an index.
 * @constant
 * @type {string[]}
 */
const SYMBOLS=["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", " ", "$", "%", "*", "+", "-", ".", "/", ":"];

/**
 * @description An object that represents the number of blocks per group and the number of data codewords per block for QR codes with the error correction level "L" depending on the version. The index of an array plus one represents the version of the QR code (i=0 -> version 1).
 * @constant
 * @type {Object}
 * @property {number[]} group1Blocks The number of blocks of the first group.
 * @property {number[]} blocks1Codewords The number of codewords per block of the first group.
 * @property {number[]} group2Blocks The number of blocks of the second group.
 * @property {number[]} blocks2Codewords The number of codewords per block of the second group.
 */
const BLOCKS_CODEWORDS_L={
	group1Blocks: [1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 4, 2, 4, 3, 5, 5, 1, 5, 3, 3, 4, 2, 4, 6, 8, 10, 8, 3, 7, 5, 13, 17, 17, 13, 12, 6, 17, 4, 20, 19],
	blocks1Codewords: [19, 34, 55, 80, 108, 68, 78, 97, 116, 68, 81, 92, 107, 115, 87, 98, 107, 120, 113, 107, 116, 111, 121, 117, 106, 114, 122, 117, 116, 115, 115, 115, 115, 115, 121, 121, 122, 122, 117, 118],
	group2Blocks: [0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 1, 1, 1, 5, 1, 4, 5, 4, 7, 5, 4, 4, 2, 4, 10, 7, 10, 3, 0, 1, 6, 7, 14, 4, 18, 4, 6],
	blocks2Codewords: [0, 0, 0, 0, 0, 0, 0, 0, 0, 69, 0, 93, 0, 116, 88, 99, 108, 121, 114, 108, 117, 112, 122, 118, 107, 115, 123, 118, 117, 116, 116, 0, 116, 116, 122, 122, 123, 123, 118, 119]
};

/**
 * @description An object that represents the number of blocks per group and the number of data codewords per block for QR codes with the error correction level "M" depending on the version. The index of an array plus one represents the version of the QR code (i=0 -> version 1).
 * @constant
 * @type {Object}
 * @property {number[]} group1Blocks The number of blocks of the first group.
 * @property {number[]} blocks1Codewords The number of codewords per block of the first group.
 * @property {number[]} group2Blocks The number of blocks of the second group.
 * @property {number[]} blocks2Codewords The number of codewords per block of the second group.
 */
const BLOCKS_CODEWORDS_M={
	group1Blocks: [1, 1, 1, 2, 2, 4, 4, 2, 3, 4, 1, 6, 8, 4, 5, 7, 10, 9, 3, 3, 17, 17, 4, 6, 8, 19, 22, 3, 21, 19, 2, 10, 14, 14, 12, 6, 29, 13, 40, 18],
	blocks1Codewords: [16, 28, 44, 32, 43, 27, 31, 38, 36, 43, 50, 36, 37, 40, 41, 45, 46, 43, 44, 41, 42, 46, 47, 45, 47, 46, 45, 45, 45, 47, 46, 46, 46, 46, 47, 47, 46, 46, 47, 47],
	group2Blocks: [0, 0, 0, 0, 0, 0, 0, 2, 2, 1, 4, 2, 1, 5, 5, 3, 1, 4, 11, 13, 0, 0, 14, 14, 13, 4, 3, 23, 7, 10, 29, 23, 21, 23, 26, 34, 14, 32, 7, 31],
	blocks2Codewords: [0, 0, 0, 0, 0, 0, 0, 39, 37, 44, 51, 37, 38, 41, 42, 46, 47, 44, 45, 42, 0, 0, 48, 46, 48, 47, 46, 46, 46, 48, 47, 47, 47, 47, 48, 48, 47, 47, 48, 48]
};

/**
 * @description An object that represents the number of blocks per group and the number of data codewords per block for QR codes with the error correction level "Q" depending on the version. The index of an array plus one represents the version of the QR code (i=0 -> version 1).
 * @constant
 * @type {Object}
 * @property {number[]} group1Blocks The number of blocks of the first group.
 * @property {number[]} blocks1Codewords The number of codewords per block of the first group.
 * @property {number[]} group2Blocks The number of blocks of the second group.
 * @property {number[]} blocks2Codewords The number of codewords per block of the second group.
 */
const BLOCKS_CODEWORDS_Q={
	group1Blocks: [1, 1, 2, 2, 2, 4, 2, 4, 4, 6, 4, 4, 8, 11, 5, 15, 1, 17, 17, 15, 17, 7, 11, 11, 7, 28, 8, 4, 1, 15, 42, 10, 29, 44, 39, 46, 49, 48, 43, 34],
	blocks1Codewords: [13, 22, 17, 24, 15, 19, 14, 18, 16, 19, 22, 20, 20, 16, 24, 19, 22, 22, 21, 24, 22, 24, 24, 24, 24, 22, 23, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24],
	group2Blocks: [0, 0, 0, 0, 2, 0, 4, 2, 4, 2, 4, 6, 4, 5, 7, 2, 15, 1, 4, 5, 6, 16, 14, 16, 22, 6, 26, 31, 37, 25, 1, 35, 19, 7, 14, 10, 10, 14, 22, 34],
	blocks2Codewords: [0, 0, 0, 0, 16, 0, 15, 19, 17, 20, 23, 21, 21, 17, 25, 20, 23, 23, 22, 25, 23, 25, 25, 25, 25, 23, 24, 25, 24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25]
};

/**
 * @description An object that represents the number of blocks per group and the number of data codewords per block for QR codes with the error correction level "H" depending on the version. The index of an array plus one represents the version of the QR code (i=0 -> version 1).
 * @constant
 * @type {Object}
 * @property {number[]} group1Blocks The number of blocks of the first group.
 * @property {number[]} blocks1Codewords The number of codewords per block of the first group.
 * @property {number[]} group2Blocks The number of blocks of the second group.
 * @property {number[]} blocks2Codewords The number of codewords per block of the second group.
 */
const BLOCKS_CODEWORDS_H={
	group1Blocks: [1, 1, 2, 4, 2, 4, 4, 4, 4, 6, 3, 7, 12, 11, 11, 3, 2, 2, 9, 15, 19, 34, 16, 30, 22, 33, 12, 11, 19, 23, 23, 19, 11, 59, 22, 2, 24, 42, 10, 20],
	blocks1Codewords: [9, 16, 13, 9, 11, 15, 13, 14, 12, 15, 12, 14, 11, 12, 12, 15, 14, 14, 13, 15, 16, 13, 15, 16, 15, 16, 15, 15, 15, 15, 15, 15, 15, 16, 15, 15, 15, 15, 15, 15],
	group2Blocks: [0, 0, 0, 0, 2, 0, 1, 2, 4, 2, 8, 4, 4, 5, 7, 13, 17, 19, 16, 10, 6, 0, 14, 2, 13, 4, 28, 31, 26, 25, 28, 35, 46, 1, 41, 64, 46, 32, 67, 61],
	blocks2Codewords: [0, 0, 0, 0, 12, 0, 14, 15, 13, 16, 13, 15, 12, 13, 13, 16, 15, 15, 14, 16, 17, 0, 16, 17, 16, 17, 16, 16, 16, 16, 16, 16, 16, 17, 16, 16, 16, 16, 16, 16]
};

/**
 * @description An object that represents the number of error correction codewords per block of data codewords for QR codes depending on the version. The index of an array plus one represents the version of the QR code (i=0 -> version 1).
 * @constant
 * @type {Object}
 * @property {string} l The number of error correction codewords per block of data codewords for QR codes with the error correction level "L".
 * @property {string} m The number of error correction codewords per block of data codewords for QR codes with the error correction level "M".
 * @property {string} q The number of error correction codewords per block of data codewords for QR codes with the error correction level "Q".
 * @property {string} h The number of error correction codewords per block of data codewords for QR codes with the error correction level "H".
 */
const ERROR_CODEWORDS_COUNTS={
	l: [7, 10, 15, 20, 26, 18, 20, 24, 30, 18, 20, 24, 26, 30, 22, 24, 28, 30, 28, 28, 28, 28, 30, 30, 26, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
	m: [10, 16, 26, 18, 24, 16, 18, 22, 22, 26, 30, 22, 22, 24, 24, 28, 28, 26, 26, 26, 26, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28],
	q: [13, 22, 18, 26, 18, 24, 18, 22, 20, 24, 28, 26, 24, 20, 30, 24, 28, 28, 26, 30, 28, 30, 30, 30, 30, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
	h: [17, 28, 22, 16, 22, 28, 26, 26, 24, 28, 24, 28, 22, 24, 24, 30, 28, 28, 26, 28, 30, 24, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30]
}

/**
 * @description An object that represents the coordinates of the center modules of the alignment patterns. The index of an array plus two represents the version of the QR code (i=0 -> version 2).
 * @constant
 * @type {Object}
 * @property {number[]} coordinates1 The first coordinates for the X- and Y-axis.
 * @property {number[]} coordinates2 The second coordinates for the X- and Y-axis.
 * @property {number[]} coordinates3 The third coordinates for the X- and Y-axis.
 * @property {number[]} coordinates4 The fourth coordinates for the X- and Y-axis.
 * @property {number[]} coordinates5 The fifth coordinates for the X- and Y-axis.
 * @property {number[]} coordinates6 The sixth coordinates for the X- and Y-axis.
 */
const ALIGNMENT_PATTERN_COORDINATES={
	coordinates1: [18, 22, 26, 30, 34, 22, 24, 26, 28, 30, 32, 34, 26, 26, 26, 30, 30, 30, 34, 28, 26, 30, 28, 32, 30, 34, 26, 30, 26, 30, 34, 30, 34, 30, 24, 28, 32, 26, 30],
	coordinates2: [undefined, undefined, undefined, undefined, undefined, 38, 42, 46, 50, 54, 58, 62, 46, 48, 50, 54, 56, 58, 62, 50, 50, 54, 54, 58, 58, 62, 50, 54, 52, 56, 60, 58, 62, 54, 50, 54, 58, 54, 58],
	coordinates3: [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 66, 70, 74, 78, 82, 86, 90, 72, 74, 78, 80, 84, 86, 90, 74, 78, 78, 82, 86, 86, 90, 78, 76, 80, 84, 82, 86],
	coordinates4: [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 94, 98, 102, 106, 110, 114, 118, 98, 102, 104, 108, 112, 114, 118, 102, 102, 106, 110, 110, 114],
	coordinates5: [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 122, 126, 130, 134, 138, 142, 146, 126, 128, 132, 136, 138, 142],
	coordinates6: [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 150, 154, 158, 162, 166, 170]
};

/**
 * @description An object that represents the character capacity table of QR codes for the error correction level "H". The index of an array plus one represents the version of the QR code (i=0 -> version 1). The value represents the character capacity for that version.
 * @constant
 * @type {Object}
 * @property {string} reservedState The name of the state for reserved modules.
 * @property {string} classModuleDark The class name for dark modules.
 * @property {string} classModule The class name for modules.
 */
const MODULES={
	reservedState: "reserved",
	classModuleDark: "module-dark",
	classModule: "module"
};

/**
 * @description The input element for the text.
 * @constant
 * @type {Object}
 */
const INPUT=document.getElementById("text");

/**
 * @description The button to generate a QR code.
 * @constant
 * @type {Object}
 */
const BUTTON_GENERATE=document.getElementById("generate");

/**
 * @description The button to send a QR code.
 * @constant
 * @type {Object}
 */
const BUTTON_SEND=document.getElementById("send");

// If the document is loaded, a QR code will be generated.
document.addEventListener("DOMContentLoaded", function(){
		// An array containing different texts will be generated.
		let texts=[];
		texts.push("QR Box - Quick-responsive-Code-Generator");
		texts.push("Willkommen bei QR Box!");
		texts.push("Teste meinen QR-Code-Generator!");
		texts.push("Donnerstag ist Pizzatag!");

		// A QR code will be generated with a randomly selected text.
		const qr=new QR("M", texts[Math.floor(Math.random()*texts.length)]);

		// A matrix will be generated and displayed.
		const matrix=new Matrix(qr.version, qr.interleavedBinaries+qr.remainderBits, qr.levelIndicator);
		const id="qr-animation";
		matrix.draw(id);

		// The matrix will be animated.
		// The animation will run instantly once because of the delay of the interval.
		// After the first run, the animation will be repeated infinitly.
		const modules=document.getElementById(id).querySelectorAll("."+MODULES.classModuleDark);
		let randomNumbers=[];
		const animationDuration=animateMatrix(modules, randomNumbers);
		setInterval(function(){
				animateMatrix(modules, randomNumbers);
		}, animationDuration/(modules.length/5));
});

/**
 * @description The matrix will be animated. The dark modules will change their color.
 * @param {NodeListOf<Element>} modules The dark modules of the QR code.
 * @param {number[]} randomNumbers An array representing the randomly chosen number of the next dark element.
 * @returns {number} The animation duration in milliseconds.
 */
function animateMatrix(modules, randomNumbers){
	// The index of a randomly chosen dark module will be saved to a constant and stored inside an array.
	const random=Math.floor(Math.random()*modules.length);
	randomNumbers.push(random);

	// One of two class names defining the background color will be chosen randomly.
	const classAnimation=Math.ceil(Math.random()*2)==1?"animation-main-color":"animation-generic-gradient-3";

	// The class name of the randomly chosen dark module will be changed.
	modules[random].className=modules[random].className.replace(MODULES.classModuleDark, classAnimation);

	// The animation duration will be saved to a constant.
	const animationDuration=parseInt(getCss(modules[random], "animation-duration").replace("ms", "").replace("s", "000"));

	// After the animation duration, the class name of the first module inside the array will be resetted.
	// The index of the first dark module will be removed from the array.
	setTimeout(function(){
			modules[randomNumbers[0]].className=modules[randomNumbers[0]].className.replace(classAnimation, MODULES.classModuleDark);
			randomNumbers.shift();
	}, animationDuration);

	// The animation duration will be returned.
	return animationDuration;
}

/**
 * @description A shorthand function to get the value of a CSS property of a given element.
 * @param {Element} element The element whichs property value shall be returned.
 * @param {string} property The property whichs value shall be returned.
 * @returns {string} The value of the CSS property.
 */
function getCss(element, property){
	return window.getComputedStyle(element).getPropertyValue(property);
}

// If the input text is changed, the form will be validated.
INPUT.addEventListener("input", validate);

// If a radio button is clicked, the form will be validated.
document.form.error_correction_level.forEach((element)=>{
		element.addEventListener("click", validate);
});

//ToDo
/**
 * @description ToDo
 */
function validate(){
	const capacity=validateInput();
	toggleButtons(capacity);
}

//ToDo
/**
 * @description ToDo
 * @returns {number} The chosen maximum character capacity.
 */
function validateInput(){
	// The optimal one of the three (five) possible modes will be chosen in dependency of the user input.
	const modeIndicator=chooseModeIndicator(INPUT.value);

	// The level indicator will be chosen in dependency of the error correction level.
	const levelIndicator=chooseLevelIndicator(document.querySelector('input[name="error_correction_level"]:checked').value);

	// The character capacity table will be chosen in dependency of the error correction level.
	const capacities=chooseCapacities(levelIndicator);

	// The maximum character capacity will be chosen in dependency of the mode indicator.
	let capacity;
	switch(modeIndicator){
		case MODES.numericMode:
			capacity=capacities.numericMode[capacities.numericMode.length-1];
			break;
		case MODES.alphanumericMode:
			capacity=capacities.alphanumericMode[capacities.alphanumericMode.length-1];
			break;
		case MODES.byteMode:
			capacity=capacities.byteMode[capacities.byteMode.length-1];
	}

	// If the user input is not empty, the maximum length of the input will be set in dependency of the maximum character capacity.
	// The capacity will be returned.
	if(capacity!==undefined){
		INPUT.maxLength=capacity;
		return capacity;
	}

	// If the user input is empty, the attribute to set the maximum length of the input will be removed.
	// A capacity of "0" will be returned.
	INPUT.removeAttribute("maxLength");
	return 0;
}

//ToDo
/**
 * @description ToDo
 * @param {number} capacity The maximum character capacity.
 */
function toggleButtons(capacity){
	// ToDo
	if(capacity>0&&capacity>=INPUT.value.length){
		BUTTON_GENERATE.disabled=false;
		BUTTON_SEND.disabled=false;
	}
	else{
		BUTTON_GENERATE.disabled=true;
		BUTTON_SEND.disabled=true;
		//ToDo: benutzer benachrichtigen
	}
}

/**
 * @description The character capacities will be chosen in dependency of the error correction level.
 * @param {string} levelIndicator The level indicator.
 * @returns {Object} The character capacities.
 */
function chooseCapacities(levelIndicator){
	switch(levelIndicator){
		case ERROR_CORRECTION_LEVELS.l:
			return CAPACITIES_L;
		case ERROR_CORRECTION_LEVELS.q:
			return CAPACITIES_Q;
		case ERROR_CORRECTION_LEVELS.h:
			return CAPACITIES_H;
		default:
			return CAPACITIES_M;
	}
}

// If the button is clicked, a QR code will be generated.
BUTTON_GENERATE.addEventListener("click", function(){
		// The timer will be started in debugging mode.
		if(DEBUG) console.time("Time to display the QR code");

		// The user input will be saved to constants.
		const input=INPUT.value;
		const level=document.querySelector('input[name="error_correction_level"]:checked').value;

		// The user input will be logged in debugging mode.
		if(DEBUG){
			console.log("input: "+input);
			console.log("error correction level: "+level);
		}

		// A QR code will be generated.
		const qr=new QR(level, input);

		// A matrix will be generated and displayed.
		const matrix=new Matrix(qr.version, qr.interleavedBinaries+qr.remainderBits, qr.levelIndicator);
		matrix.draw("qr-code");

		// The properties of the QR code will be logged in debugging mode.
		// The properties of the matrix will be logged in debugging mode.
		// The timer will be stopped in debugging mode.
		if(DEBUG){
			console.log(qr);
			console.log(matrix);
			console.timeEnd("Time to display the QR code");
		}
});

//ToDo
BUTTON_SEND.addEventListener("click", sendMail);

/**
 * @description An array representing the powers of alpha inside a Galois field 256 will be created.
 * @returns {number[]} An array representing a Galois field 256.
 */
function generateGf256Log(){
	// A constant to store the range of the field will be created.
	const range=256;

	// An array to store the numbers of a Galois field 256 will be created.
	let gf256Log=[];

	// The powers of alpha with exponents from 0 to 255 will be stored inside the array.
	// If a number is equal to 256 or bigger, the previous number will be multiplied by two instead of calculating the power of alpha.
	// If the number is still equal to 256 or bigger, a XOR calculation with 285 will be done.	
	for(let i=0; i<range; i++){
		let number=Math.pow(ALPHA, i);
		if(number>=range){
			number=gf256Log[i-1]*2;
			if(number>=range) number^=285;
		}
		gf256Log.push(number);
	}

	// The array will be returned.
	return gf256Log;
}

/**
 * @description The antilog of the Galois field 256 will be created.
 * @returns {number[]} An array representing the antilog of a Galois field 256.
 */
function generateGf256Antilog(){
	// An array switching the indices and the values of the Galois field 256 will be created.
	let gf256Antilog=[];
	for(let i=0; i<GF_256_LOG.length; i++) gf256Antilog[GF_256_LOG[i]]=i;

	// The first value is undefined so the first element will be removed.
	// The new first value has to be set to zero.
	gf256Antilog.shift();
	gf256Antilog[0]=0;

	// The array will be returned.
	return gf256Antilog;
}

/**
 * @typedef {Object} QR
 * @property {string} levelIndicator The level indicator.
 * @property {string} modeIndicator The mode indicator of the optimal mode.
 * @property {number} version The smallest possible version.
 * @property {string} countIndicator The character count indicator.
 * @property {string} encodedInput The encoded user input.
 * @property {number} dataBitsCount The total number of data bits.
 * @property {string} terminator The terminator.
 * @property {string} bitsToMultipleOfEight A string consisting of a count of zeros to make the length of the encoded bit string a multiple of eight.
 * @property {string} bitsToMaximum A special string to make the encoded bit string fit the maximum capacity.
 * @property {Groups} dataCodewordGroups An object representing two groups of blocks consisting of data codewords.
 * @property {Groups} messageCoefficientsGroups An object representing two groups of blocks consisting of message coefficients.
 * @property {number} errorCodewordsCount The number of error correction codewords per block.
 * @property {number[]} generatorCoefficients An array representing the coefficients of the generator polynomial.
 * @property {Groups} errorCodewordGroups An object representing two groups of blocks consisting of error correction codewords.
 * @property {string[]} interleavedDataCodewords An array consisting of interleaved data codewords.
 * @property {number[]} interleavedErrorCodewords An array consisting of interleaved error correction codewords.
 * @property {string} interleavedBinaries The interleaved binary codewords.
 * @property {string} remainderBits A string consisting of a special count of zeros.
 */
/**
 * @description A QR code object. All necessary information will be stored in properties.
 * @class
 * @type {QR}
 * @param {string} level The error correction level chosen by the user.
 * @param {string} input The text of the user input.
 */
class QR{
	constructor(level, input){
		this.levelIndicator=chooseLevelIndicator(level);
		this.modeIndicator=chooseModeIndicator(input);
		this.version=chooseSmallestVersion(this.levelIndicator, this.modeIndicator, input.length);
		this.countIndicator=generateCountIndicator(this.modeIndicator, this.version, input.length);
		this.encodedInput=encodeInput(this.modeIndicator, input);
		this.dataBitsCount=calculateDataBitsCount(this.levelIndicator, this.version);
		this.terminator=generateTerminator(this.modeIndicator+this.countIndicator+this.encodedInput, this.dataBitsCount);
		this.bitsToMultipleOfEight=generateBitsToMultipleOfEight(this.modeIndicator+this.countIndicator+this.encodedInput+this.terminator);
		this.bitsToMaximum=generateBitsToMaximum(this.modeIndicator+this.countIndicator+this.encodedInput+this.terminator+this.bitsToMultipleOfEight, this.dataBitsCount);
		this.dataCodewordGroups=generateDataCodewordGroups(this.levelIndicator, this.modeIndicator+this.countIndicator+this.encodedInput+this.terminator+this.bitsToMultipleOfEight+this.bitsToMaximum, this.version);
		this.messageCoefficientsGroups=generateMessageCoefficientsGroups(this.dataCodewordGroups);
		this.errorCodewordsCount=chooseErrorCodewordsCount(this.levelIndicator, this.version);
		this.generatorCoefficients=generateGeneratorCoefficients(this.errorCodewordsCount);
		this.errorCodewordGroups=generateErrorCodewordGroups(this.messageCoefficientsGroups, this.errorCodewordsCount, this.generatorCoefficients);
		this.interleavedDataCodewords=interleaveCodewords(this.dataCodewordGroups);
		this.interleavedErrorCodewords=interleaveCodewords(this.errorCodewordGroups);
		this.interleavedBinaries=generateInterleavedBinaries(this.interleavedDataCodewords, this.interleavedErrorCodewords);
		this.remainderBits=generateRemainderBits(this.version);
	}
}

/**
 * @description The level indicator will be chosen in dependency of the user input. The level indicator will be represented by two bits.
 * @param {string} level The error correction level chosen by the user.
 * @returns {string} The level indicator.
 */
function chooseLevelIndicator(level){
	switch(level){
		case "L":
			return ERROR_CORRECTION_LEVELS.l;
		case "Q":
			return ERROR_CORRECTION_LEVELS.q;
		case "H":
			return ERROR_CORRECTION_LEVELS.h;
		default:
			return ERROR_CORRECTION_LEVELS.m;
	}
}

/**
 * @description The optimal one of the three (five) possible modes will be chosen in dependency of the user input. The four modes are "numeric mode", "alphanumeric mode", "byte mode", "Kanji mode" and "Extended Channel Interpretation (ECI) mode". The mode indicator will be chosen. The mode indicator will be represented by four bits.
 * @todo The "Kanji mode" and the "Extended Channel Interpretation (ECI) mode" will not be treated.
 * @param {string} input The text of the user input.
 * @returns {string} The mode indicator of the optimal mode.
 */
function chooseModeIndicator(input){
	// The input string will be checked for a numeric expression.
	// Possible is a string consisting of the decimal digits 0 - 9.
	if(new RegExp("^[0-9]+$").test(input)) return MODES.numericMode;

	// The input string will be checked for an alphanumeric expression.
	// Possible is a string consisting of the digits 0 - 9, the uppercase letters A - Z, whitespaces and the symbols "$", "%", "*", "+", "-", ".", "/" and ":".
	if(new RegExp("^[0-9A-Z\s \$%\*\+-\./:]+$").test(input)) return MODES.alphanumericMode;

	// The input string will be checked for the ISO-8859-1 character set.
	// Possible is a string consisting of symbols that are content of the ISO-8859-1 character set.
	if(new RegExp("^[\x00-\x7F\xA0-\xFF]+$").test(input)) return MODES.byteMode;
}

/**
 * @description The smallest possible of the fourty versions will be chosen.
 * @param {string} levelIndicator The level indicator.
 * @param {string} modeIndicator The chosen mode indicator.
 * @param {number} inputLength The length of the user input.
 * @returns {number} The smallest possible version.
 */
function chooseSmallestVersion(levelIndicator, modeIndicator, inputLength){
	// The character capacity table will be chosen in dependency of the error correction level.
	const capacities=chooseCapacities(levelIndicator);

	// The smallest possible version will be chosen in dependency of the mode indicator and the character capacity.
	// If the length of the user input is smaller or equal to a capacity inside the table, the index plus one is the smallest possible version.
	// The smallest possible version will be returned.
	switch(modeIndicator){
		case MODES.numericMode:
			for(let i=0; i<capacities.numericMode.length; i++){
				if(inputLength<=capacities.numericMode[i]) return i+1;
			}
		case MODES.alphanumericMode:
			for(let i=0; i<capacities.alphanumericMode.length; i++){
				if(inputLength<=capacities.alphanumericMode[i]) return i+1;
			}
		case MODES.byteMode:
			for(let i=0; i<capacities.byteMode.length; i++){
				if(inputLength<=capacities.byteMode[i]) return i+1;
			}
	}
}

/**
 * @description The character count indicator will be generated.
 * @param {string} modeIndicator The mode indicator of the optimal mode.
 * @param {number} version The smallest possible version.
 * @param {string} inputLength The length of the user input.
 * @returns {string} The character count indicator.
 */
function generateCountIndicator(modeIndicator, version, inputLength){
	// The character count indicator will be created by filling up the binary representation of the length of the user input with the correct count of zeros.
	// Every combination of mode and a group of versions (1 - 9, 10 - 26, 27 - 40) needs a specific length of the character count indicator.
	switch(modeIndicator){
		case MODES.numericMode:
			if(version<=9) return inputLength.toString(2).padStart(10, "0");
			if(version>=10&&version<=26) return inputLength.toString(2).padStart(12, "0");
			return inputLength.toString(2).padStart(14, "0");
		case MODES.alphanumericMode:
			if(version<=9) return inputLength.toString(2).padStart(9, "0");
			if(version>=10&&version<=26) return inputLength.toString(2).padStart(11, "0");
			return inputLength.toString(2).padStart(13, "0");
		case MODES.byteMode:
			if(version<=9) return inputLength.toString(2).padStart(8, "0");
			return inputLength.toString(2).padStart(16, "0");
	}
}

/**
 * @description Each mode has its own encoding. The correct encoding will be started.
 * @param {string} modeIndicator The mode indicator of the optimal mode.
 * @param {string} input The text of the user input.
 * @returns {string} The encoded user input.
 */
function encodeInput(modeIndicator, input){
	// Depending on the mode indicator the correct encoding will be started.
	switch(modeIndicator){
		case MODES.numericMode:
			return encodeNumeric(input);
		case MODES.alphanumericMode:
			return encodeAlphanumeric(input);
		case MODES.byteMode:
			return encodeByte(input);
	}
}

/**
 * @description The encoding for the "numeric mode" will be processed. The user input will be encoded.
 * @param {string} input The text of the user input.
 * @returns {string} The encoded user input.
 */
function encodeNumeric(input){
	// An array to store triples of digits as a string will be created.
	let triples=[];
	for(let i=0; i<input.length; i+=3) triples.push(input.charAt(i)+input.charAt(i+1)+input.charAt(i+2));

	// An array to store the binary representations of the triples will be created.
	let binaries=[];

	// The binary representation of the triples will be stored inside the array.
	// Binaries representing triples of three digits will be converted to a group of ten bits.
	// Binaries representing triples of two digits will be converted to a group of seven bits.
	// Binaries representing triples of one digit will be converted to a group of four bits.
	// Leading zeros of triples will be ignored except a triple consists of one single zero.
	for(let i=0; i<triples.length; i++){
		binaries.push(parseInt(triples[i]).toString(2));
		if(triples[i].length==3&&triples[i].charAt(0)!="0") binaries[i]=binaries[i].padStart(10, "0");
		if((triples[i].length==3&&triples[i].charAt(0)=="0"&&triples[i].charAt(1)!="0")||(triples[i].length==2&&triples[i].charAt(0)!="0")) binaries[i]=binaries[i].padStart(7, "0");
		if((triples[i].length==3&&triples[i].charAt(0)=="0"&&triples[i].charAt(1)=="0")||(triples[i].length==2&&triples[i].charAt(0)=="0")||triples[i].length==1) binaries[i]=binaries[i].padStart(4, "0");
	}

	// he bits will be concatinated to the encoded string and returned.
	return binaries.join("");
}

/**
 * @description The encoding for the "alphanumeric mode" will be processed. The user input will be encoded.
 * @param {string} input The text of the user input.
 * @returns {string} The encoded user input.
 */
function encodeAlphanumeric(input){
	// An array to store tuples of characters will be created.
	let tuples=[];
	for(let i=0; i<input.length; i+=2) tuples.push(input.charAt(i)+input.charAt(i+1));

	// For each pair of characters a number will be calculated.
	// If the last pair consists of just one character, the calculation of this pair is different.
	// The calculated number will be converted to binary.
	// The binaries will be converted to groups of eleven bits.
	// Binaries representing a pair containing just one character will be converted to a group of six bits.
	if(input.length%2==0){
		for(let i=0; i<tuples.length; i++){
			let number=0;
			for(let j=0; j<SYMBOLS.length; j++){
				if(tuples[i].charAt(0)==SYMBOLS[j]) number+=j*45;
				if(tuples[i].charAt(1)==SYMBOLS[j]) number+=j;
			}
			tuples[i]=number.toString(2).padStart(11, "0");
		}
	}
	else{
		for(let i=0; i<tuples.length-1; i++){
			let number=0;
			for(let j=0; j<SYMBOLS.length; j++){
				if(tuples[i].charAt(0)==SYMBOLS[j]) number+=j*45;
				if(tuples[i].charAt(1)==SYMBOLS[j]) number+=j;
			}
			tuples[i]=number.toString(2).padStart(11, "0");
		}
		for(let i=0; i<SYMBOLS.length; i++){
			if(tuples[tuples.length-1]==SYMBOLS[i]) tuples[tuples.length-1]=i.toString(2).padStart(6, "0");
		}
	}

	// The groups of bits will be concatinated to the encoded string and returned.
	return tuples.join("");
}

/**
 * @description The encoding for the "byte mode" will be processed. The user input will be encoded.
 * @param {string} input The text of the user input.
 * @returns {string} The encoded user input.
 */
function encodeByte(input){
	// An array to store binaries will be created and filled with the hexadecimal representation of the characters.
	let binaries=[];

	// The hexadecimal representation of the characters will be converted to binary.
	// The binaries will be converted to groups of eight bits.
	for(let i=0; i<input.length; i++) binaries.push(parseInt("0x"+input.charCodeAt(i).toString(16), 16).toString(2).padStart(8, "0"));

	// The groups of bits will be concatinated to the encoded string and returned.
	return binaries.join("");
}

/**
 * @description The count of data bits will be calculated. The count is calculated by multiplying the count of data codewords by eight bits.
 * @param {string} levelIndicator The level indicator.
 * @param {number} version The smallest possible version.
 * @returns {number} The total number of data bits.
 */
function calculateDataBitsCount(levelIndicator, version){
	// The total number of data bits will be calculated in dependency of the error correction level and the version and then returned.
	switch(levelIndicator){
		case ERROR_CORRECTION_LEVELS.l:
			return (BLOCKS_CODEWORDS_L.group1Blocks[version-1]*BLOCKS_CODEWORDS_L.blocks1Codewords[version-1]+BLOCKS_CODEWORDS_L.group2Blocks[version-1]*BLOCKS_CODEWORDS_L.blocks2Codewords[version-1])*8;
		case ERROR_CORRECTION_LEVELS.q:
			return (BLOCKS_CODEWORDS_Q.group1Blocks[version-1]*BLOCKS_CODEWORDS_Q.blocks1Codewords[version-1]+BLOCKS_CODEWORDS_Q.group2Blocks[version-1]*BLOCKS_CODEWORDS_Q.blocks2Codewords[version-1])*8;
		case ERROR_CORRECTION_LEVELS.h:
			return (BLOCKS_CODEWORDS_H.group1Blocks[version-1]*BLOCKS_CODEWORDS_H.blocks1Codewords[version-1]+BLOCKS_CODEWORDS_H.group2Blocks[version-1]*BLOCKS_CODEWORDS_H.blocks2Codewords[version-1])*8;
		default:
			return (BLOCKS_CODEWORDS_M.group1Blocks[version-1]*BLOCKS_CODEWORDS_M.blocks1Codewords[version-1]+BLOCKS_CODEWORDS_M.group2Blocks[version-1]*BLOCKS_CODEWORDS_M.blocks2Codewords[version-1])*8;
	}
}

/**
 * @description The terminator will be generated.
 * @param {string} bits The encoded bit string so far, consisting of the mode indicator, the count indicator and the encoded input.
 * @param {number} dataBitsCount The total number of data bits.
 * @returns {string} The terminator.
 */
function generateTerminator(bits, dataBitsCount){
	// If the bit string is at least four bits shorter than the total number of data bits, a terminator consisting of four zeros will be returned.
	if(bits.length+4<dataBitsCount) return "0000";

	// If the bit string is fewer than four bits shorter or four bits shorter, the required count of zeros will be added to fit the total number of data bits, then the terminator will be returned.
	let terminator="";
	return terminator.padStart(dataBitsCount-bits.length, "0");
}

/**
 * @description Pad bits will be generated to make the length of the bit string a multiple of eight.
 * @param {string} bits The encoded bit string so far, consisting of the mode indicator, the count indicator, the encoded input and the terminator.
 * @returns {string} A string consisting of a count of zeros to make the length of the encoded bit string a multiple of eight.
 */
function generateBitsToMultipleOfEight(bits){
	// A constant to store the difference of the length of the bit string and the next multiplte of eight will be created.
	const difference=8-(bits.length%8);

	// If the length of the bit string is a multiple of eight, an empty string will be returned.
	if(difference==8) return "";

	// If the length is not a multiple of eight, the difference will be filled with a string of the correct count of zeros, then the string will be returned.
	let bitsToMultipleOfEight="";
	return bitsToMultipleOfEight.padStart(difference, "0");
}

/**
 * @description The missing bits to fit the maximum capacity of the QR code will be generated.
 * @param {string} bits The encoded bit string so far, consisting of the mode indicator, the count indicator, the encoded input, the terminator and appended zeros to make the length of the encoded bit string a multiple of eight.
 * @param {number} dataBitsCount The total number of data bits.
 * @returns {string} A special string to make the encoded bit string fit the maximum capacity.
 */
function generateBitsToMaximum(bits, dataBitsCount){
	// If the length of the bit string is equal to the maximum capacity, an empty string will be returned.
	let bitsToMaximum="";

	// If the length is not equal to the maximum capacity, the difference will be filled with a special bit string.
	if(bits.length<dataBitsCount) bitsToMaximum=bitsToMaximum.padEnd(dataBitsCount-bits.length, "1110110000010001");

	// The bit string will be returned.
	return bitsToMaximum;
}

//ToDo: just split to groups and blocks if neccessary
//ToDo: following to this: just interleave if there are two blocks filled with content
/**
 * @description The encoded data will be separated into blocks and groups.
 * @param {string} levelIndicator The level indicator.
 * @param {string} encodedData The encoded bit string, consisting of the mode indicator, the count indicator, the encoded input, the terminator, the appended zeros to make the length of the encoded bit string a multiple of eight and the bits to fit the encoded bit string to the maximum.
 * @param {number} version The smallest possible version.
 * @returns {Groups} An object representing two groups of blocks consisting of data codewords.
 */
function generateDataCodewordGroups(levelIndicator, encodedData, version){
	// The counts of blocks and the counts of data codewords will be chosen in dependency of the error correction level.
	let blocksCodewords;
	switch(levelIndicator){
		case ERROR_CORRECTION_LEVELS.l:
			blocksCodewords=BLOCKS_CODEWORDS_L;
			break;
		case ERROR_CORRECTION_LEVELS.q:
			blocksCodewords=BLOCKS_CODEWORDS_Q;
			break;
		case ERROR_CORRECTION_LEVELS.h:
			blocksCodewords=BLOCKS_CODEWORDS_H;
			break;
		default:
			blocksCodewords=BLOCKS_CODEWORDS_M;
	}

	// The encoded bit string will be splitted into data codewords of eight bits and stored to a constant.
	const dataCodewords=encodedData.match(new RegExp(".{8}", "g"));

	// A variable to iterate through both groups will be created.
	let position=0;

	// The first group will be created and filled with the correct count of blocks and data codewords.
	const group1=fillDataCodewordGroup(blocksCodewords.group1Blocks[version-1], blocksCodewords.blocks1Codewords[version-1], dataCodewords, position);
	
	// The new position inside the array "dataCodewords" will be calculated.
	position+=blocksCodewords.group1Blocks[version-1]*blocksCodewords.blocks1Codewords[version-1];
	
	// The second group will be created and filled with the correct count of blocks and data codewords.
	const group2=fillDataCodewordGroup(blocksCodewords.group2Blocks[version-1], blocksCodewords.blocks2Codewords[version-1], dataCodewords, position);

	// An object to store the two groups of blocks of data codewords will be returned.
	return new Groups(group1, group2);
}

/**
 * @description The group will be filled with the correct count of blocks and data codewords.
 * @param {number} groupBlocksCount The count of blocks inside the group.
 * @param {number} blocksCodewordsCount The count of data codewords inside the blocks.
 * @param {string[]} dataCodewords The encoded bit string splitted into data codewords of eight bits.
 * @param {number} position The actuall index inside the array "dataCodewords".
 * @returns {string[][]} An array that stores a block of data codewords.
 */
function fillDataCodewordGroup(groupBlocksCount, blocksCodewordsCount, dataCodewords, position){
	// An array to store the blocks will be created.
	let group=[];

	// The group will be filled with the correct count of blocks.
	// The blocks will be filled with the correct count of data codewords.
	for(let i=0; i<groupBlocksCount; i++){
		let block=[];
		for(let j=0; j<blocksCodewordsCount; j++, position++) block.push(dataCodewords[position]);
		group.push(block);
	}

	// The array will be returned.
	return group;
}

/**
 * @typedef {Object} Groups
 * @property {number[][]|string[][]} group1 The blocks of data of the first group.
 * @property {number[][]|string[][]} group2 The blocks of data of the second group.
 */
/**
 * @description A Groups object will be created.
 * @class
 * @type {Groups}
 * @param {number[][]|string[][]} group1 The blocks of data of the first group.
 * @param {number[][]|string[][]} group2 The blocks of data of the second group.
 */
class Groups{
	constructor(group1, group2){
		this.group1=group1;
		this.group2=group2;
	}
}

/**
 * @description The coefficients of the message polynomial will be calculated.
 * @param {Groups} dataCodewordGroups An object representing two groups of blocks consisting of data codewords.
 * @returns {Groups} An object representing two groups of blocks consisting of message coefficients.
 */
function generateMessageCoefficientsGroups(dataCodewordGroups){
	// The groups will be created and filled with the correct count of blocks and message coefficients.
	let group1=fillMessageCoefficientGroup(dataCodewordGroups.group1);
	let group2=fillMessageCoefficientGroup(dataCodewordGroups.group2);

	// An object to store the two groups of blocks of message coefficients will be returned.
	return new Groups(group1, group2);
}

/**
 * @description The group will be filled with the correct count of blocks and message coefficients.
 * @param {string[][]} dataCodewordGroup A group of blocks consisting of data codewords.
 * @returns {number[][]} An array that stores blocks of message coefficients.
 */
function fillMessageCoefficientGroup(dataCodewordGroup){
	// An array to store the blocks will be created.
	let group=[];

	// The group will be filled with the correct count of blocks.
	// The blocks will be filled with the correct count of data codewords.
	// The data codewords will be converted to decimal numbers.
	// These numbers are the coefficients of the message polynomial.
	for(let i=0; i<dataCodewordGroup.length; i++){
		let block=[];
		for(let j=0; j<dataCodewordGroup[i].length; j++) block.push(parseInt(dataCodewordGroup[i][j], 2));
		group.push(block);
	}

	// The array will be returned.
	return group;
}

/**
 * @description The number of error correction codewords per block will be found.
 * @param {string} levelIndicator The level indicator.
 * @param {number} version The smallest possible version.
 * @returns {number} The number of error correction codewords per block.
 */
function chooseErrorCodewordsCount(levelIndicator, version){
	// The number of error correction codewords will be returned in dependency of the error correction level and version.
	switch(levelIndicator){
		case ERROR_CORRECTION_LEVELS.l:
			return ERROR_CODEWORDS_COUNTS.l[version-1];
		case ERROR_CORRECTION_LEVELS.q:
			return ERROR_CODEWORDS_COUNTS.q[version-1];
		case ERROR_CORRECTION_LEVELS.h:
			return ERROR_CODEWORDS_COUNTS.h[version-1];
		default:
			return ERROR_CODEWORDS_COUNTS.m[version-1];
	}
}

/**
 * @description The coefficients of the generator polynomial will be calculated.
 * @param {number} errorCodewordsCount The number of error correction codewords per block.
 * @returns {number[]} An array representing the coefficients of the generator polynomial.
 */
function generateGeneratorCoefficients(errorCodewordsCount){
	// The first two polynomials will be created and multiplied.
	// coefficients0: x-ALPHA^0 -> x-Math.pow(ALPHA, 0) -> x+Math.pow(ALPHA, 0) -> 1*x^1+Math.pow(ALPHA, 0)*x^0
	// coefficients1: x-ALPHA^1 -> x-Math.pow(ALPHA, 1) -> x+Math.pow(ALPHA, 1) -> 1*x^1+Math.pow(ALPHA, 1)*x^0
	let generatorCoefficients=multiplyPolynomials([1, Math.pow(ALPHA, 0)], [1, Math.pow(ALPHA, 1)]);
	
	// The result of the multiplication will be multiplied by the next polynomial.
	// coefficientsI: x-ALPHA^i -> x-Math.pow(ALPHA, i) -> x+Math.pow(ALPHA, i) -> 1*x^1+Math.pow(ALPHA, i)*x^0
	for(let i=2; i<errorCodewordsCount; i++) generatorCoefficients=multiplyPolynomials(generatorCoefficients, [1, Math.pow(ALPHA, i)]);
	
	// The final result will be returned.
	return generatorCoefficients;
}

/**
 * @description Two polynomials will be multiplied.
 * @param {number[]} coefficients1 An array representing the coefficients of the first polynomial.
 * @param {number[]} coefficients2 An array representing the coefficients of the second polynomial.
 * @returns {number[]} An array representing the coefficients of the product of two polynomials.
 */
function multiplyPolynomials(coefficients1, coefficients2){
	// The coefficients have to be reversed so the indices equals the exponents.
	// The original coefficients shall not be reversed so copies will be generated.
	let coefficients1Reversed=[];
	for(let i=coefficients1.length-1; i>=0; i--) coefficients1Reversed.push(coefficients1[i]);
	let coefficients2Reversed=[];
	for(let i=coefficients2.length-1; i>=0; i--) coefficients2Reversed.push(coefficients2[i]);

	// The reversed coefficients will be converted to alpha notation.
	const exponents1=convertToAlphaNotation(coefficients1Reversed);
	const exponents2=convertToAlphaNotation(coefficients2Reversed);

	// An array to store the coefficients of the product will be created.
	let product=[];
	for(let i=0; i<exponents1.length+exponents2.length-1; i++) product.push(0);

	// The exponents will be added which is equal to a multiplication of the coefficients.
	// If an exponent is equal to 256 or bigger, it will be reduced to fit the Galois field 256.
	// Addition in a Galois field 256 is performed by a XOR calculation.
	// The added exponents will be converted to coefficient notation.
	for(let i=0; i<exponents1.length; i++){
		for(let j=0; j<exponents2.length; j++){
			let number=exponents1[i]+exponents2[j];
			if(number>=256) number%=255;
			product[i+j]^=(GF_256_LOG[number]);
		}
	}

	// The product will be reversed back and then returned.
	return product.reverse();
}

/**
 * @description The coefficients will be converted to alpha notation.
 * @param {number[]} coefficients An array representing the coefficients of a polynomial.
 * @returns {number[]} An array representing the exponents of the polynomial.
 */
function convertToAlphaNotation(coefficients){
	// An array to store the exponents will be created.
	let exponents=[];

	// Every coefficient will be converted to a power of alpha depending on the array "GF_256_ANTILOG".
	for(let i=0; i<coefficients.length; i++){
		for(let j=0; j<GF_256_LOG.length; j++){
			if(coefficients[i]>=256) coefficients[i]=GF_256_LOG[Math.log(coefficients[i])/Math.log(ALPHA)];
			for(let j=0; j<GF_256_ANTILOG.length; j++){
				if(coefficients[i]==j+1) exponents[i]=GF_256_ANTILOG[j];
			}
		}
	}

	// The array will be returned.
	return exponents;
}

/**
 * @description For each group and block error correction codewords will be generated.
 * @param {Groups} messageCoefficientsGroups An object representing two groups of blocks consisting of message coefficients.
 * @param {number} errorCodewordsCount The number of error correction codewords per block.
 * @param {number[]} generatorCoefficients An array representing the coefficients of the generator polynomial.
 * @returns {Groups} An object representing two groups of blocks consisting of error correction codewords.
 */
function generateErrorCodewordGroups(messageCoefficientsGroups, errorCodewordsCount, generatorCoefficients){
	// The groups will be created and filled with the correct count of blocks and error correction codewords.
	let group1=fillErrorCodewordGroup(messageCoefficientsGroups.group1, errorCodewordsCount, generatorCoefficients);
	let group2=fillErrorCodewordGroup(messageCoefficientsGroups.group2, errorCodewordsCount, generatorCoefficients);

	// An object to store the two groups of blocks of error correction codewords will be returned.
	return new Groups(group1, group2);
}

/**
 * @description The group will be filled with the correct count of blocks and error correction codewords.
 * @param {number[][]} messageCoefficientsGroup A group of blocks consisting of message coefficients.
 * @param {number} errorCodewordsCount The number of error correction codewords per block.
 * @param {number[]} generatorCoefficients An array representing the coefficients of the generator polynomial.
 * @returns {number[][]} An array that stores blocks of error correction codewords.
 */
function fillErrorCodewordGroup(messageCoefficientsGroup, errorCodewordsCount, generatorCoefficients){
	// An array to store the blocks will be created.
	let group=[];

	// The group will be filled with the correct count of blocks.
	// The blocks will be filled with the correct count of error correction codewords.
	for(let i=0; i<messageCoefficientsGroup.length; i++){
		// The message polynomial will be multiplied by x^n where n is the count of the error correction codewords.
		let coefficients1=[];
		for(let j=0; j<errorCodewordsCount; j++) coefficients1.push(0);
		coefficients1.unshift(1);
		const messagePolynomial=multiplyPolynomials(messageCoefficientsGroup[i], coefficients1);

		// The generator polynomial will be multiplied by x^n where n is the difference of the biggest exponent of the two polynomials.
		let coefficients2=[];
		for(let j=0; j<messagePolynomial.length-generatorCoefficients.length; j++) coefficients2.push(0);
		coefficients2.unshift(1);
		const generatorPolynomial=multiplyPolynomials(generatorCoefficients, coefficients2);

		// The two variables "lead" and "polynomial" that will get a new value every time the loop runs will be created.
		let lead=[messagePolynomial[0]];
		let polynomial=messagePolynomial;

		// A new polynomial will be generated by the multiplication of the edited generator polynomial and the leading term of the edited message polynomial.
		// A second new polynomial will be generated by a XOR calculation of the first new polynomial and the edited message polynomial.
		// The leading zero coefficient of the second new polynomial will be removed.
		// The last zero coefficient of the second new polynomial will be removed.
		// The two variables "lead" and "polynomial" will be prepared for the next run.
		for(let j=0; j<messageCoefficientsGroup[i].length; j++){
			const polynomial1=multiplyPolynomials(generatorPolynomial, lead);
			let polynomialJ=[];
			for(let k=0; k<polynomial1.length; k++) polynomialJ.push(polynomial1[k]^polynomial[k]);
			polynomialJ.shift();
			polynomialJ.splice(polynomialJ.length-j, polynomialJ.length);
			lead=[polynomialJ[0]];
			polynomial=polynomialJ;
		}
		group.push(polynomial);
	}

	// The array will be returned.
	return group;
}

/**
 * @description The given groups and blocks of codewords will be interleaved.
 * @param {Groups} codewordGroups An object representing two groups of blocks consisting of data codewords (strings) or error correction codewords (numbers).
 * @returns {number[]|string[]} An array consisting of interleaved codewords.
 */
function interleaveCodewords(codewordGroups){
	// A variable to store the total number of codewords.
	let codewordsLength=0;

	// The blocks of the groups will be stored togehter inside one array.
	// The total number of codewords will be increased.
	let blocks=[];
	for(let i=0; i<codewordGroups.group1.length; i++){
		blocks.push(codewordGroups.group1[i]);
		for(let j=0; j<codewordGroups.group1[i].length; j++) codewordsLength++;
	}
	for(let i=0; i<codewordGroups.group2.length; i++){
		blocks.push(codewordGroups.group2[i]);
		for(let j=0; j<codewordGroups.group2[i].length; j++) codewordsLength++;
	}

	// A variable to store the index of the second dimension of the array "blocks" will be created.
	let j=0;

	// An array to store the interleaved codewords will be created.
	let interleavedCodewords=[];

	// For every block, all codewords at the same index will be stored in a new array.
	// The resulting array contains all codewords grouped by their index.
	// Because the blocks of the first group could be shorter than the blocks of the second group, the value has to be checked for existence at the last indices of the blocks of the first group.
	while(j*blocks.length<codewordsLength){
		for(let i=0; i<blocks.length; i++){
			if(blocks[i][j]!==undefined) interleavedCodewords.push(blocks[i][j]);
		}
		j++;
	}

	// The array will be returned.
	return interleavedCodewords;
}

/**
 * @description The interleaved binary codewords will be generated of the interleaved data codewords and the interleaved error correction codewords.
 * @param {string[]} interleavedDataCodewords An array consisting of interleaved data codewords.
 * @param {number[]} interleavedErrorCodewords An array consisting of interleaved error correction codewords.
 * @returns {string} The interleaved binary codewords.
 */
function generateInterleavedBinaries(interleavedDataCodewords, interleavedErrorCodewords){
	// A variable to store the interleaved binary codewords will be created.
	// The interleaved data codewords will be concatinated to a string.
	let interleavedBinaries=interleavedDataCodewords.join("");

	// The interleaved error correction codewords will be converted to binaries and concatinated to a string.
	for(let i=0; i<interleavedErrorCodewords.length; i++) interleavedBinaries+=interleavedErrorCodewords[i].toString(2).padStart(8, "0");

	// The interleaved binary codewords will be returned.
	return interleavedBinaries;
}

/**
 * @description A string of remaining bits will be created.
 * @param {number} version The smallest possible version.
 * @returns {string} A string consisting of a special count of zeros.
 */
function generateRemainderBits(version){
	// A variable to store the remaining bits will be created.
	let remainderBits="";

	// The string of remaining bits will be created by filling it up with the correct count of zeros.
	// Different groups of versions need a specific length of the remaining bits.
	// In some cases, no remaining bits are needed.
	if(version>=2&&version<=6) return remainderBits.padStart(7, "0");
	if((version>=14&&version<=20)||(version>=28&&version<=34)) return remainderBits.padStart(3, "0");
	if(version>=21&&version<=27) return remainderBits.padStart(4, "0");

	// The remaining bits will be returned.
	return remainderBits;
}

/**
 * @typedef {Object} Matrix
 * @property {number[][]} matrix A two-dimensional array representing the matrix.
 * @property {number[][][]} maskedMatrizes An array of eight masked copies of the matrix.
 * @property {number[]} penaltyScores ToDo
 * @property {number[][]} bestMask The index of the masked matrix with the lowest penalty score.
 * @method draw The matrix will be displayed as a stack of rows and columns of HTML container elements.
 */
/**
 * @description A Matrix object. The two-dimensional representation of the data of the QR code.
 * @class
 * @type {Matrix}
 * @param {number} version The smallest possible version.
 * @param {string} data The data of the QR code consisting of the interleaved binary codewords and the remainder bits.
 * @param @param {string} levelIndicator The level indicator.
 */
class Matrix{
	constructor(version, data, levelIndicator){
		const reserve=true;
		this.matrix=generateMatrix(version);
		placeDarkModule(this.matrix, version, reserve);
		placeSeparators(reserve, this.matrix);
		placeAlignmentPatterns(version, reserve, this.matrix);
		placeTimingPatterns(this.matrix, reserve);
		reserveFormatBits(this.matrix);
		reserveVersionBits(version, this.matrix);
		addData(this.matrix, data);
		this.maskedMatrizes=generateMaskedMatrizes(this.matrix, version, levelIndicator);
		this.penaltyScores=calculatePenaltyScores(this.maskedMatrizes);
		this.bestMask=chooseBestMask(this.penaltyScores);
		this.draw=function(id){
			drawMatrix(this.maskedMatrizes[this.bestMask], id);
			//ToDo: createSvg(this.maskedMatrizes[this.bestMask]);
		}
	}
}

/**
 * @description The matrix for the QR code will be generated.
 * @param {number} version The smallest possible version.
 * @returns {number[][]} A two-dimensional array representing the empty matrix.
 */
function generateMatrix(version){
	// A variable to store the length of the axes will be created.
	// The minimum size is 21*21 modules.
	// Every next version will increase the size by four modules on both axes.
	const size=21+(version-1)*4;

	// A two-dimensional array with the calculated size will be created.
	// At this point every value will be "undefined".
	let matrix=[];
	for(let i=0; i<size; i++){
		matrix[i]=[];
		for(let j=0; j<size; j++) matrix[i][j]=undefined;
	}

	// The array will be returned.
	return matrix;
}

/**
 * @description The dark module will be reserved or generated.
 * @param {number[][]} matrix A two-dimensional array representing the matrix.
 * @param {number} version The smallest possible version.
 * @param {boolean} reserve A variable that signs if the areas will be reserved or generated.
 * @returns {void}
 */
function placeDarkModule(matrix, version, reserve){
	// The dark module is always at the same point and will be set to the reserved state or to one.
	matrix[version*4+9][8]=reserve?MODULES.reservedState:1;
}

/**
 * @description The area for the separators will be reserved or generated.
 * @param {boolean} reserve A variable that signs if the areas will be reserved or generated.
 * @param {number[][]} matrix A two-dimensional array representing the matrix.
 * @returns {void}
 */
function placeSeparators(reserve, matrix){
	// In the first run the value will be set to the reserved state.
	// In the second run the value will be set to zero.
	const value=reserve?MODULES.reservedState:0;

	// The separators are borders of one module around two sides of the finder patterns.
	// A field of eight by eight modules will be set to the reserve state or zero.
	// A part of the field will be overwritten by the finder patterns.
	for(let i=0; i<8; i++){
		for(let j=0; j<8; j++){
			matrix[i][j]=value;
			matrix[i][matrix[i].length-1-j]=value;
			matrix[matrix[i].length-1-i][j]=value;
		}
	}
}

/**
 * @description The areas for the alignment patterns will be reserved or generated.
 * @param {number} version The smallest possible version.
 * @param {boolean} reserve A variable that signs if the areas will be reserved or generated.
 * @param {number[][]} matrix A two-dimensional array representing the matrix.
 * @returns {void}
 */
function placeAlignmentPatterns(version, reserve, matrix){
	// For versions higher than version one alignment patterns are needed.
	if(version>1){
		// Every possible tuple of coordinates will be used as the center of the alignment patterns.
		const coordinates=[6, ALIGNMENT_PATTERN_COORDINATES.coordinates1[version-2], ALIGNMENT_PATTERN_COORDINATES.coordinates2[version-2], ALIGNMENT_PATTERN_COORDINATES.coordinates3[version-2], ALIGNMENT_PATTERN_COORDINATES.coordinates4[version-2], ALIGNMENT_PATTERN_COORDINATES.coordinates5[version-2], ALIGNMENT_PATTERN_COORDINATES.coordinates6[version-2]].filter(Number);

		// An array to store the center modules of the alignment patterns will be created.
		let moduleCenters=[];
		for(let i=0; i<coordinates.length; i++){
			for(let j=0; j<coordinates.length; j++) moduleCenters.push([coordinates[i], coordinates[j]]);
		}

		// Alignment patterns shall not overwrite the areas of the finder patterns and their separators.
		// They will be generated in three steps.
		// In the first step a field of five by five modules around the center will be set to ones.
		// In the second step a field of three by three modules around the center will be set to zeros.
		// In the third step the center will be set to one.
		for(let i=0; i<moduleCenters.length; i++){
			let isEmpty=true;
			for(let j=-2; j<3; j++){
				for(let k=-2; k<3; k++){
					if((reserve&&matrix[moduleCenters[i][0]+j][moduleCenters[i][1]+k]!==undefined)||(!reserve&&matrix[moduleCenters[i][0]+j][moduleCenters[i][1]+k]!=MODULES.reservedState)) isEmpty=false;
				}
			}
			if(isEmpty){
				for(let j=-2; j<3; j++){
					for(let k=-2; k<3; k++) matrix[moduleCenters[i][0]+j][moduleCenters[i][1]+k]=reserve?MODULES.reservedState:1;
				}
				if(!reserve){
					for(let j=-1; j<2; j++){
						for(let k=-1; k<2; k++) matrix[moduleCenters[i][0]+j][moduleCenters[i][1]+k]=0;
					}
					matrix[moduleCenters[i][0]][moduleCenters[i][1]]=1;
				}
			}
		}
	}
}

/**
 * @description The areas for the timing patterns will be reserved or generated.
 * @param {number[][]} matrix A two-dimensional array representing the matrix.
 * @param {boolean} reserve A variable that signs if the areas will be reserved or generated.
 * @returns {void}
 */
function placeTimingPatterns(matrix, reserve){
	// The timing patterns are lines between the top left finder pattern and the other two finder patterns.
	// The timing patterns consist of single ones and zeros following each other.
	// The timing patterns fit in the alignment patterns so they can not change them by overriding.
	for(let i=8; i<matrix.length-8; i++){
		if(reserve){
			matrix[6][i]=MODULES.reservedState;
			matrix[i][6]=MODULES.reservedState;
		}
		else{
			matrix[6][i]=(i%2==0)?1:0;
			matrix[i][6]=(i%2==0)?1:0;
		}
	}
}

/**
 * @description The areas to store the format information will be reserved.
 * @param {number[][]} matrix A two-dimensional array representing the matrix.
 * @returns {void}
 */
function reserveFormatBits(matrix){
	// The areas to store the format information will be reserved.
	for(let i=0; i<9; i++){
		if(matrix[i][8]===undefined) matrix[i][8]=MODULES.reservedState;
		if(matrix[8][i]===undefined) matrix[8][i]=MODULES.reservedState;
	}
	for(let i=0; i<8; i++) matrix[8][matrix[8].length-1-i]=MODULES.reservedState;
	for(let i=0; i<7; i++) matrix[matrix[8].length-1-i][8]=MODULES.reservedState;
}

/**
 * @description The areas to store the format information will be reserved.
 * @param {number} version The smallest possible version.
 * @param {number[][]} matrix A two-dimensional array representing the matrix.
 * @returns {void}
 */
function reserveVersionBits(version, matrix){
	// For versions higher or equal to seven, the areas to store the version information will be reserved.
	if(version>=7){
		for(let i=0; i<6; i++){
			for(let j=0; j<3; j++){
				matrix[i][matrix[i].length-9-j]=MODULES.reservedState;
				matrix[matrix[i].length-9-j][i]=MODULES.reservedState;
			}
		}
	}
}

/**
 * @description The interleaved binary data codewords and error correction codewords will be placed inside the matrix.
 * @param {number[][]} matrix A two-dimensional array representing the matrix.
 * @param {string} data The data of the QR code consisting of the interleaved binary codewords and the remainder bits.
 * @returns {void}
 */
function addData(matrix, data){
	// A variable to store the index of the column of the matrix.
	let j=matrix[0].length-1;

	// The data will be placed inside the matrix where modules are not reserved.
	// The placement starts in the right bottom corner.
	// The bits will always be placed inside two columns first bottom up followed by top down.
	// When the placement reaches the vertical timing pattern, this column will be skipped.
	while(data.length>0){
		for(let i=matrix.length-1; i>=0; i--){
			if(matrix[i][j]===undefined){
				matrix[i][j]=parseInt(data.charAt(0));
				data=data.slice(1);
			}
			if(data.length>0&&matrix[i][j-1]===undefined){
				matrix[i][j-1]=parseInt(data.charAt(0));
				data=data.slice(1);
			}
		}
		j-=2;
		if(j==6) j--;
		for(let i=0; i<matrix.length; i++){
			if(data.length>0&&matrix[i][j]===undefined){
				matrix[i][j]=parseInt(data.charAt(0));
				data=data.slice(1);
			}
			if(data.length>0&&matrix[i][j-1]===undefined){
				matrix[i][j-1]=parseInt(data.charAt(0));
				data=data.slice(1);
			}
		}
		j-=2;
	}
}

/**
 * @description Eight copies of the matrix will be generated and masked differently.
 * @param {number[][]} matrix A two-dimensional array representing the matrix.
 * @param {number} version The smallest possible version.
 * @param {string} levelIndicator The level indicator.
 * @returns {number[][][]} An array of eight masked copies of the matrix.
 */
function generateMaskedMatrizes(matrix, version, levelIndicator){
	// Eight copies of the matrix will be created.
	// The original shall not be changed.
	let maskedMatrizes=[];
	for(let i=0; i<8; i++) maskedMatrizes.push(copyMatrix(matrix));

	// For every copy a different mask will be applied.
	for(let i=0; i<matrix.length; i++){
		for(let j=0; j<matrix[i].length; j++){
			if(maskedMatrizes[0][i][j]!=MODULES.reservedState&&(i+j)%2==0) maskedMatrizes[0][i][j]=(maskedMatrizes[0][i][j]==0)?1:0;
			if(maskedMatrizes[1][i][j]!=MODULES.reservedState&&i%2==0) maskedMatrizes[1][i][j]=(maskedMatrizes[1][i][j]==0)?1:0;
			if(maskedMatrizes[2][i][j]!=MODULES.reservedState&&j%3==0) maskedMatrizes[2][i][j]=(maskedMatrizes[2][i][j]==0)?1:0;
			if(maskedMatrizes[3][i][j]!=MODULES.reservedState&&(i+j)%3==0) maskedMatrizes[3][i][j]=(maskedMatrizes[3][i][j]==0)?1:0;
			if(maskedMatrizes[4][i][j]!=MODULES.reservedState&&(Math.floor(i/2)+Math.floor(j/3))%2==0) maskedMatrizes[4][i][j]=(maskedMatrizes[4][i][j]==0)?1:0;
			if(maskedMatrizes[5][i][j]!=MODULES.reservedState&&((i*j)%2)+((i*j)%3)==0) maskedMatrizes[5][i][j]=(maskedMatrizes[5][i][j]==0)?1:0;
			if(maskedMatrizes[6][i][j]!=MODULES.reservedState&&(((i*j)%2)+((i*j)%3))%2==0) maskedMatrizes[6][i][j]=(maskedMatrizes[6][i][j]==0)?1:0;
			if(maskedMatrizes[7][i][j]!=MODULES.reservedState&&(((i+j)%2)+((i*j)%3))%2==0) maskedMatrizes[7][i][j]=(maskedMatrizes[7][i][j]==0)?1:0;
		}
	}

	// The modules will be placed inside the copies.
	const reserve=false;
	for(let i=0; i<maskedMatrizes.length; i++){
		placeDarkModule(maskedMatrizes[i], version, reserve);
		placeSeparators(reserve, maskedMatrizes[i]);
		addFinderPatterns(maskedMatrizes[i]);
		placeAlignmentPatterns(version, reserve, maskedMatrizes[i]);
		placeTimingPatterns(maskedMatrizes[i], reserve);
		addFormatBits(levelIndicator, i, maskedMatrizes[i]);
		//addVersionBits(version);
	}

	// The eight copies will be returned.
	return maskedMatrizes;
}

/**
 * @description The matrix will be copied because the changes shall not be applied to the original.
 * @param {number[][]} matrix A two-dimensional array representing a matrix.
 * @returns {number[][]} A copy of the matrix.
 */
function copyMatrix(matrix){
	// A copy of the matrix will be created.
	let copiedMatrix=[];
	for(let i=0; i<matrix.length; i++){
		copiedMatrix[i]=[];
		for(let j=0; j<matrix[i].length; j++) copiedMatrix[i][j]=matrix[i][j];
	}

	// The copy will be returned.
	return copiedMatrix;
}

/**
 * @description The finder patterns will be placed inside the matrix.
 * @param {number[][]} maskedMatrix A two-dimensional array representing the masked matrix.
 * @returns {void}
 */
function addFinderPatterns(maskedMatrix){
	// The finder patterns will be placed in the top left, top right and bottom left corners.
	// They will be generated in three steps.
	// In the first step a field of seven by seven modules will be set to ones.
	// In the second step a field of five by five modules will be set to zeros in the middle of the first area.
	// In the third step a field of three by three modules will be set to ones in the middle of the second area.
	for(let i=0; i<7; i++){
		for(let j=0; j<7; j++){
			maskedMatrix[i][j]=1;
			maskedMatrix[i][maskedMatrix[i].length-1-j]=1;
			maskedMatrix[maskedMatrix[i].length-1-i][j]=1;
		}
	}
	for(let i=1; i<6; i++){
		for(let j=1; j<6; j++){
			maskedMatrix[i][j]=0;
			maskedMatrix[i][maskedMatrix[i].length-1-j]=0;
			maskedMatrix[maskedMatrix[i].length-1-i][j]=0;
		}
	}
	for(let i=2; i<5; i++){
		for(let j=2; j<5; j++){
			maskedMatrix[i][j]=1;
			maskedMatrix[i][maskedMatrix[i].length-1-j]=1;
			maskedMatrix[maskedMatrix[i].length-1-i][j]=1;
		}
	}
}

//ToDo
function addFormatBits(levelIndicator, maskNumber, maskedMatrix){
	let formatInformation=levelIndicator+maskNumber.toString(2).padStart(3, "0");

	let correctionInformation=formatInformation.padEnd(15, "0");
	correctionInformation=correctionInformation.replace(/^0+/, "");

	const generatorCoefficients="10100110111";

	while(correctionInformation.length>10){
		const generatorCoefficientsW=generatorCoefficients.padEnd(correctionInformation.length, "0");
		let correctionInformationW="";
		for(let i=0; i<generatorCoefficientsW.length; i++) correctionInformationW+=correctionInformation.charAt(i)^generatorCoefficientsW.charAt(i);
		correctionInformation=correctionInformationW.replace(/^0+/, "");
	}

	formatInformation+=correctionInformation.padStart(10, "0");

	const mask="101010000010010";
	let formatBits="";
	for(let i=0; i<formatInformation.length; i++) formatBits+=formatInformation.charAt(i)^mask.charAt(i);

	let characterIndex=0;
	for(let i=0; i<9; i++){
		if(maskedMatrix[8][i]==MODULES.reservedState&&i!=6){
			maskedMatrix[8][i]=formatBits.charAt(characterIndex);
			characterIndex++;
		}
	}
	for(let i=7; i>=0; i--){
		if(maskedMatrix[i][8]==MODULES.reservedState&&i!=6){
			maskedMatrix[i][8]=formatBits.charAt(characterIndex);
			characterIndex++;
		}
	}
	for(let i=0; i<7; i++) maskedMatrix[maskedMatrix[8].length-1-i][8]=formatBits.charAt(i);
	characterIndex=7;
	for(let i=7; i>=0; i--){
		maskedMatrix[8][maskedMatrix[8].length-1-i]=formatBits.charAt(characterIndex);
		characterIndex++;
	}
}

//ToDo
function addVersionBits(version){
	if(version>=7){
		//18 bit string
	}
}

//ToDo
function calculatePenaltyScores(maskedMatrizes){
	let penaltyScores=[];

	for(let i=0; i<maskedMatrizes.length; i++){
		let penaltyScore=0;
		//1 The first rule gives the QR code a penaltyScore for each group of five or more same-colored modules in a row (or column).
		for(let j=0; j<maskedMatrizes[i].length; j++){
			for(let k=0; k<maskedMatrizes[i][j].length-4; k++){
				if(maskedMatrizes[i][j][k]==maskedMatrizes[i][j][k+1]&&maskedMatrizes[i][j][k]==maskedMatrizes[i][j][k+2]&&maskedMatrizes[i][j][k]==maskedMatrizes[i][j][k+3]&&maskedMatrizes[i][j][k]==maskedMatrizes[i][j][k+4]){
					penaltyScore+=3;
					k+=5;
					while(k<maskedMatrizes[i][j].length&&maskedMatrizes[i][j][k]==maskedMatrizes[i][j][k-1]){
						penaltyScore++;
						k++;
					}
				}
			}
			for(let k=0; k<maskedMatrizes[i][j].length-4; k++){
				if(maskedMatrizes[i][k][j]==maskedMatrizes[i][k+1][j]&&maskedMatrizes[i][k][j]==maskedMatrizes[i][k+2][j]&&maskedMatrizes[i][k][j]==maskedMatrizes[i][k+3][j]&&maskedMatrizes[i][k][j]==maskedMatrizes[i][k+4][j]){
					penaltyScore+=3;
					k+=5;
					while(k<maskedMatrizes[i][j].length&&maskedMatrizes[i][k][j]==maskedMatrizes[i][k-1][j]){
						penaltyScore++;
						k++;
					}
				}
			}
		}
		//2 The second rule gives the QR code a penaltyScore for each 2x2 area of same-colored modules in the matrix
		for(let j=0; j<maskedMatrizes[i].length-1; j++){
			for(let k=0; k<maskedMatrizes[i][j].length-1; k++){
				if(maskedMatrizes[i][j][k]==maskedMatrizes[i][j][k+1]&&maskedMatrizes[i][j][k]==maskedMatrizes[i][j+1][k]&&maskedMatrizes[i][j][k]==maskedMatrizes[i][j+1][k+1]) penaltyScore+=3;
			}
		}
		//3 The third rule gives the QR code a large penaltyScore if there are patterns that look similar to the finder patterns.
		for(let j=0; j<maskedMatrizes[i].length; j++){
			for(let k=0; k<maskedMatrizes[i][j].length-6; k++){
				if((maskedMatrizes[i][j][k]==1&&maskedMatrizes[i][j][k+1]==0&&maskedMatrizes[i][j][k+2]==1&&maskedMatrizes[i][j][k+3]==1&&maskedMatrizes[i][j][k+4]==1&&maskedMatrizes[i][j][k+5]==0&&maskedMatrizes[i][j][k+6]==1)&&((k<maskedMatrizes[i][j].length-10&&(maskedMatrizes[i][j][k+7]==0&&maskedMatrizes[i][j][k+8]==0&&maskedMatrizes[i][j][k+9]==0&&maskedMatrizes[i][j][k+10]==0))||(k>=4&&(maskedMatrizes[i][j][k-1]==0&&maskedMatrizes[i][j][k-2]==0&&maskedMatrizes[i][j][k-3]==0&&maskedMatrizes[i][j][k-4]==0)))) penaltyScore+=40;
			}
			for(let k=0; k<maskedMatrizes[i][j].length-6; k++){
				if((maskedMatrizes[i][k][j]==1&&maskedMatrizes[i][k+1][j]==0&&maskedMatrizes[i][k+2][j]==1&&maskedMatrizes[i][k+3][j]==1&&maskedMatrizes[i][k+4][j]==1&&maskedMatrizes[i][k+5][j]==0&&maskedMatrizes[i][k+6][j]==1)&&((k<maskedMatrizes[i][j].length-10&&(maskedMatrizes[i][k+7][j]==0&&maskedMatrizes[i][k+8][j]==0&&maskedMatrizes[i][k+9][j]==0&&maskedMatrizes[i][k+10][j]==0))||(k>=4&&(maskedMatrizes[i][k-1][j]==0&&maskedMatrizes[i][k-2][j]==0&&maskedMatrizes[i][k-3][j]==0&&maskedMatrizes[i][k-4][j]==0)))) penaltyScore+=40;
			}
		}
		//4 The fourth rule gives the QR code a penaltyScore if more than half of the modules are dark or light, with a larger penaltyScore for a larger difference
		let darkModulesCount=0;
		for(let j=0; j<maskedMatrizes[i].length; j++){
			for(let k=0; k<maskedMatrizes[i][j].length; k++){
				if(maskedMatrizes[i][j][k]==1) darkModulesCount++;
			}
		}
		const modulesCount=maskedMatrizes[i].length*maskedMatrizes[i][0].length;
		const darkModulesPercentage=(darkModulesCount/modulesCount)*100;
		let previousMultipleOfFive=Math.floor(darkModulesPercentage);
		previousMultipleOfFive-=previousMultipleOfFive%5;
		let nextMultipleOfFive=Math.ceil(darkModulesPercentage);
		nextMultipleOfFive+=5-(nextMultipleOfFive%5);
		const previousAbsolute=Math.abs(previousMultipleOfFive-50);
		const nextAbsolute=Math.abs(nextMultipleOfFive-50);
		const previousDivided=previousAbsolute/5;
		const nextDivided=nextAbsolute/5;
		penaltyScore+=(previousDivided<nextDivided)?previousDivided*10:nextDivided*10;
		penaltyScores.push(penaltyScore);
	}

	return penaltyScores;
}

/**
 * @description The masked matrix with the lowest penalty score will be chosen.
 * @param {number[]} penaltyScores ToDo
 * @returns {number} The index of the masked matrix with the lowest penalty score.
 */
function chooseBestMask(penaltyScores){
	// For all penalty scores the minimum will be chosen.
	// The index of the minimal penalty score is the index of the best masked matrix.
	// The best masked matrix will be returned.
	for(let i=0; i<penaltyScores.length; i++){
		if(penaltyScores[i]==Math.min(...penaltyScores)) return i;
	}
}

/**
 * @description The matrix will be displayed as a stack of rows and columns of HTML container elements.
 * @param {number[][]} matrix A two-dimensional array representing the matrix.
 * @param {string} id The ID of the HTML element which content will be set.
 * @returns {void}
 */
function drawMatrix(matrix, id){
	// A variable to store the class name will be generated.
	let cssClass;

	// A variable to store the HTML code.
	let htmlCode="";

	// For every module HTML code for a new container element will be created with a special class.
	// At the end of a row HTML code for a special container element to break the line will be created.
	// The HTML code will be concatinated.
	for(let i=0; i<matrix.length; i++){
		for(let j=0; j<matrix[i].length; j++){
			if(DEBUG){
				if(matrix[i][j]===undefined) cssClass="module-undefined";
				if(matrix[i][j]==MODULES.reservedState) cssClass="module-reserved";
			}
			if(matrix[i][j]==1) cssClass=MODULES.classModuleDark;
			if(matrix[i][j]==0) cssClass="module-light";
			htmlCode+='<div class="'+MODULES.classModule+" "+cssClass+'"></div>';
			if(j==matrix[i].length-1) htmlCode+='<div class="break"></div>';
		}
	}

	// The generated HTML code will be set to the HTML element with the given ID.
	const element=document.getElementById(id);
	element.innerHTML=htmlCode;

	// In case the generated matrix is bigger than 470 pixels, the size of the modules and the padding of the matrix will be reduced.
	//ToDo: Why 470?
	const modules=element.querySelectorAll("."+MODULES.classModule);
	let size=parseInt(getCss(modules[0], "width").replace("px", ""));
	while(parseInt(getCss(element, "width").replace("px", ""))>470){
		size--;
		for(let i=0; i<modules.length; i++){
			modules[i].style.height=size+"px";
			modules[i].style.width=size+"px";
		}
	}
	element.style.padding=(size*4)+"px";
}

//ToDo
/*function createSvg(matrix){
	const namespace="http://www.w3.org/2000/svg";
	const size=(matrix.length+8)*9;

	let svg=document.createElementNS(namespace, "svg");
	svg.setAttribute("xmlns", namespace);
	svg.setAttribute("viewbox", "0 0 "+size+" "+size);
	svg.setAttribute("width", size);
	svg.setAttribute("height", size);

    let color="";

	for(let i=0; i<matrix.length; i++){
		for(let j=0; j<matrix[i].length; j++){
			color=(matrix[i][j]==0)?"#FFF":"#000";
			let rectangle=document.createElementNS(namespace, "rect");
			rectangle.setAttribute("x", (j+4)*9);
			rectangle.setAttribute("y", (i+4)*9);
			rectangle.setAttribute("width", "9");
			rectangle.setAttribute("height", "9");
			rectangle.setAttribute("fill", color);
			svg.appendChild(rectangle);
		}
	}
	
	document.getElementById("svg").textContent=svg.outerHTML;
}*/

//ToDo
function sendMail(){
	/*Email.send({
		SecureToken: "99bc3b21-f7d2-48b5-8609-db7f77f6f1d4",
		To: "gerhaupt.nerdit@gmail.com",
		From: "gerhaupt.nerdit@gmail.com",
		Subject: "QR Box",
		Body: "Test...",
		Attachments: [{
			name: "smtpjs.png",
			path: "https://networkprogramming.files.wordpress.com/2017/11/smtpjs.png"
		}]
	}).then(function(message){
			alert(message);
	});*/
}

/**
 * @description The polynomial will be printed on the console. This function is for debugging only.
 * @param {number[]} coefficients An array representing the coefficients of a polynomial.
 * @returns {void}
 */
/*function printPolynomial(coefficients){
	let polynomial="";
	for(let i=0; i<coefficients.length; i++){
		if(coefficients[i]>0){
			polynomial+=coefficients[i];
			if(i<coefficients.length-1) polynomial+="x^"+(coefficients.length-1-i)+"+";
			//ToDo: If a part has the coefficient "0", a "+" will be displayed without a number following.
		}
	}
	console.log(polynomial);
}*/

//https://www.qrcode.com/en/
//https://www.thonky.com/qr-code-tutorial/format-version-information