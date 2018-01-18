//**VARIABLES**/
export const apiUrl = 'http://www.spartanappsolutions.com:9000';


/***Global Functions */
export function newGuid() {
  var i, random;
  var uuid = '';
  for (i = 0; i < 32; i++) {
    random = Math.random() * 16 | 0;
    if (i === 8 || i === 12 || i === 16 || i === 20) {
      uuid += '-';
    }
    uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
      .toString(16);
  }
  return uuid;
}

export function store(key, val=null){
    let retVal = null;
    if(val && !isEmpty(key)) {
      //sets and returns json string
      retVal = JSON.stringify(val);
      localStorage.setItem(key,retVal);
    } else {
      //get val as json object or null
      const store = localStorage.getItem(key);
      if(!isEmpty(store)) {
        retVal = JSON.parse(store) || null;
      }
    }
    return retVal;
}

export function getQueryStringParam(name) {
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.href);
  if (results == null)
    return "";
  else
    return results[1];
}

export function isEmpty(val) {
  var results = true;
  var varType = typeof (val);

  switch (varType) {

    case "string":
      results = !(val.length > 0);
      break;

    case "number":
      results = !(val > 0);
      break;

    case "boolean":
      results = (val) ? false : true;
      break;

    case "null":
    case "undefined":
      results = true;
      break;

    case "object":
      {
        var size = 0, key;
        for (key in val) { if (val.hasOwnProperty(key)) size++; }
        results = !(size > 0);
      }
      break;

    default:
      results = true;
  }
  return results;
}

