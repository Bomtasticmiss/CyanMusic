export default class Lyric {
    constructor(strLyric) {
        let formate_lyric = []
        let arrLyric = strLyric.split('\n')
        arrLyric.pop()
        for (let i in arrLyric) {
            let t = arrLyric[i].substring(
                arrLyric[i].indexOf('[') + 1,
                arrLyric[i].indexOf(']')
            )
            formate_lyric.push({
                time: Number((t.split(':')[0] * 60 + parseFloat(t.split(':')[1])).toFixed(3)),
                content: arrLyric[i].substring(
                    arrLyric[i].indexOf(']') + 1,
                    arrLyric[i].length
                ),
            })
        }
        // medisArray.splice(0, 0, { content: props.songName, time: '0.000' })
        formate_lyric.forEach((item, i) => {
            if (i == formate_lyric.length - 1) {
                item.next = null
            } else {
                item.next = formate_lyric[i + 1].time
            }
            item.active = ''
            // 去除空句
            if (item.content == '') {
                formate_lyric.splice(i, 1)
            }
        })

        this.formate_lyric = formate_lyric
        this.current = 0
        this.total = formate_lyric.length

    }
}