import * as React from 'react'

export default function RankingTable(props) {
    console.log(`props`,props)
    const formatData = (key, data) => {
        if (key == "date")
            return new Date(Number(data)).toLocaleDateString()
        else
            return data
    }
    return props.data.length > 0
        ? <table className={"table table-sm table-info"}>
            <thead>
                <tr>
                    {
                        Object.keys(props.data[0]).map(header => {
                            return <th>{header}</th>
                        })
                    }
                </tr>
            </thead>
            <tbody>
                {
                    props.data.map(row => {
                        return <tr>
                            {
                                Object.keys(row).map(key => {
                                return <td>{formatData(key, row[key])}</td>
                                })
                            }
                        </tr>
                    })
                }
            </tbody>
        </table>
        : null
}