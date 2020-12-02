import "./SortableHeader.css"

export default function SortableHeader({ name, order = 0, onChange }) {
    const setOrder = () => {
        if (order === 0) {
            onChange(1)
        } else if (order === 1) {
            onChange(-1)
        } else {
            onChange(0)
        }
    }

    const directions = {
        '-1': "\u2191",
         '0': "",
         '1': "\u2193"
    }


    return <th onClick={setOrder}>{name} {directions[order]}</th>
}