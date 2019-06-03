const minute = 60 * 1000;// 1分钟
const hour = 60 * minute;// 1小时
const day = 24 * hour;// 1天
const month = 31 * day;// 月
const year = 12 * month;// 年


export const getTimeAgo = (time) =>{
  if (time === undefined || time === 0) {
    return null;
  }
  let now =new Date().getTime()
  let ago = new Date(time*1000).getTime()
  let diff = now - ago
  let r = 0;
  if (diff > year) {
    return new Date(time*1000).format("yyyy年MM月dd日");
  }
  if (diff > month) {
    return new Date(time*1000).format("MM月dd日");
  }
  if (diff > day) {
    r = (diff / day);
    return parseInt(r) + "天前";
  }
  if (diff > hour) {
    r = (diff / hour);
    return parseInt(r) + "个小时前";
  }
  if (diff > minute) {
    r = (diff / minute);
    return parseInt(r) + "分钟前";
  }
  return "刚刚";
}


function format (str) {
  if (str.length >= 2) {
    return str;
  } else {
    return '0' + str;
  }
}

export function getTime(target, now) {
  var remain = parseInt((target - now) / 1000)
  var D = String(parseInt(remain / 86400))
  var DD = format(D)
  var h = String(parseInt((remain - parseInt(D) * 86400) / 3600))
  var hh = format(h)
  var H = String(parseInt(remain / 3600))
  var HH = format(H)
  var m = String(parseInt((remain - parseInt(H) * 3600) / 60))
  var mm = format(m)
  var M = String(parseInt(remain / 60))
  var MM = format(M)
  var s = String(remain - parseInt(M) * 60)
  var ss = format(s)
  var S = String(remain)
  var SS = format(S)
  return {
    D: D, DD: DD,
    h: h, hh: hh,
    H: H, HH: HH,
    m: m, mm: mm,
    M: M, MM: MM,
    s: s, ss: ss,
    S: S, SS: SS
  }
}

Date.prototype.format = function (format) {
  /*
   * format="yyyy-MM-dd hh:mm:ss";
   */
  var o = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    "S": this.getMilliseconds()
  };

  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }

  for (var k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
        : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return format;
};
