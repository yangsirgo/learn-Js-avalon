/**
 * Created by Xcar on 2016/12/29.
 */
define(function (require, exports, module){
    var avalon = require('./plugins/avalon');

    var perReimMyApplyQuery = {
        userId:cookie.get("user_uid"),
        applyStatus:"",
        applyNumber:"",
        applyFromDate:"",
        applyToDate:"",
        pageNo: 1,
        pageSize:10
    };

    var opt = {
        ctr:".pagination",
        current:1,
        jump:{
            text:"跳转"
        },
        pageSize:10,
        totalPageCount:11,
        fun: function (result, pagination) {
            perReimMyApplyQuery.pageNo = result;
            query(opt,perReimMyApplyQuery);
        }
    };

    var vm = avalon.define({
        $id: 'apply',
        array:[],
        ten:10,
        twenty:20,
        thirty:30,
        sixty:60,
        totalCount:0,
        order:'applyNumber',
        dir:-1,
        applyStatus:"全部",
        bianhao:'',
        starttime:'',
        endtime:'',
        orderbydateNumdir:function(){
            if(vm.dir==-1){
                vm.dir = 1
            }else{
                vm.dir = -1
            }
        },
        find_button:function(){
            perReimMyApplyQuery.applyStatus = vm.applyStatus;
            perReimMyApplyQuery.applyNumber = vm.bianhao;
            perReimMyApplyQuery.applyFromDate = vm.applyFromDate;
            perReimMyApplyQuery.applyToDate = vm.applyToDate;
            queryInit(perReimMyApplyQuery);
        }
    });


    window.vm = vm
    function queryInit(dataparm) {
        $.ajax({
            type:'get',
            cache: false ,
            url:'http://localhost:8080/PersonalReimburse/perReimburseApply/queryPersonalReimburseApplyList',
            data:dataparm,
            contentType:'application/json;charset=utf-8',
            dataType:'json',//服务器返回的结果类型
            success:function (result) {
                if(result.code=="0001"){
                    vm.array = result.body.lst;
                    vm.totalCount = result.body.totalCount;
                    //opt中必须有totalPageCount，用来判断分页的数量
                    opt.totalPageCount = result.body.totalCount;
                    pagination(opt);
                }
            }
        });
    }
    queryInit();


    function setPage(opt,perReimMyApplyQuery,result) {
        opt.current = perReimMyApplyQuery.pageNo;
        opt.pageSize = perReimMyApplyQuery.pageSize;
        pagination(opt);
    }
})