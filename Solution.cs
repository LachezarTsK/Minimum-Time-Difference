
using System;
using System.Collections.Generic;

public class Solution
{
    private static readonly int MINUTES_IN_ONE_HOUR = 60;
    private static readonly int MINUTES_IN_24_HOURS = 24 * MINUTES_IN_ONE_HOUR;
    private static readonly int INDEX_SEPARATOR_MINUTES_HOURS = 2;//format HH:MM

    public int FindMinDifference(IList<string> timePoints)
    {
        int[] frequencyInMinutes = new int[MINUTES_IN_24_HOURS];
        int smallestPointInMinutes = MINUTES_IN_24_HOURS;
        int largestPointInMinutes = 0;

        foreach (var timePoint in timePoints)
        {
            int timeInMinutes = convertToMinutes(timePoint);
            ++frequencyInMinutes[timeInMinutes];
            smallestPointInMinutes = Math.Min(smallestPointInMinutes, timeInMinutes);
            largestPointInMinutes = Math.Max(largestPointInMinutes, timeInMinutes);
        }

        return findMinDifferenceInMinutes(frequencyInMinutes, smallestPointInMinutes, largestPointInMinutes);
    }

    private int findMinDifferenceInMinutes(int[] frequencyInMinutes, int smallestPointInMinutes, int largestPointInMinutes)
    {
        int minTimeDifferenceInMinutes = 0;
        if (frequencyInMinutes[smallestPointInMinutes] > 1 || frequencyInMinutes[largestPointInMinutes] > 1)
        {
            return minTimeDifferenceInMinutes;
        }

        int tail = smallestPointInMinutes;
        int head = smallestPointInMinutes + 1;
        //corner cases, such as smallestTimePoint = 00:01  largestTimePoint = 23:59 etc.
        minTimeDifferenceInMinutes = findDifferenceInMinutes(smallestPointInMinutes, largestPointInMinutes);

        while (head < MINUTES_IN_24_HOURS)
        {
            if (frequencyInMinutes[head] > 1)
            {
                minTimeDifferenceInMinutes = 0;
                break;
            }
            if (frequencyInMinutes[head] == 1)
            {
                minTimeDifferenceInMinutes = Math.Min(minTimeDifferenceInMinutes, findDifferenceInMinutes(tail, head));
                tail = head;
            }
            ++head;
        }

        return minTimeDifferenceInMinutes;
    }

    private int findDifferenceInMinutes(int timePointOneInMinutes, int timePointTwoInMinutes)
    {
        int firstPossibility = Math.Abs(timePointOneInMinutes - timePointTwoInMinutes);
        int secondPossibility = MINUTES_IN_24_HOURS - timePointOneInMinutes + timePointTwoInMinutes;
        int thirdPossibility = MINUTES_IN_24_HOURS - timePointTwoInMinutes + timePointOneInMinutes;
        return Math.Min(firstPossibility, Math.Min(secondPossibility, thirdPossibility));
    }

    private int convertToMinutes(string time)
    {
        int hoursInMinutes = Convert.ToInt32(time.Substring(0, INDEX_SEPARATOR_MINUTES_HOURS)) * MINUTES_IN_ONE_HOUR;
        int givenMinutes = Convert.ToInt32(time.Substring(INDEX_SEPARATOR_MINUTES_HOURS + 1));
        return hoursInMinutes + givenMinutes;
    }
}
