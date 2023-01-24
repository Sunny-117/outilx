export default function Tree({ data, show = true, setShow }): JSX.Element {
    return (
        <ul style={{
            display: show ? 'block' : 'none'
        }}>
            {
                Array.isArray(data) && data.length && data.map(item => {
                    return <li key={item.value} onClick={(e) => {
                        e.stopPropagation()
                        setShow(item)
                    }}>
                        {item.value}
                        {item.children && <Tree setShow={setShow} data={item.children} show={item.show}></Tree>}
                    </li>
                })
            }
        </ul>
    )
}
