
// 存取localStorage中的数据

var store = {
    save(key,value){
        localStorage.setItem(key,JSON.stringify(value));
    },
    fetch(key){
        return JSON.parse(localStorage.getItem(key)) || [];
    }
}

// var list = [
//     // {
//     //     title:"吃饭",
//     //     isChecked:false
//     // },
//     {
//         title:"睡觉",
//         isChecked:true
//     },
//     {
//         title:"打豆豆",
//         isChecked:false
//     }
// ];



//取出所有的值
var list = store.fetch("data")

// 过滤的时候3中情况
var filter = {
    all:function(list){
        return list;
    },
    finished:function(list){
        return list.filter(function(item){
            return item.isChecked;
        })
    },
    unfinished:function(list){
        return list.filter(function(item){
            return !item.isChecked;
        })
    }
}

// 列表渲染
var vm = new Vue({
    el: ".main",
    data:{
        list:list,
        todo:"",
        edtorTodos:"",  //记录正在编辑的数据
        beforeTitle:"",  //记录正在编辑的数据的title
        visibility:"all"
    },
    // 监控属性
    watch:{
        // 这种方式只能监控list，不能监控list内对象
        // list:function(){
        //     store.save("data",this.list);
        // }
        list:{
            handler:function(){
                store.save("data",this.list);
            },
            deep:true
        }
    },
    computed:{
        noCheckLength:function(){
            return this.list.filter(function(item){
                return !item.isChecked
            }).length
        },
        filteredList:function(){

            return filter[this.visibility]?filter[this.visibility](list):list;
        }
    },
    methods:{
        // 添加任务
        addTodo(data,ev){
            // 添加任务到list
            if(this.todo !== ""){
                // 事件处理函数中的this指向的是当前这个根实例
                this.list.push({
                    title:this.todo,
                    isChecked:false
                });
                this.todo = "";
            }
        },
        // 删除任务
        deleteTodo(todo){
            var index = this.list.indexOf(todo)
            this.list.splice(index,1)
        },
        // 编辑任务
        edtorTodo(todo){
            // 编辑任务的时候，记录一下编辑这天任务的title。方便取消编辑的时候给之前的title
            console.log("正在编辑");
            this.beforeTitle = todo.title
            this.edtorTodos = todo
        },
        // 编辑任务成功
        edtorTodoed(todo){
            this.edtorTodos = ""
        },
        // 取消编辑
        cancelTodo(todo){
            todo.title = this.beforeTitle;

            this.beforeTitle = "";
            // 让div现实出来，input隐藏
            this.edtorTodos = "";
        }
    },
    directives:{
        "focus":{
            update(el,binding){
                if(binding.value){
                    el.focus();
                }
            }
        }
    }
});

function watchHashChange(){
    var hash = window.location.hash.slice(1);
    console.log(hash);
    vm.visibility = hash;

}
watchHashChange()
window.addEventListener("hashchange",watchHashChange)
