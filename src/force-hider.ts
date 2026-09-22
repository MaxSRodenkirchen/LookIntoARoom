import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'force-hider',
  schema: {},
  schemaDefaults: {},
  add: (world, component) => {
    // Wait until the model is loaded/ready. We can listen to a few events or just use a tick if we have to, 
    // but typically we can get the Object3D right away if it's already there, or wait for mesh to be ready.
    const eid = component.eid
    
    const applyHider = () => {
      // 8th wall ECS provides a way to get the three.js Object3D
      const obj3d = (world as any).three?.entityToObject?.get(eid)
      
      if (obj3d) {
        obj3d.traverse((node: any) => {
          if (node.isMesh && node.material) {
            // Force the material to be a hider material
            node.material.colorWrite = false
            node.material.depthWrite = true
            // Force this object to render BEFORE anything else (the secret to occlusion)
            node.renderOrder = -100
          }
        })
      }
    }

    // Apply immediately if it exists
    applyHider()

    // Also apply whenever a mesh or model is added to this entity
    world.events.addListener(eid, 'model-loaded', applyHider)
    world.events.addListener(eid, 'mesh-updated', applyHider)
  },
})
