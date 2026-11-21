import {set} from '@dotenvx/dotenvx';
/**
 * Sets a key, value pair in the environment file (value encrypted)
 *
 * @param {string} key - the key to set in the environment
 * @param {string} value - the value to set for the key
 * @returns {Promise<string>} - the value that was set on the key
 */
export default async function setEnv(key, value) {
	const myreturn = await set(key, value, { path: '.env'});
	return myreturn.processedEnvs[0].value;
}
