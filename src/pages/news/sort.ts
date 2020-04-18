self.addEventListener('message', getMessage, false)
function getMessage(event) {
  const { data } = event
  let newList = sort(JSON.parse(data) && [])
  self.postMessage(JSON.stringify(newList))
}

function sort(list) {
  let newList = [...list]
  return newList.sort((a: any, b: any) => {
      let aTime = 0
      let aReadTime = 0
      let bTime = 0
      let bReadTime = 0
      a.list.map((aVal: any) => {
          const { time, read } = aVal
          if(read) {
              if(time > aReadTime) aReadTime = time
          }else {
              if(time > aTime) aTime = time
          }
      })
      b.list.map((bVal: any) => {
          const { time, read } = bVal
          if(read) {
              if(time > bReadTime) bReadTime = time
          }else {
              if(time > bTime) bTime = time
          }
      })
      if(aTime == 0 && bTime != 0) {
          return 1
      }else if(aTime != 0 && bTime == 0) {
          return -1
      }else if(aTime == 0 && bTime == 0) {
          return bReadTime - aReadTime
      }
      return bTime - aTime
  })
}