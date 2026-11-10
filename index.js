import fs from 'node:fs/promises';

async function stage1(){
	try {
	  if ( !process.env?.test1 ) throw new Error("No valid test1 propery");
	  const content = `${process.env.test1}\n`;
	  if ( !process.env?.test3) await fs.appendFile(`${process.env.updatefile}`, `test3=${content}`);
	} catch (err) {
	  console.log(`In stage1, err=${err}`);
	}
}
async function stage2(){
	try {
	  if ( !process.env?.test3 ) throw new Error("No valid test3 propery");
	  const content = `${process.env.test3}updated\n`;
	  if ( !process.env?.test4) await fs.appendFile(`${process.env.updatefile}`, `test4=${content}`);
	} catch (err) {
	  console.log(`In stage2, err=${err}`);
	}
}
let stage = parseInt(process.argv[2]);

try {
	while (stage){
		switch (stage) {
			case 1:
				await stage1();
				stage = 2;
				break;
			case 2:
				await stage2();
				stage = 0;
				break;
			default:
				console.log(`unknown stage: ${stage}`);
		}
	}
	console.log(`end stage 0`);
} catch (err) {
	console.log(`in main catch, err=${err}`);
}