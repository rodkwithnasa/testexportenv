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
	  return '2';
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
	  return '0';
	} catch (err) {
	  console.log(`In stage2, err=${err}`);
	}
}
if ( env?.stage === undefined ) env.stage = await setEnv( 'stage', '1' );
let newStage;

try {
	while (env.stage !== '0'){
		switch (env.stage) {
			case '1':
				newStage = await stage1();
				break;
			case '2':
				newStage = await stage2();
				break;
			default:
				console.log(`unknown stage: ${stage}`);
		}
		env.stage = await setEnv( 'stage',newStage );
	}
	console.log(`end stage 0`);
} catch (err) {
	console.log(`in main catch, err=${err}`);
}