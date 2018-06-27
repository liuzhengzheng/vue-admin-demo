<template>
  <div class="wrapper-model">
    <i-form :id="formValidateFlag" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="150">
      <i-collapse v-model="cvalue">
        <i-panel name="1">
          模型基本信息
          <p slot="content">
            <i-form-item label="模型名称" prop="cModelName">
              <i-input v-model="formValidate.cModelName" placeholder="请输入模型名称" :maxlength="100"></i-input>
            </i-form-item>
            <i-row>
              <i-col :sm="24" :md="13">
                <i-form-item label="是否定版" prop="cIsFinal">
                  <i-switch v-model="formValidate.cIsFinal" @on-change="handleIsFinal">
                    <span slot="open">开</span>
                    <span slot="close">关</span>
                  </i-switch>
                  <span class="tip">开启后请完善所有红框标记项</span>
                </i-form-item>
              </i-col>
              <i-col :sm="24" :md="11">
                <i-form-item label="塔架高度" prop="cHubHeight">
                  <i-input v-model="formValidate.cHubHeight" placeholder="请输入塔架高度" :maxlength="9"></i-input>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col :sm="24" :md="11">
                <i-form-item label="塔架重量" prop="cTowerMass">
                  <i-input v-model="formValidate.cTowerMass" placeholder="请输入塔架重量" :maxlength="9"></i-input>
                </i-form-item>
              </i-col>
              <i-col :sm="24" :md="{span: 11, offset: 2}">
                <i-form-item label="塔架编号" prop="cTowerDrawingNo">
                  <i-input v-model="formValidate.cTowerDrawingNo" placeholder="请输入塔架编号" :maxlength="50"></i-input>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col :sm="24" :md="11">
                <i-form-item label="叶片名称" prop="cBladeName">
                  <i-input v-model="formValidate.cBladeName" placeholder="请输入叶片名称" :maxlength="100"></i-input>
                </i-form-item>
              </i-col>
              <i-col :sm="24" :md="{span: 11, offset: 2}">
                <i-form-item label="叶片重量" prop="cBladeMass">
                  <i-input v-model="formValidate.cBladeMass" placeholder="请输入叶片重量" :maxlength="9"></i-input>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col :sm="24" :md="11">
                <i-form-item label="叶片Cp" prop="cMaxCp">
                  <i-input v-model="formValidate.cMaxCp" placeholder="请输入叶片Cp" :maxlength="9"></i-input>
                </i-form-item>
              </i-col>
              <i-col :sm="24" :md="{span: 11, offset: 2}">
                <i-form-item label="叶片参数文件">
                  <span class="file-path">已传文件：{{fileExist}}</span>
                  <i-upload
                    ref="upload"
                    name="bladeFile"
                    accept=".xml"
                    :before-upload="onBefordUpload"
                    :data="uploadData"
                    :action="onUploadBladeFile"
                    :on-success="onUploadSuccess"
                    :on-error="onUploadError"
                    >
                    <i-button v-if="this.fileFlag===0" type="ghost" icon="ios-cloud-upload-outline">上传文件</i-button>
                    <i-button v-if="this.fileFlag===2" type="ghost" icon="ios-cloud-upload-outline">重新上传</i-button>
                    <span v-if="this.fileFlag===2" class="tip">文件上传失败</span>
                  </i-upload>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col :sm="24" :md="11">
                <i-form-item label="最优桨距角" prop="cOptPitch">
                  <i-input v-model="formValidate.cOptPitch" placeholder="请输入最优桨距角" :maxlength="9"></i-input>
                </i-form-item>
              </i-col>
              <i-col :sm="24" :md="{span: 11, offset: 2}">
                <i-form-item label="模型权限">
                  <i-select clearable multiple placeholder="请选择权限" disabled>
                  </i-select>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col :sm="24" :md="11">
                <i-form-item label="软件仿真版本" prop="cBladedVersion">
                  <i-select v-model="formValidate.cBladedVersion" placeholder="请选择软件仿真版本">
                    <i-option v-for="(item, index) in dict.cBladedVersion" :value="parseInt(index)" :key="item">{{item}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col :sm="24" :md="{span: 11, offset: 2}">
                <i-form-item label="机舱重量" prop="cNacelleMass">
                  <i-input v-model="formValidate.cNacelleMass" placeholder="请输入机舱重量" :maxlength="9">
                  </i-input>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col :sm="24" :md="11">
                <i-form-item label="轮毂重量" prop="cHubMass">
                  <i-input v-model="formValidate.cHubMass" placeholder="请输入轮毂重量" :maxlength="9">
                  </i-input>
                </i-form-item>
              </i-col>
              <i-col :sm="24" :md="{span: 11, offset: 2}">
                <i-form-item label="发电机重量" prop="cGeneratorMass">
                  <i-input v-model="formValidate.cGeneratorMass" placeholder="请输入发电机重量" :maxlength="9">
                  </i-input>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
            <i-col :sm="24" :md="11">
                <i-form-item label="额定转速" prop="cN3">
                  <i-input v-model="formValidate.cN3" placeholder="请输入切出转速" :maxlength="9">
                  </i-input>
                </i-form-item>
              </i-col>
              <i-col :sm="24" :md="{span: 11, offset: 2}">
                <i-form-item label="切入转速" prop="cN1">
                  <i-input v-model="formValidate.cN1" placeholder="请输入切入转速" :maxlength="9">
                  </i-input>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col :sm="24" :md="11">
                <i-form-item label="切出风速" prop="cVOut">
                  <i-input v-model="formValidate.cVOut" placeholder="请输入切出风速" :maxlength="9">
                  </i-input>
                </i-form-item>
              </i-col>
              <i-col :sm="24" :md="{span: 11, offset: 2}">
                <i-form-item label="切入风速" prop="cVIn">
                  <i-input v-model="formValidate.cVIn" placeholder="请输入切入风速" :maxlength="9">
                  </i-input>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
             <i-col :sm="24" :md="11">
                <i-form-item label="机型系列" prop="cProductSeries">
                  <i-select clearable placement="top" v-model="formValidate.cProductSeries" @on-change="onChangeModelSeries" placeholder="请选择机型系列">
                    <i-option v-for="(item, index) in dict.cProductSeries" :value="parseInt(index)" :key="item">{{item}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col :sm="24" :md="{span: 11, offset: 2}">
                <i-form-item label="短路文件" prop="cShortcircuitId">
                  <i-select v-if="cShortcircuitIds.length===0" clearable v-model="formValidate.cShortcircuitId" placeholder="请在选择机型系列后选择短路文件" disabled>
                  </i-select>
                  <i-select v-if="cShortcircuitIds.length>0" clearable placement="top" v-model="formValidate.cShortcircuitId" placeholder="请选择短路文件">
                    <i-option v-for="item in cShortcircuitIds" :value="item.cId" :label="item.cUploadPath" :key="item.cId">
                      <div v-for="optionitem in item.cUploadPath.split(',')">{{optionitem}}</div>
                    </i-option>
                  </i-select>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="24">
                <i-form-item label="描述" prop="cDescription">
                  <i-input type="textarea" v-model="formValidate.cDescription" placeholder="请输入模型描述信息" :maxlength="255"></i-input>
                </i-form-item>
              </i-col>
            </i-row>
          </p>
        </i-panel>
        <i-panel name="2">
          模型技术参数
          <p slot="content">
            <i-row>
              <i-col :sm="24" :md="11">
                <i-form-item label="设计规范" prop="cDesignStandard">
                  <i-select clearable v-model="formValidate.cDesignStandard" placeholder="请选择设计规范">
                    <i-option v-for="(item, index) in dict.cDesignStandard" :value="parseInt(index)" :key="item">{{item}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col :sm="24" :md="{span: 11, offset: 2}">
                <i-form-item label="风场等级" prop="cWindClass">
                  <i-select clearable v-model="formValidate.cWindClass" placeholder="请选择风场等级">
                    <i-option v-for="(item, index) in dict.cWindClass" :value="parseInt(index)" :key="item">{{item}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col :sm="24" :md="11">
                <i-form-item label="空气密度" prop="cAirDensity">
                  <i-input v-model="formValidate.cAirDensity" placeholder="请输入空气密度" :maxlength="9">
                  </i-input>
                </i-form-item>
              </i-col>
              <i-col :sm="24" :md="{span: 11, offset: 2}">
                <i-form-item label="Kopt" prop="cKopt">
                  <i-input v-model="formValidate.cKopt" placeholder="请输入Kopt" :maxlength="9">
                  </i-input>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col :sm="24" :md="11">
                <i-form-item label="参考风速" prop="cVRef">
                  <i-input v-model="formValidate.cVRef" placeholder="请输入参考风速" :maxlength="9">
                  </i-input>
                </i-form-item>
              </i-col>
              <i-col :sm="24" :md="{span: 11, offset: 2}">
                <i-form-item label="平均风速" prop="cAve">
                  <i-input v-model="formValidate.cAve" placeholder="请输入平均风速" :maxlength="9">
                  </i-input>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col :sm="24" :md="11">
                <i-form-item label="湍流强度" prop="cTi">
                  <i-input v-model="formValidate.cTi" placeholder="请输入湍流强度" :maxlength="9">
                  </i-input>
                </i-form-item>
              </i-col>
              <i-col :sm="24" :md="{span: 11, offset: 2}">
                <i-form-item label="风剪切" prop="cWindShear">
                  <i-input v-model="formValidate.cWindShear" placeholder="请输入风剪切" :maxlength="9">
                  </i-input>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col :sm="24" :md="11">
                <i-form-item label="入流角" prop="cInflow">
                  <i-input v-model="formValidate.cInflow" placeholder="请输入入流角" :maxlength="9">
                  </i-input>
                </i-form-item>
              </i-col>
            </i-row>
          </p>
        </i-panel>
      </i-collapse>
      <i-form-item class="submit">
        <i-button type="primary" @click="onSubmit('formValidate')">保存</i-button>
        <i-button @click="onCancle">取消</i-button>
      </i-form-item>
    </i-form>
  </div>
</template>
<script>
  import { Row, Col, Collapse, Panel, Form, FormItem, Input, Button, Icon, Select, Option, Modal, Upload, Switch } from 'iview'
  import { AllData, Dict, Short } from './data/data.js'
  const onlyInteger = (rule, value, callback) => {
    if (!/^\d+$/.test(value) && value !== null && value !== '') {
      callback(new Error('请输入非负整数值'))
    } else {
      callback()
    }
  }
  const onlyFloat = (rule, value, callback) => {
    if (!/^(-?\d+)(\.\d+)?$/.test(value) && value !== null && value !== '') {
      callback(new Error('请输入数字值'))
    } else {
      callback()
    }
  }
  const onlyNonNnegativeFloat = (rule, value, callback) => {
    if (!/^\d+(\.\d+)?$/.test(value) && value !== null && value !== '') {
      callback(new Error('请输入非负数字值'))
    } else {
      callback()
    }
  }
  const onlyModelName = (rule, value, callback) => {
    if (!/^[Gg][Ww][1-9][0-9]{1,2}[Pp][1-9][0-9]{1,3}/.test(value) && value !== null && value !== '') {
      callback(new Error('请输入正确格式的模型名称'))
    } else {
      callback()
    }
  }
  const raquiredData = {
    cModelName: [
      { required: true, message: '请输入模型名称' },
      { validator: onlyModelName, trigger: 'blur' }
    ],
    cHubHeight: [
      { required: true, message: '请输入塔架高度' },
      { validator: onlyNonNnegativeFloat, trigger: 'blur' }
    ],
    cTowerMass: [
      { required: true, message: '请输入塔架重量' },
      { validator: onlyNonNnegativeFloat, trigger: 'blur' }
    ],
    cTowerDrawingNo: [
      { required: true, message: '请输入塔架编号' },
      { type: 'string', message: '塔架编号必须为字符串', trigger: 'blur' }
    ],
    cBladeName: [
      { required: true, message: '请输入叶片名称' },
      { type: 'string', message: '叶片名称必须为字符串', trigger: 'blur' }
    ],
    cBladeMass: [
      { required: true, message: '请输入叶片重量' },
      { validator: onlyNonNnegativeFloat, trigger: 'blur' }
    ],
    cMaxCp: [
      { required: true, message: '请输入叶片Cp' },
      { validator: onlyNonNnegativeFloat, trigger: 'blur' }
    ],
    cOptPitch: [
      { required: true, message: '请输入最优桨距角' },
      { validator: onlyFloat, trigger: 'blur' }
    ],
    cBladedVersion: [
      { required: true, message: '请选择软件仿真版本' }
    ],
    cNacelleMass: [
      { required: true, message: '请输入机舱重量' },
      { validator: onlyInteger, trigger: 'blur' }
    ],
    cHubMass: [
      { required: true, message: '请输入轮毂重量' },
      { validator: onlyInteger, trigger: 'blur' }
    ],
    cGeneratorMass: [
      { required: true, message: '请输入发电机重量' },
      { validator: onlyInteger, trigger: 'blur' }
    ],
    cN3: [
      { required: true, message: '请输入额定转速' },
      { validator: onlyNonNnegativeFloat, trigger: 'blur' }
    ],
    cN1: [
      { required: true, message: '请输入切入转速' },
      { validator: onlyNonNnegativeFloat, trigger: 'blur' }
    ],
    cVOut: [
      { required: true, message: '请输入切出风速' },
      { validator: onlyNonNnegativeFloat, trigger: 'blur' }
    ],
    cVIn: [
      { required: true, message: '请输入切入风速' },
      { validator: onlyNonNnegativeFloat, trigger: 'blur' }
    ],
    cProductSeries: [
      { required: true, message: '请选择机型系列' }
    ],
    cShortcircuitId: [
      { required: true, message: '请选择短路文件' }
    ],
    cDescription: [
      { required: false, message: '请输入描述信息' }
    ],
    cDesignStandard: [
      { required: true, message: '请选择设计规范' }
    ],
    cWindClass: [
      { required: true, message: '请选择风场等级' }
    ],
    cAirDensity: [
      { required: true, message: '请输入空气密度' },
      { validator: onlyNonNnegativeFloat, trigger: 'blur' }
    ],
    cKopt: [
      { required: true, message: '请输入Kopt' },
      { validator: onlyNonNnegativeFloat, trigger: 'blur' }
    ],
    cVRef: [
      { required: true, message: '请输入参考风速' },
      { validator: onlyNonNnegativeFloat, trigger: 'blur' }
    ],
    cAve: [
      { required: true, message: '请输入平均风速' },
      { validator: onlyNonNnegativeFloat, trigger: 'blur' }
    ],
    cTi: [
      { required: true, message: '请输入湍流强度' },
      { validator: onlyNonNnegativeFloat, trigger: 'blur' }
    ],
    cWindShear: [
      { required: true, message: '请输入风剪切' },
      { validator: onlyNonNnegativeFloat, trigger: 'blur' }
    ],
    cInflow: [
      { required: true, message: '请输入入流角' },
      { validator: onlyFloat, trigger: 'blur' }
    ]
  }
  const noraquiredData = {
    cModelName: [
      { required: true, message: '请输入模型名称' },
      { validator: onlyModelName, trigger: 'blur' }
    ],
    cHubHeight: [
      { required: false },
      { validator: onlyNonNnegativeFloat, trigger: 'blur' }
    ],
    cTowerMass: [
      { required: false },
      { validator: onlyNonNnegativeFloat, trigger: 'blur' }
    ],
    cTowerDrawingNo: [
      { required: false },
      { type: 'string', message: '塔架编号必须为字符串', trigger: 'blur' }
    ],
    cBladeName: [
      { required: false },
      { type: 'string', message: '叶片名称必须为字符串', trigger: 'blur' }
    ],
    cBladeMass: [
      { required: false },
      { validator: onlyNonNnegativeFloat, trigger: 'blur' }
    ],
    cMaxCp: [
      { required: false },
      { validator: onlyNonNnegativeFloat, trigger: 'blur' }
    ],
    cOptPitch: [
      { required: false },
      { validator: onlyFloat, trigger: 'blur' }
    ],
    cBladedVersion: [
      { required: false }
    ],
    cNacelleMass: [
      { required: false },
      { validator: onlyInteger, trigger: 'blur' }
    ],
    cHubMass: [
      { required: false },
      { validator: onlyInteger, trigger: 'blur' }
    ],
    cGeneratorMass: [
      { required: false },
      { validator: onlyInteger, trigger: 'blur' }
    ],
    cN3: [
      { required: false },
      { validator: onlyNonNnegativeFloat, trigger: 'blur' }
    ],
    cN1: [
      { required: false },
      { validator: onlyNonNnegativeFloat, trigger: 'blur' }
    ],
    cVOut: [
      { required: false },
      { validator: onlyNonNnegativeFloat, trigger: 'blur' }
    ],
    cVIn: [
      { required: false },
      { validator: onlyNonNnegativeFloat, trigger: 'blur' }
    ],
    cProductSeries: [
      { required: false }
    ],
    cShortcircuitId: [
      { required: false }
    ],
    cDescription: [
      { required: false }
    ],
    cDesignStandard: [
      { required: false }
    ],
    cWindClass: [
      { required: false }
    ],
    cAirDensity: [
      { required: false },
      { validator: onlyNonNnegativeFloat, trigger: 'blur' }
    ],
    cKopt: [
      { required: false },
      { validator: onlyNonNnegativeFloat, trigger: 'blur' }
    ],
    cVRef: [
      { required: false },
      { validator: onlyNonNnegativeFloat, trigger: 'blur' }
    ],
    cAve: [
      { required: false },
      { validator: onlyNonNnegativeFloat, trigger: 'blur' }
    ],
    cTi: [
      { required: false },
      { validator: onlyNonNnegativeFloat, trigger: 'blur' }
    ],
    cWindShear: [
      { required: false },
      { validator: onlyNonNnegativeFloat, trigger: 'blur' }
    ],
    cInflow: [
      { required: false },
      { validator: onlyFloat, trigger: 'blur' }
    ]
  }
  export default {
    data () {
      return {
        cvalue: ['1', '2'],
        dict: {},
        formValidateFlag: 'noformValidate',
        fileFlag: 0,
        uploadData: {},
        cShortcircuitIds: [],
        formValidate: {
          cId: this.$route.params.id,
          cModelName: '',
          cIsFinal: null,
          cHubHeight: null,
          cTowerMass: null,
          cTowerDrawingNo: null,
          cBladeName: '',
          cBladeMass: null,
          cMaxCp: null,
          cBladeParamsFilePath: null,
          cOptPitch: null,
          // cTags: [],
          cBladedVersion: null,
          cNacelleMass: null,
          cHubMass: null,
          cGeneratorMass: null,
          cN3: null,
          cN1: null,
          cVOut: null,
          cVIn: null,
          cProductSeries: '',
          cShortcircuitId: '',
          cDescription: '',
          cDesignStandard: null,
          cWindClass: null,
          cAirDensity: null,
          cKopt: null,
          cVRef: null,
          cAve: null,
          cTi: null,
          cWindShear: null,
          cInflow: null
        },
        ruleValidate: noraquiredData
      }
    },
    created: function () {
      // 获取字典
      this.dict = Dict.data
      // 获取单个模型数据
      const data = AllData.data
      for (let key in data) {
        if (data[key] !== null) {
          this.formValidate[key] = data[key]
        }
      }
      this.handleIsFinal()
    },
    methods: {
      handleIsFinal () {
        if (this.formValidate.cIsFinal) {
          this.ruleValidate = {...raquiredData}
          this.formValidateFlag = 'formValidate'
        } else {
          this.ruleValidate = {...noraquiredData}
          this.formValidateFlag = 'noformValidate'
        }
      },
      onChangeModelSeries () {
        if (this.formValidate.cProductSeries === '' || this.formValidate.cProductSeries === null) {
          this.cShortcircuitIds = []
        } else {
          [...this.cShortcircuitIds] = Short.data
        }
      },
      onBefordUpload () {
        // this.$refs.upload.clearFiles()
        // this.uploadData = { 'bladeFilePath': this.formValidate.cBladeParamsFilePath === null ? '' : this.formValidate.cBladeParamsFilePath }
        // let promise = new Promise((resolve) => {
        //   this.$nextTick(function () {
        //     resolve(true)
        //   })
        // })
        // return promise
      },
      onUploadSuccess (res, file, fileList) {
        if (res.success === true) {
          this.formValidate.cBladeParamsFilePath = res.data.cBladeParamsFilePath
        }
      },
      onUploadError () {
        this.fileFlag = 2
      },
      onCancle () {
        this.$router.push('/a/load-simulation/model-list')
      },
      onSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Spin.show()
            setTimeout(res => {
              this.$Spin.hide()
              this.$Message.success('提交成功')
            }, 3000)
          } else {
            this.$Message.error('请正确填入信息')
          }
        })
      }
    },
    computed: {
      onUploadBladeFile () {
        return `//jsonplaceholder.typicode.com/posts/`
      },
      fileExist () {
        return this.formValidate.cBladeParamsFilePath ? this.formValidate.cBladeParamsFilePath.split('/').pop() : ''
      }
    },
    components: {
      'i-row': Row,
      'i-col': Col,
      'i-collapse': Collapse,
      'i-panel': Panel,
      'i-form': Form,
      'i-form-item': FormItem,
      'i-input': Input,
      'i-button': Button,
      'i-icon': Icon,
      'i-select': Select,
      'i-option': Option,
      'i-modal': Modal,
      'i-upload': Upload,
      'i-switch': Switch
    }
  }
</script>
<style scoped>
.wrapper-model{
  padding: 0 50px 50px 0;
  height: 100vh;
  overflow: auto;
}
.submit{
  margin-left: -150px;
  text-align: center;
}
.submit button{
  margin: 20px;
}
.tip{
  color: #ed3f14;
  display: inline-block;
  margin-left: 10px;
}
.file-path{
  display: inline-block;
  margin-right: 10px;
  overflow: hidden;
}
</style>
<style>
.wrapper-model .ivu-collapse-content{
  padding: 0 100px 0 50px;
}
.wrapper-model .ivu-collapse>.ivu-collapse-item>.ivu-collapse-header{
  font-size: 14px;
}
.wrapper-model .ivu-collapse>.ivu-collapse-item>.ivu-collapse-header .ivu-icon{
  margin-right: 10px;
}
#formValidate .ivu-form-item-error .ivu-form-item-label:before{
  content: '*';
  display: inline-block;
  margin-right: 4px;
  line-height: 1;
  font-family: SimSun;
  font-size: 12px;
  color: #ed3f14;
}
#noformValidate .ivu-form-item.ivu-form-item-label:before, .wrapper-model .ivu-upload-list-remove{
  display: none
}
#noformValidate .ivu-form-item.ivu-form-item-required .ivu-form-item-label:before{
  content: '*';
  display: inline-block;
  margin-right: 4px;
  line-height: 1;
  font-family: SimSun;
  font-size: 12px;
  color: #ed3f14;
}
</style>