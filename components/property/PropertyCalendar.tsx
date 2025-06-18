import React, { memo } from 'react';
import { Text } from 'react-native';
import { Calendar } from 'react-native-calendars';

interface MarkedDate {
  selected?: boolean;
  marked?: boolean;
  selectedColor?: string;
  disabled?: boolean;
  startingDay?: boolean;
  endingDay?: boolean;
  color?: string;
  textColor?: string;
  dotColor?: string;
  disableTouchEvent?: boolean;
  periods?: any[];
  customStyles?: any;
}

interface PropertyCalendarProps {
  markedDates: { [date: string]: MarkedDate };
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