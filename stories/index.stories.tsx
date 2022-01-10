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
      setData((await res.json()).data.map((item: any) => {
        try{
          return {
            ...item,
            distribution: JSON.parse(item.distribution)
          }
        }catch(err){
          return {
            ...item,
            distribution: []
          }
        }
      }))
    })
  }, [])
  return (
    <Gantter
      width={1400}
      columns={[
        { key: 'staffName', name: '姓名', width: 200 },
        { key: 'staffDepartName', name: '部门', width: 300 },
        { key: 'jobs', name: '职位', width: 200 },
        { key: 'userStatus_dictText', name: '状态', width: 100 }
      ]}
      dataSource={data}
      gantterReplaceKeys={{
        list: 'distribution',
        title: 'name'
      }}
    />
  )
}

export default {
  title: '甘特图-canvas',
};
