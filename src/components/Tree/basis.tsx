import React, { useEffect, useState } from 'react'
import mockData from './mockData'
import Tree from './tree'

export default function Basis() {
    const [data, setData] = useState([])

    useEffect(() => {
        mockData().then(res => {
            setData(recursionConfigProp(res))
        })
    }, [])

    let recursionConfigProp = (data, type, id) => {
        return data.map(item => {
            if (type === 'reset') {
                if (item.value === id) {
                    item.show = !item.show
                }
            } else if (typeof item.show !== 'boolean') {
                // 初始化
                item.show = false;
            }
            if (item.children) {
                if (type === 'reset') {
                    recursionConfigProp(item.children, type, id)
                } else {
                    recursionConfigProp(item.children)
                }
            }
            return item;
        })
    }
    let setShow = (son) => {
        setData(recursionConfigProp(data, 'reset', son.value))
    }
    return (
        <div>
            <Tree data={data} setShow={setShow} />
        </div>
    )
}
