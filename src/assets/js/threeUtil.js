
/**
 * 输入一个模型，和该模型的运动速度，执行该函数将自动开启模型在3d空间的运动
 * @param {object} model 
 * @param {number} speed 
 */
export function moveTrack3D(model, speed) {
  model.child.position.x -= speed * Math.sin(model.child.rotation.y) * Math.cos(model.child.rotation.x)
  model.child.position.y += speed * Math.sin(model.child.rotation.x) * Math.cos(model.child.rotation.y)
  model.child.position.z -= speed * Math.cos(model.child.rotation.x) * Math.cos(model.child.rotation.y)
}

/**
 * 输入初始化模型和投影之后的模型再输入初始化模型和投影模型之间的距离，便可以计算出初始模型在投影面上的位置
 * @param {model} initModel 
 * @param {model} projectModel 
 * @param {number} distance 
 */
export function project2D(initModel, projectModel, distance) {
  projectModel.position.x = -distance * Math.tan(initModel.rotation.y)
  projectModel.position.y = distance * Math.tan(initModel.rotation.x)
}