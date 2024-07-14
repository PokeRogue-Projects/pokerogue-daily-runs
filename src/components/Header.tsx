import { Link } from "gatsby";
import React, { useState } from "react";
import { ModeToggle } from "./ModeToggle";
import DatePicker from "./DatePicker";
import { toZonedTime } from "date-fns-tz";

export default function Header() {
    const [date, setDate] = useState<Date>(
        toZonedTime(new Date(Date.now()), "UTC")
    );

    return (
        <div className="container mx-auto">
            <nav className="flex flex-col justify-between items-center gap-3 py-4 md:flex-row">
                <div className="uppercase font-bold">Pokerogue Daily Runs</div>
                <div className="flex gap-6 items-center">
                    <Link to="/">Home</Link>
                    <ModeToggle />
                    <DatePicker date={date} onDateChange={setDate} />
                </div>
            </nav>
        </div>
    );
}
