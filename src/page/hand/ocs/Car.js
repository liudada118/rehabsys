import React, { useEffect, useRef } from "react";
import Three from "./Three";

// import { rotate90 } from "../../assets/util/util";
let myChart1;
let ws, ws1;
let value5 = localStorage.getItem("oscValue1"),
  value6 = localStorage.getItem("oscValue2");
let localtimeArr = localStorage.getItem("timeArr")
  ? JSON.parse(localStorage.getItem("timeArr"))
  : [];
let localvalueArr = localStorage.getItem("valueArr")
  ? JSON.parse(localStorage.getItem("valueArr"))
  : [];
let time = 0;

function valueChange(y, x) {
  return y - ((-0.0003 * x) ^ (2 + 0.1918 * x));
}

function findMost(arr) {
  if (!arr.length) return;
  if (arr.length === 1) return 1;
  let maxName,
    maxNum = 0;
  let res = arr.reduce((res, currentNum) => {
    res[currentNum] ? (res[currentNum] += 1) : (res[currentNum] = 1);
    if (res[currentNum] > maxNum) {
      maxNum = res[currentNum];
      maxName = currentNum;
    }
    return res;
  }, {});
  return maxName;
}

const switchs = [
  "座椅向前",
  "座椅向后",
  "靠背向前",
  "靠背向后",
  "坐垫前上升",
  "坐垫前下降",
  "坐垫后上升",
  "坐垫后下降",
  "腰托气囊1",
  "腰托气囊2",
  "腰托气囊3",
];


let car = [],
  realNum,
  num;
// const switchArr = [[0,1,2,3,4,5,6,7,8],[0,1,2,3,4,5,6,7,8],[0,1,2,3,4,5,6,7,8],[0,1,2,3,4,5,6,7,8],[0,1,2,3,4,5,6,7,8],[0,1,2,3,4,5,6,7,8],[0,1,2,3,4,5,6,7,8],[0,1,2,3,4,5,6,7,8],]
const switchArr = new Array(11).fill(new Array(8).fill(0));
const switchStatusArr = [0, 1, 4, 2, 3, 2, 4, 3, 5, 8, 1];

class Com extends React.Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps) {
    return false;
  }
  render() {
    return <>{this.props.children}</>;
  }
}

export default class Car extends React.Component {
  constructor(props) {
    super(props);
    this.circle = React.createRef();
    this.name = React.createRef();
    this.nums = React.createRef();
    this.com = React.createRef();
    this.state = {
      value: localStorage.getItem("oscValue")
        ? localStorage.getItem("oscValue")
        : 4500,
      value1: localStorage.getItem("oscValue1")
        ? localStorage.getItem("oscValue1")
        : 5200,
      value2: localStorage.getItem("oscValue2")
        ? localStorage.getItem("oscValue2")
        : 6800,
      arr: [],
      time: 0,
      timeArr: [],
      valueArr: [],
    };
  }

  componentDidMount() {
   
    ws = new WebSocket(" ws://sensor.bodyta.com:8888/bed");
    ws.onopen = () => {
      // connection opened
      console.info("connect success");
    };
   
    ws.onmessage = (e) => {


    };

    ws.onerror = (e) => {
      // an error occurred
    };
    ws.onclose = (e) => {
      // connection closed
    };
  }

  changePain(obj) {
    const pain = { ...this.state.pain, ...obj };
    this.setState({
      pain: pain,
    });
  }

  changeAdjust(data) {
    this.setState({
      switchStatusArr: data,
    });
  }

  render() {
    return (
      <>
        <Three index={1} ref={this.com} />
      </>
    );
  }
}
