# 元件概述

## 布局元件

### 审批卡片

- 可以添加审批信息的卡片组，每张卡片的数据结构相同，主要应用于类似批量审批多张保单的场景，提高审批的效率。
  
  - 每张卡片可标记是否审批。
  - 全屏审批功能，文件与表单的分屏展示，提高对比效率。
  - 内嵌对比元件，实现字段差异化的快速比对。

#### 数据结构

- 示例

```js

{
  "vehicles": [  // 上下文字段
		{ // 第一张卡片
			"name": "LB2WA5884A800823", // 卡片标题 
			"mark": null, // 卡片标记状态  null - 未标记， true - 标记无误  false - 标记有误
			"value": {
        // ... 内嵌元件
      }
    }
  ]
}

```

### 网格

- 网格把界面 m*n 个格子， 里面可以嵌入不同的元件，网格不同于栅格，本身有一个作用域（数据源）。

#### 数据结构

- 示例

```js

{
  "apple": {  // 上下文字段
		// ... 内嵌组件
  }
}

```


## 数据元件

### 对比表单

- 用于一组数据在多个数据源下的对比，可以自动高亮出不同之处，比如对比车辆信息在保单、ocr、等数据源是否有差异。

#### 数据结构

- 示例

```js

{
  "autoCompares": [ // 上下文字段
    { // 其中一个数据源 
      "name": "orderDs",
      "data": [ // 对比字段列表
        {
          "name": "modelNo", // 对比字段 key
          "value": {
            "value": "MR71828",  // 对比字段值
            "oldValue": "",  // 对比字段上一次的值
            "mark": false, // 对比字段标记状态
            "remark": "查无此型号，请核对" // 对比字段备注
          }
        }
      ]
    }
  ]
}

```

### 表格

- 常规表格。

#### 数据结构

- 示例

```js

{
  "books": [ // 上下文字段
    {
      // ... 内嵌元件列表
    }
  ]
}

```


## 基本元件

### 文本

- 此元件用于纯文本的展示， 同时具有标记、备注以及展示上一次数据的功能。

#### 数据结构

- 示例

```js

{
  "orderNo": {
		"value": "2660 2028 4902 9023", // 当前值
		"oldValue": "2660 2028 4902 9024", // 上一次的值
		"mark": false, // 标记状态
		"remark": "账号错误，请仔细核对！" // 备注
	},
}

```

### 文件预览

- 此元件用于文件列表的展示， 同时具有预览、下载、标记、备注以及展示上一次数据的功能。

#### 数据结构

- 示例

```js

{
  "files": {
    "oldValue": [ // 上一次值列表
      {
        "name": "新车发票.png", // 文件名称
        "url": "https://xxx.aliyuncs.com/tmp/06fdde6f-ec9b-46a0-8338-5eb9b814786b/1.png" // 文件url
      }
    ],
    "value": [ // 当前值列表
      {
        "name": "新车发票.png", // 文件名称
        "url": "https://xxx.aliyuncs.com/tmp/06fdde6f-ec9b-46a0-8338-5eb9b814786b/%E5%8F%91%E7%A5%A8.png" // 文件url
      }
    ],
    "mark": false, //  标记状态
    "remark": "发票已过期" // 备注
  }
}

```


### 文件上传

- 此元件用于上传文件， 同时具有预览、下载等功能。

#### 数据结构

- 示例

```js

{
  "files": [
    {
      "name": "1.docx",
      "url": "http://xxxxx"
    }
  ]
}

```


### 图片上传

- 此元件用于上传图片， 跟文件上传一样，不同于这里展示缩略图效果。

#### 数据结构

- 示例

```js

{
  "files": [
    {
      "name": "1.png",
      "url": "http://xxxxx"
    }
  ]
}

```


## 基本元件

### 栅格布局

- 此元件用于栅格布局，没有作用域。


### 标签页

- 标签选项卡， 分为静态和动态两种类型，静态没有作用域，动态这则是根据数据生成。

在动态模式下，选项卡名称可以使用表达式 `车架号: ${ctx.frameNo}`, ctx 为传入的每个卡片数据。

#### 数据结构（动态 ）

- 示例

```js

{
  "cars": [
    {
      // ... 内嵌
    }
  ]
}

```

### 区块

- 此元件用于布局元件，没有作用域。

### 单文本框

- 文本输入框。

#### 数据结构

- 示例

```js

{
  "name": ""
}

```

### 多行文本

- 多行文本输入框。

#### 数据结构

- 示例

```js

{
  "name": ""
}

```

### 下拉选择

- 下拉选择框

#### 数据结构

- 示例

```js

{
  "type": "1"
}

```

# 演示

[在线demo](https://pat-fet.github.io/form-editor/)


- 表单定义 

```json
{
  "list": [
    {
      "type": "audit-list",
      "key": "160644199557610034",
      "name": "审批卡片示例",
      "model": "cars",
      "list": [
        {
          "type": "block",
          "key": "160644249577710037",
          "name": "保单附件",
          "list": [
            {
              "type": "audit-file",
              "key": "160644453860310096",
              "name": "驾驶证",
              "model": "licenses",
              "options": {
                "disabled": false,
                "hidden": false,
                "defaultValue": null,
                "required": false,
                "markable": true
              },
              "rules": []
            }
          ],
          "options": {
            "hidden": false
          }
        }
      ],
      "options": {
        "disabled": false,
        "hidden": false,
        "required": false,
        "defaultValue": []
      },
      "rules": []
    },
    {
      "type": "lattice",
      "key": "160644262600510041",
      "name": "网格示例",
      "model": "extra",
      "columns": [
        [
          {
            "row": 1,
            "col": 1,
            "list": [
              {
                "type": "text",
                "key": "160644270422510044",
                "name": "额外信息一",
                "model": "info1",
                "options": {
                  "disabled": false,
                  "hidden": false,
                  "defaultValue": "",
                  "required": false
                },
                "rules": []
              }
            ]
          },
          {
            "row": 1,
            "col": 2,
            "list": [
              {
                "type": "text",
                "key": "160644275473010047",
                "name": "额外信息二",
                "model": "info2",
                "options": {
                  "disabled": false,
                  "hidden": false,
                  "defaultValue": "",
                  "required": false
                },
                "rules": []
              }
            ]
          }
        ],
        [
          {
            "row": 2,
            "col": 1,
            "list": [
              {
                "type": "text",
                "key": "160644276689210050",
                "name": "额外信息三",
                "model": "info3",
                "options": {
                  "disabled": false,
                  "hidden": false,
                  "defaultValue": "",
                  "required": false
                },
                "rules": []
              }
            ]
          },
          {
            "row": 2,
            "col": 2,
            "list": [
              {
                "type": "text",
                "key": "160644278858410053",
                "name": "额外信息四",
                "model": "info4",
                "options": {
                  "disabled": false,
                  "hidden": false,
                  "defaultValue": "",
                  "required": false
                },
                "rules": []
              }
            ]
          }
        ]
      ],
      "options": {
        "hidden": false,
        "disabled": false,
        "defaultValue": null,
        "required": false,
        "row": 2,
        "col": 2,
        "align": "top"
      },
      "rules": []
    },
    {
      "type": "audit-diff",
      "key": "160644281414610056",
      "name": "对比表单示例",
      "model": "compares",
      "rows": [
        {
          "name": "key1",
          "label": "字段 1"
        },
        {
          "name": "key2",
          "label": "字段 2"
        },
        {
          "name": "key3",
          "label": "字段 3"
        }
      ],
      "cols": [
        {
          "name": "ds1",
          "label": "数据源 1",
          "markable": false
        },
        {
          "name": "ds2",
          "label": "数据源 2",
          "markable": false
        }
      ],
      "options": {
        "mark": true,
        "disabled": false,
        "hidden": false,
        "defaultValue": null,
        "required": false
      },
      "rules": []
    },
    {
      "type": "table",
      "key": "160644334945410059",
      "name": "表格示例",
      "model": "emps",
      "options": {
        "disabled": false,
        "hidden": false,
        "required": false,
        "defaultValue": []
      },
      "tableColumns": [
        {
          "type": "text",
          "key": "160644345008110071",
          "name": "文字",
          "model": "text_160644345008110073",
          "options": {
            "disabled": false,
            "hidden": false,
            "defaultValue": "",
            "required": false
          },
          "rules": []
        },
        {
          "type": "text",
          "key": "160644341862410068",
          "name": "电话",
          "model": "tel",
          "options": {
            "disabled": false,
            "hidden": false,
            "defaultValue": "",
            "required": false
          },
          "rules": []
        },
        {
          "type": "text",
          "key": "160644352302910077",
          "name": "居住地址",
          "model": "address",
          "options": {
            "disabled": false,
            "hidden": false,
            "defaultValue": "",
            "required": false
          },
          "rules": []
        },
        {
          "type": "select",
          "key": "160644347067110074",
          "name": "状态",
          "model": "status",
          "options": {
            "disabled": false,
            "multiple": false,
            "clearable": false,
            "options": [
              {
                "value": "Y",
                "label": "有效"
              },
              {
                "value": "N",
                "label": "无效"
              }
            ],
            "defaultValue": "",
            "required": false,
            "placeholder": ""
          },
          "rules": []
        }
      ],
      "rules": []
    },
    {
      "type": "block",
      "key": "160644361404610080",
      "name": "基础元件区块",
      "list": [
        {
          "type": "grid",
          "key": "160644363819010081",
          "name": "栅格布局",
          "columns": [
            {
              "span": 12,
              "list": [
                {
                  "type": "audit-text",
                  "key": "160644365005510082",
                  "name": "文本",
                  "model": "text",
                  "options": {
                    "disabled": false,
                    "hidden": false,
                    "defaultValue": null,
                    "required": false,
                    "markable": true
                  },
                  "rules": []
                }
              ]
            },
            {
              "span": 12,
              "list": [
                {
                  "type": "audit-file",
                  "key": "160644365464210085",
                  "name": "文件预览",
                  "model": "files",
                  "options": {
                    "disabled": false,
                    "hidden": false,
                    "defaultValue": null,
                    "required": false,
                    "markable": true
                  },
                  "rules": []
                }
              ]
            }
          ],
          "options": {
            "hidden": false,
            "gutter": 0,
            "justify": "start",
            "align": "top"
          }
        },
        {
          "type": "grid",
          "key": "160644366837310089",
          "name": "栅格布局",
          "columns": [
            {
              "span": 12,
              "list": [
                {
                  "type": "fileupload",
                  "key": "160644367421210090",
                  "name": "文件",
                  "model": "fileupload",
                  "options": {
                    "disabled": false,
                    "action": "http://localhost:3000/form/uploadFile",
                    "limit": 8,
                    "tip": "",
                    "defaultValue": [],
                    "required": false
                  },
                  "rules": []
                }
              ]
            },
            {
              "span": 12,
              "list": [
                {
                  "type": "imgupload",
                  "key": "160644367588110093",
                  "name": "图片",
                  "model": "imgupload",
                  "options": {
                    "disabled": false,
                    "action": "http://localhost:3000/form/uploadFile",
                    "limit": 8,
                    "defaultValue": [],
                    "required": false
                  },
                  "rules": []
                }
              ]
            }
          ],
          "options": {
            "hidden": false,
            "gutter": 0,
            "justify": "start",
            "align": "top"
          }
        }
      ],
      "options": {
        "hidden": false
      }
    }
  ],
  "config": {
    "labelWidth": 100,
    "labelPosition": "left",
    "size": "small"
  }
}
```


- 表单数据

```json
{
	"cars": [{
		"name": "沪A234565",
		"mark": null,
		"value": {
			"licenses": {
				"value": [
					{
						"name": "驾驶证.png",
						"url": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606454080900&di=4b3972f969508a87aa43b3318e518de4&imgtype=0&src=http%3A%2F%2Fpngimg.com%2Fuploads%2Fpokemon%2Fpokemon_PNG148.png"
					}
				]
			}
		}
	},
	{
		"name": "沪B98678",
		"mark": null,
		"value": {
			"licenses": {
				"value": [
					{
						"name": "行驶证.png",
						"url": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606454720205&di=315382579b8845c50bf8c0a46b48283a&imgtype=0&src=http%3A%2F%2Fattimg.dospy.com%2Fimg%2Fday_091202%2F20091202_46ad536a66ae218999397v3Bi55EfIB5.png"
					}
				]
			}
		}
	}],
	"extra": {
		"info1": "全国统一的医保信息平台投入使用",
		"info2": "长期困扰医保部门的标准不统一",
		"info3": "转载此文是出于传递更多信息之目的",
		"info4": "若有来源标注错误或侵犯了您的合法权益"
	},
	"compares": [
		{
			"name": "ds1",
			"data": [
				{
					"name": "key1",
					"value": {
						"value": "LB2WA5884A800823"
					}
				},
				{
					"name": "key2",
					"value": {
						"value": "沪B 0782",
						"remark": "驾驶证ocr识别有误，需核对！"
					}
				},
				{
					"name": "key3",
					"value": {
						"value": "XXX名称"
					}
				}
			]
		},
		{
			"name": "ds2",
			"data": [
				{
					"name": "key1",
					"value": {
						"value": "LB2WA5884A800823"
					}
				},
				{
					"name": "key2",
					"value": {
						"value": "沪B 0783"
					}
				},
				{
					"name": "key3",
					"value": {
						"value": "yyy名称"
					}
				}
			]
		}
	
	],
	"emps": [
		{
			"name": "张三",
			"tel": "13876755667",
			"address": "上海市浦东区",
			"status": "Y"
		},
		{
			"name": "李四",
			"tel": "15978765436",
			"address": "北京市",
			"status": "N"
		},
		{
			"name": "王五",
			"tel": "13576667878",
			"address": "上海市浦东区",
			"status": "Y"
		}
	],
	"text": {
		"value": "中国建设银行", 
		"oldValue": "中国招商银行",
		"mark": false,
		"remark": "信息有更改，请核对"	
	},
	"files": {
		"value": [
			{
				"name": "policy.png",
				"url": "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1348214592,3023603506&fm=26&gp=0.jpg"
			}
		]
	}

}
```