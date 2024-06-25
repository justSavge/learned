const fs = require("fs");
const http = require("http");
const url = require("url");
const slugify = require("slugify");
const replaceTem = require("./modules/replaceTem");

///------------⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️-------////
//阻塞-被同步函数
// const firstput = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(firstput);
// const textOut = `what can i say?${firstput}`;
// fs.writeFileSync("./txt/juner.txt", textOut);
//不会阻塞！异步，让我看看你的极限吧！！！
// fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
//   if (err) {
//     return console.log("出错了，超级大爆💥💥💥");
//   }
//   fs.readFile(`./txt/${data}.txt`, "utf-8", (err2, data2) => {
//     console.log(data2);
//     fs.readFile("./txt/append.txt", "utf-8", (err3, data3) => {
//       console.log(data3);
//       fs.writeFile(
//         "./txt/final.txt",
//         `${data2}\n🤏${data3}`,
//         "utf-8",
//         (err) => {
//           console.log("你醒啦，手术很成功，你已经是个女孩子了😘");
//         }
//       );
//     });
//   });
// });
// console.log("已写入🫡");
// console.log("手术中。。。😎😭");
///------------⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️-------////
///server-server-server-🐕‍🦺🐕‍🦺🐕‍🦺-server-server-server/////////
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);
const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);
const overview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const product = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const card = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);

const server = http.createServer((req, res) => {
  const sweetSugarPath = req.url;
  ////
  res.writeHead(200, {
    "Content-type": "text/html",
    "accept-charset": "utf-8",
  });
  const { query, pathname } = url.parse(sweetSugarPath, true);
  //overview

  if (pathname === "/overview" || pathname === "/") {
    res.writeHead(200, {
      "Content-type": "text/html",
      "accept-charset": "utf-8",
    });
    const cardsHtml = dataObj.map((el) => replaceTem(card, el)).join("");
    const allOver = overview.replace("{%product_card%}", cardsHtml);
    res.end(allOver);
  }
  //product
  else if (pathname === "/product") {
    res.writeHead(200, {
      "Content-type": "text/html",
      "accept-charset": "utf-8",
    });
    const productShowDetali = dataObj[query.id];
    let surePro = replaceTem(product, productShowDetali);
    res.end(surePro);
  }
  //404
  else {
    res.writeHead(404, {
      "connect-type": "text",
      "lijun-serct": "superman",
    });
    res.end("<h1>扣一复活牢大!</h1>");
  }
  //我是服务器,扣一回复牢大
});
server.listen(8000, "127.0.0.1", () => {
  console.log("服务器,启动!");
});
