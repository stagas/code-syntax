import{R as r,j as t,s as e}from"./js.e37911d6.js";const a=t("|",/(\/\*)[^]*?(\*\/)/,/(\/\*)[^]*/);var o={comment:a,attribute:[/(?<=\[)[^\]]*?(?=\])/,{string:r.string,attribute:/\w+?/}],rules:[/\{[^]*?\}/,{comment:a,string:r.string,normal:/--[\w-]+/,declare:t("|",/[\w\-]+(?=:)/,e("var url ch px pt em rem vw vh vmax vmin")),number:t("|",r.number,/#[a-fA-F0-9]+/),value:/(?<=:)[\sa-z\-]*(?=;|.*})/}],tag:/[\w-]+/,property:/[.#][^\s]+/,operator:r.operator};export{o as default};