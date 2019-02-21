<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="edit">添加
            </el-button>
        </div>

        <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit
                  highlight-current-row style="width: 100%">
            <el-table-column align="center" label="排序号">
                <template slot-scope="scope">
                    <span>{{ scope.row.orderNum }}</span>
                    <el-button @click="up(scope.row.id)" icon="el-icon-arrow-down" circle></el-button>
                    <el-button @click="down(scope.row.id)" icon="el-icon-arrow-up" circle></el-button>
                </template>
            </el-table-column>
            <el-table-column align="center" label="id" prop="id" width="100"></el-table-column>
            <el-table-column align="center" label="群名称" prop="chatgName"></el-table-column>

            <el-table-column align="center" label="群图片" width="75">
                <template slot-scope="scope">
                    <span><img :src="scope.row.img" width='50' height='50'/></span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="入群金额" prop="joinMoney"></el-table-column>

            <el-table-column align="center" label="扫雷群须知" prop="know"></el-table-column>

            <el-table-column align="center" label="扫雷公告" prop="notice"></el-table-column>

            <el-table-column align="center" label="扫雷红包规则" prop="rule"></el-table-column>
            <el-table-column align="center" label="创建时间">
                <template slot-scope="scope">
                    <span>{{ scope.row.createTime }}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="操作" width="300">
                <template slot-scope="scope">
                    <el-button type="primary" @click="updategroup(scope.row)" size="mini">编辑</el-button>
                    <el-button type="primary" @click="pageGroupUser(scope.row.id)" size="mini" >成员</el-button>
                    <el-button type="warning" @click="baoshun(scope.row.id)" size="mini">豹顺</el-button>
                    <el-button type="danger" @click="delObj(scope.row)" size="mini">删除</el-button>
                    <el-button type="warning" @click="editGroupRobbot(scope.row.id)" size="mini">机器</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="群组成员列表" :visible.sync="detailDialogVisible">
            <div class="filter-container">

                <el-input style="width: 200px;" class="filter-item" placeholder="用户ID" v-model="userquery.requestEntity.userId">
                </el-input>
                <el-input style="width: 200px;" class="filter-item" placeholder="手机号" v-model="userquery.requestEntity.name">
                </el-input>
                <el-button class="filter-item" type="primary" @click="handleFilter">搜索</el-button>
            </div>
            <el-table :data="grouplist" element-loading-text="给我一点时间" border fit
                      highlight-current-row style="width: 100%">
                <el-table-column align="center" label="账户id" width="180px">
                    <template slot-scope="scope">
                        <span>{{ scope.row.userId }}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="账号">
                    <template slot-scope="scope">
                        <span>{{ scope.row.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="昵称">
                    <template slot-scope="scope">
                        <span>{{ scope.row.nick }}</span>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-container">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                               :current-page.sync="userquery.current"
                               :page-sizes="[10,20,30, 50]" :page-size="userquery.size"
                               layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </el-dialog>


        <el-dialog title="豹顺奖励配置" :visible.sync="detailVisible">
            <div class="filter-container">

            </div>
            <el-table :data="baoshunlist" type="index" element-loading-text="给我一点时间" border fit
                      highlight-current-row style="width: 100%">
                <el-table-column align="center" label="抢包金额" width="180px">
                    <template slot-scope="scope">
                        <el-input-number v-model="scope.row.grabAmount" :step="0.1"></el-input-number>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="奖励金额">
                    <template slot-scope="scope">
                        <el-input-number v-model="scope.row.boonAmount" :step="0.1"></el-input-number>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作" style="width:20%;">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="delrow(scope.$index)" icon="el-icon-minus  " circle></el-button>
                    </template>
                </el-table-column>

            </el-table>
            <div style="text-align:center;">
                <el-button type="primary" @click="addrow()" icon="el-icon-plus" circle></el-button>
            </div>

            <div slot="footer" class="dialog-footer">
                <el-button @click="handleInitBaoshun()">初始化</el-button>
                <el-button @click="agreenrow()">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="机器人时间配置" :visible.sync="detailRobbotVisible">
            <div class="filter-container">

            </div>
            <el-table :data="robbotTimelist" type="index" element-loading-text="给我一点时间" border fit
                      highlight-current-row style="width: 100%">
                <el-table-column align="center" label="群ID" width="180px">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.groupId"></el-input>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="间隔时间">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.times"></el-input>
                    </template>
                </el-table-column>
            </el-table>

            <div slot="footer" class="dialog-footer">
                <el-button @click="agreeUpdate()">确 定</el-button>
            </div>

        </el-dialog>


        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="900px">
            <el-form :model="form" :rules="rules" ref="form" label-width="110px">
                <el-form-item label="群名称" style="width:50%;float:left;">
                    <el-input v-model="form.skChatGroup.chatgName" placeholder="群名称"></el-input>
                </el-form-item>
                <el-form-item label="群须知" style="width:50%;float:left;">
                    <el-input v-model="form.skChatGroup.know" placeholder="群须知"></el-input>
                </el-form-item>

                <el-form-item label="群图片" style="width:50%;float:left;">
                    <el-upload
                            class="avatar-uploader"
                            action="/admin/user/upload"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess" style="border: 1px dashed #d9d9d9;border-radius: 6px;">
                        <img v-if="form.skChatGroup.img" :src="form.skChatGroup.img" class="avatar" width='78' height='78'>
                        <i v-else class="el-icon-plus avatar-uploader-icon" style="width:78px;height:78px;"></i>
                    </el-upload>
                </el-form-item>

                <el-form-item label="群公告" style="width:50%;float:left;">
                    <el-input v-model="form.skChatGroup.notice" placeholder="群公告"></el-input>
                </el-form-item>
                <el-form-item label="入群金额" style="width:50%;float:left;">
                    <el-input v-model="form.skChatGroup.joinMoney" placeholder="入群金额"></el-input>
                </el-form-item>
                <el-form-item label="群规则" style="width:50%;float:left;">
                    <el-input v-model="form.skChatGroup.rule" placeholder="群规则"></el-input>
                </el-form-item>

                <el-form-item label="入群流水金额" style="width:50%;float:left;">
                    <el-input v-model="form.skChatGroup.waterBill" placeholder="入群流水金额"></el-input>
                </el-form-item>

                <el-form-item label="群主id" style="width:50%;float:left;">
                    <el-input v-model="form.skChatGroup.userId" placeholder="群主id"></el-input>
                </el-form-item>

                <el-form-item label="抢包个数" style="width:50%;float:left;">
                    <el-input v-model="form.skChatGroup.grabCount" placeholder="抢包个数"></el-input>
                </el-form-item>


                <el-form-item label="是否正常" style="width:40%;float:left;">
                    <el-switch
                            v-model="form.skChatGroup.isActive"
                            active-color="#409EFF"
                            inactive-color="#DCDFE6"
                            active-text="是"
                            inactive-text="否"
                    >
                    </el-switch>
                </el-form-item>

                <el-form-item label="是否禁言" style="width:40%;float:left;">
                    <el-switch
                            v-model="form.skChatGroup.shutup"
                            @change="changeGroupShutup(form.skChatGroup)"
                            active-color="#409EFF"
                            inactive-color="#DCDFE6"
                            active-text="是"
                            inactive-text="否"
                    >
                    </el-switch>
                </el-form-item>

                <el-form-item label="选择机器人" style="clear:both;">
                    <el-select class="filter-item" v-model="form.robotUserIds" multiple placeholder="请选择">
                        <el-option v-for="item in fromRobbot" :key="item.userId" :value="item.userId" :label="item.nick"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否开启" style="width:40%;float:left;">
                    <el-switch
                            v-model="form.skChatGroup.robotFlag"
                            active-color="#409EFF"
                            inactive-color="#DCDFE6"
                            active-text="是"
                            inactive-text="否"
                    >
                    </el-switch>
                </el-form-item>

                <el-form-item label="是否过滤雷包" style="width:40%;float:left;">
                    <el-switch
                            v-model="form.skChatGroup.unbombFlag"
                            active-color="#409EFF"
                            inactive-color="#DCDFE6"
                            active-text="是"
                            inactive-text="否"
                    >
                    </el-switch>
                </el-form-item>
                <el-form-item label="选择免死" style="clear:both;">
                    <el-select class="filter-item" v-model="form.freeUserIds" multiple placeholder="请选择">
                        <el-option v-for="item in fromDeath" :key="item.userId" :value="item.userId" :label="item.nick"/>
                    </el-select>
                </el-form-item>

                <el-form-item label="选择游戏规则">
                    <el-select class="filter-item" v-model="form.roleBombId" placeholder="请选择">
                        <el-option v-for="item in Bombpage" :value="item.id" :label="item.name"/>
                    </el-select>
                </el-form-item>

                <el-form-item label="尾包机器人" style="clear:both;">
                    <el-select class="filter-item" v-model="form.lastRobotUserIds" multiple placeholder="请选择">
                        <el-option v-for="item in fromRobbot" :key="item.userId" :value="item.userId" :label="item.nick"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否开启" style="width:40%;float:left;">
                    <el-switch
                            v-model="form.skChatGroup.lastRobotFlag"
                            active-color="#409EFF"
                            inactive-color="#DCDFE6"
                            active-text="是"
                            inactive-text="否"
                    >
                    </el-switch>
                </el-form-item>

                <el-form-item label="是否过滤雷包" style="width:40%;float:left;">
                    <el-switch
                            v-model="form.skChatGroup.lastUnbombFlag"
                            active-color="#409EFF"
                            inactive-color="#DCDFE6"
                            active-text="是"
                            inactive-text="否"
                    >
                    </el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel('form')">取 消</el-button>
                <el-button v-if="dialogStatus=='create'" type="primary" @click="create('form')">确 定</el-button>
                <el-button v-else type="primary" @click="update('form')">修 改</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import {
        getList,
        down,
        up,
        selectfromDeath,
        selectfromRobbot,
        skRuleBombpage,
        pageGroupUser,
        robotList,
        robotLastList,
        freerList,
        baoshun,
        addObjs,
        updateObjs,
        delObjs,
        baoshunque,
        groupRobbot,
        grouptimelist,
        updategrouptimelist,
        changeGroupShutup
    } from '@/api/envelope'
    import waves from '@/directive/waves/index.js' // 水波纹指令
    import {mapGetters} from 'vuex'

    export default {
        name: 'table_sk_user_finance',
        directives: {
            waves
        },
        data() {
            return {
                baoshunlist: [],
                robbotTimelist: [],
                grouplist: [],
                detailVisible: false,
                detailDialogVisible: false,
                detailRobbotVisible: false,
                imageUrl: null,
                value: 1,
                list: null,
                total: null,
                listLoading: true,
                listQuery: {"size": 10, "current": 1},
                rules: {},
                form: {
                    "freeUserIds": [],
                    "robotUserIds": [],
                    "lastRobotUserIds": [],
                    "roleBombId": null,
                    "skChatGroup":
                        {
                            "chatgName": null,
                            "img": null,
                            "isActive": false,
                            "shutup": false,
                            "joinMoney": null,
                            "know": null,
                            "notice": null,
                            "rule": null,
                            "userId": null,
                            "grabCount": null,
                            "waterBill": null,
                            "unbombFlag": false,
                            "robotFlag": false,
                            "lastUnbombFlag": false,
                            "lastRobotFlag": false
                        }
                },
                dialogFormVisible: false,
                dialogStatus: '',
                textMap: {
                    update: '编辑',
                    create: '创建'
                },
                tableKey: 0,
                userquery: {
                    "current": 1,
                    "requestEntity":
                        {
                            "chatGroupId": null,
                            "userId": null,
                            "userName": null,
                            "userNick": null,
                            "name": null
                        },
                    "size": 10
                },
                fromDeath: [],
                fromRobbot: [],
                Bombpage: [],
                groupid: null,
            }
        },
        computed: {
            ...mapGetters([
                'permissions'
            ])
        },
        filters: {},
        created() {
            this.getList()
            this.sk_user_finance_refill = this.permissions['sk_user_finance_refill']
            this.sk_user_finance_details = this.permissions['sk_user_finance_details']
            // this.sk_user_finance_del = this.permissions['sk_user_finance_del']
        },
        methods: {
            handleInitBaoshun() {
                this.baoshunlist = [{
                    grabAmount: 1.11,
                    boonAmount: 8.88
                }, {
                    grabAmount: 2.22,
                    boonAmount: 8.88
                }, {
                    grabAmount: 3.33,
                    boonAmount: 8.88
                }, {
                    grabAmount: 4.44,
                    boonAmount: 8.88
                }, {
                    grabAmount: 5.55,
                    boonAmount: 8.88
                }, {
                    grabAmount: 6.66,
                    boonAmount: 8.88
                }, {
                    grabAmount: 7.77,
                    boonAmount: 8.88
                }, {
                    grabAmount: 8.88,
                    boonAmount: 8.88
                }, {
                    grabAmount: 9.99,
                    boonAmount: 8.88
                }, {
                    grabAmount: 1.23,
                    boonAmount: 8.88
                }, {
                    grabAmount: 2.34,
                    boonAmount: 8.88
                }, {
                    grabAmount: 3.45,
                    boonAmount: 8.88
                }, {
                    grabAmount: 4.56,
                    boonAmount: 8.88
                }, {
                    grabAmount: 5.67,
                    boonAmount: 8.88
                }, {
                    grabAmount: 6.78,
                    boonAmount: 8.88
                }, {
                    grabAmount: 7.89,
                    boonAmount: 8.88
                }, {
                    grabAmount: 5.2,
                    boonAmount: 18.88
                }, {
                    grabAmount: 13.14,
                    boonAmount: 18.88
                }, {
                    grabAmount: 12.34,
                    boonAmount: 18.88
                }, {
                    grabAmount: 20.18,
                    boonAmount: 28.88
                }, {
                    grabAmount: 11.11,
                    boonAmount: 28.88
                }, {
                    grabAmount: 23.45,
                    boonAmount: 28.88
                }, {
                    grabAmount: 22.22,
                    boonAmount: 38.88
                }, {
                    grabAmount: 33.33,
                    boonAmount: 38.88
                }, {
                    grabAmount: 34.56,
                    boonAmount: 38.88
                }, {
                    grabAmount: 44.44,
                    boonAmount: 58.88
                }, {
                    grabAmount: 45.67,
                    boonAmount: 58.88
                }, {
                    grabAmount: 55.55,
                    boonAmount: 68.88
                }, {
                    grabAmount: 56.78,
                    boonAmount: 68.88
                }, {
                    grabAmount: 66.66,
                    boonAmount: 78.88
                }, {
                    grabAmount: 67.89,
                    boonAmount: 78.88
                }, {
                    grabAmount: 77.77,
                    boonAmount: 88.88
                }, {
                    grabAmount: 88.88,
                    boonAmount: 99.99
                }, {
                    grabAmount: 99.99,
                    boonAmount: 199.99
                }, {
                    grabAmount: 111.11,
                    boonAmount: 666.66
                }, {
                    grabAmount: 123.45,
                    boonAmount: 666.66
                }, {
                    grabAmount: 222.22,
                    boonAmount: 888.88
                }, {
                    grabAmount: 234.56,
                    boonAmount: 888.88
                }]
            },
            agreenrow() {
                var a = {};
                this.baoshunlist.forEach((v, i) => {
                    a[v.grabAmount] = v.boonAmount
                })

                baoshunque(a, this.groupid).then(response => {
                    this.$message({
                        message: response.data.msg,
                        type: 'success'
                    });
                    this.detailVisible = !this.detailVisible;
                })
            },
            addrow() {
                this.baoshunlist.push({grabAmount: 0, boonAmount: 0})
            },
            delrow(row) {
                this.baoshunlist.splice(row, 1);
            },
            delObj(row) {
                this.$confirm('此操作将永久删除该群(群名：' + row.chatgName + '), 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delgroup(row.id);
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getList();
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            delgroup(id) {
                delObjs(id).then(response => {
                })
            },
            handleAvatarSuccess(response, file, fileList) {
                this.form.skChatGroup.img = response.data;
            },
            updategroup(row) {
                console.log(row);
                this.form.freeUserIds = [];
                this.form.robotUserIds = [];
                this.form.lastRobotUserIds = [];
                this.form.skChatGroup = row;
                this.form.skChatGroup.shutup = row.shutup;
                this.form.skChatGroup.isActive = row.isActive;

                this.form.skChatGroup.unbombFlag = row.unbombFlag;
                this.form.skChatGroup.robotFlag = row.robotFlag;
                this.form.skChatGroup.lastUnbombFlag = row.lastUnbombFlag;
                this.form.skChatGroup.lastRobotFlag = row.lastRobotFlag;
                this.selectfromDeath();
                this.selectfromRobbot();
                this.skRuleBombpage(row.skRuleBombModel.ruleBombId);
                this.robotList(row.id);
                this.robotLastList(row.id);

                this.freerList(row.id);
                this.dialogStatus = 'update';
                this.dialogFormVisible = true;
            },
            baoshun(id) {
                this.groupid = id;
                baoshun(id).then(response => {
                    this.baoshunlist = response.data.data;
                })

                this.detailVisible = !this.detailVisible;
            },
            editGroupRobbot(id) {
                grouptimelist(id).then(response => {
                    this.robbotTimelist = response.data.data;
                })

                this.detailRobbotVisible = !this.detailRobbotVisible;
            },
            grouptimelist(id) {
                grouptimelist(id).then(response => {
                    response.data.data.forEach(i => {
                        this.form.robotUserIds.push(i.userId);
                    })
                })
            },
            robotList(id) {
                robotList(id).then(response => {
                    response.data.data.forEach(i => {
                        this.form.robotUserIds.push(i.userId);
                    })
                })
            },
            robotLastList(id) {
                robotLastList(id).then(response => {
                    response.data.data.forEach(i => {
                        this.form.lastRobotUserIds.push(i.userId);
                    })
                })
            },
            freerList(id) {
                freerList(id).then(response => {
                    response.data.data.forEach(i => {
                        this.form.freeUserIds.push(i.userId);
                    })
                })
            },
            pageGroupUser(id) {
                if (id) {
                    this.userquery.requestEntity.chatGroupId = id;
                }

                if (!this.userquery.requestEntity.name) {
                    this.userquery.requestEntity.name = null;
                }
                pageGroupUser(this.userquery).then(response => {
                    this.grouplist = response.data.data.records;
                    this.total = response.data.data.total;
                })
                this.detailDialogVisible = true;
            },
            selectfromDeath() {
                selectfromDeath().then(response => {
                    this.fromDeath = response.data.data;
                })
            },
            selectfromRobbot() {
                selectfromRobbot().then(response => {
                    this.fromRobbot = response.data.data;
                })
            },
            skRuleBombpage(id) {
                skRuleBombpage(this.listQuery).then(response => {
                    this.Bombpage = response.data.data.records;
                    this.form.roleBombId = id;
                })
            },
            up(id) {
                up(id).then(response => {
                    this.getList()
                    this.$notify({
                        title: '成功',
                        message: '成功',
                        type: 'success',
                        duration: 2000
                    })
                })
            },
            down(id) {
                down(id).then(response => {
                    this.getList()
                    this.$notify({
                        title: '成功',
                        message: '成功',
                        type: 'success',
                        duration: 2000
                    })
                })
            },
            change() {
                this.getList()
            },
            getList() {
                this.listLoading = true
                getList(this.listQuery).then(response => {
                    this.list = response.data.data.records
                    this.listLoading = false
                })

            },
            handleFilter() {
                this.pageGroupUser()
            },
            handleSizeChange(val) {
                this.userquery.size = val
                this.pageGroupUser()
            },
            handleCurrentChange(val) {
                this.userquery.current = val
                this.pageGroupUser()
            },
            handleDelete(row) {
                delObj(row.id)
                    .then(response => {
                        this.dialogFormVisible = false
                        this.getList()
                        this.$notify({
                            title: '成功',
                            message: '删除成功',
                            type: 'success',
                            duration: 2000
                        })
                    })
            },
            handleCreate() {
                this.form = {
                    "freeUserIds": [],
                    "robotUserIds": [],
                    "lastRobotUserIds": [],
                    "roleBombId": null,
                    "skChatGroup":
                        {
                            "chatgName": null,
                            "img": null,
                            "isActive": "0",
                            "shutup": "0",
                            "joinMoney": null,
                            "know": null,
                            "notice": null,
                            "rule": null,
                            "userId": null,
                            "grabCount": null,
                            "waterBill": null,
                            "unbombFlag": "0",
                            "robotFlag": "0",
                            "lastUnbombFlag": "0",
                            "lastRobotFlag": "0"
                        }
                };
                this.selectfromDeath();
                this.selectfromRobbot();
                this.skRuleBombpage();
                this.dialogStatus = 'create';
                this.dialogFormVisible = true;
            },
            create(formName) {
                const set = this.$refs
                set[formName].validate(valid => {
                    if (valid) {
                        addObjs(this.form)
                            .then(() => {
                                this.dialogFormVisible = false
                                this.getList()
                                this.$notify({
                                    title: '成功',
                                    message: '创建成功',
                                    type: 'success',
                                    duration: 2000
                                })
                            })
                    } else {
                        return false
                    }
                })
            },
            cancel(formName) {
                this.dialogFormVisible = false
                const set = this.$refs
                set[formName].resetFields()
            },
            update(formName) {
                const set = this.$refs
                set[formName].validate(valid => {
                    if (valid) {
                        updateObjs(this.form, this.form.skChatGroup.id)
                            .then(() => {
                                this.dialogFormVisible = false
                                this.getList()
                                this.$notify({
                                    title: '成功',
                                    message: '修改成功',
                                    type: 'success',
                                    duration: 2000
                                })
                            })
                    } else {
                        return false
                    }
                })

            },

            agreeUpdate() {
                updategrouptimelist(this.robbotTimelist)
                    .then(() => {
                        this.detailRobbotVisible = false
                        this.getList()
                        this.$notify({
                            title: '成功',
                            message: '修改成功',
                            type: 'success',
                            duration: 2000
                        })
                    })
            },
            changeGroupShutup(val) {
                changeGroupShutup(val.id).then(() => {
                    this.$notify({
                        title: "成功",
                        message: "创建成功",
                        type: "success",
                        duration: 2000
                    });
                });
            },
        }
    }
</script>
<style lang="scss" scoped>
    .app-container /deep/ .el-form-item{
        margin-bottom: 15px;
    }
</style>
