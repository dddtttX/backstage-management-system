<template>
    <el-row>
        <el-col :span="8" style="padding-right: 10px;">
            <el-card class="box-card">
                <div class="user">
                    <img src="../assets/avatar.jpg" alt="">
                    <div class="userinfo">
                        <p class="name">Admin</p>
                        <p class="acess">超级管理员</p>
                    </div>
                </div>
                <div class="login-info">
                    <p>上次登录时间：<span>2021-7-19</span></p>
                    <p>上次登录地点：<span>武汉</span></p>
                </div>
            </el-card>
            <el-card style="margin-top: 20px;height: 460px;">
                <template>
                    <el-table :data="tableData" stripe style="width: 100%">
                        <el-table-column v-for="(val, key) in tableLabel" v-bind:key="key" :prop="key"
                            :label="val"></el-table-column>
                    </el-table>
                </template>
            </el-card>
        </el-col>
        <el-col :span="16" style="padding-left: 10px;">
            <div class="grid-content bg-purple-light">
                <div class="num">
                    <el-card v-for="(item, index) in countData" v-bind:key="index"
                        :body-style="{ display: 'flex', padding: 0 }">
                        <i class="icon" :class="`el-icon-${item.icon}`" :style="{ background: item.color }"></i>
                        <div class="detail">
                            <p class="price">￥ {{ item.value }}</p>
                            <p class="desc">{{ item.name }}</p>
                        </div>
                    </el-card>
                </div>
                <el-card style="height: 280px;">
                    <!-- 折线图 -->
                    <div ref="echarts1" style="height: 280px;"></div>
                </el-card>
                <div class="graph">
                    <el-card style="height: 260px;">
                        <div ref="echarts2" style="height: 260px;"></div>

                    </el-card>
                    <el-card style="height: 260px;">
                        <!-- 柱状图 -->
                        <div ref="echarts3" style="height: 260px;"></div>

                    </el-card>

                </div>
            </div>
        </el-col>
    </el-row>
</template>
<script>

import { getData } from "../api";
// 引入echarts
import * as echarts from 'echarts'

export default {
    data() {
        return {
            tableData: [
                {
                    name: "小米",
                    todayBuy: 100,
                    monthBuy: 300,
                    totalBuy: 800,
                }, {
                    name: "三星",
                    todayBuy: 100,
                    monthBuy: 300,
                    totalBuy: 800,
                }, {
                    name: "魅族",
                    todayBuy: 100,
                    monthBuy: 300,
                    totalBuy: 800,
                }, {
                    name: "苹果",
                    todayBuy: 100,
                    monthBuy: 300,
                    totalBuy: 800,
                }, {
                    name: "华为",
                    todayBuy: 100,
                    monthBuy: 300,
                    totalBuy: 800,
                }, {
                    name: "红米",
                    todayBuy: 100,
                    monthBuy: 300,
                    totalBuy: 800,
                }, {
                    name: "荣耀",
                    todayBuy: 100,
                    monthBuy: 300,
                    totalBuy: 800,
                },
            ],
            tableLabel: {
                name: "品牌",
                todayBuy: "今日购买量",
                monthBuy: "本月购买量",
                totalBuy: "总购买量"
            },
            countData: [
                {
                    name: "今日支付订单",
                    value: 123,
                    icon: "success",
                    color: "#2ec7c9"
                }, {
                    name: "今日收藏订单",
                    value: 210,
                    icon: "star-on",
                    color: "#ffb980"
                }, {
                    name: "今日未支付订单",
                    value: 1234,
                    icon: "s-goods",
                    color: "#51b1ef"
                }, {
                    name: "今日支付订单",
                    value: 123,
                    icon: "success",
                    color: "#2ec7c9"
                }, {
                    name: "今日收藏订单",
                    value: 210,
                    icon: "star-on",
                    color: "#ffb980"
                }, {
                    name: "今日未支付订单",
                    value: 1234,
                    icon: "s-goods",
                    color: "#51b1ef"
                }
            ]
        }
    },
    mounted() {
        getData().then(({ data }) => {
            const { tableData } = data.data
            this.tableData = tableData

            // 基于准备好的dom：ref，初始化echarts实例
            // this.$refs.echarts1
            const echarts1 = echarts.init(this.$refs.echarts1)
            // const echarts2 = echarts.init(this.$refs.echarts3)
            // 指定图标的配置项和数据
            var echarts1Option = {}
            var echarts2Option = {}
            var echarts3Option = {}
            // 处理数据xAxis横坐标
            const { orderData } = data.data
            const orderDataxAxis = Object.keys(orderData.data[0])
            const orderDataxAxisData = { data: orderDataxAxis }
            echarts1Option.xAxis = { data: orderData.date }
            echarts1Option.yAxis = {}
            echarts1Option.legend = orderDataxAxisData
            echarts1Option.series = []
            orderDataxAxis.forEach(key => {
                echarts1Option.series.push({
                    name: key,
                    data: orderData.data.map(item => item[key]),
                    type: "line",
                    emphasis: {
                        label: { show: true }
                    }
                })
            })

            // 使用指定好的配置项和数据 显示图标
            echarts1.setOption(echarts1Option)
            // 实现柱状图
            const echarts2 = echarts.init(this.$refs.echarts2)
            const { userData } = data.data
            const userDataxAxis = userData.map(item => item.date)
            echarts2Option.xAxis = { data: userDataxAxis }
            echarts2Option.yAxis = {}
            echarts2Option.series = []
            echarts2Option.series.push(
                {
                    data: userData.map(item => item.new),
                    type: "bar",
                    showBackground: true,
                    backgroundStyle: {
                        color: 'rgba(220, 220, 220, 0.8)'
                    },
                },
                {
                    data: userData.map(item => item.avtive),
                    type: "bar",
                    showBackground: true,
                    backgroundStyle: {
                        color: 'rgba(220, 220, 220, 0.8)'
                    },
                },
            )
            echarts2.setOption(echarts2Option)

            // 实现饼图
            const echarts3 = echarts.init(this.$refs.echarts3)
            const { videoData } = data.data
            echarts3Option.series = []
            echarts3Option.series.push({
                data: videoData.map(item => {
                    return {
                        name: item.name,
                        value: item.value
                    }
                }
                ),
                type: "pie",
                roseType: "area"
            })
            echarts3.setOption(echarts3Option)



        })

    }
}
</script>
<style lang="less">
.user {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;

    img {
        margin-right: 40px;
        width: 150px;
        height: 150px;
        border-radius: 50%;
    }

    .name {
        font-size: 32px;
        margin-bottom: 10px;
    }

    .acess {
        color: #999999;
    }
}

.login-info {
    p {
        line-height: 28px;
        font-style: 14px;
        columns: #999999;
    }

    span {
        color: #666666;
        margin-left: 60px;
    }
}

.num {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .icon {
        width: 80px;
        height: 80px;
        font-size: 30px;
        line-height: 80px;
        color: #fff;
        text-align: center;
    }

    .detail {
        margin-left: 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .price {
            font-style: 30px;
            margin-bottom: 10px;
            line-height: 30px
        }

        .desc {
            font-style: 14px;
            color: #999;
            text-align: center;
        }
    }

    .el-card {
        width: 32%;
        margin-bottom: 20px;
    }

}

.graph {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;

    .el-card {
        width: 48%;
    }
}</style>
