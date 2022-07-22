import { writable } from "svelte/store";
import Cookies from "js-cookie";
//cookieにuidがあればCookieのuidを使う
const cookie = Cookies.get('uid');
console.log('Cookie in uid = ' + cookie);
export const userId = writable(cookie ? cookie : null);