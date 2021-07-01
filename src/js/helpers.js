import {TIME_OUT} from './config.js';

const timeOUt = function (time) {
   return new Promise((resolve, reject) => {
      setTimeout(() => {
         reject(new Error('Request Time Out 😛😛😛😛'))
      }, time * 1000)
   })
}

export const getJSON = async function(url) {
   try {
       // Storing the resolved value of this promise in res
    //    const res = await fetch(url);
       const res = await Promise.race([fetch(url), timeOUt(TIME_OUT)]);
       // converting that value into json format
       const data = await res.json();
       // Even 400 is a resolved Promise but we need to throw error when that happens to make it a rejected one
       if (!res.ok) throw new Error(`${data.message} (${res.status})`)  // will be catched in catch block
       return data
   }
   catch(err) {
       throw err
   }
}



