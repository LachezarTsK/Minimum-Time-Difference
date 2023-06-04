
#include <cmath>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

class Solution {
    
    const static int MINUTES_IN_ONE_HOUR = 60;
    const static int MINUTES_IN_24_HOURS = 24 * MINUTES_IN_ONE_HOUR;
    const static int INDEX_SEPARATOR_MINUTES_HOURS = 2; //format HH:MM

public:
    int findMinDifference(const vector<string>& timePoints) const {
        vector<int> frequencyInMinutes(MINUTES_IN_24_HOURS);
        int smallestPointInMinutes = MINUTES_IN_24_HOURS;
        int largestPointInMinutes = 0;

        for (const auto& timePoint : timePoints) {
            int timeInMinutes = convertToMinutes(timePoint);
            ++frequencyInMinutes[timeInMinutes];
            smallestPointInMinutes = min(smallestPointInMinutes, timeInMinutes);
            largestPointInMinutes = max(largestPointInMinutes, timeInMinutes);
        }

        return findMinDifferenceInMinutes(frequencyInMinutes, smallestPointInMinutes, largestPointInMinutes);
    }

private:
    int findMinDifferenceInMinutes(const vector<int>& frequencyInMinutes, int smallestPointInMinutes, int largestPointInMinutes) const {
        int minTimeDifferenceInMinutes = 0;
        if (frequencyInMinutes[smallestPointInMinutes] > 1 || frequencyInMinutes[largestPointInMinutes] > 1) {
            return minTimeDifferenceInMinutes;
        }

        int tail = smallestPointInMinutes;
        int head = smallestPointInMinutes + 1;
        //corner cases, such as smallestTimePoint = 00:01  largestTimePoint = 23:59 etc.
        minTimeDifferenceInMinutes = findDifferenceInMinutes(smallestPointInMinutes, largestPointInMinutes);

        while (head < MINUTES_IN_24_HOURS) {
            if (frequencyInMinutes[head] > 1) {
                minTimeDifferenceInMinutes = 0;
                break;
            }
            if (frequencyInMinutes[head] == 1) {
                minTimeDifferenceInMinutes = min(minTimeDifferenceInMinutes, findDifferenceInMinutes(tail, head));
                tail = head;
            }
            ++head;
        }

        return minTimeDifferenceInMinutes;
    }

    int findDifferenceInMinutes(int timePointOneInMinutes, int timePointTwoInMinutes) const {
        int firstPossibility = abs(timePointOneInMinutes - timePointTwoInMinutes);
        int secondPossibility = MINUTES_IN_24_HOURS - timePointOneInMinutes + timePointTwoInMinutes;
        int thirdPossibility = MINUTES_IN_24_HOURS - timePointTwoInMinutes + timePointOneInMinutes;
        return min(firstPossibility, min(secondPossibility, thirdPossibility));
    }

    int convertToMinutes(const string& time) const {
        int hoursInMinutes = stoi(time.substr(0, INDEX_SEPARATOR_MINUTES_HOURS)) * MINUTES_IN_ONE_HOUR;
        int givenMinutes = stoi(time.substr(INDEX_SEPARATOR_MINUTES_HOURS + 1));
        return hoursInMinutes + givenMinutes;
    }
};
