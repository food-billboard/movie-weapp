import Day from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
Day.locale('zh-cn')
Day.extend(relativeTime)

const momentConfig: any = {
    months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
    monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
    weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
    weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
    weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'YYYY-MM-DD',
        LL: 'YYYY年MM月DD日',
        LLL: 'YYYY年MM月DD日Ah点mm分',
        LLLL: 'YYYY年MM月DD日ddddAh点mm分',
        l: 'YYYY-M-D',
        ll: 'YYYY年M月D日',
        lll: 'YYYY年M月D日 HH:mm',
        llll: 'YYYY年M月D日dddd HH:mm'
    },
    meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
    meridiemHour: function (hour, meridiem) {
        if (hour === 12) {
            hour = 0;
        }
        if (meridiem === '凌晨' || meridiem === '早上' ||
            meridiem === '上午') {
            return hour;
        } else if (meridiem === '下午' || meridiem === '晚上') {
            return hour + 12;
        } else {
            // '中午'
            return hour >= 11 ? hour : hour + 12;
        }
    },
    meridiem: function (hour, minute, isLower) {
        const hm = hour * 100 + minute;
        if (hm < 600) {
            return '凌晨';
        } else if (hm < 900) {
            return '早上';
        } else if (hm < 1130) {
            return '上午';
        } else if (hm < 1230) {
            return '中午';
        } else if (hm < 1800) {
            return '下午';
        } else {
            return '晚上';
        }
    },
    calendar: {
        sameDay: '[今天]LT',
        nextDay: '[明天]LT',
        nextWeek: '[下]ddddLT',
        lastDay: '[昨天]LT',
        lastWeek: '[上]ddddLT',
        sameElse: 'L'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(日|月|周)/,
    ordinal: function (number, period) {
        switch (period) {
            case 'd':
            case 'D':
            case 'DDD':
                return number + '日';
            case 'M':
                return number + '月';
            case 'w':
            case 'W':
                return number + '周';
            default:
                return number;
        }
    },
    relativeTime: {
        future: '%s内',
        past: '%s前',
        s: '几秒',
        ss: '%d秒',
        m: '1分钟',
        mm: '%d分钟',
        h: '1小时',
        hh: '%d小时',
        d: '1天',
        dd: '%d天',
        M: '1个月',
        MM: '%d个月',
        y: '1年',
        yy: '%d年'
    },
    week: {
        // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
        dow: 1, // Monday is the first day of the week.
        doy: 4  // The week that contains Jan 4th is the first week of the year.
    }
}

// moment.locale('zh-cn', momentConfig)

export const formatDate = (date:any, type='Y-M-D h:m:s') => {
    let timestamp = parseInt(date, 10)
    let myDate
    let hour 
    let time
    if(date) {
        if(timestamp < 10000) {
            timestamp = date
        }
        if(typeof timestamp === 'number') {
            myDate = new Date(timestamp)
        }else {
            myDate = new Date(timestamp + ''.replace(/-/g, '/'))
        }
        hour = myDate.getHours()
    }else {
        myDate = new Date()
        hour - myDate.getHours()
    }
    const Y = myDate.getFullYear()
    const M = myDate.getMonth() + 1 < 10 ? `0${myDate.getMonth() + 1}` : myDate.getMonth() + 1
    const D = myDate.getDate() < 10 ? `0${myDate.getDate()}` : myDate.getDate()
    const h = hour < 10 ? `0${hour}` : hour
    const m = myDate.getMinutes() < 10 ? `0${myDate.getMinutes()}` : myDate.getMinutes()
    const s = myDate.getSeconds() < 10 ? `0${myDate.getSeconds()}` : myDate.getSeconds()
    time = type.replace('Y', Y)
    time = time.replace('M', M)
    time = time.replace('D', D)
    time = time.replace('h', h)
    time = time.replace('m', m)
    time = time.replace('s', s)
    return time
}

export const getHourMinute = (minutes = 0) => {
    const ret = {hour: '60', minute: '00'}
    const hour = parseInt((minutes / 60) + '', 10)
    const minute = parseInt((minutes % 60) + '', 10)
    ret.hour = hour < 10 ? `0${hour}` : hour + ''
    ret.minute = minute < 10 ? `0${minute}` : minute + ''
    return ret
}

export const format = (date:Date, type:string="YYYY-MM-DD") => Day(date).format(type)

export const formatTime = (date: any, type: string = 'YYYY-MM-DD', before: number = 1296000000) => {
    const now = new Date().getTime()
    const beforeDate = valueOf(date)
    if(beforeDate + before > date) {
        return Day(now).fromNow()
    }
    return Day(date).format(type)
}

export const valueOf = (time) => Day(time).valueOf()

export const formatNumber = (data: number) => {
    if(data > 9999) {
        return Math.round(data / 10000) + 'w'
    }
    return data
}

const dateStyleConfig = {
    start: 8, 
    end: 18
}

export const styleChange = () => {
    const date = new Date().getHours()
    const {start, end} = dateStyleConfig
    return date > start && date < end
}