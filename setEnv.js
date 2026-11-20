import {set} from '@dotenvx/dotenvx';

export default async function setEnv(key, value) {
	const myreturn = await set(key, value, { path: '.env'});
	return myreturn.processedEnvs[0].value;
}
