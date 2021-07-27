// *           _   _  _       _     
// *     _   _| |_(_) |___   (_)___ 
// *    | | | | __| | / __|  | / __|
// *    | |_| | |_| | \__ \_ | \__ \
// *    \__,_|\__|_|_|___(_)/ |___/
// *                      |__/     	 

/**
 * Removes a value from a given object
 * 
 * @param {object} object - The object to clean
 * @param {Param} cleaner - The value to clean with, use an array to pass multiple cleaning statements
 * @param {boolean} [isArray] - Use the array as cleaning value instead of multiple cleaning values, default of **false**
 * @param {boolean} [recursive] - Clean with recursion, default of **true**
 * @param {boolean} [cleanEmpty] - Remove all empty objects and arrays, default of **false**
 * 
 * @returns {object} Returns the cleaned object
*/
function cleanObject(object, cleaner, isArray = false, recursive = true, cleanEmpty = false) {
	if (typeof object !== "object") return new Error("Typeof object is not \"object\"")
	if (!cleaner && cleaner !== null && cleaner !== undefined) return new Error("Cleaner not provided")
	if (recursive === null) recursive = true;

	if (Array.isArray(cleaner) && !isArray) {
		for (const value in object) {
			if (cleaner.includes(object[value])) {
				delete object[value]
			}
			if (typeof object[value] === "object" && object[value] !== null && recursive) {
				cleanObject(object[value], cleaner, isArray, recursive, cleanEmpty)
				if (Object.keys(object[value])?.length === 0 && cleanEmpty) delete object[value]
			}
		}
	}

	else {
		for (const value in object) {
			if (object[value] === cleaner) {
				delete object[value]
			}
			if (typeof object[value] === "object" && object[value] !== null && recursive) {
				cleanObject(object[value], cleaner, isArray, recursive, cleanEmpty)
				if (Object.keys(object[value])?.length === 0 && cleanEmpty) delete object[value]
			}
		}
	}
	return object
}

/**
 * Remove all values based on a given [data structure](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)
 * 
 * @param {object} object - The object to clean
 * @param {string} cleaner The value to clean with, must be a valid [data structure](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)
 * @param {boolean} recursive Clean with recursion, default of **true**
 * @param {boolean} cleanEmpty Remove all empty objects and arrays, default of **false**
 * @returns {object} Returns the cleaned object
 * 
 * @example
 * const cleanedObject = cleanObjectByType(dirtyObject, "number", false, true)
 * const cleanedObject = cleanObjectByType(dirtyObject, "string", false, true)
 */
function cleanObjectByType(object, cleaner, recursive = true, cleanEmpty = false) {
	if (typeof object !== "object") return new Error("Typeof object is not \"object\"")
	if (!cleaner) return new Error("Cleaner not provided")
	if (typeof cleaner !== "string") return new Error("Typeof cleaner is not \"string\"")
	if (recursive === null) recursive = true;

	for (const value in object) {
		if (typeof object[value] === cleaner.toLowerCase()) {
			delete object[value]
		}
		if (typeof object[value] === "object" && object[value] !== null && recursive) {
			cleanObjectByType(object[value], cleaner, recursive, cleanEmpty)
			if (Object.keys(object[value])?.length === 0 && cleanEmpty) delete object[value]
		}
	}
	return object
}

/**
 * Capitalise the first letter of a string
 * 
 * @param {string} string String to manipulate the first letter of
 * @param {boolean} [lowercase] Make the rest of the string lowercase, default of **false**
 * @param {boolean} [capitaliseAfterPunct] Capitalise the first letter after an ending punctuation mark
 * @returns {string} Returns new manipulated string
 * 
 * @example
 * const sentence = "this function, its so good! the function can change the entire capitalisation of this sentence."
 * const fixedSentence = capitaliseFirst(sentence, true, true)
 * console.log(fixedSentence) // This function, its so good! The function can change the entire capitalisation of this sentence.
 */
function capitaliseFirst(string, lowercase = false, capitaliseAfterPunct = false) {
	if (!string) return new Error("String not provided")
	if (typeof string !== "string") return new Error("Typeof string is not \"string\"")
	if (lowercase) string = string.toLowerCase()
	if (capitaliseAfterPunct) string = string.replace(/([!?.]\s+)([a-z])/g, function (m, $1, $2) {
		return $1 + $2.toUpperCase();
	});
	return string.charAt(0).toUpperCase() + string.slice(1)
}

module.exports = {
	cleanObject,
	cleanObjectByType,
	capitaliseFirst
}