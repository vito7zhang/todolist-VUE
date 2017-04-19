#快速学习Vue笔记(Day3)


###列表渲染
当我们需要将一组数据循环渲染到页面上的时候，需要用到列表渲染

例如下面，讲一段活动列表，渲染到页面上面：

```
var list = [
    {
        title:"吃饭"
    },
    {
        title:"睡觉"
    },
    {
        title:"打豆豆"
    }
];

// 列表渲染
new Vue({
    el: ".main",
    data:{
        list:list,
    }
});
```

####v-for指令
根据一组数组的选项列表进行渲染

**语法：**

    value,key in items

    value,key of items

###事件处理器
当我们需要监听DOM上面的操作的时候，需要用到事件处理器，例如一个按钮的点击事件

####v-on指令
用来监听DOM事件触发代码

**语法**

    v-on:eventName="eventHandle"

**简写语法**

    @

**事件处理函数**

    写在Vue对象的methods中进行统一管理

**事件对象**

    在事件处理函数中获取

    内联事件处理函数执行，传入事件对象

###事件修饰符
事件处理函数只有纯粹的逻辑判断，不处理DOM事件的细节的时候使用

如：阻止冒泡、取消默认行为、判断按键

**事件修饰符的位置**

    v-on:eventName.修饰符

**修饰符**

    .stop .prevent .capture .self .once

**按键修饰符**

    .enter .tab .delete .esc .space .up .dowm .left .right .ctrl .alt .shift .meta .键位

###条件渲染
根据表达式的值用来显示或者隐藏元素

####v-show指令
元素会被在页面中，只根据表达式的值进行css切换

**语法**

    v-show="表达式"

###自定义指令
除了vue内置的指令之外还可以自己设置指令

    选项对象的directives属性

    {
        directives:{}
    }

####钩子函数
update被绑定元素所在的模板更新的时候调用

**钩子函数中的参数**

    el:指令所绑定的元素，可以用来直接操作DOM
    binding:一个对象
    value:指令的绑定值

###计算属性
为什么需要使用计算属性？模板是为了描述视图结构的，模板中放入太多逻辑，导致模板过重且难以维护。

在计算一个计算属性的时候，Vue.js更新他的依赖列表病缓存结果，只要当其中一个依赖发生了变化，缓存的结果才无效。

**语法**

    在选项对象中{
        ...
        computed:{}
    }


#day5
由于这几天都在做同一个项目，所以直接做笔记了

##属性监控
在这节里面，主要讲了一个数据的监控，比如当你的数据发生改变的时候，你需要对他进行实时的保存

**语法：**

    选项对象的directives属性

    {
        watch:{}
    }

*例如：对list属性进行监控*

```
new Vue({
    el: ".main",
    data:{
        list:list,
        ....
    },
    // 监控属性
    watch:{
        list:function(){
            store.save("data",this.list);
        }
    }
}
```

###深度监控
在上面的监控当中，我们可以监控得到list的变化。这里需要注意的是，list是一个对象数组，这里监控的只是list内数组，但是对于数组内对象的改变却无法监控，这个时候就需要深度监控了。如果需要深度监控，需要这样：

```
new Vue({
    el: ".main",
    data:{
        list:list,
        ....
    },
    // 监控属性
    watch:{
        list:{
            handler:function(){
                store.save("data",this.list);
            },
            deep:true
        }
    }
}
```
