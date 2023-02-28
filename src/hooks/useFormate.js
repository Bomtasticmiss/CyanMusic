// 格式化数字
const  useCountFormate = (count) => {
    return count > 10000
      ? Math.floor(count / 10000) + '万'
      : count
  }
// 格式化音乐演唱歌手
const useSingersFormate =
    (row) => {
        // console.log(row);
        return row.ar.length > 1
            ? row.ar.reduce(
                (total, item, index, self) =>
                    index === self.length - 1
                        ? total + item.name
                        : total + item.name + '/',
                ''
            )
            : row.ar[0].name
    }
// 格式化时间
const useTimeFormate = (time) => {
    // 补零
    const zeroPad = (num) => {
        if (num.toString().length < 2) num = `0${num}`
        return num
    }
    const seconds = Math.floor(time % 60)
    const minute = Math.floor(time / 60)
    return zeroPad(minute) + ':' + zeroPad(seconds)
}

export {useCountFormate, useSingersFormate, useTimeFormate }