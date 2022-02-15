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
  const [data, setData] = useState<any[]>([])
  const [pageData, setPageData] = useState<any[]>([])

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
  useEffect(() => {
    if(data){
      setPageData(data.slice(0, 10))
    }
  }, [data])
  return (
    <>
      <Gantter
        columns={[
          { key: 'staffName', name: '姓名', width: 200 },
          { key: 'staffDepartName', name: '部门', width: 300, tooltip: true },
          { key: 'jobs', name: '职位', width: 200 },
          { key: 'userStatus_dictText', name: '状态', width: 100 }
        ]}
        dataSource={pageData}
        gantterReplaceKeys={{
          list: 'distribution',
          title: 'name'
        }}
        tooltip={{
          formatter: value => ([
            {
              text: value.name,
              style: {
                fontSize: 14,
                fontWeight: 'bold'
              }
            },
            {
              text: `${value.start} - ${value.end}`,
              style: {
                fontSize: 14
              }
            },
            {
              text: `周期：${(new Date(value.end).getTime() - new Date(value.start).getTime()) / (1000 * 3600 * 24)}天`,
              style: {
                fontSize: 14
              }
            }
          ])
        }}
        gantterBarText={{
          show: true,
          formatter: value =>({
            text: value.name
          })
        }}
        theme={{
          gantterStopColor: '#ececec',
          gantterProgressColor: '#64e25e',
          gantterUnbeginColor: '#4eacfd'
        }}
      />
    </>

  )
}

export default {
  title: '甘特图-canvas',
};
