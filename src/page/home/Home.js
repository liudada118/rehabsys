import React, { useState } from 'react'
import Title from '../../component/title/Title'
import { Progress } from 'antd'
import { useNavigate } from 'react-router-dom'
import './home.scss'

const gameArr = [
  { name: '手指屈伸训练', img: './img/darts.png' },
  { name: '手掌抓握训练', img: './img/orange.png' },
  { name: '手指对称位训练', img: './img/fish.png' },
  { name: '手腕旋转训练', img: './img/fishing.png' },
]

const baseArr = [
  { name: '手指拉力训练', router: 'item1', info: '通过改变不同手指的牵引模式，逐渐递增阻力，进行渐进式训练，改善手指的活动度，增加肌力.', img: './img/darts.png' },
  { name: '手掌握力训练', router: 'item2', info: '通过抓握不同直径的圆柱体,增强手部的抓握能力，同时逐渐递增阻力，训练患者的抓握能力和腕部的屈伸能力.', img: './img/orange.png' },
  { name: '手腕旋转训练', router: 'item3', info: '通过五指抓握特殊定制圆球，逐渐递增阻力，训练患者的握力和腕部旋转能力(平转).', img: './img/fish.png' },
  // { name: '腕关节尺偏桡偏训练', router: 'item4', info: '通过特殊固定装置，逐渐递增阻力，训练患者的尺骨、桡骨活动度以及腕部的上下翻训练.', img: './img/fishing.png' },
  // { name: '手指伸展训练', router: 'item5', info: '通过特殊定制的手指用具(挂钩)和腕部辅助用具(腕垫)，逐渐递增阻力，训练患者手指的伸展功能.', img: './img/darts.png' },
  // { name: '手柄提升训练', router: 'item6', info: '通过不同的手握装置，逐渐递增阻力，训练患者的手部垂直拉力(提力)训练.', img: './img/orange.png' },
]

const progressArr = [20, 60, 25, 39, 11, 89]
export default function Home() {
  const navigate = useNavigate();
  const [item, setItem] = useState(1)

  return (
    <div className='homeContent'>
      <Title changeItem={setItem} />
      <div className="gameContent">
        {item === 1 ? baseArr.map((a, index) => {
          return (
            <div key={a.name} className="card gameItem textItem"
              onClick={()=> navigate(a.router)}
            // style={{ background: `url(${a.img}) no-repeat center` }}
            >
              <div className="itemTitle">
                {a.name}
              </div>
              <Progress percent={progressArr[index]} />
              <div className="itemInfo">
                {a.info}
              </div>
            </div>
          )
        }) : item === 2 ? gameArr.map((a, index) => {
          return (
            <div key={a.name} className="card gameItem" style={{ background: `url(${a.img}) no-repeat center` }}>
              {/* {a} */}
            </div>
          )
        }) : null}
      </div>
    </div>
  )
}
