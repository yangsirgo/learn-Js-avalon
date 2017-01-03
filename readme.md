

#avalon兼容IE6+
###问题一： 
    但是俺文档只是操作 会出现问题 目前没有解决的办法 不知道什么原因造成的

###问题二： 
    隐藏首屏加载页面是出现的花括号，使用 visibility：hidden 但是在IE中并不是太好用 仍然有花括号出现。
    问题已经解决：使用css[]属性选择器：

    .ms-controller , [ms-controller]{
        visibility: hidden;
    }

