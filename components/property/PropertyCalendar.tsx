import React, { memo } from 'react';
import { Text } from 'react-native';
import { Calendar } from 'react-native-calendars';

interface PropertyCalendarProps {
  markedDates: Record<string, any>;
  onDayPress: (day: { dateString: string }) => void;
}

export const PropertyCalendar = memo(({ markedDates, onDayPress }: PropertyCalendarProps) => (
  <>
    <Text className="text-xl font-bold mb-2 text-black dark:text-white mt-6">Select Dates</Text>
    <Calendar
      markingType="period"
      markedDates={markedDates}
      onDayPress={onDayPress}
      minDate={new Date().toISOString().slice(0, 10)}
      disableAllTouchEventsForDisabledDays
    />
  </>
));

PropertyCalendar.displayName = 'PropertyCalendar'; 