<template>
	<view class="">
		<uni-indexed-list :options="list" :showSelect="false"></uni-indexed-list>
	</view>
</template>

<script>
	import {initial} from '@/static/chineseConversion.js'
	export default {
		data(){
			return{
				list:[]
			}
		},
	onLoad() {
	　　　　let res = [
	　　　　　　{
	　　　　　　　　name: '阿克苏机场',
	　　　　　　　　address: '阿克苏机场阿克苏机场'
	　　　　　　}, {
	　　　　　　　　name: '北京首都国际机场',
	　　　　　　　　address: '北京首都国际机场北京首都国际机场'
	　　　　　 },{
	　　　　　　　　name: '成都双流国际机场',
	　　　　　　　　address: '成都双流国际机场成都双流国际机场'
	　　　　　　},{
	　　　　　　　　name: '常德桃花源机场',
	　　　　　　　　address: '常德桃花源机场常德桃花源机场'
	　　　　　　}, {
	　　　　　　　　name: '哈尔滨太平国际机场',
	　　　　　　　　address: '哈尔滨太平国际机场哈尔滨太平国际机场'
	　　　　　　},{
	　　　　　　　　name: '绵阳南郊机场',
	　　　　　　　　address: '绵阳南郊机场绵阳南郊机场'
	　　　　　　},{
	　　　　　　　　name: '景德镇机场',
	　　　　　　　　address: '景德镇机场景德镇机场'
	　　　　　　},{
	　　　　　　　　name: '林芝米林机场',
	　　　　　　　　address: '林芝米林机场林芝米林机场'
	　　　　　　},{
	　　　　　　　　name: '兰州中川机场',
	　　　　　　　　address: '兰州中川机场兰州中川机场'
	　　　　　　　　},
	
	          ]　　// 模拟数据
	
	            let letterList = []
	            for (let item of res) {
	                let letter = initial(item.name)//首字母
	                let index = letterList.indexOf(letter)
	                if (index === -1) {
	                    letterList.push(letter)
	                    let obj = {
	                        letter: '',
	                        data: []
	                    }
	                    obj.letter = letter
	                    obj.data.push(item)
	                    this.list.push(obj)
	                } else {
	                    this.list[index].data.push(item)
	                }
	            }
	            console.log(this.list)
	        }
			}
</script>