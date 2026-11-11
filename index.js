import fs from 'node:fs/promises';

/**
 *	Processes stage 1
 *	@returns {number} next stage
 */
async function stage1(){
	try {
	  if ( !process.env?.test1 ) throw new Error("No valid test1 property");
	  const content = `${process.env.test1}\n`;
	  if ( !process.env?.test3) {
		  process.env.test3 = `${process.env.test1}updated1`;
		  await fs.appendFile(`${process.env.updatefile}`, `test3=${process.env.test3}\n`);
	  }
	  return 2;
	} catch (err) {
	  console.log(`In stage1, err=${err}`);
	}
}
/**
 *	Processes stage 2
 *	@returns {number} next stage
 */
async function stage2(){
	try {
	  if ( !process.env?.test3 ) throw new Error("No valid test3 property");
	  if ( !process.env?.test4) {
		  process.env.test4 = `${process.env.test3}updated2`;
		  await fs.appendFile(`${process.env.updatefile}`, `test4=${process.env.test4}\n`);
	  }
	  return 0;
	} catch (err) {
	  console.log(`In stage2, err=${err}`);
	}
}
let stage = parseInt(process.argv[2]);

try {
	while (stage){
		switch (stage) {
			case 1:
				stage = await stage1();
				break;
			case 2:
				stage = await stage2();
				break;
			default:
				console.log(`unknown stage: ${stage}`);
		}
	}
	console.log(`end stage 0`);
} catch (err) {
	console.log(`in main catch, err=${err}`);
}