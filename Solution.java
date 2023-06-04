
import java.util.List;

public class Solution {

    private static final int MINUTES_IN_ONE_HOUR = 60;
    private static final int MINUTES_IN_24_HOURS = 24 * MINUTES_IN_ONE_HOUR;
    private static final int INDEX_SEPARATOR_MINUTES_HOURS = 2;//format HH:MM

    public int findMinDifference(List<String> timePoints) {
        int[] frequencyInMinutes = new int[MINUTES_IN_24_HOURS];
        int smallestPointInMinutes = MINUTES_IN_24_HOURS;
        int largestPointInMinutes = 0;

        for (String timePoint : timePoints) {
            int timeInMinutes = convertToMinutes(timePoint);
            ++frequencyInMinutes[timeInMinutes];
            smallestPointInMinutes = Math.min(smallestPointInMinutes, timeInMinutes);
            largestPointInMinutes = Math.max(largestPointInMinutes, timeInMinutes);
        }

        return findMinDifferenceInMinutes(frequencyInMinutes, smallestPointInMinutes, largestPointInMinutes);
    }

    private int findMinDifferenceInMinutes(int[] frequencyInMinutes, int smallestPointInMinutes, int largestPointInMinutes) {
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
                minTimeDifferenceInMinutes = Math.min(minTimeDifferenceInMinutes, findDifferenceInMinutes(tail, head));
                tail = head;
            }
            ++head;
        }

        return minTimeDifferenceInMinutes;
    }

    private int findDifferenceInMinutes(int timePointOneInMinutes, int timePointTwoInMinutes) {
        int firstPossibility = Math.abs(timePointOneInMinutes - timePointTwoInMinutes);
        int secondPossibility = MINUTES_IN_24_HOURS - timePointOneInMinutes + timePointTwoInMinutes;
        int thirdPossibility = MINUTES_IN_24_HOURS - timePointTwoInMinutes + timePointOneInMinutes;
        return Math.min(firstPossibility, Math.min(secondPossibility, thirdPossibility));
    }

    private int convertToMinutes(String time) {
        int hoursInMinutes = Integer.parseInt(time.substring(0, INDEX_SEPARATOR_MINUTES_HOURS)) * MINUTES_IN_ONE_HOUR;
        int givenMinutes = Integer.parseInt(time.substring(INDEX_SEPARATOR_MINUTES_HOURS + 1));
        return hoursInMinutes + givenMinutes;
    }
}
