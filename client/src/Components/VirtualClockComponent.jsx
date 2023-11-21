import React, { useState } from "react";
import { Clock } from "react-bootstrap-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import { Button, Form, InputGroup } from "react-bootstrap";

function VirtualClockComponent() {
    const [selectedDate, setSelectedDate] = useState(dayjs().toDate());

    return (
        <>
            <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                customInput={
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <Clock style={{ marginRight: "10px" }} />
                        <div>{dayjs(selectedDate).format("YYYY-MM-DD")}</div>
                    </div>
                }
            />
        </>
    );
}

export default VirtualClockComponent;
