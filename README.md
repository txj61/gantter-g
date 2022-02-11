# Gantter-g with react
基于[g](https://github.com/antvis/g)引擎的甘特图组件

## Install
```
npm install gantter-g
```
```
yarn add gantter-g
```

## Usage
```
export default () => {
  return (
    <Gantter
      columns={[
        { key: 'name', name: '姓名', width: 200 },
        { key: 'gender', name: '性别', width: 100 },
        { key: 'age', name: '年龄', width: 200 }
      ]}
      dataSource={[
        {
          name: '张三',
          gender: '男',
          age: 20,
          distribution: [
            { name: '任务一', start: '2020-01-01', end: '2020-03-01', content: '任务介绍' },
            { name: '任务二', start: '2020-03-01', end: '2020-06-01', color: '#0000ff' },
            { name: '任务三', start: '2020-06-01', end: '2020-09-01' },
          ]
        },
        {
          name: '李四',
          gender: '男',
          age: 30,
          distribution: [
            { name: '任务一', start: '2020-01-01', end: '2020-03-01' },
            { name: '任务二', start: '2020-03-01', end: '2020-06-01' },
            { name: '任务三', start: '2020-06-01', end: '2020-09-01' },
          ]
        },
        {
          name: '赵五',
          gender: '男',
          age: 25,
          distribution: [
            { name: '任务一', start: '2020-01-01', end: '2020-03-01' },
            { name: '任务二', start: '2020-03-01', end: '2020-06-01' },
            { name: '任务三', start: '2020-06-01', end: '2020-09-01' },
          ]
        }
      ]}
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
  )
}
```
## API
参数|说明|类型|默认值
--|:--:|--:|--:
columns|表头|object[]|-
dataSource|数据数组|object[]|-
showOrder|是否显示序号|Boolean|true
gantterReplaceKeys|进度替换字段|object|如下
tooltip|提示框|object|如下
gantterBarText|进度条上文字|object|如下
theme|主题设置|object|如下
### columns
参数|说明|类型|默认值
--|:--:|--:|--:
key|唯一标识|string|必填
name|名称|string|必填
width|列宽|number|100

### gantterReplaceKeys
参数|说明|类型|默认值
--|:--:|--:|--:
list|数组键名|string|list
start|开始日期|string|start
end|结束日期|string|end
title|标题|string|title
content|说明|string|content
color|进度条颜色|string|color
### tooltip
参数|说明|类型|默认值
--|:--:|--:|--:
show|是否显示|boolean|true
formatter|提示框显示内容|(value: gantterReplaceKey) => object[]|-

formatter返回格式
```
[
  {
    text: item[replaceKeys.title],
    style: {
      fontSize: 14,
      fontWeight: 'bold',
    }
  },
  {
    text: `${item[replaceKeys.start]} - ${item[replaceKeys.end]}`,
    style: {
      fontSize: 14
    }
  }
]
```
### gantterBarText
参数|说明|类型|默认值
--|:--:|--:|--:
show|是否显示|boolean|true
formatter|进度条显示文字内容|(value: gantterReplaceKey) => string|-
### theme
参数|说明|默认值
--|:--:|--:
backgroundColor|通用背景色|
borderColor|通用边框色|
fontColor|通用文字颜色|
dragDividerColor|拖动条颜色|
dragDividerBorderColor|拖动条边框颜色|
scrollBarSlideColor|滚动条滑道颜色|
scrollBarThumbColor|滚动条滑块颜色|
scrollBarThumbHoverColor|鼠标移入滑块颜色|
scrollBarThumbDownColor|鼠标按下滑块颜色|
tableHeaderDividerColor|表头分割线|
tableHeaderBottomBorderColor|表头下边线|
tableHeaderBackgroundColor|表头背景色|
tableHeaderFontColor|表头文字颜色|
tableRowDividerColor|表格横向分割线|
tableColDividerColor|表格纵向分割线|
tableOddBackgroundColor|表格奇数行背景|
tableEvenBackgroundColor|表格偶数行背景|
tableCellFontColor|表格文字背景|
gantterStopColor|已结束进度条颜色|
gantterProgressColor|进行中进度条颜色|
gantterUnbeginColor|未开始进度条颜色|
gantterDividerColor|甘特图分割线颜色|
gantterBarShadowColor|鼠标移入进度条阴影颜色|
gantterbarLineColor|进度条描边颜色|
popoverBackground|气泡卡片背景色|
popoverShadowColor|气泡卡片阴影颜色|
## 组件调试

```
yarn dev
yarn dev story
```

运行测试用例

```
yarn test
```

按照社区规范和最佳实践，生成构建产物

```
yarn build
```

继续创建更多项目要素

```
yarn new
```

其他

```
yarn lint         # 检查和修复所有代码
yarn change       # 添加 changeset，用于发版时生成 changelog
yarn bump         # 生成发版相关的修改，比如更新版本号、生成 changelog
yarn release      # 根据 bump 自动修改和人工修改的发版要求，发布项目

```
