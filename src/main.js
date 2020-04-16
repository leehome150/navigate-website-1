const $siteList = $(".siteList");
// console.log($siteList);
const $lastLi = $siteList.find("li.lastLi");
// console.log($lastLi);
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
const hashMap = xObject || [
  {
    logo: "D",
    link: "developer.mozilla.org",
    url: "https://developer.mozilla.org",
  },
  { logo: "G", link: "github.com", url: "https://github.com" },
  { logo: "J", link: "zh.javascript.info", url: "https://zh.javascript.info" },
  { logo: "S", link: "schoolw3c.com", url: "https://schoolw3c.com" },
];
const render = () => {
  $siteList.find("li:not(.lastLi)").remove();
  hashMap.forEach((node, index) => {
    // console.log(index);
    const $li = $(`<li>
      <div class="site">
        <div class="logo">${node.link[0]}</div>
        <div class="link">${node.link}</div>
        <div class="close"><svg class="icon-g" >
        <use xlink:href="#icon-guanbi"></use>
    </svg></div>
    </div>
  </li>`).insertBefore($lastLi);
    $li.on("click", () => {
      window.open(node.url);
    });
    $li.on("click", ".close", (e) => {
      e.stopPropagation();
      hashMap.splice(index, 1);
      render();
    });
  });
};
render();

$(".addButton").on("click", () => {
  let url = window.prompt("请输入你的网址");
  if (url.indexOf("https") !== 0) {
    url = "https://" + url;
    console.log(url);
  }
  hashMap.push({
    logo: url[0],
    link: url.replace("https://", "").replace(/\/.*/, ""), //后面的正则表达式表示删除/后面的内容
    url: url,
  });

  render();
});
window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  localStorage.setItem("x", string);
};
$(document).on("keypress", (e) => {
  console.log(e.key);
  const key = e.key;
  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
});
