// 1. 定义你的原始数据
const mySeriesData = [
  { value: 335, name: '失败' },
  { value: 310, name: '成功' },
  { value: 234, name: '待执行' },
  { value: 333, name: 'sdsdf' }
];

// 2. 计算总数的函数，这个函数保持不变，但现在它操作的是 mySeriesData
function calculatePieTotal(seriesData) {
  let total = 0;
  if (seriesData && Array.isArray(seriesData)) {
    seriesData.forEach(item => {
      total += item.value;
    });
  }
  return total;
}

// 3. 提前计算好总数，以便在 formatter 中使用
const totalCount = calculatePieTotal(mySeriesData);

// 你的 ECharts 配置
option = {
  color: ['#F2A695', '#8693F3', '#FCC667', '#B03A5B'],
  grid: {
    left: '',
    right: '0',
    bottom: '20%',
    containLabel: true
  },
  tooltip: {
    trigger: 'item',
    formatter: '{b}: {c} ({d}%)'
  },
  legend: { //右侧图例
    orient: 'vertical',
    itemGap: 20,
    top: '45%',
    right: '5%',
    icon: 'rect',
    // legend.data 可以不写，ECharts 会自动从 series.data 中提取 name
    // 如果你需要特定顺序或过滤，可以保留并手动设置
    // data: ['失败', '成功', '待执行', 'sdsdf'],
    formatter: function (name) {
      let value = 0;
      let percentage = 0;
      // *** 核心修改：直接使用外部定义的 mySeriesData 和 totalCount ***
      const foundItem = mySeriesData.find(item => item.name === name);
      if (foundItem) {
        value = foundItem.value;
        percentage = totalCount === 0 ? 0 : ((value / totalCount) * 100).toFixed(1);
      }
      return name + ' ' + value + ' ' + percentage + '%';
    }
  },
  series: [
    {
      name: '任务完成情况',
      type: 'pie',
      radius: ['25%', '31%'],
      avoidLabelOverlap: false,
      padAngle: 5,
      label: { //圈内文字
        // *** ECharts 5.x 推荐写法：直接是 label 而不是 label.normal ***
        show: true,
        position: 'center',
        // *** 核心修改：直接使用外部定义的 totalCount ***
        formatter: function (params) {
          return '{value|' + totalCount + '}\n{text|总数}';
        },
        rich: {
          value: { // 用于显示总数的样式
            color: '#8693F3',
            fontSize: 24,
            align: 'center',
            verticalAlign: 'middle'
          },
          text: { // 用于显示“总数”文字的样式
            color: '#666',
            fontSize: 14,
            align: 'center',
            verticalAlign: 'middle',
            padding: 5
          }
        },
        // *** ECharts 5.x 推荐写法：hover 状态直接写在 label 或 series.emphasis 下 ***
        // 这里的 emphasis 写法在 5.x 可能会被忽略或有兼容性问题
        // 如果需要鼠标悬停效果，通常在 series.emphasis.label 中设置
        // emphasis: {
        // show: true,
        // textStyle: { // textStyle 在 5.x 中已废弃
        // fontSize: '30',
        // fontWeight: 'bold'
        // }
        // }
      },
      labelLine: {
        // *** ECharts 5.x 推荐写法：直接是 labelLine 而不是 labelLine.normal ***
        show: true
      },
      data: mySeriesData // *** 绑定到外部定义的数据 ***
    }
  ]
};

// 假设你已经有了 ECharts 实例，例如：
// var myChart = echarts.init(document.getElementById('your-chart-dom'));
// myChart.setOption(option);
