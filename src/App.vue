

<template>
<div id="app">


    <div>{{ year }}年{{ month + 1 }}月{{ day }}日 <span @click="toggle">隐藏</span></div>

    <div v-bind:class="{hide: isHide}">
        <header class="header">
            <span class="prev" @click="prevMon">《</span>
            <span class="info">
                {{ year }}年{{ month + 1 }}月
            </span>
            <span class="next" @click="nextMon">》</span>
        </header>
        <section class="main">
        <table>
            <thead>
                <tr>
                    <th>日</th>
                    <th>一</th>
                    <th>二</th>
                    <th>三</th>
                    <th>四</th>
                    <th>五</th>
                    <th>六</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(dir,entry) in viewData">
                        
                    <td v-for="(index,value) in entry" @click="pick($event,index,dir)">
                        {{ value }}
                    </td>
                </tr>
           

  </tbody>
        </table>
        </section>

    </div>
   
</div>
</template>

<script>
 import 'babel-polyfill';
import Vue from 'vue';   

const calendarData = (year) => {
    //每个月的天数，保存到一个数组
    let allMonthsDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    //闰年二月有29天
    if((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        allMonthsDay[1] = 29
    }

    //每个月的上个月的天数， 保存到另一个数组
    let previousMonthDays = [].concat(allMonthsDay) //复制allMonths数组
    previousMonthDays.unshift(previousMonthDays.pop())

    //计算每月的日历有几天显示是上个月的
    let beforeDays = new Array(12)
        .fill(null)  //???????????????
        .map((item, index) => {
            //根据每个月的1号是星期几判断需要加几天
            let day = new Date(year, index, 1).getDay()
            if(day === 0) {
                return 6
            } else {
                return day
            }
        })

    //返回每月显示的数据，包括上个月的几天，这个月的所有和一部分下个月的
    return new Array(12)
        .fill([])
        .map((month, index) => {
            let currentDays = allMonthsDay[index],//本月天数
                addBefore = beforeDays[index],//本月之前要加几天
                addDays = previousMonthDays[index],//上个月的天数
                monthData = []
                //添加上月数据
                for(;addBefore>0; addBefore--){
                    monthData.unshift(addDays--)
                }
                //添加本月
                for(let i=0;i<currentDays;){
                    monthData.push(++i)
                }
                //添加下月数据
                for(let i=42-monthData.length,j=0;j<i;){
                    monthData.push(++j)
                }
                return monthData
        })
}

const now =  new Date()
const year = now.getFullYear()
export default {
    data(){
        return{
            year: year,
            month: now.getMonth(),
            day: now.getDate(),
            isHide: false
        }
    },
    computed: {
        allYearData: function () {
            return calendarData(this.year)
        },
        viewData: function () {
            let month = calendarData(this.year)[this.month],
                row = []
            month.forEach((day, index) => {

                if(index%7 === 0) {
                    row.push(month.slice(index, index+7))
                }
            })
            return row
        },
        fff: function(){
            return 'ffff'
        }
    },
    methods: {
    nextMon: function(){
            if (this.month === 11) {
                ++this.year
                this.month = 0 
            } else {
                ++this.month
            }
        },
        prevMon: function(){
            if (this.month === 0) {
                --this.year
                this.month = 11
            } else {
                --this.month
            }
        },

        pick: function(event,index,dir){
            
            
                        let month = calendarData(this.year)[this.month],
                
                //将显示的数据，分成三类，分别是上个月，这个月，下个月的
                allDaysOfMonth = (() => {
                    let i = month.indexOf(1),
                        j = month.indexOf(1, i+1),
                        arr = new Array(42)
                    arr.fill('prevMon', 0, i)
                    arr.fill('thisMon', i, j)
                    arr.fill('nextMon', j)
                    return arr
                })();
                
                let type = allDaysOfMonth[index+7*dir]
            switch(type){

                case 'prevMon':
                    this.prevMon()
                    break
                case 'thisMon':
                    this.day = event.target.innerText
                    break
                case 'nextMon':
                    this.nextMon()
                    break
            }
            

        },

        toggle: function(e){
            
            this.isHide ? e.target.innerText = '隐藏' : e.target.innerText = '显示'
            this.isHide = !this.isHide
        }    
    }
}

</script>

