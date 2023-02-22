import React, { useEffect } from 'react'

export default function Serial() {
    async function getPort(){
        console.log(navigator.serial)
        const port = await navigator.serial.requestPort()
    } 

    async function getconnect1(){
        try {
            const port = await navigator.serial.requestPort();
            // Continue connecting to the device attached to |port|.
          } catch (e) {
            // The prompt has been dismissed without selecting a device.
            console.log(e)
          }
    }

    async function getport(){
        const port = await navigator.serial.requestPort();
        return port
    }

    
    useEffect(() => {
        let a = getport()
      
      
          console.log(a)

    }, [])
    return (
        <div>Serial</div>
    )
}
