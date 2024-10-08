import { addMinutes, formatDate, isMatch, isValid, subMinutes } from "date-fns";
import { Link, navigate } from "gatsby";
import React from "react";
import DatePicker from "./DatePicker";
import { ModeToggle } from "./ModeToggle";

export default function Header({ date }: { date?: string }) {
  const handleDateChange = (newDate: Date) => {
    if (isValid(newDate))
      navigate(`/runs/${formatDate(newDate, "yyyy-MM-dd")}`);
  };

  return (
    <div className="container mx-auto">
      <nav className="flex flex-col justify-between items-center gap-3 py-4 md:flex-row">
        <div className="uppercase font-bold">Pokerogue Daily Runs</div>
        <div className="flex gap-6 items-center">
          <Link to="/">Home</Link>
          <ModeToggle />
          {!!date && isMatch(date, "yyyy-MM-dd") && (
            <DatePicker date={addMinutes(new Date(date), new Date().getTimezoneOffset())} onDateChange={handleDateChange} />
            // addMinutes because local timezone is used for display for date picker
            // This will adjust the date to be 00:00 on the local timezone
          )}
        </div>
      </nav>
    </div>
  );
}
