const heading_text_wrapper = document.getElementsByClassName('into-headings-wrapper')[0]
const heading_text_list = Array.from(heading_text_wrapper.children)
window.onload = () => {
  renderHeadings()
}

renderHeadings = (isResized = false) => {
  let HEADING_MAX_WIDTH = 477
  if (window.innerWidth < 900 && window.innerWidth > 600) {
    HEADING_MAX_WIDTH = 382
  } else if (window.innerWidth < 600) {
    HEADING_MAX_WIDTH = 287
  }
  heading_text_wrapper.style.width = `${HEADING_MAX_WIDTH}px`
  heading_text_wrapper.style.borderBottomColor = 'red'
  heading_text_wrapper.style.borderBottomStyle = 'solid'

  heading_text_list.map(heading => {
    heading.style.width = `${HEADING_MAX_WIDTH}px`
  })
  // 1st text render
  const FIRST_TIMER = isResized ? 0 : 1000
  const SECOND_TIMER = isResized ? 0 : 2000
  const THIRD_TIMER = isResized ? 0 : 3000
  setTimeout(() => {
    let ele = heading_text_list[0]
    let value = 3.5
    if (window.innerWidth < 900 && window.innerWidth > 600) {
      value = 2.8
    } else if (window.innerWidth < 600) {
      value = 2
    }
    ele.style.transform = `translateY(-${value}rem)`
  }, FIRST_TIMER)

  // 2nd text render
  setTimeout(() => {
    let ele = heading_text_list[1]
    ele.style.opacity = '1'
  }, SECOND_TIMER)

  // 3rd text render
  setTimeout(() => {
    let ele = heading_text_list[2]
    let value = 4.2
    if (window.innerWidth < 900 && window.innerWidth > 600) {
      value = 3.5
    } else if (window.innerWidth < 600) {
      value = 2.5
    }
    ele.style.transform = `translateY(${value}rem)`
    ele.style.opacity = '1'
  }, THIRD_TIMER)
}

window.onresize = _.debounce(() => renderHeadings(true), 500, { trailing: true })
