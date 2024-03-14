const colorDiff = require('color-diff');

// กำหนดสีผิว RGB
const skinColorRGB = { R: 249, G: 202, B: 183 };

// เฉดสีที่ต้องการเลือก
const availableColors = [
    { name: '01', R: 253, G: 240, B: 214 },
    { name: '02', R: 250, G: 227, B: 186 },
    { name: '03', R: 233, G: 193, B: 133 },
    { name: '04', R: 209, G: 157, B: 100 },
    { name: '05', R: 248, G: 224, B: 194 },
    { name: '06', R: 248, G: 215, B: 176 },
    { name: '07', R: 226, G: 176, B: 139 },
    { name: '08', R: 205, G: 152, B: 108 },
    { name: '09', R: 250, G: 222, B: 201 },
    { name: '10', R: 250, G: 199, B: 167 },
    { name: '11', R: 218, G: 152, B: 117 },
    { name: '12', R: 188, G: 124, B: 88 },
];


// คำนวณและเลือกสีที่ใกล้เคียงกับสีผิว
let closestColor = availableColors[0];
let minDistance = colorDiff.diff(skinColorRGB, closestColor);

for (let i = 1; i < availableColors.length; i++) {
    const distance = colorDiff.diff(skinColorRGB, availableColors[i]);
    if (distance < minDistance) {
        minDistance = distance;
        closestColor = availableColors[i];
    }
}

console.log("Closest color to skin tone:", closestColor.name);