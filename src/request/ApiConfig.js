
module.exports = {
  api: {
    // tmsrs微服务接口
    dlc: `/tmsrs/dlc`, // 查询载荷工况信息
    dlcgroups: `/tmsrs/dlcgroups`, // 查询载荷工况分组信息
    // modelmgmt微服务接口
    dict: `/modelmgmt/model/data/dict`, // 字典
    mapping: `/modelmgmt/model/product/mapping`, // 机型系列与风机型号映射接口
    modellist: `/modelmgmt/model/list/pages`, // 模型列表
    getSinglemodel: `/modelmgmt/model`, // 查询单个模型
    updatemodel: `/modelmgmt/model`, // 更新模型
    uploadBladeFile: `/modelmgmt/model/uploadBladeFile`, // 上传叶片文件
    uploadShortCircuits: `/modelmgmt/model/shortcircuits` // 上传短路文件
  }
}
