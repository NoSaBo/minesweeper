import * as React from 'react'

const columns = [
    {
        key: "index",
        title: "Position #"
    },
    {
        key: "name",
        title: "Player Name"
    },
    {
        key: "record",
        title: "Time in Seconds"
    },
    {
        key: "date",
        title: "Date"
    }
]

export default function RankingTable(props) {
    const formatData = (key, data) => {
        if (key === "date")
            return new Date(Number(data)).toLocaleDateString()
        else
            return data
    }
    return props.data.length > 0
        ? <table className={"table table-sm table-info"}>
            <thead>
                <tr key={'header-row'}>
                    {
                        columns.map(col => {
                            return <th key={`header-${col.key}`}>{col.title}</th>
                        })
                    }
                </tr>
            </thead>
            <tbody>
                {
                    props.data.map((row, rowIndex) => {
                        return <tr key={`row-${rowIndex}`} className={`bg-light`}>
                            {
                                columns.map((col, index) => {
                                    return <td key={`cell-${col.key}`} >
                                        {formatData(col.key, col.key === "index" ? rowIndex + 1 : row[col.key])}
                                    </td>
                                })
                            }
                        </tr>
                    })
                }
            </tbody>
        </table>
        : null
}