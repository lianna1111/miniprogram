<template>
	<view>
		<!-- 	<view class="">
			<gui-swiper :swiperItems="swiperItems" borderRadius="0 0 30rpx 30rpx" 
			:width="750" :height="330"  :spacing="0" :padding="0" 
			indicatorType="number" indicatorBarBgColor="rgba(0,0,0, 0)"></gui-swiper>
		</view> -->
		<!-- <view class="">
			<set-time :items="Times"></set-time>
		</view> -->

		<gui-page :customFooter="true"
			:footerSets="{height:100, zIndex:100, bg:'linear-gradient(to bottom, #F8F8F8,#F8F8F8)'}">
			<view slot="gBody">
				<view class="gui-margin gui-margin-top gui-flex gui-space-between">
					<text class="gui-h5 gui-color-gray gui-bold">选择考次（一场）</text>
				</view>

				<view class="gui-padding gui-border gui-margin">

					<view style="margin-top:15rpx;">
						<pui-set-time v-if="Times.length >= 1" :items="Times" iconSize="42rpx" @change="change"
							type="checkbox" checkedType="ring" ref="setTime"></pui-set-time>
						<pui-base-img :item="nullItem" :width="650" :height="190" v-else></pui-base-img>
					</view>
					<gui-select-list v-if="Times.length >= 1" style="display: none;" :items="selectBtn" iconSize="42rpx"
						@change="btnChange" type="checkbox" checkedType="ring"></gui-select-list>
				</view>
				<view class="gui-margin gui-margin-top gui-flex gui-space-between">
					<text class="gui-h5 gui-color-gray gui-bold">选择考生</text>
				</view>
				<view class=" gui-border gui-margin">

					<view style="margin-top:15rpx;">
						<pui-select-list v-if="lists.length >= 1" :items="lists" iconSize="42rpx" @change="change1"
							type="checkbox" checkedType="ring" ref="selectList"></pui-select-list>
						<pui-base-img :item="nullItem" :width="650" :height="190" v-else></pui-base-img>
					</view>

					<gui-select-list v-if="lists.length >= 1" :items="selectBtn1" iconSize="42rpx" @change="btnChange1"
						type="checkbox" checkedType="ring"></gui-select-list>
				</view>
				<view class="gui-margin gui-margin-top gui-flex gui-space-between">
					<text class="gui-h5 gui-color-gray gui-bold">选择主考官（一位）</text>
				</view>
				<view class=" gui-border gui-margin">

					<view style="margin-top:15rpx;">
						<pui-select-list3 v-if="examiner.length >= 1" :items="examiner" iconSize="42rpx"
							@change="change2" type="checkbox" checkedType="ring" ref="setExaminer"></pui-select-list3>
						<pui-base-img :item="nullItem" :width="650" :height="190" v-else></pui-base-img>
					</view>
					<gui-select-list v-if="examiner.length >= 1" style="display: none;" :items="selectBtn1"
						iconSize="42rpx" @change="btnChange2" type="checkbox" checkedType="ring"></gui-select-list>
				</view>
				<view class="gui-margin gui-margin-top gui-flex gui-space-between">
					<text class="gui-h5 gui-color-gray gui-bold">选择副考官</text>
				</view>
				<view class=" gui-border gui-margin">

					<view style="margin-top:15rpx;">
						<pui-select-list3 v-if="examiners.length >= 1" :items="examiners" iconSize="42rpx"
							@change="change3" type="checkbox" checkedType="ring" ref="setExaminers"></pui-select-list3>
						<pui-base-img :item="nullItem" :width="650" :height="190" v-else></pui-base-img>
					</view>

					<gui-select-list v-if="examiners.length >= 1" :items="selectBtn3" iconSize="42rpx"
						@change="btnChange3" type="checkbox" checkedType="ring"></gui-select-list>
				</view>
			</view>
			<view slot="gFooter" class="gui-padding gui-flex gui-rows gui-space-between gui-align-items-center"
				style="border-top:1px solid #E8E8E8;">
				<view class="footerBtns">
					<!-- <gui-select-list :items="selectBtn" iconSize="42rpx" @change="btnChange"
					type="checkbox" checkedType="ring"></gui-select-list> -->
				</view>
				<text class="footerBtns gui-icons gui-block-text gui-text gui-text-right" @tap="appy">&#xe625; 分配</text>
			</view>
		</gui-page>
	</view>

</template>

<script>
	var graceChecker = require("@/GraceUI5/js/checker.js");

	export default {
		data() {
			return {
				formData: {

					ExaminerID: '',
					StudentList: '',
					AssistantExaminer: ''
				},
				timeID: '',
				Times: [],
				lists: [],
				examiner: [],
				examiners: [],
				campusID: '',
				nullItem: {
					title: '暂无数据',
					src: '/static/base/null.png',
					url: "./teacherclass?campusID=" + this.campusID
				},
				selectBtn: [{
					title: "全选",
					checked: false
				}, ],
				selectBtn1: [{
					title: "全选",
					checked: false
				}, ],
				selectBtn2: [{
					title: "全选",
					checked: false
				}, ],
				selectBtn3: [{
					title: "全选",
					checked: false
				}, ],
				swiperItems: [ //轮播图
					{
						img: '/static/index/chro.png',
						url: '',
						title: "测试标题 001",
						opentype: 'navigate'
					},
					{
						img: '/static/index/chro.png',
						url: '',
						title: "测试标题 002",
						opentype: 'navigate'
					},
					{
						img: '/static/index/chro.png',
						url: '',
						title: "测试标题 003",
						opentype: 'navigate'
					},
				],
				user: {}
			}
		},
		onLoad: function(option) {
			if (option) {
				this.ExamID = option.ExamID
				this.ExamroomID = option.ClassroomID
				this.CampusID = option.CampusID
				console.log(option)
			}

			this.campusID = uni.getStorageSync('cid');
			this.Institution = uni.getStorageSync('iid');
			this.getUserExaminer()
		},
		onShow() {
			this.examTime()
			this.getcert()
			this.getStudent()


			this.getExaminer()
			// this.getExaminers()

		},

		methods: {
			//轮播图
			swiperchange: function(e) {
				console.log(e);
			},
			examTime() {
				var that = this;
				uni.request({
					url: that.domain + 'exam/examtime',
					method: 'post',
					data: {
						roomid: that.ExamroomID
					},
					header: {
						token: 'alaskdflasdf',
						'content-type': 'application/x-www-form-urlencoded'
					},
					success: function(res) {
						if(res.data.errno==0){
						that.Times = res.data.msg;
						console.log(that.Times, '考次');
						for (let i = 0; i < that.Times.length; i++) {
							that.Times[i].checked = ''
						}
						console.log(that.Times, 'that.Times');
						if (that.Times.length) {
							that.isEmpty = false
						}
						}
					},
					fail: function(res) {
						console.log(res);
					}
				})
			},
			getcert() {
				var that = this;
				uni.request({
					url: that.domain + 'campus/exam/cid/' + that.CampusID + '/eid/' + this.ExamID,
					method: 'get',
					success: function(res) {
						if(res.data.errno==0){
						that.certlist = res.data.msg;

						let dataInfo = {};
						that.certlist.forEach((item, index) => {
							let {
								StudentCode
							} = item;
							if (!dataInfo[StudentCode]) {
								dataInfo[StudentCode] = {
									StudentCode,
									child: []
								}
							}
							dataInfo[StudentCode].child.push(item);
						});
						let list = Object.values(dataInfo); // list 转换成功的数据
						that.certlist = list
						// console.log(res,'报名的学生');
						}
					},
					fail: function(res) {
						console.log(res);
					}
				})
			},
			getStudent() {
				var that = this;
				uni.request({
					url: that.domain + 'campus/student/cid/' + that.CampusID,
					method: 'get',
					success: function(res) {
						if(res.data.errno==0){
						let tmparr = []
						that.lists = res.data.msg;
						for (let i in that.lists) {
							that.lists[i].checked = ''
							for (let j in that.certlist) {
								if (that.certlist[j].StudentCode == that.lists[i].StudentCode) {
									// that.lists[i].Status='1';//已报名
									let level = '';
									if (that.certlist[j].child.length == '1') {
										that.lists[i].LevelID = that.certlist[j].child[0].LevelID; //报考单个等级

									} else {
										for (let o in that.certlist[j].child) {
											level += that.certlist[j].child[o].LevelID + ','
										}
										level.substr(0, level.length - 1)
										that.lists[i].LevelID = level; //报考多个等级
									}
									tmparr.push(that.lists[i])
								}
							}
						}
						that.lists = tmparr
						console.log(that.lists, 'lists')
						}
					},
					fail: function(res) {
						console.log(res);
					}
				})
			},
			getExaminer() {
				var that = this;
				uni.request({
					url: that.domain + 'institute/examiner',
					method: 'post',
					data: {
						iid: that.Institution
					},
					header: {
						token: 'alaskdflasdf',
						'content-type': 'application/x-www-form-urlencoded'
					},
					success: function(res) {
						if(res.data.errno==0){
						that.examiner = res.data.msg;
						if (that.examiner.length) {
							for (let i in that.examiner) {
								// if(that.examiner[i].LevelID=='1'){that.examiner[i].level='考官'}
								// else if(that.examiner[i].LevelID=='2'){that.examiner[i].level='高级考官'}
								// else if(that.examiner[i].LevelID=='3'){that.examiner[i].level='国家级考官'}
								that.examiner[i].checked = ''
								for (let j in that.user) {
									if (that.examiner[i].ExaminerID == that.user[j].AccountID) {
										that.examiner[i].RealName = that.user[j].RealName
									}
								}

								that.examiners = JSON.parse(JSON.stringify(that.examiner))
							}
						}
						console.log(that.examiner, '已签约考官');
					}
					},
					fail: function(res) {
						console.log(res);
					}
				})
			},

			getUserExaminer() {
				uni.request({
					url: this.domain + 'user/examiner', //获取所有考官
					method: 'post',
					data: {},
					header: {
						token: 'alaskdflasdf',
						'content-type': 'application/x-www-form-urlencoded'
					},
					success: (res) => {
						if(res.data.errno==0){
						this.user = res.data.msg
						// console.log(this.user,'userExaminer')
					}
					},
				})
			},

			change: function(e) {
				console.log(e, 'e0')
				if (e.length >= this.Times.length) {
					this.selectBtn[0].title = "取消";
					this.selectBtn[0].checked = true;
				} else {
					this.selectBtn[0].title = "全选";
					this.selectBtn[0].checked = false;
				}
			},
			change1: function(e) {
				console.log(e, 'e1')
				if (e.length >= this.lists.length) {
					this.selectBtn1[0].title = "取消";
					this.selectBtn1[0].checked = true;
				} else {
					this.selectBtn1[0].title = "全选";
					this.selectBtn1[0].checked = false;
				}
			},
			change2: function(e) {
				console.log(e, 'e2')
				if (e.length >= this.examiners.length) {
					this.selectBtn2[0].checked = true;
					this.selectBtn2[0].title = "取消";
				} else {
					this.selectBtn2[0].title = "全选";
					this.selectBtn2[0].checked = false;
				}
			},
			change3: function(e) {
				console.log(e, 'e3')
				if (e.length >= this.examiner.length) {
					this.selectBtn3[0].checked = true;
					this.selectBtn3[0].title = "取消";
				} else {
					this.selectBtn3[0].checked = false;
					this.selectBtn3[0].title = "全选";
				}
			},
			btnChange: function(e) {
				var status = false;
				if (e.length > 0) {
					status = true;
					this.selectBtn[0].checked = true;
					this.selectBtn[0].title = "取消";
				} else {
					this.selectBtn[0].checked = false;
					this.selectBtn[0].title = "全选";
				}
				this.Times.forEach((item) => {
					item.checked = status;
				});
			},
			btnChange1: function(e) {
				var status = false;
				if (e.length > 0) {
					status = true;
					this.selectBtn1[0].checked = true;
					this.selectBtn1[0].title = "取消";
				} else {
					this.selectBtn1[0].checked = false;
					this.selectBtn1[0].title = "全选";
				}
				this.lists.forEach((item) => {
					item.checked = status;
				});
				// this.lists = [];
				// this.$nextTick(()=>{
				// 	this.lists = tmpArr1;
				// });
			},
			btnChange2: function(e) {
				var status = false;
				if (e.length > 0) {
					status = true;
					this.selectBtn2[0].checked = true;
					this.selectBtn2[0].title = "取消";
				} else {
					this.selectBtn2[0].checked = false;
					this.selectBtn2[0].title = "全选";
				}
				var examinersArr = [];
				this.examiners.forEach((item) => {
					item.checked = status;
					examinersArr.push(item);
				});
			},
			btnChange3: function(e) {
				var status = false;
				if (e.length > 0) {
					status = true;
					this.selectBtn3[0].checked = true;
					this.selectBtn3[0].title = "取消";
				} else {
					this.selectBtn3[0].checked = false;
					this.selectBtn3[0].title = "全选";
				}
				this.examiner.forEach((item) => {
					item.checked = status;
				});

			},
			appy() {
				var TimeIndex = this.$refs.setTime.getSelectedIndex();
				var StudentIndex = this.$refs.selectList.getSelectedIndex();
				var ExaminerIndex = this.$refs.setExaminer.getSelectedIndex();
				var AssistantIndex = this.$refs.setExaminers.getSelectedIndex();
				if (TimeIndex.length < 1 || StudentIndex.length < 1 || ExaminerIndex.length < 1) { //&&indexs1.length<1
					uni.showToast({
						title: "请选择数据",
						icon: "none"
					});
					return;
				} else if (TimeIndex.length > 1) {
					uni.showToast({
						title: "一次只能分配一场考次",
						icon: "none"
					});
					return;
				} else if (ExaminerIndex.length > 1) {
					uni.showToast({
						title: "主考官有且只有一位",
						icon: "none"
					});
					return;
				}

				uni.showModal({
					title: '提示',
					content: '确定分配无误?',
					success: (res) => {
						if (res.confirm) {
							this.timeID = this.Times[TimeIndex[0]].ID;
							this.formData.ExaminerID = this.examiners[ExaminerIndex[0]].ExaminerID;
							let StudentArr = '';
							let AssistantArr = '';
							for (let i = 0; i < StudentIndex.length; i++) {
								StudentArr = StudentArr + this.lists[StudentIndex[i]].StudentCode + ','
							}
							for (let i = 0; i < AssistantIndex.length; i++) {
								AssistantArr = AssistantArr + this.examiners[AssistantIndex[i]].ExaminerID +
									','
							}
							if (StudentArr.length != 0) {
						 	StudentArr = StudentArr.substring(0, StudentArr.length - 1)
							}
							if (AssistantArr.length != 0) {
								AssistantArr = AssistantArr.substring(0, AssistantArr.length - 1)
							}


							this.formData.StudentList = StudentArr
							this.formData.AssistantExaminer = AssistantArr
							// console.log(this.formData,'formData')

							this.toappy()
						}
					}
				});

			},
			toappy() {
				console.log(this.formData, 'formdata')
				uni.request({
					url: this.domain + 'exam/mod_examtime/id/' + this.timeID, //提交表单
					method: 'post',
					data: this.formData,
					header: {
						token: 'alaskdflasdf',
						'content-type': 'application/x-www-form-urlencoded'
					},
					success: (res) => {
						if(res.data.errno==0){
						uni.showToast({
							title: '提交成功!',
							icon: "none"
						});
						console.log(res, "res")
						// uni.redirectTo({
						//     url: './setTime?&ID='+this.formData.ExamroomID
						// });
						}
					},
					fail() {
						uni.showToast({
							title: '提交失败!',
							icon: "none"
						});
					}
				});
			}
		}
	}
</script>

<style lang="scss">

</style>
