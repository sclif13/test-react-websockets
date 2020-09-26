import React from "react"
import { Skeleton } from "antd"

export type DateTimeViewProps = {
    date: Date | null
    connected: Boolean
}

export default ({ date, connected }: DateTimeViewProps) => {
    const options = {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    }
    return (
        <div
            style={{
                textAlign: "center",
                margin: "5px",
                height: "24px",
                color: connected ? "rgba(0, 0, 0, 0.85)" : "rgba(0, 0, 0, 0.5)",
            }}
        >
            {date ? (
                new Intl.DateTimeFormat("ru", options).format(date).replace(",", "")
            ) : (
                <Skeleton.Input style={{ width: 200 }} active={true} size="small" />
            )}
        </div>
    )
}
