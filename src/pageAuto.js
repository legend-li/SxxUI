/**
 * js控制rem根大小， 实现页面自适应---------------------------------李增
 * 634401745@qq.com
 * 2015/10/8
 */
export default function() {
    var de = document.documentElement,cw = de.clientWidth;
    if (!cw) return;
    const ratio = cw / 750;
    // if (!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch)) cw = 450;
    de.style.fontSize = 100 * ratio + 'px';
    cw = de = null;
}
/******************************************************************************************/