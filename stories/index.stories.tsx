/*
 * @Author: Anthan
 * @Date: 2021-12-06 15:07:13
 * @LastEditTime: 2021-12-13 17:33:17
 * @LastEditors: Anthan
 * @Description:
 */
import React, { useState, useEffect } from 'react';
import { Gantter } from '@/index'

export const YourStory = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch('https://txj61.github.io/gantter-g/data.json').then(async res => {
      setData((await res.json()).data)
    })
  }, [])
  return (
    <Gantter
      width={1000}
      columns={[
        { key: 'createName', name: '姓名' },
        { key: 'createOrgName', name: '部门', width: 200 },
        { key: 'createTime', name: '时间' }
      ]}
      dataSource={data}
    />
  )
}

export default {
  title: '甘特图-canvas',
};
