//**VARIABLES**/
export const apiUrl = 'http://www.spartanappsolutions.com:9000';
export const appEnv = 'Development';

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

/******************************************* 
findProjectByIdFirst:
input: 
    - array<obj> containing an id parameter
    - id<string> id to compare
output: 
    - if found First obj item
    - if not found null
*********************************************/
export function findProjectByIdFirst(objArray, id) {
  let retVal;
  if (!isEmpty(objArray)) {
    const items = objArray.filter(item => item.id === id);
    if (!isEmpty(items)) {
      retVal = items[0];
    } else {
      retVal = null;
    }
  } else {
    retVal = null;
  }
  return retVal;
}

/******************************************* 
findListById:
input: 
    - array<obj> containing an id parameter
    - id<string> id to compare
    exmple: findListById(objArray, "projectid", "1234")
output: 
    - array<obj>
    - if not null
*********************************************/
export function findListById(objArray, key, id) {
  let retVal;
  if (!isEmpty(objArray)) {
    const items = objArray.filter(item => item[key] === id);
    if (!isEmpty(items)) {
      retVal = items;
    } else {
      retVal = null;
    }
  } else {
    retVal = null;
  }
  return retVal;
}

/******************************************* 
searchValue:
input: 
    - array<obj> containing an id parameter
    - value<string> value to search
    exmple: searchValue(objArray, "1234")
output: 
    - array<obj>
    - if not null
*********************************************/
export function searchValue(tasks, projects, value) {
  let retVal = [];
  if (!isEmpty(tasks) && !isEmpty(value)) {
    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      const project = findProjectByIdFirst(projects, task.projectId);
      const isValueInTask = (task.text.toLowerCase().indexOf(value.toLowerCase()) !== -1)
      const isValueInProject = (project.name.toLowerCase().indexOf(value.toLowerCase()) !== -1)
      if (isValueInTask || isValueInProject) {
        const searchItem = retVal.filter(item => item.id === task.id);
        if (isEmpty(searchItem)) {
          retVal.push({
            id: task.id,
            projectName: project.name,
            taskName: task.text,
          });
        }

      }
    }
  }
  return retVal;
}

export function store(key, val = null) {
  let retVal = null;
  if (val && !isEmpty(key)) {
    //sets and returns json string
    retVal = JSON.stringify(val);
    localStorage.setItem(key, retVal);
  } else {
    //get val as json object or null
    const store = localStorage.getItem(key);
    if (!isEmpty(store)) {
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

export function playSound(embedId) {
  const sound = document.getElementById(embedId);
  sound.Play();
}

export function isEqual(value, other) {
  // Get the value type
  var type = Object.prototype.toString.call(value);

  // If the two objects are not the same type, return false
  if (type !== Object.prototype.toString.call(other)) return false;

  // If items are not an object or array, return false
  if (['[object Array]', '[object Object]'].indexOf(type) < 0) return false;

  // Compare the length of the length of the two items
  var valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
  var otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
  if (valueLen !== otherLen) return false;

  // Compare two items
  var compare = function (item1, item2) {

    // Get the object type
    var itemType = Object.prototype.toString.call(item1);

    // If an object or array, compare recursively
    if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
      if (!isEqual(item1, item2)) return false;
    }

    // Otherwise, do a simple comparison
    else {

      // If the two items are not the same type, return false
      if (itemType !== Object.prototype.toString.call(item2)) return false;

      // Else if it's a function, convert to a string and compare
      // Otherwise, just compare
      if (itemType === '[object Function]') {
        if (item1.toString() !== item2.toString()) return false;
      } else {
        if (item1 !== item2) return false;
      }

    }
  };

  // Compare properties
  if (type === '[object Array]') {
    for (var i = 0; i < valueLen; i++) {
      if (compare(value[i], other[i]) === false) return false;
    }
  } else {
    for (var key in value) {
      if (value.hasOwnProperty(key)) {
        if (compare(value[key], other[key]) === false) return false;
      }
    }
  }

  // If nothing failed, return true
  return true;
}

