export default function pretierBytes(e) {
    if (typeof e != "number" || isNaN(e))
        throw new TypeError(`Expected a number, got ${typeof e}`);
    const r = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    if ((t && (e = -e), e < 1)) return `${(t ? "-" : "") + e} B`;
    let s = Math.min(Math.floor(Math.log(e) / Math.log(1024)), r.length - 1);
    e = Number(e / Math.pow(1024, s));
    let o = r[s];
    return e >= 10 || e % 1 === 0
      ? `${(t ? "-" : "") + e.toFixed(0)} ${o}`
      : `${(t ? "-" : "") + e.toFixed(1)} ${o}`;

}