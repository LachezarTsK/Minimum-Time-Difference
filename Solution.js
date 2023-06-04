
/**
 * @param {string[]} timePoints
 * @return {number}
 */
var findMinDifference = function (timePoints) {
    this.MINUTES_IN_ONE_HOUR = 60;
    this.MINUTES_IN_24_HOURS = 24 * MINUTES_IN_ONE_HOUR;
    this.INDEX_SEPARATOR_MINUTES_HOURS = 2;//format HH:MM

    const frequencyInMinutes = new Array(MINUTES_IN_24_HOURS).fill(0);
    let smallestPointInMinutes = MINUTES_IN_24_HOURS;
    let largestPointInMinutes = 0;

    for (let timePoint of timePoints) {
        let timeInMinutes = convertToMinutes(timePoint);
        ++frequencyInMinutes[timeInMinutes];
        smallestPointInMinutes = Math.min(smallestPointInMinutes, timeInMinutes);
        largestPointInMinutes = Math.max(largestPointInMinutes, timeInMinutes);
    }

    return findMinDifferenceInMinutes(frequencyInMinutes, smallestPointInMinutes, largestPointInMinutes);
};

/**
 * @param {number[]} frequencyInMinutes
 * @param {number} smallestPointInMinutes
 * @param {number} largestPointInMinutes  
 * @return {number}
 */
function findMinDifferenceInMinutes(frequencyInMinutes, smallestPointInMinutes, largestPointInMinutes) {
    let minTimeDifferenceInMinutes = 0;
    if (frequencyInMinutes[smallestPointInMinutes] > 1 || frequencyInMinutes[largestPointInMinutes] > 1) {
        return minTimeDifferenceInMinutes;
    }

    let tail = smallestPointInMinutes;
    let head = smallestPointInMinutes + 1;
    //corner cases, such as smallestTimePoint = 00:01  largestTimePoint = 23:59 etc.
    minTimeDifferenceInMinutes = findDifferenceInMinutes(smallestPointInMinutes, largestPointInMinutes);

    while (head < this.MINUTES_IN_24_HOURS) {
        if (frequencyInMinutes[head] > 1) {
            minTimeDifferenceInMinutes = 0;
            break;
        }
        if (frequencyInMinutes[head] === 1) {
            minTimeDifferenceInMinutes = Math.min(minTimeDifferenceInMinutes, findDifferenceInMinutes(tail, head));
            tail = head;
        }
        ++head;
    }

    return minTimeDifferenceInMinutes;
}

/**
 * @param {number} timePointOneInMinutes
 * @param {number} timePointTwoInMinutes  
 * @return {number}
 */
function findDifferenceInMinutes(timePointOneInMinutes, timePointTwoInMinutes) {
    let firstPossibility = Math.abs(timePointOneInMinutes - timePointTwoInMinutes);
    let secondPossibility = this.MINUTES_IN_24_HOURS - timePointOneInMinutes + timePointTwoInMinutes;
    let thirdPossibility = this.MINUTES_IN_24_HOURS - timePointTwoInMinutes + timePointOneInMinutes;
    return Math.min(firstPossibility, Math.min(secondPossibility, thirdPossibility));
}

/**
 * @param {string} time
 * @return {number}
 */
function convertToMinutes(time) {
    let hoursInMinutes = Number(time.substring(0, this.INDEX_SEPARATOR_MINUTES_HOURS)) * this.MINUTES_IN_ONE_HOUR;
    let givenMinutes = Number(time.substring(this.INDEX_SEPARATOR_MINUTES_HOURS + 1));
    return hoursInMinutes + givenMinutes;
}
