import {config} from '@dotenvx/dotenvx';
// Get the encrypted environment
config();
import setEnv from './setEnv.js'

let env = process.env;
/**
 *	Processes stage 1
 *	@returns {number} next stage
 */
async function stage1(){
	try {
	  if ( !env?.test1 ) throw new Error("No valid test1 property");
	  if ( !env?.test3) {
		  env.test3 = await setEnv('test3',`${env.test1}updated1`);
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
	  if ( !env?.test3 ) throw new Error("No valid test3 property");
	  if ( !env?.test4) {
		  env.test4 = await setEnv( 'test4', `${env.test3}updated2`);
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